import { Component, OnInit } from '@angular/core';
import { ApiConnectorService } from '../services/api-connector.service';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.css']
})
export class ServicesListComponent{
  services: any;
  
  constructor(private apiService: ApiConnectorService){}
  
  ngOnInit() {
    this.apiService.getData().subscribe(res => {
      this.services = res;
    });
  }
}
