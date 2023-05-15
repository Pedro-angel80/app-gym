import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthdService {

  private baseUrl = environment.baseUrl;
  private _user: any = null;

  get user() {
    return this._user;
  }
  constructor(private httpClient: HttpClient) { }

  login(data: any) {
    return this.httpClient
      .post<any>(`${this.baseUrl}/auth/login`, data)
      .pipe(
        tap((res) => {
          if (res != null) {
            this._user = {
              userName: res.user.name,
              id: res.user.uid,
              token: res.token,
              role: res.user.role
            }
          } else {
            this._user = null;
          }
        }),
        map((res) => {
          console.log("Este es el res: " + res.ok);
          if (res != null) {
            return true;
          } else {
            return false;
          }
        }),
        catchError((err) => of(err.error.message))
      );
  }

  validarToken(): Observable<boolean> {
    const token = JSON.parse(localStorage.getItem('user')!);
    console.log(token);
    if (token) {
      return new Observable((subscriber) => {
        subscriber.next(true);
      })
    } else {
      return new Observable((subscriber) => {
        subscriber.next(false);
      });
    }
  }
}