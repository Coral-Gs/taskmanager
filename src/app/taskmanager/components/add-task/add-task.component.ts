import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ValidationService } from '../../services/validation-service';
import { Task } from '../../interfaces/tasks.interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent implements OnInit{

  @Output()
  public onNewTask: EventEmitter<Task> = new EventEmitter();

  public myAddTaskForm!: FormGroup;
  
  public task: Task ={
    id: '',
    nombre: '',
    completado: false
  }

  constructor(
    public validationService: ValidationService,
    private fb: FormBuilder){}

  ngOnInit(): void {

    this.myAddTaskForm = this.fb.group({
      //El nombre de la tarea es requerido y tiene que tener mínimo 4 caracteres
      nombre: ['', [Validators.required, Validators.minLength(4)]]
    })
    
  }

  emitTask(): void{
    //Emite nueva tarea al componente padre si el formulario es válido
    if (this.myAddTaskForm.valid) {      
      
      this.onNewTask.emit({
        ...this.myAddTaskForm.value,
        id: '',
        completado: false
      });
      this.myAddTaskForm.reset(); //Reseteo formulario
    } 
  }
}
  

