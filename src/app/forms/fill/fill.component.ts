import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fill',
  templateUrl: './fill.component.html'
})
export class FillComponent implements OnInit {
  formFields: any[] = [];
  fillForm!: FormGroup;
  checkboxValues: { [key: string]: string[] } = {};

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    const stored = localStorage.getItem('formFields');
    this.formFields = stored ? JSON.parse(stored) : [];

    const group: any = {};
    this.formFields.forEach(field => {
      const name = field.name ?? field.label?.toLowerCase().replace(/\s+/g, '_') ?? 'unnamed';
      field.name = name;

      if (!field.options && field.optionsRaw) {
        field.options = field.optionsRaw.split(',').map((o: string) => o.trim());
      }
      if (!Array.isArray(field.options)) {
        field.options = [];
      }

      const validators = [];
      if (field.required) validators.push(Validators.required);
      if (field.minLength) validators.push(Validators.minLength(field.minLength));
      if (field.maxLength) validators.push(Validators.maxLength(field.maxLength));

      if (field.type === 'checkbox-group') {
        this.checkboxValues[name] = [];
      } else {
        group[name] = new FormControl('', validators);
      }
    });

    this.fillForm = new FormGroup(group);
  }

  onCheckboxChange(fieldName: string, option: string, event: any): void {
    const selected = this.checkboxValues[fieldName];
    if (event.target.checked) {
      selected.push(option);
    } else {
      const index = selected.indexOf(option);
      if (index > -1) selected.splice(index, 1);
    }
  }

  onSubmit(): void {
    if (this.fillForm.invalid) return;

    const data = { ...this.fillForm.value };
    Object.entries(this.checkboxValues).forEach(([key, val]) => {
      data[key] = val;
    });

    const existing = JSON.parse(localStorage.getItem('formSubmissions') || '[]');
    existing.push(data);
    localStorage.setItem('formSubmissions', JSON.stringify(existing));
    alert('Form submitted!');
    this.router.navigate(['/forms/view-submissions']);
  }

  goBack(): void {
    this.router.navigate(['/forms/builder']);
  }
}
