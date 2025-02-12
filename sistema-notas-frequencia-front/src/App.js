import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import Overview from './components/Overview';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <AppNavigation />
    </Router>
  );
}


function AppNavigation() {
  const navigate = useNavigate(); 

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Sistema de Notas e Frequência
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button 
              color="inherit" 
              onClick={() => navigate('/')}
            >
              Alunos
            </Button>
            <Button 
              color="inherit" 
              onClick={() => navigate('/add')}
            >
              Adicionar Aluno
            </Button>
            <Button 
              color="inherit" 
              onClick={() => navigate('/overview')}
            >
              Visão Geral
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<StudentList />} />
          <Route path="/add" element={<StudentForm />} />
          <Route path="/overview" element={<Overview />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
