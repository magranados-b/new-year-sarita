import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export default class HomeComponent implements OnInit {
  private readonly formBuilder: FormBuilder = inject<FormBuilder>(FormBuilder);
  public phraseForm!: FormGroup;
  public submitted: WritableSignal<boolean> = signal<boolean>(false);
  public showMap: WritableSignal<boolean> = signal<boolean>(false);
  public phrase: WritableSignal<string> = signal<string>('este regalo es para tu niña interior... quiero que te vuelva la ilusión.');

  public get phraseCtrl() {
    return this.phraseForm.get('phrase')!;
  }

  public getFormControlPhrase(): FormControl {
    return this.phraseForm.get('phrase') as FormControl;
  }

  ngOnInit(): void {
    this.formBuild();
  }

  private formBuild(): void {

    this.phraseForm = this.formBuilder.group({
      phrase: ['', Validators.compose([Validators.required])]
    });

  }

  public submit() {
    this.submitted.set(true);

    if (this.phraseForm.valid) {

      if (this.format(this.phraseForm.value.phrase) === this.format(this.phrase())) {
        this.showMap.set(true)
      } else {
        const controlPhrase: FormControl = this.getFormControlPhrase();
        const errors: ValidationErrors = controlPhrase.errors || {};
        errors['customError'] = true;
        controlPhrase.setErrors(Object.keys(errors).length ? errors : null);
      }

    } else {
      this.phraseForm.markAllAsTouched();
    }

  }

  private format(t: string): string {
    return (t ?? '')
      .toLowerCase()
      .trim()
      .replace(/\r\n/g, '\n')
      .replace(/\s+/g, ' ');
  }

}
