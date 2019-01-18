import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthGuard } from './guard/auth.guard';

import { AppComponent } from './app.component';
import { AgendaService } from './agenda.service';
import { ViewsModule } from './views/views.module';
import { AppRoutingModule } from './appRouting.module';

import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ViewsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [
    AgendaService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
