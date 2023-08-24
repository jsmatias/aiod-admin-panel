import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiConnectorService {
  private apiUrl = '/platforms/v0?schema=aiod&offset=0&limit=100';
  token: string = '';

  constructor(private http: HttpClient) {}

  getData(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl);
  }
}
