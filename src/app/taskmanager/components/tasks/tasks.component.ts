import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../interfaces/tasks.interfaces';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['tasks.component.css'],
})
export class TasksComponent {

  @Input()
  public tasksList!: Task[];
  @Output()
  public deleteTask: EventEmitter<string> = new EventEmitter();
  @Output()
  public completeTask: EventEmitter<string> = new EventEmitter();

  
  //Emite ID de tarea a componente padre para borrar tarea
  onDeleteTask(id: string): void {
    this.deleteTask.emit(id);
    console.log(id);
  }

  //Emite ID de tarea a componente padre para completar tarea 
  onCompleteTask(id: string): void {
    this.completeTask.emit(id);
  
    console.log(this.tasksList)
    //TODO: this.checked = !this.checked; //Pone check a una tarea 
  }
}
