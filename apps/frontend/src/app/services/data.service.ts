import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import type { Observable } from "rxjs"

@Injectable({
  providedIn: "root",
})
export class DataService {
  // In a monorepo setup, this would typically point to your NestJS API
  private apiUrl = "/api" // This will be proxied to your NestJS backend

  constructor(private http: HttpClient) {}

  getData(): Observable<{ message: string; items: string[] }> {
    return this.http.get<{ message: string; items: string[] }>(`${this.apiUrl}/messages`)
  }
  saveData(data: { message: string, items: any[] }): Observable<any> {
    return this.http.post(`${this.apiUrl}/messages`, data);
  }
}
