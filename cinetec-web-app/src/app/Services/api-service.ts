import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService<T> {
  private baseUrl = 'http://localhost:5053/api';

  constructor(private http: HttpClient) { }

  getAll(endpoint: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.baseUrl}/${endpoint}`);
  }

  getById(endpoint: string, id: any): Observable<T[]> {
    const url = `${this.baseUrl}/${endpoint}/${id}`;
    return this.http.get<T[]>(url);
  }

  getByTwoIds(endpoint: string, id1: any, id2: any): Observable<T[]> {
    const url = `${this.baseUrl}/${endpoint}/${id1}/${id2}`;
    return this.http.get<T[]>(url);
  }

  create(endpoint: string, data: T): Observable<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.http.post<T>(url, data);
  }

  createList(endpoint: string, listData: T[]): Observable<T[]> {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.http.post<T[]>(url, listData);
  }

  delete(endpoint: string, id: any): Observable<void> {
    const url = `${this.baseUrl}/${endpoint}/${id}`;
    return this.http.delete<void>(url);
  }
  deleteByTwoIds(endpoint: string, id1: any, id2: any): Observable<void> {
    const url = `${this.baseUrl}/${endpoint}/${id1}/${id2}`;
    return this.http.delete<void>(url);
  }

  update(endpoint: string, id: any, data: T): Observable<T> {
    const url = `${this.baseUrl}/${endpoint}/${id}`;
    return this.http.put<T>(url, data);
  }

  GetMovieByBranch(branchName: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.baseUrl}/SucursalPelicula/${branchName}`);
  }
}
