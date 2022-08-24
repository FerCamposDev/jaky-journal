/* eslint-disable no-console */
import { db } from 'fb/client';
import {
  deleteDoc, doc, getDoc, setDoc,
} from 'firebase/firestore';
import { Respuesta } from 'types/services';
import { Usuario } from 'types/usuario';
import { crearRespuesta } from '../utils/services';

export const getUsuario = async (uid: string): Promise<Usuario | undefined> => {
  try {
    const docRef = doc(db, 'usuarios', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return {
        ...docSnap.data(),
        uid: docSnap.id,
      } as Usuario;
    }
    console.log('Documento no encontrado!');
  } catch (error) {
    console.log('error', error);
  }
  return undefined;
};

export const postUsuario = async (usuario: Usuario): Promise<Respuesta> => {
  try {
    const { uid, ...restoDelUsuario } = usuario; // saco el uid del usuario
    await setDoc(doc(db, 'usuarios', uid), restoDelUsuario);

    return crearRespuesta('Usuario creado correctamente', true);
  } catch (error) {
    console.log('error', error);
    return crearRespuesta('Error creando el usuario');
  }
};

export const deleteUsuario = async (id: string): Promise<Respuesta> => {
  try {
    if (!id) throw new Error('Id vacio');

    await deleteDoc(doc(db, 'usuarios', id));
    return crearRespuesta('Usuario eliminado correctamente', true);
  } catch (error) {
    console.log('error', error);
    return crearRespuesta('Error eliminando el usuario');
  }
};
