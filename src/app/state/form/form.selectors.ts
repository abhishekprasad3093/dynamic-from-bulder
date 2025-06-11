import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FormState } from './form.state';

export const selectFormState = createFeatureSelector<FormState>('form');

export const selectFormFields = createSelector(
  selectFormState,
  (state: FormState) => state.formFields
);
