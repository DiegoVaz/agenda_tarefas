import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewsComponent } from './views.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { DrawerComponent } from './drawer/drawer.component';
import { ContentModule } from './content/content.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule
} from '@angular/material';

@NgModule({
  declarations: [
    ViewsComponent,
    ToolbarComponent,
    DrawerComponent
  ],
  imports: [
    CommonModule,
    ContentModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  exports: [
    ViewsComponent,
    BrowserAnimationsModule
  ]
})
export class ViewsModule { }
