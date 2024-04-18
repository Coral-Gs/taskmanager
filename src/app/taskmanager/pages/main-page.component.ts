import { Component } from '@angular/core';
import { TaskService } from '../services/task-service';
import { Task } from '../interfaces/tasks.interfaces';

@Component({
  selector: 'tasksmanager-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: 'main-page.component.css'
})
export class MainPageComponent {

  //Constructor que recibe por parámetro el servicio. Protegemos datos del servicio con private
 constructor (private taskService: TaskService ) {}

 get getTasks(): Task[] {
  return [...this.taskService.tasksList];
 }
 onNewTask(task:Task): void {
  this.taskService.addTask(task);
 }

 onDeleteTask(id:string):void {
  this.taskService.removeTaskById(id);
 }

 onCompleteTask(id:string):void{
  this.taskService.completeTask(id);
 }

}
