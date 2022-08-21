import { db } from 'fb/client';
import {
  collection, getDocs, deleteDoc, doc,
} from 'firebase/firestore';
import { Respuesta } from 'types/services';
import { Usuario } from 'types/usuario';
import { crearRespuesta } from '../utils/services';

/*
esto hay que cambiarlo por uno que use onSnapshot para detectar los cambios
y utilizar en un contexto para que se refresque la informacion automaticamente

import { doc, onSnapshot } from "firebase/firestore";

const unsub = onSnapshot(doc(db, "cities", "SF"), (doc) => {
    console.log("Current data: ", doc.data());
});
*/
export const getUsuarios = async ():Promise<Usuario[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'usuarios'));
    return querySnapshot.docs.map((documento) => ({
      ...documento.data(),
      docId: documento.id,
    })) as Usuario[];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error', error);
    return [];
  }
};

export const postUsuario = async (usuario: Usuario):Promise<Respuesta> => {
  try {
    // eslint-disable-next-line no-param-reassign
    delete usuario.docId;
    await db.collection('usuarios').add(usuario);
    return crearRespuesta('Usuario creado correctamente', true);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error', error);
    return crearRespuesta('Error creando el usuario');
  }
};

export const deleteUsuario = async (id: string):Promise<Respuesta> => {
  try {
    if (!id) throw new Error('Id vacio');

    await deleteDoc(doc(db, 'usuarios', id));
    return crearRespuesta('Usuario eliminado correctamente', true);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error', error);
    return crearRespuesta('Error eliminando el usuario');
  }
};
