import { IPagination } from './IPagination';
import { IVendedor } from './IVendedor';

export interface IInitialStateVendedor {
  loading: boolean;
  vendedores: IVendedor[];
  meta: IPagination;
}
