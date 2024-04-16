import { Component, EventEmitter, Output } from '@angular/core';
import { ValidationService } from '../../services/validation-service';
import { Task } from '../../interfaces/tasks.interfaces';
import { TaskService } from '../../services/task-service';

@Component({
  selector: 'add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {

  @Output()
  public onNewTask: EventEmitter<Task> = new EventEmitter();
  
  public task: Task ={
    id: '',
    nombre: '',
    completado: false
  }

  //Constructor para usar el servicio de validaciones
  constructor(public validationService: ValidationService){}

  //Función que emite nueva tarea al componente padre
  emitTask(): void{

    if (this.validationService.myForm.valid) {
      this.onNewTask.emit({
        ...this.validationService.myForm.value,
        id: '',
        completado: false
      });
      this.validationService.myForm.reset();
    }
  }
  
}
  
  /*
  @Output()
  public onNewTask: EventEmitter<Task> = new EventEmitter();
  
  public task: Task ={
    id: '',
    nombre: '',
    completado: false
  }

  //Función que emite nueva tarea al componente padre
  emitTask(): void{
    if(this.task.nombre.length === 0) return; //No emite nada si no se introduce nombre

    this.onNewTask.emit(this.task);
    this.task = {id: '', nombre: '', completado: false};
  }


*/



