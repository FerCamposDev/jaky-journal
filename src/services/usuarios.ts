/* eslint-disable import/prefer-default-export */
import { db } from 'fb/client';
import { Usuario } from 'types/usuario';

export const postUsuario = (usuario: Usuario):boolean => {
  try {
    db.collection('usuarios').add(usuario);
    return true;
  } catch (error) {
    console.log('error', error);
    return false;
  }
};
