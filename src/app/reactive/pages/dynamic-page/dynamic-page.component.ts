import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/service/validators.service';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: [
  ]
})
export class DynamicPageComponent {
  // DEFINICION DEL FORMULARIO
  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Def Jam: Fight for N.Y', Validators.required],
    ]),
  });
  public newFavorite: FormControl = new FormControl('', Validators.required);

  constructor(
    private fb: FormBuilder,
    private valService: ValidatorsService,
  ) { }
  // OBTENER LOS JUEGOS PREESTABLECIDOS
  get favGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }
  // VALIDAR  EL FORMULARIO
  isValidField(field: string): boolean | null {
    return this.valService.isValidField(this.myForm, field);
  }
  // VALIDAR EL INPUT SEGUN SU POSICION (INDEX)
  isValidFieldInArray(formArray: FormArray, index: number) {
    return formArray.controls[index].errors
      && formArray.controls[index].touched
  }
  // VALIDAR EL ERROR DE UN CAMPO
  getFieldError(field: string): string | null {
    if (!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required': return 'Este campo es requerido';
        case 'minlength': return `Minimo ${errors['minlength'].requiredLength} caracteres.`;
      }
    }
    return null;
  }
  // AGREGAR JUEGOS EN EL ARRAY
  addGame(): void {
    if (this.newFavorite.invalid) return;

    const newGame = this.newFavorite.value;

    this.favGames.push(this.fb.control(newGame, Validators.required));
    this.newFavorite.reset();
  }

  // ELIMINAR UN JUEGO SEGUN SU POSICION
  onDeleteFavs(index: number): void {
    this.favGames.removeAt(index);
  }
  // GUARDAR LOS VALORES DEL FORMULARIO
  onSubmit(): void {

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
    (this.myForm.controls['favoriteGames'] as FormArray) = this.fb.array([]);
    this.myForm.reset();


  }

}
