import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-fill',
  templateUrl: './fill.component.html',
  styleUrls: ['./fill.component.scss']
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

    this.formFields.forEach((field, i) => {
      field.name = `field_${i}`;

      const validators = [];
      if (field.required) validators.push(Validators.required);
      if (field.minLength) validators.push(Validators.minLength(field.minLength));
      if (field.maxLength) validators.push(Validators.maxLength(field.maxLength));

      if (field.type === 'checkbox') {
        this.checkboxValues[field.name] = [];
      } else {
        group[field.name] = ['', validators];
      }
    });

    this.fillForm = this.fb.group(group);
  }

  isChecked(fieldName: string, option: string): boolean {
    return this.checkboxValues[fieldName]?.includes(option);
  }

  toggleCheckbox(fieldName: string, option: string): void {
    const current = this.checkboxValues[fieldName] || [];
    if (current.includes(option)) {
      this.checkboxValues[fieldName] = current.filter(o => o !== option);
    } else {
      this.checkboxValues[fieldName] = [...current, option];
    }
  }

  onSubmit(): void {
    if (this.fillForm.invalid) {
      this.fillForm.markAllAsTouched();
      return;
    }

    const filledData = { ...this.fillForm.value };

    // Include checkbox group data manually
    for (const fieldName in this.checkboxValues) {
      filledData[fieldName] = this.checkboxValues[fieldName];
    }

    const previousSubmissions = JSON.parse(localStorage.getItem('formSubmissions') || '[]');
    previousSubmissions.push(filledData);
    localStorage.setItem('formSubmissions', JSON.stringify(previousSubmissions));

    this.submitted = true;
    this.fillForm.reset();
    this.checkboxValues = {};
  }
}
