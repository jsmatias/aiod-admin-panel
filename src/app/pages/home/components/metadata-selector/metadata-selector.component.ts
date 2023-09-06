import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface MetadataItem {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'home-metadata-selector',
  templateUrl: './metadata-selector.component.html',
  styleUrls: ['./metadata-selector.component.css'],
})
export class MetadataSelectorComponent {
  @Input('metadataCatalog') metadataCatalog!: MetadataItem[];
  @Input('selectedItem') selectedItem!: string;
  @Output('changeItem') changeItem: EventEmitter<string> =
    new EventEmitter<string>();
  constructor() {}

  onItemSelected(value: string): void {
    this.changeItem.emit(value);
  }
}
