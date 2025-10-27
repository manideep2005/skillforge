import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardApiService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getDashboardData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/dashboard`, { headers: this.getHeaders() });
  }

  getUserProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile`, { headers: this.getHeaders() });
  }
}