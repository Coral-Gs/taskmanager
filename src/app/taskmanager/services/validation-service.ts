import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  //Función que verifica si hay o no errores y si se tocado el formulario o no
  isValidField (form: FormGroup, field: string) : boolean | null{
    return form.controls[field].errors 
    && form.controls[field].touched;
  }

  //Función que devuelve mensajes de error según el campo
  getFieldError(form: FormGroup, field: string):string | null {

      if (!form.controls[field]) return null; //Si el array de errores está vacío no devuelve nada
  
      //Accesdo a las key del array de los errores del campo, que puede estar también vacío
      const errors = form.controls[field].errors || {};
  
      for (const key of Object.keys(errors)) {
        switch (key){
          case 'required':
            return 'Este campo es requerido';
            
          case 'minlength':
            return `Debe tener un mínimo de ${errors['minlength'].requiredLength} letras`;
           
        }
      }
      return null;
    }

}