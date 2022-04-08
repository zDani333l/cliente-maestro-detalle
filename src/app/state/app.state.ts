import { IInitialStateVendedor } from 'src/app/models/interface/IInitialStateVendedor';
import { IInitialStateCiudad } from 'src/app/models/interface/IInitialStateCiudad';
import { ActionReducerMap } from '@ngrx/store';
import { ciudadReducer } from './reducer/ciudad.reducer';
import { vendedorReducer } from './reducer/vendedor.reducer';

export interface AppState {
  stateCiudad: IInitialStateCiudad;
  stateVendedor: IInitialStateVendedor;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  stateCiudad: ciudadReducer,
  stateVendedor: vendedorReducer,
};
