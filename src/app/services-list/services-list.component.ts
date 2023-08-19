import { Component, OnInit } from '@angular/core';
// import { ServiceService } from '../service.service';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.css']
})
export class ServicesListComponent{
  services: string[] = ['Event', 'Dataset'];
  
  // constructor(private serviceService: ServiceService) {}
  
  // ngOnInit() {
  //   this.serviceService.getServices().subscribe(services => {
  //     this.services = services;
  //   });
  // }
}
