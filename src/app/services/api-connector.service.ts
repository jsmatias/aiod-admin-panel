import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiConnectorService {
  private apiUrl: string = 'api/';

  constructor(
    private http: HttpClient,
    @Inject('service') private service: string,
  ) {
    this.apiUrl += `${this.service}/v0?schema=aiod&offset=0&limit=100`;
  }

  getData(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl);
  }

  updateData(service: string, identifier: number, data: any) {
    this.apiUrl = `/${service}/v0/${identifier}`;
    return this.http.patch<any>(this.apiUrl, data);
  }
}
