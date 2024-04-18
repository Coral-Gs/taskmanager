import { Injectable } from '@angular/core';
import { Task } from '../interfaces/tasks.interfaces';
import { v4 as uuid } from 'uuid';

@Injectable({ providedIn: 'root' })
export class TaskService {

  public tasksList: Task[] =[];

  constructor() {
    this.loadLocalStorage()
  }
  
  addTask(task: Task): void {
    const newTask: Task = {
      ...task,
      id: uuid(),
    };
    this.tasksList.push(newTask);
    this.saveLocalStorage();
  }

  removeTaskById(id: string) {
    this.tasksList = this.tasksList.filter((task) => task.id !== id);
    this.saveLocalStorage();
  }

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

  editTask(id:string, editedTask: string){
    
    this.tasksList = this.tasksList.map((task) => {
      if (task.id === id && !task.completado) {
   
        return { ...task, nombre: editedTask };
        
      } 
      return task;
    });

    this.saveLocalStorage();
  }

  saveLocalStorage():void{
    localStorage.setItem('history', JSON.stringify(this.tasksList))
  }

  loadLocalStorage():void {
    if (!localStorage.getItem('history')) return;
    this.tasksList = JSON.parse(localStorage.getItem('history')!)

  }
}
