import React, { createContext, useState, useContext, ReactNode } from 'react';
import { FormValues, FormErrors, FieldSection } from '../types';
import { initialSections } from '../data/formConfig';

interface FormContextType {
  formValues: FormValues;
  formErrors: FormErrors;
  sections: FieldSection[];
  updateField: (name: string, value: any) => void;
  addFieldToSection: (sectionId: string) => void;
  removeField: (sectionId: string, fieldId: string) => void;
  validateForm: () => boolean;
  resetForm: () => void;
  submitForm: () => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formValues, setFormValues] = useState<FormValues>({});
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [sections, setSections] = useState<FieldSection[]>(initialSections);

  const updateField = (name: string, value: any) => {
    setFormValues(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is updated
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const addFieldToSection = (sectionId: string) => {
    setSections(prevSections => {
      return prevSections.map(section => {
        if (section.id === sectionId) {
          const newFieldId = `${section.id}_${section.fields.length + 1}`;
          
          // Create a new field based on the section type
          let newField;
          
          if (section.id === 'experience') {
            newField = {
              id: newFieldId,
              name: `experience_${section.fields.length + 1}`,
              label: `Experience ${section.fields.length + 1}`,
              type: 'group',
              required: false,
            };
          } else if (section.id === 'education') {
            newField = {
              id: newFieldId,
              name: `education_${section.fields.length + 1}`,
              label: `Education ${section.fields.length + 1}`,
              type: 'group',
              required: false,
            };
          } else if (section.id === 'skills') {
            newField = {
              id: newFieldId,
              name: `skill_${section.fields.length + 1}`,
              label: `Skill ${section.fields.length + 1}`,
              type: 'text',
              required: false,
            };
          } else {
            newField = {
              id: newFieldId,
              name: `field_${section.fields.length + 1}`,
              label: `Field ${section.fields.length + 1}`,
              type: 'text',
              required: false,
            };
          }
          
          return {
            ...section,
            fields: [...section.fields, newField]
          };
        }
        return section;
      });
    });
  };

  const removeField = (sectionId: string, fieldId: string) => {
    setSections(prevSections => {
      return prevSections.map(section => {
        if (section.id === sectionId) {
          return {
            ...section,
            fields: section.fields.filter(field => field.id !== fieldId)
          };
        }
        return section;
      });
    });
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // Flatten all fields from all sections
    const allFields = sections.flatMap(section => section.fields);
    
    // Check each field
    allFields.forEach(field => {
      if (field.required && (!formValues[field.name] || formValues[field.name] === '')) {
        newErrors[field.name] = `${field.label} is required`;
        isValid = false;
      }
      
      // Email validation
      if (field.type === 'email' && formValues[field.name]) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formValues[field.name])) {
          newErrors[field.name] = 'Please enter a valid email address';
          isValid = false;
        }
      }
      
      // Phone validation
      if (field.type === 'tel' && formValues[field.name]) {
        const phoneRegex = /^\+?[0-9]{10,15}$/;
        if (!phoneRegex.test(formValues[field.name].replace(/\s+/g, ''))) {
          newErrors[field.name] = 'Please enter a valid phone number';
          isValid = false;
        }
      }
    });

    setFormErrors(newErrors);
    return isValid;
  };

  const resetForm = () => {
    setFormValues({});
    setFormErrors({});
    setSections(initialSections);
  };

  const submitForm = () => {
    if (validateForm()) {
      console.log('Form submitted successfully:', formValues);
      // Here you would typically send the data to your backend
      alert('Form submitted successfully!');
      resetForm();
    } else {
      console.log('Form has errors, please fix them');
    }
  };

  return (
    <FormContext.Provider
      value={{
        formValues,
        formErrors,
        sections,
        updateField,
        addFieldToSection,
        removeField,
        validateForm,
        resetForm,
        submitForm
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};