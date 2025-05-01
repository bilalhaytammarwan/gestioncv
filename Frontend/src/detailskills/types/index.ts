export interface FieldConfig {
  id: string;
  name: string;
  label: string;
  type: string;
  required?: boolean;
  options?: string[];
  placeholder?: string;
}

export interface FieldSection {
  id: string;
  title: string;
  fields: FieldConfig[];
  canAddMore: boolean;
}

export interface FormValues {
  [key: string]: any;
}

export interface FormErrors {
  [key: string]: string;
}