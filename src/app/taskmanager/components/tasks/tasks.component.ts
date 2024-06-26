import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../interfaces/tasks.interfaces';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';


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

  constructor (
    private router:Router, //Servicio Router para cambiar de vista
    private messageService: MessageService, // Servicio de pop ups
    private confirmationService: ConfirmationService // Servicio de dialogo de confirmación
  ){}
  
  onCompleteTask(id: string): void {
    this.completeTask.emit(id);
  }

  onDeleteTask(id: string): void {

    this.deleteTask.emit(id);
  }

  //Muestra diálogo de confirmación para eliminar o no una tarea
  confirmDeletion(event: Event, id:string) {

    this.confirmationService.confirm({

        target: event.target as EventTarget,
        message: '¿Seguro que deseas continuar?',
        key: 'cd',
        icon: 'pi pi-exclamation-triangle',
        header: 'Eliminar tarea',
        acceptIcon:"none",
        rejectIcon:"none",
        rejectButtonStyleClass:"p-button-text",
      
        accept: () => {
            this.onDeleteTask(id); //Emito el id de la tarea a eliminar desde el servicio
        },
        reject: () => {
            this.messageService.add({ severity: 'error', detail: 'La tarea no se ha eliminado', key:'dt',life: 3000 });
        }
    })
  }
  
  redirectToEditTask(task: Task):void {

    //Permite edición sin la tarea no está completada
    if (!task.completado) {
      this.router.navigate(['/editTask/', task.id])
    } else {
      this.messageService.add({ key: 'tc', severity: 'warn', detail: 'No se puede editar una tarea completada' });
    }
    
  }

  
}
