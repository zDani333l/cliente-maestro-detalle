import { ICiudad } from './../../models/interface/ICiudad';
import {
  LoadCiudades,
  LoadCreateCiudad,
  LoadedCiudades,
  LoadedCreateCiudad,
  LoadedUpdateCiudad,
  LoadUpdateCiudad,
} from './../actions/ciudad.actions';
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
import { CiudadService } from 'src/app/services/ciudad.service';

@Injectable()
export class CiudadEffects {
  constructor(private action$: Actions, private ciudadService: CiudadService) {}

  loadCiudad$ = createEffect(() =>
    this.action$.pipe(
      ofType(LoadCiudades),
      exhaustMap(() =>
        this.ciudadService.getCiudades().pipe(
          map((ciudades) => {
            return LoadedCiudades({
              ciudades: ciudades['data'],
            });
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );

  addVendedor$ = createEffect(() =>
    this.action$.pipe(
      ofType(LoadCreateCiudad),
      map((data) => data.ciudad),
      mergeMap((ciudad: ICiudad) =>
        this.ciudadService.createCiudad(ciudad).pipe(
          map((newCiudad: ICiudad) =>
            LoadedCreateCiudad({ ciudad: newCiudad })
          ),
          catchError((err) => EMPTY)
        )
      )
    )
  );

  updateCiudad$ = createEffect(() =>
    this.action$.pipe(
      ofType(LoadUpdateCiudad),
      concatMap(({ ciudad }) =>
        this.ciudadService.updateCiudad(ciudad).pipe(
          map(() => LoadedUpdateCiudad({ ciudad })),
          catchError(() => EMPTY)
        )
      )
    )
  );
}
