import React, { useEffect, useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  Paper,
  Alert,
  AlertTitle,
  Fade,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText
} from '@mui/material';
import { Save, Send, Bell } from 'lucide-react';
import FormSection from './FormSection';
import { useFormContext } from '../context/FormContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const JobApplicationForm: React.FC = () => {
  const { sections, validateForm, submitForm } = useFormContext();
  const [showSuccess, setShowSuccess] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [listskills,setListskills]=useState<any[]>([]);
  const[error,seterror]=useState(false);
  const usenav=useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
   
    e.preventDefault();
    let form=e.target as HTMLFormElement;
      let formob= new FormData(form);
      let arrayList=Array.from(formob.entries());
      let duplicate = arrayList.some((e, index) => 
        arrayList.some((element, id) => e[1] === element[1] && index !== id)
    );
console.log(duplicate);
     
      

if(duplicate){
seterror(true);
return;
}
else{
  seterror(false);
}
if(!error){
    if (validateForm()) {
      console.log(error);
 let listskill=arrayList.map((e)=>({"skillName":e[1]}) );
     
      setListskills(listskill);
      submitForm();
      setShowSuccess(true);
      setOpenDialog(true);
    }
     
      
    

    }
  };
  
  const handleSubscribe =async () => {
    // Here you would implement the subscription logic
   
    console.log(listskills);
    axios.post("http://localhost:8090/detaiskills/add/user123",listskills).then(
      (response)=>
{
        usenav("/job/skills/"+response.data.toString());}
    );
    
  };
  const handleNothanks=()=>{
    
    axios.post("http://localhost:8090/detaiskills/add/user123",listskills).then(
      (response)=>
{
        usenav("/job/skills/"+response.data.toString());}
    );
  }
  const handleClose = () => {
   
    setOpenDialog(false);
  };

 
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          borderRadius: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Typography 
          variant="h4" 
          component="h1" 
          align="center" 
          gutterBottom
          sx={{ 
            fontWeight: 700,
            color: 'primary.main',
            mb: 4
          }}
        >
          Skills
        </Typography>

        <Fade in={showSuccess}>
          <Alert 
            severity="success" 
            sx={{ mb: 3 }}
            onClose={() => setShowSuccess(false)}
          >
            <AlertTitle>Success!</AlertTitle>
            Your skills have been submitted successfully.
          </Alert>
        </Fade>

        <form onSubmit={handleSubmit}>
          {sections.map((section) => (
            <FormSection key={section.id} section={section} />
          ))}
       { error &&  <Alert severity="error" sx={{ mb: 3, textAlign: 'center' }}>
      error
    </Alert>}
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<Save size={18} />}
              sx={{ mx: 1 }}
            >
              Save Draft
            </Button>
            <Button
              variant="contained"
              color="primary"
              endIcon={<Send size={18} />}
              type="submit"
              sx={{ mx: 1 }}
            >
              Submit Skills
            </Button>
          </Box>
        </form>

        <Dialog
          open={openDialog}
          onClose={handleClose}
          PaperProps={{
            sx: {
              borderRadius: 2,
              maxWidth: 400,
              p: 1
            }
          }}
        >
          <DialogTitle sx={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: 1,
            color: 'primary.main'
          }}>
            <Bell size={20} />
            Stay Updated
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Would you like to receive notifications about new job opportunities matching your skills? We'll keep you informed about relevant positions.
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ p: 2, pt: 0 }}>
          
            <Button 
              onClick={handleNothanks}
              color="inherit"
              sx={{ fontWeight: 500 }}
            >
              No, thanks
            </Button>
            <Button 
              onClick={handleSubscribe}
              variant="contained"
              startIcon={<Bell size={18} />}
              sx={{ 
                fontWeight: 500,
                '&:hover': {
                  transform: 'translateY(-1px)',
                  boxShadow: 2
                }
              }}
            >
              Yes, notify me
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Container>
  );
};

export default JobApplicationForm;