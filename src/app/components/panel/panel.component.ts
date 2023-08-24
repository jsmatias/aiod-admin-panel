import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { ApiConnectorService } from '../../services/api-connector.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css'],
  providers: [
    ApiConnectorService,
    {
      provide: 'service',
      useValue: 'case_studies',
    },
  ],
})
export class ServicesListComponent {
  services: any;
  displayedColumns: string[] = [
    'name',
    'creator',
    'is_accessible_for_free',
    'star',
  ];

  onPermissionChange(element: Data): void {
    console.log('Changed...');
  }

  constructor(private apiService: ApiConnectorService) {}

  ngOnInit(): void {
    this.apiService.getData().subscribe((res) => {
      console.log(res);
      this.services = res;
    });
  }
}

export interface Data {
  identifier: number;
  name: string;
  creator: string | string[];
  is_accessible_for_free: boolean;
}
