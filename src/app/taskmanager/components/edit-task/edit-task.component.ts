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
    //private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.taskId = params['id']; // Obtengo el ID de la tarea desde la URL
    });
  }
  
  //Función para mostrar mensaje de éxito
  /*showTopCenter() {
    this.messageService.add({
      key: 'tc',
      severity: 'warn',
      summary: 'Warn',
      detail: 'Message Content',
    });
  }
*/
  //Función que edita tarea al componente padre
  emitEditedTask(idN: string): void {
    if (this.validationService.myForm.valid) {
      let editedTask = this.validationService.myForm.value.nombre; //Valor del input
      this.taskService.editTask(this.taskId, editedTask);
      //this.showTopCenter()
      setTimeout( () => {
      this.router.navigate(['/taskList']);
      }, 3000) //Redireccionar a la vista de lista de tareas 3 segundos después
    }
  }
 
}

