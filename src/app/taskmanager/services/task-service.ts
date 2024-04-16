import { Injectable } from '@angular/core';
import { Task } from '../interfaces/tasks.interfaces';
import { v4 as uuid } from 'uuid';

@Injectable({ providedIn: 'root' })
export class TaskService {

  //Array de objetos con información de tareas
  public tasksList: Task[] =[];

  //Constructor que carga la info de tareas almacenada en local
  constructor() {
    this.loadLocalStorage()
    console.log("Hola desde el servicio");
  }
  
  //Función para agregar una nueva tarea
  addTask(task: Task): void {
    const newTask: Task = {
      ...task,
      id: uuid(),
    };
    console.log(newTask.id)
    this.tasksList.push(newTask);
    this.saveLocalStorage();
  }

  //Función para eliminar una tarea por ID
  removeTaskById(id: string) {
    this.tasksList = this.tasksList.filter((task) => task.id !== id);
    this.saveLocalStorage();
  }

  //Función para marcar o desmarcar como completada una tarea por ID
  completeTask(id: string) {
    this.tasksList = this.tasksList.map((task) => {
      if (task.id === id && !task.completado) {
   
        return { ...task, completado: true };
        
      } else if (task.id === id && task.completado){

         return { ...task, completado: false }
      }

      return task;
    });

    this.saveLocalStorage();
  }

  //Función para editar una tarea
  editTask(id:string, editedTask: string){
    
    this.tasksList = this.tasksList.map((task) => {
      if (task.id === id && !task.completado) {
   
        return { ...task, nombre: editedTask };
        
      } 
      return task;
    });

    this.saveLocalStorage();
  }

  //Función para actualizar la lista de tareas
  saveLocalStorage():void{
    localStorage.setItem('history', JSON.stringify(this.tasksList))
  }

  //Función para cargar historial
  loadLocalStorage():void {
    if (!localStorage.getItem('history')) return;
    this.tasksList = JSON.parse(localStorage.getItem('history')!)

  }
}
