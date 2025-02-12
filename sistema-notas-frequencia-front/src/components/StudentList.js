import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Container
} from '@mui/material';

function StudentList() {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const response = await fetch('/api/students');
      if (response.ok) {
        const data = await response.json();
        setStudents(data);
      } else {
        console.error('Erro ao buscar alunos');
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h2" gutterBottom sx={{ my: 3 }}>
        Lista de Alunos
      </Typography>
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Nome</strong></TableCell>
              <TableCell align="right"><strong>Média</strong></TableCell>
              <TableCell align="right"><strong>Frequência</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map(student => (
              <TableRow key={student.id} hover>
                <TableCell>{student.name}</TableCell>
                <TableCell align="right">
                  {(student.grades.reduce((a, b) => a + b, 0) / student.grades.length).toFixed(2)}
                </TableCell>
                <TableCell align="right">{student.attendance}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default StudentList;
