import { AppState } from './../app.state';
import { IInitialStateCiudad } from 'src/app/models/interface/IInitialStateCiudad';
import { createSelector } from '@ngrx/store';

export const selectCiudadesFecture = (state: AppState) => state.stateCiudad;

export const selectCiudades = createSelector(
  selectCiudadesFecture,
  (state: IInitialStateCiudad) => state.ciudades
);

export const selectLoading = createSelector(
  selectCiudadesFecture,
  (state: IInitialStateCiudad) => state.loading
);
