import { ICiudad } from './../../models/interface/ICiudad';
import { createAction, props } from '@ngrx/store';

//Cargar lista de Ciudades
export const LoadCiudades = createAction('[Ciudad] Load Ciudades');

export const LoadedCiudades = createAction(
  '[Ciudad] LoadedCiudad Success',
  props<{ ciudades: ICiudad[] }>()
);

//Crear Ciudad
export const LoadCreateCiudad = createAction(
  '[Ciudad] Load AddCiudad',
  props<{ ciudad: ICiudad }>()
);

export const LoadedCreateCiudad = createAction(
  '[Ciudad] AddCiudad Success',
  props<{ ciudad: ICiudad }>()
);

//Editar Ciudad
export const LoadUpdateCiudad = createAction(
  '[Ciudad] Load CiudadCiudad',
  props<{ ciudad: ICiudad }>()
);

export const LoadedUpdateCiudad = createAction(
  '[Ciudad] UpdateCiudad Success',
  props<{ ciudad: ICiudad }>()
);
