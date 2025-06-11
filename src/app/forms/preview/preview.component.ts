import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  formFields: any[] = [];
  previewForm!: FormGroup;
  checkboxValues: { [key: string]: string[] } = {};

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    const stored = localStorage.getItem('formFields');
    this.formFields = stored ? JSON.parse(stored) : [];

    if (!this.formFields.length) {
      alert('No form fields found. Please build a form first.');
      this.previewForm = this.fb.group({});
      return;
    }

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

    this.previewForm = this.fb.group(group);
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

  goBack() {
    this.router.navigate(['/forms/builder']);
  }
}
