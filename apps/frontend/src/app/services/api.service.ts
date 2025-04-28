import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  // This is the method that's being called in the component
  getHello(): Observable<any> {
    return this.http.get('/api/hello');
  }
}