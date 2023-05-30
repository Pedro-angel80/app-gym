import { HttpClient, HttpParams } from '@angular/common/http';
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

  readProductAll(total: number) {
    const headers = {
      Authorization: `Token ${this.user.token}`
    }
    let params = new HttpParams();
    params = params.append('limit', total)
    return this.httpClient.get<any>(`${this.baseUrl}/item`, { headers, params })
  }


  createProduct(product: any) {
    const headers = {
      Authorization: `Token ${this.user.token}`
    }
    
    
    return this.httpClient.post<any>(`${this.baseUrl}/item`,product , {headers});
  }

  
  readProdcutById(id: string) {
    const headers = {
      Authorization: `Token ${this.user.token}`
    }
    return this.httpClient.get<any>(`${this.baseUrl}/item/${id}`, { headers })
  }

  updateProdcut(id: string, product: any) {
    const headers = {
      Authorization: `Token ${this.user.token}`
    }
    return this.httpClient.put<any>(`${this.baseUrl}/item/${id}`, product, { headers })
  }

  deleteProdcut(id: string) {
    const headers = {
      Authorization: `Token ${this.user.token}`
    }
    return this.httpClient.delete<any>(`${this.baseUrl}/item/${id}`, { headers })
  }
}
