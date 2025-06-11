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
    { type: 'dropdown', label: 'Dropdown' },
    { type: 'checkbox', label: 'Checkbox Group' },
    { type: 'radio', label: 'Radio Group' },
    { type: 'date', label: 'Date Picker' }
  ];

  formFields$: Observable<FormField[]>;

  constructor(private store: Store<AppState>, private router: Router) {
    this.formFields$ = this.store.select(selectFormFields);
  }

  ngOnInit(): void {
    const stored = localStorage.getItem('formFields');
    if (stored) {
      const parsed = JSON.parse(stored);
      this.store.dispatch(setFields({ fields: parsed }));
    }

    this.formFields$.subscribe(fields => {
      localStorage.setItem('formFields', JSON.stringify(fields));
    });
  }

  onDropToBuilder(event: CdkDragDrop<any[]>) {
    if (event.previousContainer.id === 'toolbox' && event.container.id === 'formArea') {
      const copiedField: FormField = {
        ...event.previousContainer.data[event.previousIndex],
        required: false,
        helpText: '',
        optionsRaw: '',
        options: [],
        minLength: null,
        maxLength: null,
        name: `field_${Date.now()}`
      };

      if (copiedField.type === 'dropdown' || copiedField.type === 'checkbox' || copiedField.type === 'radio') {
        copiedField.optionsRaw = 'Option 1, Option 2, Option 3';
        this.updateOptions(copiedField);
      }

      this.store.dispatch(addField({ field: copiedField }));
    }
  }

  updateOptions(field: FormField) {
    if (field.optionsRaw && typeof field.optionsRaw === 'string') {
      field.options = field.optionsRaw
        .split(',')
        .map(opt => opt.trim())
        .filter(opt => opt);
    } else {
      field.options = [];
    }
  }

  removeField(index: number) {
    this.store.dispatch(removeField({ index }));
  }

  previewForm() {
    this.router.navigate(['/forms/preview']);
  }

  clearForm() {
    this.store.dispatch(setFields({ fields: [] }));
    localStorage.removeItem('formFields');
  }

  updateField(index: number, field: FormField) {
    this.store.dispatch(updateField({ index, field }));
  }
}
