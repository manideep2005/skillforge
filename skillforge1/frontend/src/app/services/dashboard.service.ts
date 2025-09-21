import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private baseUrl = 'http://localhost:8080/api/dashboard';

  constructor(private http: HttpClient) {}

  getStudentDashboard(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/student/${userId}`);
  }

  getAllCourses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/courses`);
  }

  getUserByEmail(email: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/${email}`);
  }

  enrollInCourse(userId: string, courseId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/enroll`, { userId, courseId });
  }
}