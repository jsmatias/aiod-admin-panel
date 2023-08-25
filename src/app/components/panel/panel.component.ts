import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiConnectorService } from '../../services/api-connector.service';
import { PermissionDialogComponent } from '../permission-dialog/permission-dialog.component';

export interface Data {
  identifier: number;
  name: string;
  creator: string | string[];
  is_accessible_for_free: boolean;
}

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css'],
})
export class ServicesListComponent {
  services: any;
  metadataToFetch: string = 'case_studies';
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

  getByID(element: Data): void {
    this.apiService
      .getDataById(this.metadataToFetch, element.identifier)
      .subscribe((res) => {
        const dataToUpdate: any = res;
        console.log(dataToUpdate);
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
