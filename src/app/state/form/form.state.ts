export interface FormField {
    type: string;
    label: string;
    helpText?: string;
    required?: boolean;
    minLength?: number | null;
    maxLength?: number | null;
    optionsRaw?: string;
    options?: string[];
    name?: string;
  }
  
  export interface FormState {
    formFields: FormField[];
  }
  
  export const initialFormState: FormState = {
    formFields: []
  };
  