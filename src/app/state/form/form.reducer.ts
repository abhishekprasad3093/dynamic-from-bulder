import { createReducer, on } from '@ngrx/store';
import { initialFormState } from './form.state';
import * as FormActions from './form.actions';

export const formReducer = createReducer(
  initialFormState,

  on(FormActions.addField, (state, { field }) => ({
    ...state,
    formFields: [...state.formFields, field]
  })),

  on(FormActions.removeField, (state, { index }) => ({
    ...state,
    formFields: state.formFields.filter((_, i) => i !== index)
  })),

  on(FormActions.updateField, (state, { index, field }) => {
    const updated = [...state.formFields];
    updated[index] = field;
    return { ...state, formFields: updated };
  }),

  on(FormActions.setFields, (state, { fields }) => ({
    ...state,
    formFields: fields
  }))
);
