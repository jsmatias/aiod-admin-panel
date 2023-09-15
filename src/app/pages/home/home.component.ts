import { Component, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiConnectorService } from 'src/app/core/services/api-connector.service';
import { PermissionDialogComponent } from './components/permission-dialog/permission-dialog.component';
import { MatTableDataSource } from '@angular/material/table';

export interface MetadataCatalogItem {
  value: string;
  viewValue: string;
}

const _metadataCatalog: MetadataCatalogItem[] = [
  { value: 'case_studies', viewValue: 'Case Studies' },
  { value: 'datasets', viewValue: 'Datasets' },
  { value: 'computational_assets', viewValue: 'Computational Assets' },
  { value: 'educational_resources', viewValue: 'Educational Resources' },
  { value: 'events', viewValue: 'Events' },
  { value: 'news', viewValue: 'News' },
  { value: 'organisations', viewValue: 'Organisations' },
  { value: 'publications', viewValue: 'Publications' },
  { value: 'projects', viewValue: 'Projects' },
];

export interface Service {
  identifier: number;
  name: string;
  creator: string | string[];
  is_accessible_for_free: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
@Injectable({ providedIn: 'root' })
export class HomeComponent {
  metadataCatalog: MetadataCatalogItem[] = _metadataCatalog;
  selectedMetadata: string = this.metadataCatalog[0].value;
  selectedService: string | null = null;
  currentServiceList = new MatTableDataSource<Service>([]);

  constructor(
    private apiService: ApiConnectorService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  changeSelectedMetadata(value: string): void {
    this.selectedMetadata = value;
  }

  updatePanel(value: string): void {
    this.changeSelectedMetadata(value);
    this.getData();
  }

  refreshCurrentServiceList(updatedService: Service): void {
    const index = this.currentServiceList.data.findIndex(
      (item) => item.identifier === updatedService.identifier,
    );
    if (index >= 0) {
      this.currentServiceList.data[index] = updatedService;
    }
  }

  getData(): void {
    this.apiService.getData(this.selectedMetadata).subscribe((res) => {
      console.log('Get data:', res);
      // filter list to get only the showing fields
      this.currentServiceList.data = res;
    });
  }

  openDialog(elementId: number, name: string, elementPermission: boolean) {
    return this.dialog.open(PermissionDialogComponent, {
      data: {
        identifier: elementId,
        name: name,
        is_accessible_for_free: elementPermission,
      },
    });
  }

  editServicePermission(element: any) {
    const serviceToBeUpdated = element;
    // openDialog(data.id, data.permission)
    const dialogRef = this.openDialog(
      element.identifier,
      element.name,
      element.is_accessible_for_free,
    );
    dialogRef.afterClosed().subscribe((data) => {
      if (
        data &&
        data.is_accessible_for_free !==
          serviceToBeUpdated.is_accessible_for_free
      ) {
        // // refresh
        // serviceToBeUpdated.is_accessible_for_free = data.is_accessible_for_free;
        // this.refreshCurrentServiceList(serviceToBeUpdated);
        // putServiceToDB
        this.apiService
          .updatePermission(
            serviceToBeUpdated.identifier,
            data.is_accessible_for_free,
            this.selectedMetadata,
          )
          .subscribe({
            next: () => {
              // refresh
              serviceToBeUpdated.is_accessible_for_free =
                data.is_accessible_for_free;
              this.refreshCurrentServiceList(serviceToBeUpdated);
              console.log('Success!');
            },
            error: (err) => {
              console.error('Error updating the service to the DB:', err);
            },
          });
      }
    });
  }
}
