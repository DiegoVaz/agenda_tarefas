import { AppRoutingModule } from './../../appRouting.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentComponent } from './content.component';
import { ContentAdicionarComponent } from './content-adicionar/content-adicionar.component';
import { ContentListarComponent } from './content-listar/content-listar.component';

import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';



@NgModule({
  declarations: [ContentComponent, ContentAdicionarComponent, ContentListarComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule
  ],
  exports: [
    ContentComponent
  ]
})
export class ContentModule { }
