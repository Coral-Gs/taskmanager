import { Component } from '@angular/core';
import { TaskService } from '../services/task-service';
import { Task } from '../interfaces/interfaces';

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

 //Llama a función de servicio para agregar tarea
 onNewTask(task:Task): void {
  this.taskService.addTask(task);
 }

  //Llama a función de servicio para borrar tarea por ID
 onDeleteTask(id:string):void {
  this.taskService.removeTaskById(id);
 }

  //Llama a función de servicio para completar tarea por ID
 onCompleteTask(id:string):void{
  this.taskService.completeTask(id);
 }

}
