import { Component, EventEmitter, Output } from '@angular/core';
import { Task } from '../../interfaces/tasks.interfaces';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
})
export class AddTaskComponent {

  @Output()
  public onNewTask: EventEmitter<Task> = new EventEmitter();
  
  public task: Task ={
    id: '',
    nombre: '',
    completado: false
  }

  //Función que emite nueva tarea al componente padre
  emitTask(): void{
    this.onNewTask.emit(this.task);
    this.task = {id: '', nombre: '', completado: false};
  }





}
