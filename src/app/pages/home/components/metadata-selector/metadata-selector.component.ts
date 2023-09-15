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
  @Input() metadataCatalog!: MetadataItem[];
  @Input() selectedItem!: string;
  @Output() changeItem: EventEmitter<string> = new EventEmitter<string>();

  onItemSelected(value: string): void {
    this.changeItem.emit(value);
  }
}
