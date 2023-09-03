import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
type state = 'public' | 'private';
@Injectable({
  providedIn: 'root',
})
export class ApiConnectorService {
  private apiUrl: string = 'api/';

  constructor(private http: HttpClient) {}

  getData(service: string): Observable<any[]> {
    const url: string =
      this.apiUrl + `${service}/v0?schema=aiod&offset=0&limit=100`;
    return this.http.get<any>(url);
  }

  getDataById(service: string, id: number): Observable<any> {
    const url: string = this.apiUrl + `${service}/v0/${id}`;
    return this.http.get<any>(url);
  }

  updateService(service: string, id: number, data: any): Observable<any> {
    const url: string = this.apiUrl + `${service}/v0/${id}`;
    console.log(url);
    console.log(data);
    return this.http.put<any>(url, data);
  }
  saveState(id: number, state: boolean, service: string) {
    return this.getDataById(service, id).subscribe((res) => {
      res.is_accessible_for_free = state;
      this.updateService(service, id, res).subscribe((result) => {});
    });
  }
}
