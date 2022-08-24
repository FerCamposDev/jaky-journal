import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Usuario } from 'types/usuario';

type DBContextProps = {
  esAdmin: boolean;
  usuarios: Usuario[];
  loading: boolean;
  // setPrecio: Dispatch<SetStateAction<number>>;
}

const DBContext = createContext<DBContextProps>({
  esAdmin: false,
  usuarios: [],
  loading: false,
});

export const DBProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [esAdmin, setEsAdmin] = useState(false);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  useEffect(() => {
    // do something
  }, []);

  const values = useMemo(() => ({
    esAdmin,
    usuarios,
    loading,
  }), [usuarios, loading, esAdmin]);

  return (
    <DBContext.Provider value={values}>
      {children}
    </DBContext.Provider>
  );
};

export const useDolar = () => useContext(DBContext);

export default DBProvider;
