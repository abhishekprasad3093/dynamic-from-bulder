import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html'
})
export class PreviewComponent implements OnInit {
  formFields: any[] = [];
  previewForm!: FormGroup;

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

      group[name] = new FormControl({ value: '', disabled: true });
    });

    this.previewForm = new FormGroup(group);
  }

  goBack(): void {
    this.router.navigate(['/forms/builder']);
  }
}
