/* eslint-disable import/prefer-default-export */
import { Respuesta } from '../types/services';

export const crearRespuesta = (msg: string, status?: boolean):Respuesta => ({
  msg,
  status: status || false,
});
