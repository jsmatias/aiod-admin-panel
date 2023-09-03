import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiConnectorService } from '../../services/api-connector.service';
import { PermissionDialogComponent } from '../permission-dialog/permission-dialog.component';
import { MatSelectChange } from '@angular/material/select';
import { OAuthService } from 'angular-oauth2-oidc';

export interface Data {
  identifier: number;
  name: string;
  creator: string | string[];
  is_accessible_for_free: boolean;
}

export interface Service {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css'],
})
export class ServicesListComponent {
  // @Input('serviceList') serviceList
  @Output('openModal') openModal = new EventEmitter();
  services: any;
  serviceList: Service[] = [
    { value: 'case_studies', viewValue: 'Case Studies' },
    { value: 'datasets', viewValue: 'Datasets' },
    { value: 'computational_resources', viewValue: 'Computational Resources' },
    { value: 'educational_resources', viewValue: 'Educational Resources' },
    { value: 'events', viewValue: 'Events' },
    { value: 'news', viewValue: 'News' },
    { value: 'organisations', viewValue: 'Organisations' },
    { value: 'publications', viewValue: 'Publications' },
    { value: 'projects', viewValue: 'Projects' },
    { value: 'presentations', viewValue: 'Presentations' },
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
    private oauthService: OAuthService,
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
    const dialogRef = this.openPermissionDialog(element);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result ? 'result' : 'No change..');

      if (
        result &&
        result.is_accessible_for_free != element.is_accessible_for_free
      ) {
        console.log(result);

        this.apiService
          .getDataById(this.metadataToFetch, result.identifier)
          .subscribe((res) => {
            const dataToUpdate: any = res;
            // update data to be loaded to the DB
            dataToUpdate.is_accessible_for_free = result.is_accessible_for_free;
            // update element to refresh the FE table
            element.is_accessible_for_free = result.is_accessible_for_free;
            delete dataToUpdate.identifier;
            this.apiService
              .updateService(
                this.metadataToFetch,
                result.identifier,
                dataToUpdate,
              )
              .subscribe(
                (res) => {
                  console.log(res);
                },
                (error) => {
                  console.log('error');
                },
              );
          });
      }
    });
  }

  openPermissionDialog(element: Data) {
    this.openModal.emit(element.identifier);
    if (!this.oauthService.hasValidAccessToken()) {
      this.oauthService.initLoginFlow();
    }
    return this.dialog.open(PermissionDialogComponent, {
      data: {
        identifier: element.identifier,
        name: element.name,
        creator: element.creator,
        is_accessible_for_free: element.is_accessible_for_free,
      },
    });
  }
}
