import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { Observable } from 'rxjs';
import { FormField } from 'src/app/state/form/form.state';
import {
  addField,
  removeField,
  updateField,
  setFields
} from 'src/app/state/form/form.actions';
import { selectFormFields } from 'src/app/state/form/form.selectors';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss']
})
export class BuilderComponent implements OnInit {
  availableFields = [
    { type: 'text', label: 'Single Line Text' },
    { type: 'textarea', label: 'Multi Line Text' },
    { type: 'dropdown', label: 'Dropdown', options: ['Option 1', 'Option 2'] },
    { type: 'checkbox', label: 'Checkbox Group', options: ['Check 1', 'Check 2'] },
    { type: 'radio', label: 'Radio Group', options: ['Option A', 'Option B'] },
    { type: 'date', label: 'Date Picker' }
  ];

  formFields$: Observable<FormField[]>;
  formFields: FormField[] = [];

  constructor(
    public store: Store<AppState>,
    private router: Router
  ) {
    this.formFields$ = this.store.select(selectFormFields);
  }

  ngOnInit(): void {
    const stored = localStorage.getItem('formFields');
    if (stored) {
      this.store.dispatch(setFields({ fields: JSON.parse(stored) }));
    }

    this.formFields$.subscribe(fields => {
      this.formFields = fields;
      localStorage.setItem('formFields', JSON.stringify(fields));
    });
  }

  onDropToBuilder(event: CdkDragDrop<FormField[]>): void {
    if (event.previousContainer.id === 'toolbox' && event.container.id === 'formArea') {
      const template = event.previousContainer.data[event.previousIndex] as FormField;
      const field: FormField = {
        ...template,
        name: `field_${Date.now()}`,
        helpText: '',
        required: false,
        minLength: null,
        maxLength: null,
        optionsRaw: template.options ? template.options.join(', ') : '',
        options: template.options || []
      };
      this.store.dispatch(addField({ field }));
    }
  }

  updateField(field: FormField, key: keyof FormField, value: any, index: number): void {
    const updated = { ...field, [key]: value };
    if (key === 'optionsRaw') {
      updated.options = value.split(',').map((o: string) => o.trim()).filter(Boolean);
    }
    this.store.dispatch(updateField({ index, field: updated }));
  }

  removeField(index: number): void {
    this.store.dispatch(removeField({ index }));
  }

  clearForm(): void {
    this.store.dispatch(setFields({ fields: [] }));
    localStorage.removeItem('formFields');
  }

  previewForm(): void {
    this.router.navigate(['/forms/preview']);
  }

  fillForm(): void {
    this.router.navigate(['/forms/fill']);
  }
}
