import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { ApiConnectorService } from '../../services/api-connector.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css'],
})
export class ServicesListComponent {
  services: any;
  displayedColumns: string[] = ['service', 'owner', 'permission'];

  onPermissionChange(element: MyData): void {
    console.log('Changed...');
  }

  constructor(private apiService: ApiConnectorService) {}

  ngOnInit(): void {
    // this.apiService.getData().subscribe((res) => {
    //   console.log(res);
    //   this.services = res;
    // });
    this.services = data;
  }
}

export interface MyData {
  service: string;
  owner: string;
  permission: string;
}

const data: MyData[] = [
  { service: 'Hydrogen', owner: 'test', permission: 'public' },
  { service: 'Helium', owner: 'test', permission: 'public' },
  { service: 'Lithium', owner: 'test', permission: 'public' },
  { service: 'Beryllium', owner: 'test', permission: 'public' },
  { service: 'Boron', owner: 'test', permission: 'public' },
  { service: 'Carbon', owner: 'test', permission: 'public' },
  { service: 'Nitrogen', owner: 'test', permission: 'public' },
  { service: 'Oxygen', owner: 'test', permission: 'public' },
  { service: 'Fluorine', owner: 'test', permission: 'public' },
  { service: 'Neon', owner: 'test', permission: 'public' },
  { service: 'Sodium', owner: 'test', permission: 'public' },
  { service: 'Magnesium', owner: 'test', permission: 'public' },
  { service: 'Aluminum', owner: 'test', permission: 'public' },
  { service: 'Silicon', owner: 'test', permission: 'public' },
  { service: 'Phosphorus', owner: 'test', permission: 'public' },
  { service: 'Sulfur', owner: 'test', permission: 'public' },
  { service: 'Chlorine', owner: 'test', permission: 'public' },
  { service: 'Argon', owner: 'test', permission: 'public' },
  { service: 'Potassium', owner: 'test', permission: 'public' },
  { service: 'Calcium', owner: 'test', permission: 'public' },
];
