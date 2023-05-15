import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private baseUrl = environment.baseUrl;
  private _user: any = JSON.parse(localStorage.getItem('user')!);

  get user() {
    return this._user;
  }
  constructor(private httpClient: HttpClient) { }

  readCategory(){
    return this.httpClient.get<any>(`${this.baseUrl}/category`);
  }
}
