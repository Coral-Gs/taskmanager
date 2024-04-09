import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../interfaces/interfaces';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: 'tasks.component.css',
})
export class TasksComponent {

  //TODO: public checked: boolean = false; //Tick del checkbox

  @Input()
  public tasksList: Task[] = [
    {
      id: '',
      nombre: '',
      completado: false,
    },
  ];

  @Output()
  public deleteTask: EventEmitter<string> = new EventEmitter();

  //Emite ID de tarea a componente padre para borrar tarea
  onDeleteTask(id: string): void {
    this.deleteTask.emit(id);
    console.log(id);
  }
  @Output()
  public completeTask: EventEmitter<string> = new EventEmitter();

  //Emite ID de tarea a componente padre para completar tarea 
  onCompleteTask(id: string): void {
    this.completeTask.emit(id);
    //TODO: this.checked = !this.checked; //Pone check a una tarea 
  }
}
