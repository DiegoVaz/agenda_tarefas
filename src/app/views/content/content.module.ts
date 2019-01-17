import { AppRoutingModule } from './../../appRouting.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DialogEditarComponent } from './dialog-editar/dialog-editar.component';
import { ContentComponent } from './content.component';
import { ContentAdicionarComponent } from './content-adicionar/content-adicionar.component';
import { ContentListarComponent } from './content-listar/content-listar.component';

import { MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatGridListModule,
  MatListModule,
  MatDialogModule
} from '@angular/material';



@NgModule({
  declarations: [ContentComponent, ContentAdicionarComponent, ContentListarComponent, DialogEditarComponent],
  entryComponents: [
    DialogEditarComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatListModule,
    MatDialogModule
  ],
  exports: [
    ContentComponent
  ]
})
export class ContentModule { }
