import { auth, db } from 'fb/client';
import { User } from 'firebase/auth';
import { collection, query, onSnapshot } from 'firebase/firestore';
import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getUsuario, postUsuario } from 'services/usuarios';
import { generarUsuario, Usuario } from 'types/usuario';

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
  const [user, stateLoading] = useAuthState(auth);
  const [loading, setLoading] = useState(stateLoading);
  const [esAdmin, setEsAdmin] = useState(false);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  const cargarUsuario = useCallback(async (user: User) => {
    setLoading(true);
    const usuario = await getUsuario(user.uid);
    if (usuario) {
      setEsAdmin(usuario.esAdmin);
    } else {
      const nuevoUsuario = generarUsuario(user);
      await postUsuario(nuevoUsuario);
    }
    setLoading(false);
  }, []);

  const cargarTodosLosUsuarios = useCallback(async () => {
    const q = query(collection(db, 'usuarios'));
    onSnapshot(q, (querySnapshot) => {
      setLoading(true);
      const users: Usuario[] = [];
      querySnapshot.forEach((doc) => {
        users.push({
          ...doc.data(),
          uid: doc.id,
        } as Usuario);
      });
      setUsuarios(users);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (user?.uid) {
      cargarUsuario(user);
    }
  }, [user]);

  useEffect(() => {
    if (esAdmin) {
      cargarTodosLosUsuarios();
    }
  }, [esAdmin]);

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

export const useDB = () => useContext(DBContext);

export default DBProvider;
