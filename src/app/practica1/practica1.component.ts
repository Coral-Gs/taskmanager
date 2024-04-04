import { Component } from '@angular/core';

@Component({
  selector: 'app-practica1',
  templateUrl: './practica1.component.html',
  styleUrl: './practica1.component.css'
})

export class Practica1Component {

}

/*1.Crear interfaz Task con propiedades:
-id:number
-name:string
-completed:boolean

2.Crear clase TaskList que tenga arreglo de objetos tipo Task y métodos:
-addTask(task: Task):agregar tarea
-removeTask(id:number):elimina tarea por ID
-completeTask(id:number):marca tarea por ID como completada
-printTasks(): imprime por consola la lista de tareas mostrando ID, nombre y si están completas

Crear instancia de TaskList, agregar alguna tarea, imprimir lista, marcar una como completada, elimina otra e imprime lista actualizada*/

interface Task {
  id: number;
  name: string;
  completed: boolean;
}

class TaskList {
  tasks: Task[];

  constructor() {
    this.tasks = [];
  }

  //Método para añadir nueva tarea
  addTask(newTask: Task): void {
    this.tasks.push(newTask);
  }

  //Método para eliminar tarea
  removeTask(idN: number): void {
    this.tasks = this.tasks.filter((task) => {
      return task.id !== idN;
    });
  }

  //Método para marcar tarea como completada
  completeTask(idN: number) {
    this.tasks = this.tasks.map((task) => {
      if (task.id === idN) {
        return { ...task, completed: true };
      }

      return task;
    });
  }

  //Método para mostrar lista
  printTasks(): void {
    this.tasks.map((task) => {
      const { id, name, completed } = task;
      console.log("Id: ", id, "\nName: ", name, "\nCompleted: ", completed);
    });
  }
}

//Crear instancia
let myList = new TaskList();

//Añadir tareas
myList.addTask({ id: 1, name: "Completar práctica", completed: false });
myList.addTask({ id: 2, name: "Revisar documentación", completed: false });
myList.addTask({ id: 3, name: "Contestar emails", completed: false });

//Imprimir lista
myList.printTasks();

//Marcar tarea completada
myList.completeTask(1);

//Eliminar tarea
myList.removeTask(2);

//Imprimir lista actualizada
myList.printTasks();

