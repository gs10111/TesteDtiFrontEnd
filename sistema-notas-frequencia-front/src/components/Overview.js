import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Grid,
  Divider,
  Box,
  Card,
  CardContent
} from '@mui/material';

function Overview() {
  const [overview, setOverview] = useState(null);

  const fetchOverview = async () => {
    try {
      const response = await fetch('/api/students/overview');
      if (response.ok) {
        const data = await response.json();
        setOverview(data);
      } else {
        console.error('Erro ao buscar visão geral');
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, []);

  if (!overview) {
    return (
      <Container maxWidth="md">
        <Typography variant="h6" sx={{ textAlign: 'center', my: 4 }}>
          Carregando...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h2" gutterBottom sx={{ my: 3 }}>
        Visão Geral
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Média da Turma em Cada Disciplina
              </Typography>
              <List>
                {overview.disciplineAverages.map((avg, index) => (
                  <ListItem key={index}>
                    <ListItemText 
                      primary={`Disciplina ${index + 1}: ${avg.toFixed(2)}`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Alunos com Média Acima da Média da Turma
              </Typography>
              {overview.studentsAboveClassAverage.length > 0 ? (
                <List>
                  {overview.studentsAboveClassAverage.map(student => (
                    <ListItem key={student.id}>
                      <ListItemText primary={student.name} />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography color="text.secondary">Nenhum</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Alunos com Frequência Abaixo de 75%
              </Typography>
              {overview.studentsBelowAttendanceThreshold.length > 0 ? (
                <List>
                  {overview.studentsBelowAttendanceThreshold.map(student => (
                    <ListItem key={student.id}>
                      <ListItemText primary={student.name} />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography color="text.secondary">Nenhum</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Overview;
