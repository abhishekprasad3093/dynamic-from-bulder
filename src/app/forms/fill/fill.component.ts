import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-fill',
  templateUrl: './fill.component.html',
})
export class FillComponent implements OnInit {
  formFields: any[] = [];
  fillForm!: FormGroup;
  checkboxValues: { [key: string]: string[] } = {};
  submitted = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const stored = localStorage.getItem('formFields');
    this.formFields = stored ? JSON.parse(stored) : [];

    const group: any = {};
    this.formFields.forEach((f, i) => {
      f.name = f.name!;
      const validators = [];
      if (f.required) validators.push(Validators.required);
      if (f.minLength) validators.push(Validators.minLength(f.minLength));
      if (f.maxLength) validators.push(Validators.maxLength(f.maxLength));

      if (f.type === 'checkbox') {
        this.checkboxValues[f.name] = [];
      } else {
        group[f.name] = ['', validators];
      }
    });

    this.fillForm = this.fb.group(group);
  }

  isChecked(name: string, opt: string): boolean {
    return this.checkboxValues[name]?.includes(opt);
  }

  toggleCheckbox(name: string, opt: string): void {
    const arr = this.checkboxValues[name] || [];
    this.checkboxValues[name] = arr.includes(opt)
      ? arr.filter(x => x !== opt)
      : [...arr, opt];
  }

  onSubmit(): void {
    if (this.fillForm.invalid) {
      this.fillForm.markAllAsTouched();
      return;
    }

    const data: any = { ...this.fillForm.value };
    Object.keys(this.checkboxValues).forEach(name => {
      data[name] = this.checkboxValues[name];
    });

    const subs = JSON.parse(localStorage.getItem('formSubmissions') || '[]');
    subs.push(data);
    localStorage.setItem('formSubmissions', JSON.stringify(subs));

    this.submitted = true;
    this.fillForm.reset();
    this.checkboxValues = {};
  }
}
