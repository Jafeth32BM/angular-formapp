import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/service/validators.service';

@Component({
  templateUrl: './switches-page.component.html',
  styles: [
  ]
})
export class SwitchesPageComponent {

  public myForm: FormGroup = this.fb.group({
    gender: ['M', Validators.required],
    notifications: [true, Validators.required],
    tYc: [false, Validators.requiredTrue]
  });
  constructor(
    private fb: FormBuilder,
    private valService: ValidatorsService,
  ) { }

  onSave() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
  }
  isValidField(field: string): boolean | null {
    return this.valService.isValidField(this.myForm, field);
  }
}
