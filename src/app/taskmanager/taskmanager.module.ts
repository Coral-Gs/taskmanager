import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AddTaskComponent } from './components/add-task/add-task.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { MainPageComponent } from './pages/main-page.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { TasksComponent } from './components/tasks/tasks.component';

@NgModule({
  declarations: [
    AddTaskComponent,
    TasksComponent,
    MainPageComponent,
    EditTaskComponent,
  ],
  exports: [
    EditTaskComponent,
    MainPageComponent, 
    ],
  imports: [
    CommonModule,
    FormsModule,
    PrimeNgModule,
    ReactiveFormsModule,
    RouterModule,
  ]
})
export class TaskmanagerModule { }
