import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Branch } from '../Interfaces/branch';

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  private url = 'https://localhost:7179/api/';

  constructor(private http: HttpClient) {}

  getAllBranches(): Observable<Branch[]> {
    return this.http.get<Branch[]>(this.url + 'Sucursal');
  }
}
