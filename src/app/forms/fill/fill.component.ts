import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms'; // Added FormArray
import { Router } from '@angular/router';

@Component({
  selector: 'app-fill',
  templateUrl: './fill.component.html'
})
export class FillComponent implements OnInit {
  formFields: any[] = [];
  fillForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    const stored = localStorage.getItem('formFields');
    this.formFields = stored ? JSON.parse(stored) : [];

    const group: { [key: string]: FormControl | FormArray } = {}; // Changed type to allow FormArray
    this.formFields.forEach(field => {
      const name = field.name ?? field.label?.toLowerCase().replace(/\s+/g, '_') ?? 'unnamed';
      field.name = name;

      if (!field.options && field.optionsRaw) {
        field.options = field.optionsRaw.split(',').map((o: string) => o.trim()).filter(Boolean); // Added filter(Boolean)
      }
      if (!Array.isArray(field.options)) {
        field.options = [];
      }

      const validators = [];
      if (field.required) validators.push(Validators.required);
      if (field.minLength) validators.push(Validators.minLength(field.minLength));
      if (field.maxLength) validators.push(Validators.maxLength(field.maxLength));

      if (field.type === 'checkbox') { 
        group[name] = this.fb.control([], validators); 
      } else {
        group[name] = new FormControl('', validators);
      }
    });

    this.fillForm = this.fb.group(group); 
  }

  onCheckboxChange(fieldName: string, option: string, event: any): void {
    const formControl = this.fillForm.get(fieldName);
    if (formControl) {
      const selected: string[] = formControl.value || [];
      if (event.target.checked) {
        selected.push(option);
      } else {
        const index = selected.indexOf(option);
        if (index > -1) selected.splice(index, 1);
      }
      formControl.setValue(selected); 
    }
  }

  onSubmit(): void {
    if (this.fillForm.invalid) {
      this.fillForm.markAllAsTouched();
      console.log('Form is invalid. Cannot submit.');
      return;
    }

    const data = { ...this.fillForm.value };

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