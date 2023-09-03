import { Component, Injectable } from '@angular/core';
import { ApiConnectorService } from 'src/app/services/api-connector.service';

export interface MetadataCatalogItem {
  value: string;
  viewValue: string;
}

// export interface Metadata {
//   identifier: number;
//   name: string;
//   creator: string | string[];
//   is_accessible_for_free: boolean;
// }

const _metadataCatalog: MetadataCatalogItem[] = [
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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
@Injectable({ providedIn: 'root' })
export class HomeComponent {
  metadataCatalog: MetadataCatalogItem[] = _metadataCatalog;
  selectedItem: string = this.metadataCatalog[0].value;
  currentMetadataList: any;

  constructor(private apiService: ApiConnectorService) {}

  ngOnInit(): void {
    this.getData();
  }

  changeSelectedItem(value: string): void {
    this.selectedItem = value;
  }

  updatePanel(value: string): void {
    this.changeSelectedItem(value);
    this.getData();
  }

  getData(): void {
    this.apiService.getData(this.selectedItem).subscribe((res) => {
      console.log(res);
      this.currentMetadataList = res;
    });
  }
}
