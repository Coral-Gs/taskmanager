import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/api';

import { TaskService } from '../../services/task-service';
import { Task } from '../../interfaces/tasks.interfaces';
import { ValidationService } from '../../services/validation-service';


@Component({
  selector: 'edit-task',
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css',
})
export class EditTaskComponent implements OnInit {
  @Output()
  public onEditTask: EventEmitter<Task> = new EventEmitter();

  public taskId!: string;

  constructor(
    private route: ActivatedRoute,
    public validationService: ValidationService,
    private router: Router, //Servicio para poder navegar entre vistas
    private taskService: TaskService,
    private messageService: MessageService // Servicio par pop ups
  ) {}

  //Función de ciclo de vida que se suscribe a parámetros de ruta
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.taskId = params['id']; // Obtengo el ID de la tarea desde la URL
    });
  }

  //Función que edita tarea al componente padre
  emitEditedTask(idN: string): void {
    if (this.validationService.myForm.valid) {
      
      let editedTask = this.validationService.myForm.value.nombre; //Obtengo valor del input
      this.taskService.editTask(this.taskId, editedTask); //Llamo al servicio para editar tarea
      this.validationService.myForm.reset(); //Reseteo formulario
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
    this.validationService.resetForm();
    this.router.navigate(['/taskList'])
  }

 
}

