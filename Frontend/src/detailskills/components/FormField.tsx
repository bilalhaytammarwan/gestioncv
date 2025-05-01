import React from 'react';
import { 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  FormHelperText,
  IconButton,
  Box,
  Tooltip,
  Zoom
} from '@mui/material';
import { X as CloseIcon } from 'lucide-react';
import { FieldConfig } from '../types';
import { useFormContext } from '../context/FormContext';

interface FormFieldProps {
  field: FieldConfig;
  sectionId: string;
  canRemove?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({ field, sectionId, canRemove = false }) => {
  const { formValues, formErrors, updateField, removeField } = useFormContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateField(e.target.name, e.target.value);
  };

  const handleSelectChange = (e: any) => {
    updateField(e.target.name, e.target.value);
  };

  const handleRemove = () => {
    removeField(sectionId, field.id);
  };

  const renderField = () => {
    const value = formValues[field.name] || '';
    const error = formErrors[field.name] || '';
    const hasError = !!error;

    switch (field.type) {
      case 'text':
      case 'email':
      case 'tel':
      case 'url':
      case 'number':
        return (
          <TextField
            fullWidth
            variant="outlined"
            id={field.id}
            name={field.name}
            label={field.label}
            type={field.type}
            value={value}
            onChange={handleChange}
            placeholder={field.placeholder}
            required={field.required}
            error={hasError}
            helperText={error}
            margin="normal"
            size="small"
          />
        );
      
      case 'textarea':
        return (
          <TextField
            fullWidth
            variant="outlined"
            id={field.id}
            name={field.name}
            label={field.label}
            value={value}
            onChange={handleChange}
            placeholder={field.placeholder}
            required={field.required}
            error={hasError}
            helperText={error}
            margin="normal"
            multiline
            rows={4}
            size="small"
          />
        );
      
      case 'select':
        return (
          <FormControl 
            fullWidth 
            margin="normal" 
            error={hasError}
            size="small"
          >
            <InputLabel id={`${field.id}-label`}>{field.label}</InputLabel>
            <Select
              labelId={`${field.id}-label`}
              id={field.id}
              name={field.name}
              value={value}
              onChange={handleSelectChange}
              label={field.label}
              required={field.required}
            >
              {field.options?.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
            {hasError && <FormHelperText>{error}</FormHelperText>}
          </FormControl>
        );
      
      default:
        return (
          <TextField
            fullWidth
            variant="outlined"
            id={field.id}
            name={field.name}
            label={field.label}
            value={value}
            onChange={handleChange}
            placeholder={field.placeholder}
            required={field.required}
            error={hasError}
            helperText={error}
            margin="normal"
            size="small"
          />
        );
    }
  };

  return (
    <Box sx={{ 
      position: 'relative', 
      mb: 2,
      '&:hover .delete-button': {
        opacity: 1,
        transform: 'translateX(0)',
      }
    }}>
      {renderField()}
      {canRemove && (
        <Tooltip 
          title="Remove skill" 
          placement="right"
          TransitionComponent={Zoom}
          arrow
        >
          <IconButton
            size="small"
            onClick={handleRemove}
            className="delete-button"
            sx={{
              position: 'absolute',
              top: 30,
              right: -40,
              color: 'error.main',
              opacity: 0,
              transform: 'translateX(-10px)',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                backgroundColor: 'error.light',
                color: 'white',
              },
              width: 30,
              height: 30,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
            aria-label="remove field"
          >
            <CloseIcon size={16} />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
};

export default FormField;