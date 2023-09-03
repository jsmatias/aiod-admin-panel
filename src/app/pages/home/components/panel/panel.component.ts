import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface Metadata {
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
export class PanelComponent {
  @Input('metadataList') metadataList: Metadata[] = [];
  @Output('openDialog') openDialog = new EventEmitter();

  displayedColumns: string[] = [
    'name',
    'creator',
    'is_accessible_for_free',
    'modify',
  ];

  constructor() {}

  handleOnClickModifyBt(element: Metadata) {
    this.openDialog.emit(element);
  }
}
