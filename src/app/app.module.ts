import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { Practica1Component } from './practica1/practica1.component';
import { TaskmanagerModule } from './taskmanager/taskmanager.module';

@NgModule({
  declarations: [
    AppComponent,
    Practica1Component,
  ],
  imports: [
    BrowserModule,
    TaskmanagerModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
