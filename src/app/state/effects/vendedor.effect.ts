import { IVendedor } from './../../models/interface/IVendedor';
import { ICiudad } from './../../models/interface/ICiudad';
import { VendedorService } from './../../services/vendedor.service';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import {
  catchError,
  concatMap,
  exhaustMap,
  map,
  mergeMap,
} from 'rxjs/operators';
import {
  LoadCreateVendedor,
  LoadDeleteVendedor,
  LoadedCreateVendedor,
  LoadedDeleteVendedor,
  LoadedNextPage,
  LoadedPreviousPage,
  LoadedUpdateVendedor,
  LoadedVendedores,
  LoadNextPage,
  LoadPage,
  LoadPreviousPage,
  LoadUpdateVendedor,
  LoadVendedores,
} from '../actions/vendedor.actions';

@Injectable()
export class VendedorEffects {
  constructor(
    private action$: Actions,
    private vendedorService: VendedorService
  ) {}

  loadVendedores$ = createEffect(() =>
    this.action$.pipe(
      ofType(LoadVendedores),
      exhaustMap(() =>
        this.vendedorService.getVendedores().pipe(
          map((vendedores) => {
            return LoadedVendedores({
              vendedores: vendedores['data'],
              meta: vendedores['meta'],
            });
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );

  addVendedor$ = createEffect(() =>
    this.action$.pipe(
      ofType(LoadCreateVendedor),
      map((data) => data.vendedor),
      mergeMap((vendedor: IVendedor) =>
        this.vendedorService.createVendedor(vendedor).pipe(
          map((newVendedor: IVendedor) =>
            LoadedCreateVendedor({ vendedor: newVendedor })
          ),
          catchError((err) => EMPTY)
        )
      )
    )
  );

  deleteVendedor$ = createEffect(() =>
    this.action$.pipe(
      ofType(LoadDeleteVendedor),
      mergeMap(({ vendedorId }) =>
        this.vendedorService.deleteVendedor(vendedorId).pipe(
          map(() => LoadedDeleteVendedor({ vendedorId })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  updateVendedor$ = createEffect(() =>
    this.action$.pipe(
      ofType(LoadUpdateVendedor),
      concatMap(({ vendedor }) =>
        this.vendedorService.updateVendedor(vendedor).pipe(
          map(() => LoadedUpdateVendedor({ vendedor })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  loadNextPage$ = createEffect(() =>
    this.action$.pipe(
      ofType(LoadNextPage),
      concatMap((meta) =>
        this.vendedorService.getVendedores().pipe(
          map((vendedores) => {
            return LoadedNextPage({
              vendedores: vendedores['data'],
              meta: vendedores['meta'],
            });
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );

  loadPreviusPage$ = createEffect(() =>
    this.action$.pipe(
      ofType(LoadPreviousPage),
      concatMap((meta) =>
        this.vendedorService.getVendedores().pipe(
          map((vendedores) => {
            return LoadedPreviousPage({
              vendedores: vendedores['data'],
              meta: vendedores['meta'],
            });
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );

  LoadPage$ = createEffect(() =>
    this.action$.pipe(
      ofType(LoadPage),
      exhaustMap(() =>
        this.vendedorService.getVendedores().pipe(
          map((vendedores) => {
            return LoadedVendedores({
              vendedores: vendedores['data'],
              meta: vendedores['meta'],
            });
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );
}
