import { createAction, props } from '@ngrx/store';
import { FormField } from './form.state';

export const addField = createAction('[Form] Add Field', props<{ field: FormField }>());
export const removeField = createAction('[Form] Remove Field', props<{ index: number }>());
export const updateField = createAction('[Form] Update Field', props<{ index: number; field: FormField }>());
export const setFields = createAction('[Form] Set Fields', props<{ fields: FormField[] }>());
