import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GymService {

  server: Array<any> = [];

  constructor(private http: HttpClient) { }

  getList() {
  }
}
