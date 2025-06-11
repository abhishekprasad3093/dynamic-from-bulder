import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { FormField } from 'src/app/state/form/form.state';
import { selectFormFields } from 'src/app/state/form/form.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  formFields: FormField[] = [];
  previewForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Subscribe to the store to get the latest formFields
    this.store.select(selectFormFields).subscribe(fields => {
      this.formFields = fields;
      this.buildForm();
    });
  }

  private buildForm(): void {
    const group: { [key: string]: any } = {};
    for (const field of this.formFields) {
      const name = field.name!;
      const validators = [];
      if (field.required) validators.push(Validators.required);
      if (field.minLength != null) validators.push(Validators.minLength(field.minLength));
      if (field.maxLength != null) validators.push(Validators.maxLength(field.maxLength));
      group[name] = ['', validators];
    }
    this.previewForm = this.fb.group(group);
  }

  goBack(): void {
    this.router.navigate(['/forms/builder']);
  }
}
