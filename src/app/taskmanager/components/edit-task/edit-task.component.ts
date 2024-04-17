import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/api';

import { TaskService } from '../../services/task-service';
import { Task } from '../../interfaces/tasks.interfaces';
import { ValidationService } from '../../services/validation-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'edit-task',
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css',
})
export class EditTaskComponent implements OnInit {
  @Output()
  public onEditTask: EventEmitter<Task> = new EventEmitter();

  public taskId: string = '';

  public myEditTaskForm: FormGroup = this.fb.group({
    //El nombre de la tarea es requerido y tiene que tener mínimo 4 caracteres
    nombre: ['', [Validators.required, Validators.minLength(4)]]
  })

  constructor(
    private route: ActivatedRoute,
    private router: Router, //Servicio para poder navegar entre vistas
    private messageService: MessageService, // Servicio par pop ups
    private fb: FormBuilder,
    private taskService: TaskService,
    public validationService: ValidationService,
  ) {}

  //Función de ciclo de vida que se suscribe a parámetros de ruta
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.taskId = params['id']; // Obtengo el ID de la tarea desde la URL
    });
  }

  //Función que edita tarea al componente padre
  emitEditedTask(): void {

    //Si el formulario es válido
    if (this.myEditTaskForm.valid) {
      
      let editedTask = this.myEditTaskForm.value.nombre; //Obtengo valor del input
      this.taskService.editTask(this.taskId, editedTask); //Llamo al servicio para editar tarea
      this.myEditTaskForm.reset({nombre: ''}); //Reseteo formulario
      
      //Muestro mensaje de edición realizada con éxito
      this.messageService.add({  key: 'tc', severity: 'success', detail: 'Edición realizada con éxito' });

      //Redirecciono a la vista de lista de tareas 3 segundos después
      setTimeout( () => {
      this.router.navigate(['/taskList']);
      }, 1000) 
    }
  }


  //Función para redireccionar al a taskList limpiando el formulario
  redirectToTaskList():void {
    this.myEditTaskForm.reset({nombre: ''});
    this.router.navigate(['/taskList'])
  }

  getTaskName():string | undefined{

    //Obtengo la tarea desde el servicio taskService 
    //y la muestro el nombre en el placeholder del input de editar tarea
    const task = this.taskService.tasksList.find(task => task.id === this.taskId);

    return task?.nombre;
  }
 
}

