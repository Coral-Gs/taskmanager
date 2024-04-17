import { Component, EventEmitter, Output } from '@angular/core';
import { ValidationService } from '../../services/validation-service';
import { Task } from '../../interfaces/tasks.interfaces';
import { TaskService } from '../../services/task-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  public myAddTaskForm: FormGroup = this.fb.group({
    //El nombre de la tarea es requerido y tiene que tener mínimo 4 caracteres
    nombre: ['', [Validators.required, Validators.minLength(4)]]
  })

  //Constructor para usar el servicio de validaciones
  constructor(
    public validationService: ValidationService,
    private fb: FormBuilder){}

  //Función que emite nueva tarea al componente padre
  emitTask(): void{

    if (this.myAddTaskForm.valid) {
      this.onNewTask.emit({
        ...this.myAddTaskForm.value,
        id: '',
        completado: false
      });
      this.myAddTaskForm.reset({nombre: ''});
    }
  }
  
}
  

