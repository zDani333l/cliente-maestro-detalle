import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';

import { IVendedor } from '../models/interface/IVendedor';

@Injectable({
  providedIn: 'root',
})
export class VendedorService {
  baseUrl = 'https://localhost:44305/api/Vendedor';
  constructor(private httpClient: HttpClient) {}

  getVendedores(
    Id?: number,
    Nombre?: string,
    Apellido?: string,
    NumeroIdentificación?: string,
    CiudadId?: number,
    PageSize?: number,
    PageNumber?: number
  ): Observable<any> {
    let url = this.baseUrl + '?';
    if (Id) {
      url += `Id=${Id}`;
    }
    if (Nombre) {
      url += `&Nombre=${Nombre}`;
    }
    if (Apellido) {
      url += `&Apellido=${Apellido}`;
    }
    if (NumeroIdentificación) {
      url += `&NumeroIdentificación=${NumeroIdentificación}`;
    }
    if (CiudadId) {
      url += `&CiudadId=${CiudadId}`;
    }
    if (PageSize) {
      url += `&PageSize=${PageSize}`;
    }
    if (PageNumber) {
      url += `&PageNumber=${PageNumber}`;
    }

    return this.httpClient.get<ReadonlyArray<any>>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  async getVendedor(id: number): Promise<any> {
    return this.httpClient
      .get(this.baseUrl + '/' + id)
      .pipe(map((response) => response['data']))
      .toPromise();
  }

  createVendedor(vendedor: IVendedor): Observable<any> {
    return this.httpClient.post<IVendedor>(this.baseUrl, vendedor).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  deleteVendedor(vendedorId: number) {
    return this.httpClient.delete(`${this.baseUrl}/${vendedorId}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  updateVendedor(vendedor: IVendedor): Observable<any> {
    return this.httpClient
      .put<IVendedor>(`${this.baseUrl}/${vendedor.id}`, { ...vendedor })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return throwError(error);
        })
      );
  }
}
