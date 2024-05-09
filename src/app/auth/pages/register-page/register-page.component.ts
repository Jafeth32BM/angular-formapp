import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/service/validators.service';
import { EmailValidator } from 'src/app/shared/validators/email-validator.service';

@Component({
  templateUrl: './register-page.component.html',
  styles: [
  ]
})
export class RegisterPageComponent {

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(this.valService.firstNameAndLastnamePattern)]],
    /*DESGASTA EL PERFOMANCE DEL CODIGO*/
    // email: ['', [Validators.required, Validators.pattern(this.valService.emailPattern)], [new EmailValidator()]],
    /*   MISMA FUNCION PERO MEJOR PERFORMANCE  */
    email: ['', [Validators.required, Validators.pattern(this.valService.emailPattern)], [this.emailValid]],
    user: ['', [Validators.required, this.valService.cantBeStrider]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    password2: ['', Validators.required],
  }, {
    validators: [this.valService.sameFields('password', 'password2')]
  }
  )
  constructor(
    private fb: FormBuilder,
    private valService: ValidatorsService,
    private emailValid: EmailValidator
  ) { }
  isValidField(field: string) {
    return this.valService.isValidField(this.myForm, field);
  }

  onSave() {
    this.myForm.markAllAsTouched();
  }

}
