import { LoginComponent } from './views/login/login.component';
import { ContentListarComponent } from './views/content/content-listar/content-listar.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewsComponent } from './views/views.component';
import { ContentAdicionarComponent } from './views/content/content-adicionar/content-adicionar.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'view', component: ViewsComponent,
  children: [
    {path: '',  redirectTo: 'views', pathMatch: 'full'},
    {path: 'content-adicionar', component: ContentAdicionarComponent},
    {path: 'content-listar', component: ContentListarComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
