import React from 'react';
import { 
  Typography, 
  Paper, 
  Box, 
  Button, 
  Divider,
  Collapse,
  IconButton
} from '@mui/material';
import { ChevronDown, ChevronUp, Plus } from 'lucide-react';
import { FieldSection } from '../types';
import FormField from './FormField';
import { useFormContext } from '../context/FormContext';

interface FormSectionProps {
  section: FieldSection;
}

const FormSection: React.FC<FormSectionProps> = ({ section }) => {
  const { addFieldToSection } = useFormContext();
  const [expanded, setExpanded] = React.useState(true);

  const handleAddMore = () => {
    addFieldToSection(section.id);
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        mb: 3,
        borderRadius: 2,
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: 3,
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" component="h2" color="primary">
          {section.title}
        </Typography>
        <IconButton onClick={toggleExpanded} size="small">
          {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </IconButton>
      </Box>
      
      <Divider sx={{ mb: 2 }} />
      
      <Collapse in={expanded}>
        <Box sx={{ mt: 2 }}>
          {section.fields.map((field, index) => (
            <FormField 
              key={field.id} 
              field={field} 
              sectionId={section.id}
              canRemove={section.canAddMore && index > 0}
            />
          ))}
          
          {section.canAddMore && (
            <Button
              variant="outlined"
              color="primary"
              startIcon={<Plus size={18} />}
              onClick={handleAddMore}
              size="small"
              sx={{ mt: 1 }}
            >
              Add {section.id === 'experience' 
                ? 'Another Experience' 
                : section.id === 'education' 
                  ? 'Another Education' 
                  : section.id === 'skills' 
                    ? 'Another Skill' 
                    : 'Another Field'}
            </Button>
          )}
        </Box>
      </Collapse>
    </Paper>
  );
};

export default FormSection;