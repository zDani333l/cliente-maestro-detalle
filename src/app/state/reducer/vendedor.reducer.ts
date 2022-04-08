import { IVendedor } from './../../models/interface/IVendedor';
import {
  LoadCreateVendedor,
  LoadedCreateVendedor,
  LoadedVendedores,
  LoadVendedores,
  LoadDeleteVendedor,
  LoadedDeleteVendedor,
  LoadNextPage,
  LoadedNextPage,
  LoadPreviousPage,
  LoadedPreviousPage,
  LoadPage,
  LoadedPage,
  LoadedUpdateVendedor,
  LoadUpdateVendedor,
} from './../actions/vendedor.actions';
import { createReducer, on } from '@ngrx/store';
import { IInitialStateVendedor } from 'src/app/models/interface/IInitialStateVendedor';

export const initialState: IInitialStateVendedor = {
  loading: false,
  vendedores: [],
  meta: undefined,
};

export const vendedorReducer = createReducer(
  initialState,
  on(LoadCreateVendedor, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(LoadedCreateVendedor, (state, { vendedor }) => {
    return {
      vendedores: [...state.vendedores, vendedor['data']],
      loading: false,
      meta: { ...state.meta },
    };
  }),
  on(LoadVendedores, (state) => {
    return { ...state, loading: true };
  }),
  on(LoadedVendedores, (state, { vendedores, meta }) => {
    return {
      ...state,
      loading: false,
      vendedores,
      meta,
    };
  }),
  on(LoadUpdateVendedor, (state, { vendedor }) => {
    return {
      ...state,
      loading: true,
      ...vendedor,
    };
  }),
  on(LoadedUpdateVendedor, (state, { vendedor }) => {
    const vendedores = state.vendedores.map((v: IVendedor) => {
      return v.id === vendedor.id ? vendedor : v;
    });
    return {
      vendedores: [...vendedores],
      meta: { ...state.meta },
      loading: false,
    };
  }),
  on(LoadDeleteVendedor, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(LoadedDeleteVendedor, (state, { vendedorId }) => {
    return {
      ...state,
      vendedores: [...state.vendedores].filter((v) => v.id !== vendedorId),
      loading: false,
    };
  }),
  on(LoadNextPage, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(LoadedNextPage, (state, { meta, vendedores }) => {
    return {
      ...state,
      loading: false,
      vendedores,
      meta,
    };
  }),
  on(LoadPreviousPage, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(LoadedPreviousPage, (state, { meta, vendedores }) => {
    return {
      ...state,
      loading: false,
      vendedores,
      meta,
    };
  }),
  on(LoadPage, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(LoadedPage, (state, { CurrentPage, vendedores }) => {
    return {
      ...state,
      loading: false,
      vendedores,
      CurrentPage,
    };
  })
);
