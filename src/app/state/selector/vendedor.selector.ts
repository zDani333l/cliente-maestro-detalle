import { IInitialStateVendedor } from 'src/app/models/interface/IInitialStateVendedor';
import { AppState } from './../app.state';

import { createSelector } from '@ngrx/store';

export const selectVendedoresFecture = (state: AppState) => state.stateVendedor;

export const selectVendedores = createSelector(
  selectVendedoresFecture,
  (state: IInitialStateVendedor) => state.vendedores
);

export const selectLoadingVendedor = createSelector(
  selectVendedoresFecture,
  (state: IInitialStateVendedor) => state.loading
);
