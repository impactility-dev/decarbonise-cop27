import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { useTheme } from '@emotion/react';
import { Link, Container, Typography, Divider, Stack, Button, Card } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
import Iconify from '../components/iconify';
// sections
import { Form } from '../sections/cop27';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 300,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Cop27() {
  const mdUp = useResponsive('up', 'md');
  const theme = useTheme()
  return (
    <>
      <Helmet>
        <title> COP27 </title>
      </Helmet>
			
      <StyledRoot>
      
        <Container maxWidth="sm">
          <StyledContent sx={{
            minHeight: '5vh',
            mb: 0
          }}>
          <Typography variant="h4" gutterBottom align='center'>
              Offset your COP27 Carbon Footprint
            </Typography>
          </StyledContent>
        <Card
              sx={{
                m: 1,
                pt: 1,
                boxShadow: 4,
                textAlign: 'center',
                color: (theme) => theme.palette.info.darker,
                bgcolor: (theme) => theme.palette.info.lighter,
              }}
            > 
          <StyledContent>
            
            <Form />
           
          </StyledContent>
          </Card>
        </Container>
        
      </StyledRoot>
    </>
  );
}
