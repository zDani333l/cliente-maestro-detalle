import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ICiudad } from '../models/interface/ICiudad';
@Injectable({
  providedIn: 'root',
})
export class CiudadService {
  baseUrl = 'https://localhost:44305/api/Ciudad';
  constructor(private httpClient: HttpClient) {}

  getCiudades(): Observable<any> {
    return this.httpClient.get<ReadonlyArray<any>>(this.baseUrl).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  async getCiudad(id: number): Promise<any> {
    return this.httpClient
      .get(this.baseUrl + id)
      .pipe(map((response) => response['data']))
      .toPromise();
  }

  createCiudad(ciudad: ICiudad): Observable<any> {
    return this.httpClient.post<ICiudad>(this.baseUrl, ciudad).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  updateCiudad(ciudad: ICiudad): Observable<any> {
    return this.httpClient
      .put<ICiudad>(`${this.baseUrl}/${ciudad.id}`, { ...ciudad })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return throwError(error);
        })
      );
  }
}
