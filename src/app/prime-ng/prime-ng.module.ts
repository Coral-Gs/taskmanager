import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';

@NgModule({
  exports: [
    BrowserAnimationsModule,
    BrowserModule,
    ButtonModule,
    CardModule,
    CheckboxModule,
    ConfirmDialogModule,
    InputTextModule,
    ToastModule,
  ], 
  providers: [
    MessageService,
    ConfirmationService
  ]

})
export class PrimeNgModule { }
