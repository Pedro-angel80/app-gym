import { HttpClient, HttpParams } from '@angular/common/http';
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

  readCategoryAll(total: number) {
    const headers = {
      Authorization: `Token ${this.user.token}`
    }
    let params = new HttpParams();
    params = params.append('limit', total)
    return this.httpClient.get<any>(`${this.baseUrl}/category`, { headers, params })
  }

  createCategory(category: any){
    const headers = {
      Authorization: `Token ${this.user.token}`
    }
    return this.httpClient.post<any>(`${this.baseUrl}/category`,category , {headers});
  }

  readCategoryById(id: string) {
    const headers = {
      Authorization: `Token ${this.user.token}`
    }
    return this.httpClient.get<any>(`${this.baseUrl}/category/${id}`, { headers })
  }

  updateCategory(id: string, category: any){
    const headers = {
      Authorization: `Token ${this.user.token}`
    }
    return this.httpClient.put<any>(`${this.baseUrl}/category/${id}`,category , {headers});
  }

  deleteCategory(id: string) {
    const headers = {
      Authorization: `Token ${this.user.token}`
    }
    return this.httpClient.delete<any>(`${this.baseUrl}/category/${id}`, { headers })
  }
}
