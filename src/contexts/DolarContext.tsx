import axios from 'axios';
import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { DolarApiResponse } from 'types/dolar';

type DolarProps = {
  precio: number;
  setPrecio: Dispatch<SetStateAction<number>>;
  precioAutomatico: boolean;
  setPrecioAutomatico: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  actualizarPrecio: Function;
}

const DolarContext = createContext<DolarProps>({
  precio: 0,
  setPrecio: () => { },
  precioAutomatico: true,
  setPrecioAutomatico: () => { },
  loading: true,
  actualizarPrecio: () => { },
});

export const DolarProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [precio, setPrecio] = useState(0);
  const [precioAutomatico, setPrecioAutomatico] = useState(true);
  const [loading, setLoading] = useState(true);

  const averiguarDolar = useCallback(
    async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('https://cors-solucion.herokuapp.com/https://api-dolar-argentina.herokuapp.com/api/dolarblue');
        const datos = data as DolarApiResponse;
        setPrecio(Number(datos.venta));
      } catch (error) {
        console.log('error', error);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    let intervaloId: NodeJS.Timeout;
    if (precioAutomatico) {
      averiguarDolar();
      intervaloId = setInterval(() => {
        averiguarDolar();
      }, 1000 * 60 * 5); // cada 5 min
    }

    return () => clearInterval(intervaloId); // corta el intervalo para que no se siga ejecutando
  }, [averiguarDolar, precioAutomatico]);

  const values = useMemo(() => ({
    precio,
    setPrecio,
    precioAutomatico,
    setPrecioAutomatico,
    actualizarPrecio: averiguarDolar,
    loading,
  }), [precio, precioAutomatico, loading]);

  return (
    <DolarContext.Provider value={values}>
      {children}
    </DolarContext.Provider>
  );
};

export const useDolar = () => useContext(DolarContext);

export default DolarProvider;
