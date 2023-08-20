import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ApiConnectorService {
  private apiUrl = 'http://localhost:8000/platforms/v0?schema=aiod&offset=0&limit=100'; // Your API URL here

  constructor(private http: HttpClient) { }
  
  getData() {
    return this.http.get(this.apiUrl);
  }
}
