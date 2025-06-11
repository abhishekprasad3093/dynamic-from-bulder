export interface FormField {
    type: string;
    label: string;
    helpText?: string;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
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
  