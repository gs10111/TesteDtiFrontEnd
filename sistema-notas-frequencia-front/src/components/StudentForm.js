import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Paper,
  Alert,
  Snackbar
} from '@mui/material';

function StudentForm() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [grades, setGrades] = useState(Array(5).fill(''));
  const [attendance, setAttendance] = useState('');
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleGradeChange = (index, value) => {
    const newGrades = [...grades];
    newGrades[index] = value;
    setGrades(newGrades);
  };

  const validateForm = () => {
    // Validate grades
    const invalidGrades = grades.some(grade => {
      const num = parseFloat(grade);
      return num < 0 || num > 10;
    });

    if (invalidGrades) {
      setError('As notas devem estar entre 0 e 10');
      setOpenSnackbar(true);
      return false;
    }

    // Validate attendance
    const attendanceNum = parseFloat(attendance.replace('%', ''));
    if (attendanceNum < 0 || attendanceNum > 100) {
      setError('A frequência deve estar entre 0% e 100%');
      setOpenSnackbar(true);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Converte as notas e a frequência para números
    const numericGrades = grades.map(g => parseFloat(g));
    const numericAttendance = parseFloat(attendance.replace('%', ''));

    const student = {
      name,
      grades: numericGrades,
      attendance: numericAttendance
    };

    try {
      const response = await fetch('/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(student)
      });

      if (response.ok) {
        navigate('/');
      } else {
        console.error('Erro ao adicionar aluno');
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h2" gutterBottom sx={{ my: 3 }}>
        Adicionar Aluno
      </Typography>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nome"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                variant="outlined"
              />
            </Grid>
            
            {grades.map((grade, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <TextField
                  fullWidth
                  label={`Nota Disciplina ${index + 1}`}
                  type="number"
                  inputProps={{
                    min: "0",
                    max: "10",
                    step: "0.1"
                  }}
                  value={grade}
                  onChange={e => handleGradeChange(index, e.target.value)}
                  required
                  variant="outlined"
                />
              </Grid>
            ))}
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Frequência (%)"
                value={attendance}
                onChange={e => setAttendance(e.target.value)}
                required
                variant="outlined"
                InputProps={{
                  endAdornment: "%"
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                size="large"
                sx={{ mt: 2 }}
              >
                Adicionar
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity="error" 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default StudentForm;
