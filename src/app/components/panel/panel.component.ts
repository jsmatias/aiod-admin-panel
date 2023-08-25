import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiConnectorService } from '../../services/api-connector.service';
import { PermissionDialogComponent } from '../permission-dialog/permission-dialog.component';
import { MatSelectChange } from '@angular/material/select';

export interface Data {
  identifier: number;
  name: string;
  creator: string | string[];
  is_accessible_for_free: boolean;
}

export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css'],
})
export class ServicesListComponent {
  services: any;
  foods: Food[] = [
    { value: 'case_studies', viewValue: 'Case Studies' },
    { value: 'datasets', viewValue: 'Datasets' },
    { value: 'computational_resources', viewValue: 'Computational Resources' },
    { value: 'educational_resources', viewValue: 'Educational Resources' },
    { value: 'events', viewValue: 'Events' },
    { value: 'news', viewValue: 'News' },
    { value: 'organisations', viewValue: 'Organisations' },
    { value: 'news', viewValue: 'News' },
  ];
  metadataToFetch: string = 'datasets';
  displayedColumns: string[] = [
    'name',
    'creator',
    'is_accessible_for_free',
    'star',
  ];

  constructor(
    private apiService: ApiConnectorService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.apiService.getData(this.metadataToFetch).subscribe((res) => {
      console.log(res);
      this.services = res;
    });
  }

  onChangeSelect(element: MatSelectChange) {
    console.log(element.value);
    this.apiService.getData(this.metadataToFetch).subscribe((res) => {
      console.log(res);
      this.services = res;
    });
  }

  handleClickEdit(element: Data): void {
    const dialogRef = this.dialog.open(PermissionDialogComponent, {
      data: {
        identifier: element.identifier,
        name: element.name,
        creator: element.creator,
        is_accessible_for_free: element.is_accessible_for_free,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result ? result : 'No change..');

      if (
        result &&
        result.is_accessible_for_free != element.is_accessible_for_free
      ) {
        this.apiService
          .getDataById(this.metadataToFetch, result.identifier)
          .subscribe((res) => {
            const dataToUpdate: any = res;
            // update data to be loaded to the DB
            dataToUpdate.is_accessible_for_free = result.is_accessible_for_free;
            // update element to refresh the FE table
            element.is_accessible_for_free = result.is_accessible_for_free;

            this.apiService.updateService(
              this.metadataToFetch,
              result.identifier,
              dataToUpdate,
            );
          });
      }
    });
  }
}
