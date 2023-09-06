import { NgModule } from '@angular/core';

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
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PermissionDialogComponent } from './components/permission-dialog/permission-dialog.component';

const routes: Routes = [{ path: '', component: HomeComponent }];

@NgModule({
  declarations: [
    HomeComponent,
    MetadataSelectorComponent,
    PanelComponent,
    PermissionDialogComponent,
  ],
  imports: [
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatTableModule,
    MatButtonModule,
    MatCheckboxModule,
    NgFor,
    FormsModule,
    RouterModule.forChild(routes),
  ],
})
export class HomeModule {}
