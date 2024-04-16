import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  public myForm: FormGroup = this.fb.group({
    //El nombre de la tarea es requerido y tiene que tener mínimo 4 caracteres
    nombre: ['', [Validators.required, Validators.minLength(4)]]
  })

  constructor (private fb: FormBuilder){}

  //Función que verifica si hay o no errores y si se tocado el formulario o no
  isValidField (field: string) : boolean | null{
    return this.myForm.controls[field].errors 
    && this.myForm.controls[field].touched;
  }

  //Función que devuelve mensajes de error según el campo
  getFieldError(field: string):string | null {

      if (!this.myForm.controls[field]) return null; //Si el array de errores está vacío no devuelve nada
  
      //Accesdo a las key del array de los errores del campo, que puede estar también vacío
      const errors = this.myForm.controls[field].errors || {};
  
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

      markAsTouched(): void {
        this.myForm.markAllAsTouched();
      }
    
      resetForm(): void {
        this.myForm.reset({nombre: ''});
      }
    
      getFormValue(): any {
        return this.myForm.value;
      }

}