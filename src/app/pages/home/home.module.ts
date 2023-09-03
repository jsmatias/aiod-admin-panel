import {
  NgModule,
  // CUSTOM_ELEMENTS_SCHEMA,
  // NO_ERRORS_SCHEMA,
} from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { PanelComponent } from './components/panel/panel.component';
import { MetadataSelectorComponent } from './components/metadata-selector/metadata-selector.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeComponent }];

@NgModule({
  declarations: [HomeComponent, MetadataSelectorComponent, PanelComponent],
  imports: [
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    NgFor,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class HomeModule {}
