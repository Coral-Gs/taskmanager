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
  public editField: string = '';
  public myEditTaskForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router, //Servicio para poder navegar entre vistas
    private messageService: MessageService, // Servicio par pop ups
    private fb: FormBuilder,
    private taskService: TaskService,
    public validationService: ValidationService,
    
  ) {this.loadLocalStorage()} //Cargo local storage con el editField al refrescar

  ngOnInit(): void {

    //Me suscribo a cambios de parámetros de ruta
    this.route.params.subscribe((params) => {
      this.taskId = params['id']; // Obtengo el ID de la tarea desde la URL
    });

    //Creo formulario
    this.myEditTaskForm = this.fb.group({
      //El nombre de la tarea es requerido y tiene que tener mínimo 4 caracteres
      nombre: ['', [Validators.required, Validators.minLength(4)]]
    })

     //Escucho cambios en el input del editTask y los guardo en el local storage
     this.myEditTaskForm.get('nombre')!.valueChanges.subscribe(value => {
      setTimeout(() => this.saveLocalStorage()); //settimeout permite que la pila de ejecución actual termine
    });
     
     this.getTaskName();
  }
  
  emitEditedTask(): void {

    //Si el formulario es válido
    if (this.myEditTaskForm.valid) {
      
      let editedTask = this.myEditTaskForm.value.nombre; //Obtengo valor del input
      this.taskService.editTask(this.taskId, editedTask); //Llamo al servicio para editar tarea
      
      //Muestro mensaje de edición realizada con éxito
      this.messageService.add({  key: 'tc', severity: 'success', detail: 'Edición realizada con éxito' });

      //Redirecciono a la vista de lista de tareas 3 segundos después
      setTimeout( () => {
      this.redirectToTaskList();
      }, 1000) 
    }
  }

  redirectToTaskList():void {
    this.myEditTaskForm.reset({nombre: ''}); //Reseteo formulario
    //localStorage.setItem('editField', ''); //Reseteo local storage
    this.router.navigate(['/taskList'])
  }

  getTaskName(){

    //Obtengo la tarea desde el servicio taskService 
    //y la asigno al valor del input
    const task = this.taskService.tasksList.find(task => task.id === this.taskId);
    
    if (this.editField.length>0) {
      this.myEditTaskForm.get('nombre')!.setValue(this.editField);
    } else {
      this.myEditTaskForm.get('nombre')!.setValue(task?.nombre);
    }
  }

  saveLocalStorage():void{
    localStorage.setItem('editField', JSON.stringify(this.myEditTaskForm.value.nombre));
  }

  loadLocalStorage():void {
    if (!localStorage.getItem('editField')) return;
    this.editField = JSON.parse(localStorage.getItem('editField')!);
  }

}

