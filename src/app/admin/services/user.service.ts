import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.baseUrl;
  private _user: any = JSON.parse(localStorage.getItem('user')!);
  constructor(private httpClient: HttpClient) { }
  get user(){
    return this._user;
  }

  readUser() {
    const headers = {
      Authorization: `Token ${this.user.token}`
    }
    return this.httpClient.get<any>(`${this.baseUrl}/user`, { headers })
  }

  readUserAll(total: number) {
    const headers = {
      Authorization: `Token ${this.user.token}`
    }
    let params = new HttpParams();
    params = params.append('limit', total)
    return this.httpClient.get<any>(`${this.baseUrl}/user`, { headers, params })
  }

  createUser(user: any) {
    console.log(this.user.token);
    const headers = {
      Authorization: `Token ${this.user.token}`
    }
    return this.httpClient.post<any>(`${this.baseUrl}/user`,user , {headers});
  }

  deleteUser(idUser: string){
    const headers = {
      Authorization: `Token ${this.user.token}`
    }
    return this.httpClient.delete<any>(`${this.baseUrl}/user/${idUser}`, { headers })
  }

  getUserById(idUser: string) {
    const headers = {
      Authorization: `Token ${this.user.token}`
    }
    return this.httpClient.get<any>(`${this.baseUrl}/search/user/${idUser}`, { headers })
  }

  updateUser(idUser: string, user: any) {
    const headers = {
      Authorization: `Token ${this.user.token}`
    }
    return this.httpClient.put<any>(`${this.baseUrl}/user/${idUser}`, user, { headers })
  }

  userSearch(userName: string){
    const headers = {
      Authorization: `Token ${this.user.token}`
    }
    return this.httpClient.get<any>(`${this.baseUrl}/search/user/${userName}`, { headers }) 
  }
}
