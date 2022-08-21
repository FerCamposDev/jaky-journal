import { User } from 'firebase/auth';
import uniqid from 'uniqid';

export type Usuario = {
  docId?: string;
  uid: string;
  nombre: string;
  email: string;
  foto: string;
  compras: string[];
  esAdmin: boolean;
};

export const generarUsuario = (user: User | string): Usuario => {
  if (typeof user === 'string') {
    return {
      uid: uniqid(),
      nombre: user,
      email: '',
      foto: '',
      compras: [],
      esAdmin: false,
    };
  }
  return {
    uid: user.uid,
    nombre: user.displayName || '',
    email: user.email || '',
    foto: user.photoURL || '',
    compras: [],
    esAdmin: false,
  };
};
