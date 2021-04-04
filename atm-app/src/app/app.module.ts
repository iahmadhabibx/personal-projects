import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './components/signin/signin.component';
import { MenuComponent } from './components/menu/menu.component';

import { FormsModule } from '@angular/forms'
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: SigninComponent },
  { path: 'menu', component: MenuComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
