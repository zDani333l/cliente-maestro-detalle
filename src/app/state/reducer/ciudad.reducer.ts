import { ICiudad } from './../../models/interface/ICiudad';
import { createReducer, on } from '@ngrx/store';
import { IInitialStateCiudad } from 'src/app/models/interface/IInitialStateCiudad';
import {
  LoadedCiudades,
  LoadCiudades,
  LoadCreateCiudad,
  LoadedCreateCiudad,
  LoadedUpdateCiudad,
  LoadUpdateCiudad,
} from '../actions/ciudad.actions';

export const initialState: IInitialStateCiudad = {
  loading: false,
  ciudades: [],
};

export const ciudadReducer = createReducer(
  initialState,
  on(LoadCreateCiudad, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(LoadedCreateCiudad, (state, { ciudad }) => {
    const a = {
      ciudades: [...state.ciudades, ciudad['data']],
      loading: false,
    };
    console.log(a);
    return a;
  }),
  on(LoadCiudades, (state) => {
    return { ...state, loading: true };
  }),
  on(LoadedCiudades, (state, { ciudades }) => {
    return {
      ...state,
      loading: false,
      ciudades,
    };
  }),
  on(LoadUpdateCiudad, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(LoadedUpdateCiudad, (state, { ciudad }) => {
    const ciudades = state.ciudades.map((c: ICiudad) => {
      return c.id === ciudad.id ? ciudad : c;
    });
    return {
      ciudades: [...ciudades],
      loading: false,
    };
  })
);
