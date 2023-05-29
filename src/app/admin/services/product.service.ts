import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = environment.baseUrl;
  private _user: any = JSON.parse(localStorage.getItem('user')!);
  constructor(private httpClient: HttpClient) {}

  get user(){
    return this._user;
  }

  readProduct(){
    const headers = {
      Authorization: `Token  ${this.user.token}`
    }
    return this.httpClient.get<any>(`${this.baseUrl}/item`, {headers})
  }

  createProduct(product: any) {
    const headers = {
      Authorization: `Token ${this.user.token}`
    }
    return this.httpClient.post<any>(`${this.baseUrl}/item`,product , {headers});
  }

}
