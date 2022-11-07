import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { useTheme } from '@emotion/react';
import { Link, Container, Typography, Divider, Stack, Button, Card } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
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
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Cop27() {
	const [haveMetamask, sethaveMetamask] = useState(true);
  const [accountAddress, setAccountAddress] = useState('');
	const [shortAddress, setShortAddress] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  const [departure, setDeparture] = useState();
	const [flightClass, setFlightClass] = useState('economy');
	const [roundTrip, setRoundTrip] = useState(true);
	const [passengers, setPassengers] = useState(1);
	const [flightDistance, setFlightDistance] = useState(0);
	const [flightEmission, setFlightEmission] = useState();

  const { ethereum } = window;
  const mdUp = useResponsive('up', 'md');

	useEffect(() => {
    const { ethereum } = window;
    const checkMetamaskAvailability = async () => {
      if (!ethereum) {
        sethaveMetamask(false);
      }
      sethaveMetamask(true);
    };
    checkMetamaskAvailability();
		checkIfAccountChanged();
  }, []);

	const checkIfAccountChanged = async () => {
		try {
			const {ethereum} = window;
			ethereum.on('accountsChanged', (accounts) => {
				console.log("Account changed to:", accounts[0]);
				setAccountAddress(accounts[0]);
				setShortAddress(`${accounts[0].slice(0,5)}...${accounts[0].slice(-4)}`);
			});
		} catch (error) {
			console.log(error);
		}
	}

  const connectWallet = async () => {
    try {
      console.log(window.departure)
      if (!ethereum) {
        sethaveMetamask(false);
      }
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      setAccountAddress(accounts[0]);
			setShortAddress(`${accounts[0].slice(0,5)}...${accounts[0].slice(-4)}`);
      setIsConnected(true);
    } catch (error) {
      setIsConnected(false);
    }
  };

	const disConnectWallet = async () => {
		setAccountAddress('');
		setIsConnected(false);
		setShortAddress('');
  };

  return (
    <>
      <Helmet>
        <title> Decarbonise COP27 </title>
      </Helmet>
			
      <StyledRoot>
				<Typography sx={{
					position: 'fixed',
					top: { xs: 20, sm: 30, md: 45},
					right: { xs: 130, sm: 140, md: 160},
					}}>{shortAddress}</Typography>
				{isConnected ?
				(
						<Button sx={{
							position: 'fixed',
							top: { xs: 16, sm: 24, md: 40 },
							right: { xs: 16, sm: 24, md: 40 },
							}}
						variant="contained" 
						onClick={disConnectWallet}>
							Disconnect
						</Button>
				) : (	
					<Button sx={{
						position: 'fixed',
						top: { xs: 16, sm: 24, md: 40 },
						right: { xs: 16, sm: 24, md: 40 },
						}}
					variant="contained" 
					onClick={connectWallet}>
						Connect
					</Button>
					)
				}
        <Container maxWidth="md">
          {/* <StyledContent sx={{
            minHeight: '5vh',
            mb: 0
          }}>
          
          </StyledContent> */}
          <StyledContent>
          <Typography variant="h4" gutterBottom align='center'>
              Offset your COP27 Carbon Footprint
            </Typography>
            <Form />
          </StyledContent>
         
        </Container>
        
      </StyledRoot>
    </>
  );
}
