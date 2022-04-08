import { IPagination } from './../../models/interface/IPagination';
import { IVendedor } from './../../models/interface/IVendedor';

import { createAction, props } from '@ngrx/store';

//Cargar lista de vendedores
export const LoadVendedores = createAction('[Vendedor] Load Vendedores');

export const LoadedVendedores = createAction(
  '[Vendedor] LoadedVendedor Success',
  props<{ vendedores: IVendedor[]; meta: IPagination }>()
);

//Crear Vendedor
export const LoadCreateVendedor = createAction(
  '[Vendedor] Load AddVendedor',
  props<{ vendedor: IVendedor }>()
);

export const LoadedCreateVendedor = createAction(
  '[Vendedor] AddVendedor Success',
  props<{ vendedor: IVendedor }>()
);

//Editar vendedor
export const LoadUpdateVendedor = createAction(
  '[Vendedor] Load UpdateVendedor',
  props<{ vendedor: IVendedor }>()
);

export const LoadedUpdateVendedor = createAction(
  '[Vendedor] UpdateVendedor Success',
  props<{ vendedor: IVendedor }>()
);

//Eliminar vendedor
export const LoadDeleteVendedor = createAction(
  '[Vendedor] Load DeleteVendedor',
  props<{ vendedorId: number }>()
);

export const LoadedDeleteVendedor = createAction(
  '[Vendedor] DeleteVendedor Success',
  props<{ vendedorId: number }>()
);

//Siguiente Pagina
export const LoadNextPage = createAction(
  '[Vendedor] Load NextPage',
  props<{ meta: IPagination }>()
);

export const LoadedNextPage = createAction(
  '[Vendedor] Loaded NextPage',
  props<{ meta: IPagination; vendedores: IVendedor[] }>()
);

//Pagina Anterior
export const LoadPreviousPage = createAction(
  '[Vendedor] Load PreviousPage',
  props<{ meta: IPagination }>()
);
export const LoadedPreviousPage = createAction(
  '[Vendedor] Loaded PreviousPage',
  props<{ meta: IPagination; vendedores: IVendedor[] }>()
);

//Cargar una pagina especifica
export const LoadPage = createAction(
  '[Vendedor] LoadPage',
  props<{ CurrentPage: number }>()
);

export const LoadedPage = createAction(
  '[Vendedor] LoadedPage',
  props<{ CurrentPage: number; vendedores: IVendedor[] }>()
);
