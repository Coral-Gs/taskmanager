import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AddTaskComponent } from './components/add-task/add-task.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { MainPageComponent } from './pages/main-page.component';


@NgModule({
  declarations: [
    AddTaskComponent,
    TasksComponent,
    MainPageComponent
  ],
  exports: [MainPageComponent],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class TaskmanagerModule { }
