// // import React, { useState } from 'react';
// // import {
// //   Dialog, DialogTitle, DialogContent, DialogActions,
// //   Button, TextField, Box, Typography, Stepper,
// //   Step, StepLabel, Divider, Alert, CircularProgress,
// //   useMediaQuery, useTheme, RadioGroup, FormControlLabel, Radio, Switch
// // } from '@mui/material';
// // import { Upload } from 'lucide-react';
// // import axios from 'axios';
// // import { useParams } from 'react-router-dom';

// // interface ApplicationFormProps {
// //   open: boolean;
// //   jobTitle: string;
// //   company: string;
// //   onClose: () => void;
// // }

// // const JobId = () => {
// //   const { id } = useParams();
// //   // console.log(id); // logs the dynamic part from URL like /job/123 → "123"
// //   return {id};
// // };

// // const steps = [
// //   'Personal Info',
// //   'Job Details',
// //   'Links & Availability',
// //   'Resume & Cover Letter',
// //   'Review & Submit'
// // ];

// // const ApplicationForm: React.FC<ApplicationFormProps> = ({ open, jobTitle, company, onClose }) => {
// //   const theme = useTheme();
// //   const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

// //   const [activeStep, setActiveStep] = useState(0);
// //   const [loading, setLoading] = useState(false);
// //   // const [useAccountInfo, setUseAccountInfo] = useState<'account' | 'manual' | ''>('');

// //   const [formData, setFormData] = useState({
// //     isAccountInfoChecked: false,
// //     isAccountCvChecked: false,
// //     candidateId: "6824722c2046dd55035b92d0",
// //     fullName: '',
// //     email: '',
// //     phoneNumber: '',
// //     opportunityId: JobId().id,
// //     pastJobTitle: '',
// //     pastCompanyName: '',
// //     yearsOfExperience: '',
// //     linkedinProfile: '',
// //     portfolioUrl: '',
// //     interviewProposedDates: '',
// //     coverLetter: '',
// //     resume: null as File | null
// //   });

// //   const [errors, setErrors] = useState<{ [key: string]: string }>({});

// //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
// //     const { name, value } = e.target;
// //     setFormData(prev => ({ ...prev, [name]: value }));
// //     if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
// //   };

// //   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = e.target.files?.[0] || null;
// //     setFormData(prev => ({ ...prev, resume: file }));
// //   };

// //   const validateStep = (): boolean => {
// //     const newErrors: { [key: string]: string } = {};

// //     if (activeStep === 0) {
// //       // if (!formData.useAccountInfo) newErrors.useAccountInfo = 'Please select an option';

// //       if (formData.isAccountInfoChecked == false) {
// //         if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
// //         if (!formData.email.trim()) newErrors.email = 'Email is required';
// //         else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
// //         if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
// //       }
// //     }

// //     if (activeStep === 3) {
// //       if (!formData.isAccountCvChecked && !formData.resume) newErrors.resume = 'Resume is required';
// //       if (!formData.coverLetter.trim()) newErrors.coverLetter = 'Cover letter is required';
// //     }

// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   const handleNext = () => {
// //     if (validateStep()) setActiveStep(prev => prev + 1);
// //   };

// //   const handleBack = () => setActiveStep(prev => prev - 1);

// //   const handleSubmit = async () => {
// //     console.log(formData);
// //     const newErrors: { [key: string]: string } = {};

// //     if (!formData.resume) newErrors.resume = 'Resume is required';
// //     if (!formData.coverLetter.trim()) newErrors.coverLetter = 'Cover letter is required';

// //     if (Object.keys(newErrors).length > 0) {
// //       setErrors(newErrors);
// //       return;
// //     }

// //     setLoading(true);

// //     try {
// //       const payload = new FormData();
// //       payload.append('isAccountInfoChecked', (formData.isAccountInfoChecked)?"Account":"Manual");

// //       Object.entries(formData).forEach(([key, value]) => {
// //         if (value) {
// //           payload.append(key, value as any);
// //         }
// //       });


// //       const response = await axios.post('http://localhost:8668/api/message/createAndSend', payload, {
// //         headers: {
// //           'Content-Type': 'multipart/form-data'
// //         }
// //       });

// //       console.log('Submitted:', response.data);
// //       onClose();
// //     } catch (error) {
// //       console.error('Submit error:', error);
// //       alert('Failed to submit. Please try again.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const renderStep = () => {
// //     switch (activeStep) {
// //       case 0:
// //         return (
// //           <Box>
// //             <Typography variant="subtitle1" sx={{ mb: 2 }}>How would you like to apply?</Typography>
// //               <RadioGroup
// //                 value={formData.isAccountInfoChecked ? 'true' : 'false'}
// //                 onChange={(e) => {
// //                   const selected = e.target.value === 'true';
// //                   setFormData((prev) => ({ ...prev, isAccountInfoChecked: selected }));
// //                   setErrors((prev) => ({ ...prev, isAccountInfoChecked: '' }));
// //                 }}
// //               >
// //                 <FormControlLabel value="true" control={<Radio />} label="Use account info" />
// //                 <FormControlLabel value="false" control={<Radio />} label="Enter manually" />
// //               </RadioGroup>
// //               {errors.isAccountInfoChecked && <Typography color="error">{errors.isAccountInfoChecked}</Typography>}

// //               {!formData.isAccountInfoChecked && (
// //                 <>
// //                   <TextField
// //                     fullWidth
// //                     label="Full Name"
// //                     name="fullName"
// //                     value={formData.fullName}
// //                     onChange={handleInputChange}
// //                     error={!!errors.fullName}
// //                     helperText={errors.fullName}
// //                     margin="normal"
// //                   />
// //                   <TextField
// //                     fullWidth
// //                     label="Email Address"
// //                     name="email"
// //                     value={formData.email}
// //                     onChange={handleInputChange}
// //                     error={!!errors.email}
// //                     helperText={errors.email}
// //                     margin="normal"
// //                   />
// //                   <TextField
// //                     fullWidth
// //                     label="Phone Number"
// //                     name="phoneNumber"
// //                     value={formData.phoneNumber}
// //                     onChange={handleInputChange}
// //                     error={!!errors.phoneNumber}
// //                     helperText={errors.phoneNumber}
// //                     margin="normal"
// //                   />
// //                 </>
// //               )}
// //           </Box>
// //         );
// //       case 1:
// //         return (
// //           <Box>
// //             <TextField fullWidth label="Past Job Title" name="pastJobTitle" value={formData.pastJobTitle} onChange={handleInputChange} margin="normal" />
// //             <TextField fullWidth label="Past Company Name" name="pastCompanyName" value={formData.pastCompanyName} onChange={handleInputChange} margin="normal" />
// //             <TextField fullWidth label="Years Of Experience" name="yearsOfExperience" value={formData.yearsOfExperience} onChange={handleInputChange} type="number" margin="normal" />
// //           </Box>
// //         );
// //       case 2:
// //         return (
// //           <Box>
// //             <TextField fullWidth label="LinkedIn Profile" name="linkedinProfile" value={formData.linkedinProfile} onChange={handleInputChange} margin="normal" />
// //             <TextField fullWidth label="Portfolio URL" name="portfolioUrl" value={formData.portfolioUrl} onChange={handleInputChange} margin="normal" />
// //             <TextField fullWidth label="Interview Proposed Dates" name="interviewProposedDates" value={formData.interviewProposedDates} onChange={handleInputChange} multiline rows={3} margin="normal" />
// //           </Box>
// //         );
// //       case 3:
// //       return (
// //         <Box>
// //           <FormControlLabel
// //             control={
// //               <Switch
// //                 checked={formData.isAccountCvChecked}
// //                 onChange={(e) => {
// //                   const useSaved = e.target.checked;
// //                   setFormData(prev => ({
// //                     ...prev,
// //                     useSavedResume: useSaved,
// //                     resume: useSaved ? null : prev.resume // clear resume if toggled on
// //                   }));
// //                   setErrors(prev => ({ ...prev, resume: '' }));
// //                 }}
// //               />
// //             }
// //             label="Use saved resume from my account"
// //             sx={{ mb: 2 }}
// //           />

// //           {!formData.isAccountCvChecked && (
// //             <Box sx={{ border: '2px dashed', borderColor: 'divider', borderRadius: 2, p: 3, textAlign: 'center', mb: 3 }}>
// //               <input
// //                 accept=".pdf,.doc,.docx"
// //                 id="resume-upload"
// //                 type="file"
// //                 style={{ display: 'none' }}
// //                 onChange={handleFileChange}
// //               />
// //               <label htmlFor="resume-upload">
// //                 <Button variant="outlined" component="span" startIcon={<Upload />}>Upload Resume</Button>
// //               </label>
// //               <Typography variant="body2" sx={{ mt: 1 }}>
// //                 {formData.resume ? formData.resume.name : 'PDF, DOC, or DOCX (Max 5MB)'}
// //               </Typography>
// //               {errors.resume && <Typography color="error">{errors.resume}</Typography>}
// //             </Box>
// //           )}

// //           <TextField
// //             fullWidth
// //             label="Cover Letter"
// //             name="coverLetter"
// //             value={formData.coverLetter}
// //             onChange={handleInputChange}
// //             error={!!errors.coverLetter}
// //             helperText={errors.coverLetter}
// //             multiline
// //             rows={6}
// //           />
// //         </Box>
// //       );

// //       case 4:
// //         return (
// //           <Box>
// //             <Alert severity="info" sx={{ mb: 2 }}>Please review your application before submitting.</Alert>
// //             <Typography><strong>Apply with:</strong> {formData.isAccountInfoChecked ? 'Account Info' : 'Manual Entry'}</Typography>
// //             {!formData.isAccountInfoChecked && (
// //               <>
// //                 <Typography><strong>Name:</strong> {formData.fullName}</Typography>
// //                 <Typography><strong>Email:</strong> {formData.email}</Typography>
// //                 <Typography><strong>Phone:</strong> {formData.phoneNumber}</Typography>
// //               </>
// //             )}
// //             {(formData.pastJobTitle || formData.pastCompanyName || formData.yearsOfExperience) && (
// //               <>
// //                 <Divider sx={{ my: 2 }} />
// //                 {formData.pastJobTitle && (
// //                   <Typography><strong>Past Job Title:</strong> {formData.pastJobTitle}</Typography>
// //                 )}
// //                 {formData.pastCompanyName && (
// //                   <Typography><strong>Past Company:</strong> {formData.pastCompanyName}</Typography>
// //                 )}
// //                 {formData.yearsOfExperience && (
// //                   <Typography><strong>Years of Experience:</strong> {formData.yearsOfExperience}</Typography>
// //                 )}
// //               </>
// //             )}

// //             {(formData.linkedinProfile || formData.portfolioUrl || formData.interviewProposedDates) && (
// //               <>
// //                 <Divider sx={{ my: 2 }} />
// //                 {formData.linkedinProfile && (
// //                   <Typography><strong>LinkedIn:</strong> {formData.linkedinProfile}</Typography>
// //                 )}
// //                 {formData.portfolioUrl && (
// //                   <Typography><strong>Portfolio:</strong> {formData.portfolioUrl}</Typography>
// //                 )}
// //                 {formData.interviewProposedDates && (
// //                   <Typography><strong>Interview Availability:</strong> {formData.interviewProposedDates}</Typography>
// //                 )}
// //               </>
// //             )}
// //             <Divider sx={{ my: 2 }} />
// //             <Typography><strong>Resume:</strong>{' '}{formData.isAccountCvChecked ? 'Account CV' : (formData.resume?.name || 'Not uploaded')}</Typography>
// //             <Divider sx={{ my: 2 }} />
// //             <Typography><strong>Cover Letter:</strong></Typography>
// //             <Typography sx={{ whiteSpace: 'pre-wrap' }}>{formData.coverLetter}</Typography>
// //           </Box>
// //         );
// //       default:
// //         return null;
// //     }
// //   };

// //   return (
// //     <Dialog open={open} onClose={loading ? undefined : onClose} fullWidth maxWidth="md" fullScreen={fullScreen}>
// //       <DialogTitle>
// //         <Typography variant="h5" fontWeight="bold">Apply for {jobTitle}</Typography>
// //         <Typography variant="body2" color="text.secondary">at {company}</Typography>
// //       </DialogTitle>
// //       <Divider />
// //       <DialogContent>
// //         <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 3 }}>
// //           {steps.map(label => (
// //             <Step key={label}><StepLabel>{label}</StepLabel></Step>
// //           ))}
// //         </Stepper>
// //         {renderStep()}
// //       </DialogContent>
// //       <Divider />
// //       <DialogActions sx={{ justifyContent: 'space-between', p: 2 }}>
// //         <Button onClick={onClose} disabled={loading}>Cancel</Button>
// //         <Box>
// //           {activeStep > 0 && <Button onClick={handleBack} disabled={loading} sx={{ mr: 1 }}>Back</Button>}
// //           {activeStep < steps.length - 1 ? (
// //             <Button variant="contained" onClick={handleNext}>Next</Button>
// //           ) : (
// //             <Button
// //               variant="contained"
// //               color="primary"
// //               onClick={handleSubmit}
// //               disabled={loading}
// //               startIcon={loading && <CircularProgress size={20} color="inherit" />}
// //             >
// //               {loading ? 'Submitting...' : 'Submit Application'}
// //             </Button>
// //           )}
// //         </Box>
// //       </DialogActions>
// //     </Dialog>
// //   );
// // };

// // export default ApplicationForm;
// import React, { useState } from 'react';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import {
//   Dialog, Chip, DialogTitle, DialogContent, DialogActions,
//   Button, TextField, Box, Typography, Stepper,
//   Step, StepLabel, Divider, Alert, CircularProgress,
//   useMediaQuery, useTheme, RadioGroup, FormControlLabel, Radio, Switch
// } from '@mui/material';
// import { Upload } from 'lucide-react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// interface ApplicationFormProps {
//   open: boolean;
//   jobTitle: string;
//   company: string;
//   onClose: () => void;
// }

// const steps = [
//   'Personal Info',
//   'Job Details',
//   'Links & Availability',
//   'Resume & Cover Letter',
//   'Review & Submit'
// ];

// const ApplicationForm: React.FC<ApplicationFormProps> = ({ open, jobTitle, company, onClose }) => {
//   const theme = useTheme();
//   const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
//   const { id } = useParams<{ id: string }>();

//   const [activeStep, setActiveStep] = useState(0);
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     isAccountInfoChecked: false,
//     isAccountCvChecked: false,
//     candidateId: "6824722c2046dd55035b92d0",
//     fullName: '',
//     email: '',
//     phoneNumber: '',
//     opportunityId: id || '',
//     pastJobTitle: '',
//     pastCompanyName: '',
//     yearsOfExperience: '',
//     linkedinProfile: '',
//     portfolioUrl: '',
//     interviewProposedDates: '',
//     coverLetter: '',
//     resume: null as File | null
//   });

//   const [errors, setErrors] = useState<{ [key: string]: string }>({});

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0] || null;
//     setFormData(prev => ({ ...prev, resume: file }));
//     if (errors.resume) setErrors(prev => ({ ...prev, resume: '' }));
//   };

//   const validateStep = (): boolean => {
//     const newErrors: { [key: string]: string } = {};

//     if (activeStep === 0) {
//       if (!formData.isAccountInfoChecked) {
//         if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
//         if (!formData.email.trim()) newErrors.email = 'Email is required';
//         else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
//         if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
//       }
//     }

//     if (activeStep === 3) {
//       if (!formData.isAccountCvChecked && !formData.resume) newErrors.resume = 'Resume is required';
//       if (!formData.coverLetter.trim()) newErrors.coverLetter = 'Cover letter is required';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleNext = () => {
//     if (validateStep()) setActiveStep(prev => prev + 1);
//   };

//   const handleBack = () => setActiveStep(prev => prev - 1);

//   // const handleSubmit = async () => {
//   //   if (!validateStep()) return;
    
//   //   setLoading(true);

//   //   try {
//   //     const formDataToSend = new FormData();
      
//   //     // Convert formData to JSON string for applicationDTO
//   //     const applicationDTO = {
//   //       ...formData,
//   //       yearsOfExperience: parseInt(formData.yearsOfExperience) || 0
//   //     };
      
//   //     formDataToSend.append('applicationDTO', JSON.stringify(applicationDTO));
      
//   //     if (formData.resume) {
//   //       formDataToSend.append('resume', formData.resume);
//   //     }

//   //     const response = await axios.post('http://localhost:8668/api/message/createAndSend', formDataToSend, {
//   //       headers: {
//   //         'Content-Type': 'multipart/form-data'
//   //       }
//   //     });

//   //     console.log('Application submitted successfully:', response.data);
//   //     onClose();
//   //   } catch (error) {
//   //     console.error('Error submitting application:', error);
//   //     setErrors(prev => ({
//   //       ...prev,
//   //       submit: 'Failed to submit application. Please try again.'
//   //     }));
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };
//   const handleSubmit = async () => {
//   if (!validateStep()) return;
  
//   setLoading(true);

//   try {
//     // Create FormData object
//     const formDataToSend = new FormData();
    
//     // Create applicationDTO object matching the backend structure
//     const applicationDTO = {
//       isAccountInfoChecked: formData.isAccountInfoChecked,
//       isAccountCvChecked: formData.isAccountCvChecked,
//       candidateId: formData.candidateId,
//       fullName: formData.fullName,
//       email: formData.email,
//       phoneNumber: formData.phoneNumber,
//       opportunityId: formData.opportunityId,
//       pastJobTitle: formData.pastJobTitle,
//       pastCompanyName: formData.pastCompanyName,
//       yearsOfExperience: parseInt(formData.yearsOfExperience) || 0,
//       linkedinProfile: formData.linkedinProfile,
//       portfolioUrl: formData.portfolioUrl,
//       interviewProposedDates: formData.interviewProposedDates,
//       coverLetter: formData.coverLetter
//     };

//     // Append applicationDTO as a JSON string
//     formDataToSend.append('applicationDTO', JSON.stringify(applicationDTO));
    
//     // Append resume file if it exists
//     if (formData.resume && !formData.isAccountCvChecked) {
//       formDataToSend.append('resume', formData.resume);
//     }

//     const response = await axios.post('http://localhost:8668/api/message/createAndSend', formDataToSend, {
//       headers: {
//         'Content-Type': 'multipart/form-data'
//       }
//     });

//     console.log('Application submitted successfully:', response.data);
//     onClose();
//   } catch (error: any) {
//     console.error('Error submitting application:', error);
//     setErrors(prev => ({
//       ...prev,
//       submit: error.response?.data || 'Failed to submit application. Please try again.'
//     }));
//   } finally {
//     setLoading(false);
//   }
// };


//   const renderStep = () => {
//     switch (activeStep) {
//       case 0:
//         return (
//           <Box>
//             <Typography variant="subtitle1" sx={{ mb: 2 }}>
//               How would you like to apply?
//             </Typography>
            
//             <RadioGroup
//               value={formData.isAccountInfoChecked ? 'true' : 'false'}
//               onChange={(e) => {
//                 const selected = e.target.value === 'true';
//                 setFormData(prev => ({ ...prev, isAccountInfoChecked: selected }));
//                 setErrors(prev => ({ ...prev, isAccountInfoChecked: '' }));
//               }}
//             >
//               <FormControlLabel value="true" control={<Radio />} label="Use account info" />
//               <FormControlLabel value="false" control={<Radio />} label="Enter manually" />
//             </RadioGroup>

//             {!formData.isAccountInfoChecked && (
//               <Box sx={{ mt: 2 }}>
//                 <TextField
//                   fullWidth
//                   label="Full Name"
//                   name="fullName"
//                   value={formData.fullName}
//                   onChange={handleInputChange}
//                   error={!!errors.fullName}
//                   helperText={errors.fullName}
//                   margin="normal"
//                 />
//                 <TextField
//                   fullWidth
//                   label="Email Address"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   error={!!errors.email}
//                   helperText={errors.email}
//                   margin="normal"
//                 />
//                 <TextField
//                   fullWidth
//                   label="Phone Number"
//                   name="phoneNumber"
//                   value={formData.phoneNumber}
//                   onChange={handleInputChange}
//                   error={!!errors.phoneNumber}
//                   helperText={errors.phoneNumber}
//                   margin="normal"
//                 />
//               </Box>
//             )}
//           </Box>
//         );

//       case 1:
//         return (
//           <Box>
//             <TextField
//               fullWidth
//               label="Past Job Title"
//               name="pastJobTitle"
//               value={formData.pastJobTitle}
//               onChange={handleInputChange}
//               margin="normal"
//             />
//             <TextField
//               fullWidth
//               label="Past Company Name"
//               name="pastCompanyName"
//               value={formData.pastCompanyName}
//               onChange={handleInputChange}
//               margin="normal"
//             />
//             <TextField
//               fullWidth
//               label="Years Of Experience"
//               name="yearsOfExperience"
//               value={formData.yearsOfExperience}
//               onChange={handleInputChange}
//               type="number"
//               margin="normal"
//               InputProps={{ inputProps: { min: 0 } }}
//             />
//           </Box>
//         );

//       case 2:
//         return (
//           <Box>
//             <TextField
//               fullWidth
//               label="LinkedIn Profile"
//               name="linkedinProfile"
//               value={formData.linkedinProfile}
//               onChange={handleInputChange}
//               margin="normal"
//               placeholder="https://linkedin.com/in/yourname"
//             />
//             <TextField
//               fullWidth
//               label="Portfolio URL"
//               name="portfolioUrl"
//               value={formData.portfolioUrl}
//               onChange={handleInputChange}
//               margin="normal"
//               placeholder="https://yourportfolio.com"
//             />
//             <TextField
//               fullWidth
//               label="Interview Availability"
//               name="interviewProposedDates"
//               value={formData.interviewProposedDates}
//               onChange={handleInputChange}
//               multiline
//               rows={3}
//               margin="normal"
//               placeholder="I'm available on the following dates/times..."
//             />
//           </Box>
//         );

//       case 3:
//         return (
//           <Box>
//             <FormControlLabel
//               control={
//                 <Switch
//                   checked={formData.isAccountCvChecked}
//                   onChange={(e) => {
//                     const useSaved = e.target.checked;
//                     setFormData(prev => ({
//                       ...prev,
//                       isAccountCvChecked: useSaved,
//                       resume: useSaved ? null : prev.resume
//                     }));
//                     setErrors(prev => ({ ...prev, resume: '' }));
//                   }}
//                 />
//               }
//               label="Use saved resume from my account"
//               sx={{ mb: 2 }}
//             />

//             {!formData.isAccountCvChecked && (
//               <Box
//                 sx={{
//                   border: '2px dashed',
//                   borderColor: errors.resume ? 'error.main' : 'divider',
//                   borderRadius: 2,
//                   p: 3,
//                   textAlign: 'center',
//                   mb: 3,
//                   transition: 'all 0.2s ease-in-out',
//                   '&:hover': {
//                     borderColor: 'primary.main',
//                     backgroundColor: 'rgba(25, 118, 210, 0.04)'
//                   }
//                 }}
//               >
//                 <input
//                   accept=".pdf,.doc,.docx"
//                   id="resume-upload"
//                   type="file"
//                   style={{ display: 'none' }}
//                   onChange={handleFileChange}
//                 />
//                 <label htmlFor="resume-upload">
//                   <Button
//                     variant="outlined"
//                     component="span"
//                     startIcon={<Upload size={20} />}
//                   >
//                     Upload Resume
//                   </Button>
//                 </label>
//                 <Typography variant="body2" sx={{ mt: 1 }}>
//                   {formData.resume ? formData.resume.name : 'PDF, DOC, or DOCX (Max 5MB)'}
//                 </Typography>
//                 {errors.resume && (
//                   <Typography color="error" variant="caption" sx={{ display: 'block', mt: 1 }}>
//                     {errors.resume}
//                   </Typography>
//                 )}
//               </Box>
//             )}

//             <TextField
//               fullWidth
//               label="Cover Letter"
//               name="coverLetter"
//               value={formData.coverLetter}
//               onChange={handleInputChange}
//               error={!!errors.coverLetter}
//               helperText={errors.coverLetter}
//               multiline
//               rows={6}
//               placeholder="Explain why you're interested in this position and what makes you a good fit..."
//             />
//           </Box>
//         );

//       case 4:
//         return (
//           <Box>
//             <Alert severity="info" sx={{ mb: 3 }}>
//               Please review your application before submitting.
//             </Alert>

//             <Typography><strong>Apply with:</strong> {formData.isAccountInfoChecked ? 'Account Info' : 'Manual Entry'}</Typography>
            
//             {!formData.isAccountInfoChecked && (
//               <>
//                 <Typography><strong>Name:</strong> {formData.fullName}</Typography>
//                 <Typography><strong>Email:</strong> {formData.email}</Typography>
//                 <Typography><strong>Phone:</strong> {formData.phoneNumber}</Typography>
//               </>
//             )}

//             {(formData.pastJobTitle || formData.pastCompanyName || formData.yearsOfExperience) && (
//               <>
//                 <Divider sx={{ my: 2 }} />
//                 {formData.pastJobTitle && (
//                   <Typography><strong>Past Job Title:</strong> {formData.pastJobTitle}</Typography>
//                 )}
//                 {formData.pastCompanyName && (
//                   <Typography><strong>Past Company:</strong> {formData.pastCompanyName}</Typography>
//                 )}
//                 {formData.yearsOfExperience && (
//                   <Typography><strong>Years of Experience:</strong> {formData.yearsOfExperience}</Typography>
//                 )}
//               </>
//             )}

//             {(formData.linkedinProfile || formData.portfolioUrl || formData.interviewProposedDates) && (
//               <>
//                 <Divider sx={{ my: 2 }} />
//                 {formData.linkedinProfile && (
//                   <Typography><strong>LinkedIn:</strong> {formData.linkedinProfile}</Typography>
//                 )}
//                 {formData.portfolioUrl && (
//                   <Typography><strong>Portfolio:</strong> {formData.portfolioUrl}</Typography>
//                 )}
//                 {formData.interviewProposedDates && (
//                   <Typography>
//                     <strong>Interview Availability:</strong>
//                     <Box component="span" sx={{ display: 'block', ml: 2, mt: 0.5, whiteSpace: 'pre-line' }}>
//                       {formData.interviewProposedDates}
//                     </Box>
//                   </Typography>
//                 )}
//               </>
//             )}

//             <Divider sx={{ my: 2 }} />
            
//             <Typography>
//               <strong>Resume:</strong>{' '}
//               {formData.isAccountCvChecked ? 'Using saved resume from account' : (formData.resume?.name || 'Not uploaded')}
//             </Typography>

//             <Divider sx={{ my: 2 }} />
            
//             <Typography><strong>Cover Letter:</strong></Typography>
//             <Typography sx={{
//               whiteSpace: 'pre-wrap',
//               p: 2,
//               borderLeft: '4px solid',
//               borderColor: 'primary.light',
//               bgcolor: 'background.paper',
//               borderRadius: '4px'
//             }}>
//               {formData.coverLetter}
//             </Typography>

//             {errors.submit && (
//               <Alert severity="error" sx={{ mt: 2 }}>
//                 {errors.submit}
//               </Alert>
//             )}
//           </Box>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <Dialog
//       open={open}
//       onClose={loading ? undefined : onClose}
//       fullWidth
//       maxWidth="md"
//       fullScreen={fullScreen}
//     >
//       <DialogTitle>
//         <Typography variant="h5" fontWeight="bold">Apply for {jobTitle}</Typography>
//         <Typography variant="body2" color="text.secondary">at {company}</Typography>
//       </DialogTitle>

//       <Divider />

//       <DialogContent>
//         <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 3 }}>
//           {steps.map(label => (
//             <Step key={label}>
//               <StepLabel>{label}</StepLabel>
//             </Step>
//           ))}
//         </Stepper>

//         {renderStep()}
//       </DialogContent>

//       <Divider />

//       <DialogActions sx={{ justifyContent: 'space-between', p: 2 }}>
//         <Button onClick={onClose} disabled={loading}>
//           Cancel
//         </Button>
//         <Box>
//           {activeStep > 0 && (
//             <Button
//               onClick={handleBack}
//               disabled={loading}
//               sx={{ mr: 1 }}
//             >
//               Back
//             </Button>
//           )}
          
//           {activeStep < steps.length - 1 ? (
//             <Button
//               variant="contained"
//               onClick={handleNext}
//             >
//               Next
//             </Button>
//           ) : (
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleSubmit}
//               disabled={loading}
//               startIcon={loading && <CircularProgress size={20} color="inherit" />}
//             >
//               {loading ? 'Submitting...' : 'Submit Application'}
//             </Button>
//           )}
//         </Box>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default ApplicationForm;
import React, { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {
  Dialog, Chip, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Box, Typography, Stepper,
  Step, StepLabel, Divider, Alert, CircularProgress,
  useMediaQuery, useTheme, RadioGroup, FormControlLabel, Radio, Switch,
  IconButton, Paper
} from '@mui/material';
import { Upload, Plus, Trash2 } from 'lucide-react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';

interface ApplicationFormProps {
  open: boolean;
  jobTitle: string;
  company: string;
  onClose: () => void;
}

const steps = [
  'Personal Info',
  'Job Details',
  'Links & Availability',
  'Resume & Cover Letter',
  'Review & Submit'
];

// Define a type for the interview date
interface InterviewDate {
  date: Date | null;
  time: string;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({ open, jobTitle, company, onClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const { id } = useParams<{ id: string }>();

  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    isAccountInfoChecked: false,
    isAccountCvChecked: false,
    candidateId: "6824722c2046dd55035b92d0",
    fullName: '',
    email: '',
    phoneNumber: '',
    opportunityId: id || '',
    pastJobTitle: '',
    pastCompanyName: '',
    yearsOfExperience: '',
    linkedinProfile: '',
    portfolioUrl: '',
    interviewProposedDates: [] as InterviewDate[],
    coverLetter: '',
    resume: null as File | null
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Initialize with one empty date suggestion
  React.useEffect(() => {
    if (formData.interviewProposedDates.length === 0) {
      setFormData(prev => ({
        ...prev,
        interviewProposedDates: [{ date: null, time: '' }]
      }));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, resume: file }));
    if (errors.resume) setErrors(prev => ({ ...prev, resume: '' }));
  };

  const handleDateChange = (index: number, newDate: Date | null) => {
    const updatedDates = [...formData.interviewProposedDates];
    updatedDates[index] = { ...updatedDates[index], date: newDate };
    setFormData(prev => ({ ...prev, interviewProposedDates: updatedDates }));
    if (errors.interviewProposedDates) setErrors(prev => ({ ...prev, interviewProposedDates: '' }));
  };

  const handleTimeChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedDates = [...formData.interviewProposedDates];
    updatedDates[index] = { ...updatedDates[index], time: e.target.value };
    setFormData(prev => ({ ...prev, interviewProposedDates: updatedDates }));
  };

  const addDateSuggestion = () => {
    if (formData.interviewProposedDates.length < 3) {
      setFormData(prev => ({
        ...prev,
        interviewProposedDates: [...prev.interviewProposedDates, { date: null, time: '' }]
      }));
    }
  };

  const removeDateSuggestion = (index: number) => {
    const updatedDates = formData.interviewProposedDates.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, interviewProposedDates: updatedDates }));
  };

  const validateStep = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (activeStep === 0) {
      if (!formData.isAccountInfoChecked) {
        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
        if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
      }
    }

    if (activeStep === 2) {
      // Validate that at least one date suggestion has both date and time
      const hasValidDate = formData.interviewProposedDates.some(
        date => date.date !== null && date.time.trim() !== ''
      );
      
      if (!hasValidDate && formData.interviewProposedDates.length > 0) {
        newErrors.interviewProposedDates = 'At least one complete date suggestion is required';
      }
    }

    if (activeStep === 3) {
      if (!formData.isAccountCvChecked && !formData.resume) newErrors.resume = 'Resume is required';
      if (!formData.coverLetter.trim()) newErrors.coverLetter = 'Cover letter is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) setActiveStep(prev => prev + 1);
  };

  const handleBack = () => setActiveStep(prev => prev - 1);

  const handleSubmit = async () => {
    if (!validateStep()) return;
    
    setLoading(true);

    try {
      // Create FormData object
      const formDataToSend = new FormData();
      
      // Format dates as ISO strings for the backend
      const formattedDates = formData.interviewProposedDates
        .filter(d => d.date !== null && d.time.trim() !== '')
        .map(d => {
          const dateStr = d.date ? format(d.date, 'yyyy-MM-dd') : '';
          return `${dateStr}T${d.time}:00`;
        });
      
      // Create applicationDTO object matching the backend structure
      const applicationDTO = {
        isAccountInfoChecked: formData.isAccountInfoChecked,
        isAccountCvChecked: formData.isAccountCvChecked,
        candidateId: formData.candidateId,
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        opportunityId: formData.opportunityId,
        pastJobTitle: formData.pastJobTitle,
        pastCompanyName: formData.pastCompanyName,
        yearsOfExperience: parseInt(formData.yearsOfExperience) || 0,
        linkedinProfile: formData.linkedinProfile,
        portfolioUrl: formData.portfolioUrl,
        interviewProposedDates: formattedDates,
        coverLetter: formData.coverLetter
      };

      // Append applicationDTO as a JSON string
      formDataToSend.append('applicationDTO', JSON.stringify(applicationDTO));
      
      // Append resume file if it exists
      if (formData.resume && !formData.isAccountCvChecked) {
        formDataToSend.append('resume', formData.resume);
      }

      const response = await axios.post('http://localhost:8668/api/message/createAndSend', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Application submitted successfully:', response.data);
      onClose();
    } catch (error: any) {
      console.error('Error submitting application:', error);
      setErrors(prev => ({
        ...prev,
        submit: error.response?.data || 'Failed to submit application. Please try again.'
      }));
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              How would you like to apply?
            </Typography>
            
            <RadioGroup
              value={formData.isAccountInfoChecked ? 'true' : 'false'}
              onChange={(e) => {
                const selected = e.target.value === 'true';
                setFormData(prev => ({ ...prev, isAccountInfoChecked: selected }));
                setErrors(prev => ({ ...prev, isAccountInfoChecked: '' }));
              }}
            >
              <FormControlLabel value="true" control={<Radio />} label="Use account info" />
              <FormControlLabel value="false" control={<Radio />} label="Enter manually" />
            </RadioGroup>

            {!formData.isAccountInfoChecked && (
              <Box sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  error={!!errors.fullName}
                  helperText={errors.fullName}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber}
                  margin="normal"
                />
              </Box>
            )}
          </Box>
        );

      case 1:
        return (
          <Box>
            <TextField
              fullWidth
              label="Past Job Title"
              name="pastJobTitle"
              value={formData.pastJobTitle}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Past Company Name"
              name="pastCompanyName"
              value={formData.pastCompanyName}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Years Of Experience"
              name="yearsOfExperience"
              value={formData.yearsOfExperience}
              onChange={handleInputChange}
              type="number"
              margin="normal"
              InputProps={{ inputProps: { min: 0 } }}
            />
          </Box>
        );

      case 2:
        return (
          <Box>
            <TextField
              fullWidth
              label="LinkedIn Profile"
              name="linkedinProfile"
              value={formData.linkedinProfile}
              onChange={handleInputChange}
              margin="normal"
              placeholder="https://linkedin.com/in/yourname"
            />
            <TextField
              fullWidth
              label="Portfolio URL"
              name="portfolioUrl"
              value={formData.portfolioUrl}
              onChange={handleInputChange}
              margin="normal"
              placeholder="https://yourportfolio.com"
            />
            
            <Box sx={{ mt: 3, mb: 1 }}>
              <Typography variant="subtitle1" gutterBottom>
                Interview Availability (up to 3 suggestions)
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Please provide date and time when you're available for an interview
              </Typography>

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                {formData.interviewProposedDates.map((dateObj, index) => (
                  <Paper
                    key={index}
                    elevation={0}
                    sx={{
                      p: 2,
                      mb: 2,
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 1,
                      position: 'relative'
                    }}
                  >
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                      <DatePicker
                        label="Interview Date"
                        value={dateObj.date}
                        onChange={(newDate) => handleDateChange(index, newDate)}
                        sx={{ flex: 1 }}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            size: "medium",
                            error: !!errors.interviewProposedDates && index === 0,
                            helperText: (index === 0 && errors.interviewProposedDates) || ''
                          }
                        }}
                      />
                      <TextField
                        label="Time"
                        type="time"
                        value={dateObj.time}
                        onChange={(e) => handleTimeChange(index, e)}
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ step: 300 }}
                        fullWidth
                        sx={{ flex: 1 }}
                      />
                      
                      {formData.interviewProposedDates.length > 1 && (
                        <IconButton
                          color="error"
                          sx={{ 
                            position: { xs: 'absolute', sm: 'relative' }, 
                            top: { xs: 8, sm: 'auto' }, 
                            right: { xs: 8, sm: 'auto' } 
                          }}
                          onClick={() => removeDateSuggestion(index)}
                          aria-label="Remove date"
                        >
                          <Trash2 size={20} />
                        </IconButton>
                      )}
                    </Box>
                  </Paper>
                ))}
              </LocalizationProvider>

              {formData.interviewProposedDates.length < 3 && (
                <Button
                  startIcon={<Plus size={20} />}
                  onClick={addDateSuggestion}
                  variant="outlined"
                  sx={{ mt: 1 }}
                >
                  Add Another Date
                </Button>
              )}
            </Box>
          </Box>
        );

      case 3:
        return (
          <Box>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.isAccountCvChecked}
                  onChange={(e) => {
                    const useSaved = e.target.checked;
                    setFormData(prev => ({
                      ...prev,
                      isAccountCvChecked: useSaved,
                      resume: useSaved ? null : prev.resume
                    }));
                    setErrors(prev => ({ ...prev, resume: '' }));
                  }}
                />
              }
              label="Use saved resume from my account"
              sx={{ mb: 2 }}
            />

            {!formData.isAccountCvChecked && (
              <Box
                sx={{
                  border: '2px dashed',
                  borderColor: errors.resume ? 'error.main' : 'divider',
                  borderRadius: 2,
                  p: 3,
                  textAlign: 'center',
                  mb: 3,
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    borderColor: 'primary.main',
                    backgroundColor: 'rgba(25, 118, 210, 0.04)'
                  }
                }}
              >
                <input
                  accept=".pdf,.doc,.docx"
                  id="resume-upload"
                  type="file"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
                <label htmlFor="resume-upload">
                  <Button
                    variant="outlined"
                    component="span"
                    startIcon={<Upload size={20} />}
                  >
                    Upload Resume
                  </Button>
                </label>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {formData.resume ? formData.resume.name : 'PDF, DOC, or DOCX (Max 5MB)'}
                </Typography>
                {errors.resume && (
                  <Typography color="error" variant="caption" sx={{ display: 'block', mt: 1 }}>
                    {errors.resume}
                  </Typography>
                )}
              </Box>
            )}

            <TextField
              fullWidth
              label="Cover Letter"
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleInputChange}
              error={!!errors.coverLetter}
              helperText={errors.coverLetter}
              multiline
              rows={6}
              placeholder="Explain why you're interested in this position and what makes you a good fit..."
            />
          </Box>
        );

      case 4:
        return (
          <Box>
            <Alert severity="info" sx={{ mb: 3 }}>
              Please review your application before submitting.
            </Alert>

            <Typography><strong>Apply with:</strong> {formData.isAccountInfoChecked ? 'Account Info' : 'Manual Entry'}</Typography>
            
            {!formData.isAccountInfoChecked && (
              <>
                <Typography><strong>Name:</strong> {formData.fullName}</Typography>
                <Typography><strong>Email:</strong> {formData.email}</Typography>
                <Typography><strong>Phone:</strong> {formData.phoneNumber}</Typography>
              </>
            )}

            {(formData.pastJobTitle || formData.pastCompanyName || formData.yearsOfExperience) && (
              <>
                <Divider sx={{ my: 2 }} />
                {formData.pastJobTitle && (
                  <Typography><strong>Past Job Title:</strong> {formData.pastJobTitle}</Typography>
                )}
                {formData.pastCompanyName && (
                  <Typography><strong>Past Company:</strong> {formData.pastCompanyName}</Typography>
                )}
                {formData.yearsOfExperience && (
                  <Typography><strong>Years of Experience:</strong> {formData.yearsOfExperience}</Typography>
                )}
              </>
            )}

            <Divider sx={{ my: 2 }} />
            
            <Typography><strong>LinkedIn:</strong> {formData.linkedinProfile || 'Not provided'}</Typography>
            <Typography><strong>Portfolio:</strong> {formData.portfolioUrl || 'Not provided'}</Typography>
            
            <Typography sx={{ mt: 1 }}><strong>Interview Availability:</strong></Typography>
            {formData.interviewProposedDates.filter(d => d.date !== null).length > 0 ? (
              <Box component="ul" sx={{ pl: 2, mt: 0.5 }}>
                {formData.interviewProposedDates
                  .filter(d => d.date !== null && d.time)
                  .map((dateObj, index) => (
                    <Typography component="li" key={index}>
                      {dateObj.date ? format(dateObj.date, 'MMMM d, yyyy') : ''} at {dateObj.time}
                    </Typography>
                  ))}
              </Box>
            ) : (
              <Typography variant="body2" color="text.secondary">No dates provided</Typography>
            )}

            <Divider sx={{ my: 2 }} />
            
            <Typography>
              <strong>Resume:</strong>{' '}
              {formData.isAccountCvChecked ? 'Using saved resume from account' : (formData.resume?.name || 'Not uploaded')}
            </Typography>

            <Divider sx={{ my: 2 }} />
            
            <Typography><strong>Cover Letter:</strong></Typography>
            <Typography sx={{
              whiteSpace: 'pre-wrap',
              p: 2,
              borderLeft: '4px solid',
              borderColor: 'primary.light',
              bgcolor: 'background.paper',
              borderRadius: '4px'
            }}>
              {formData.coverLetter}
            </Typography>

            {errors.submit && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {errors.submit}
              </Alert>
            )}
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      fullWidth
      maxWidth="md"
      fullScreen={fullScreen}
    >
      <DialogTitle>
        <Typography variant="h5" fontWeight="bold">Apply for {jobTitle}</Typography>
        <Typography variant="body2" color="text.secondary">at {company}</Typography>
      </DialogTitle>

      <Divider />

      <DialogContent>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 3 }}>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {renderStep()}
      </DialogContent>

      <Divider />

      <DialogActions sx={{ justifyContent: 'space-between', p: 2 }}>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Box>
          {activeStep > 0 && (
            <Button
              onClick={handleBack}
              disabled={loading}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
          )}
          
          {activeStep < steps.length - 1 ? (
            <Button
              variant="contained"
              onClick={handleNext}
            >
              Next
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={loading}
              startIcon={loading && <CircularProgress size={20} color="inherit" />}
            >
              {loading ? 'Submitting...' : 'Submit Application'}
            </Button>
          )}
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default ApplicationForm;