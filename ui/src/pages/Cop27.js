import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { useTheme } from '@emotion/react';
import { Link, Container, Typography, Divider, Stack, Button, Card, Modal, Box } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
// sections
import { Form } from '../sections/cop27';

// ----------------------------------------------------------------------

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
	borderRadius: '8px'
};

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
	const [networkChange, setNetworkChange] = useState(false);

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
		if(isConnected) {
			checkIfNetworkChanged();
		}
  }, [isConnected]);

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
	
	const checkIfNetworkChanged = async () => {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		provider.provider.on("chainChanged", (chainId) => {
			console.log("chain Changed", chainId);
			if (parseInt(chainId, 16) !== 137) {
				setNetworkChange(true)
			}
		})
	}
	

	const checkIfNetworkCorrect = async () => {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const network = await provider.getNetwork();
		if (network.chainId !== 137) {
			setNetworkChange(true)
		}
	}

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        sethaveMetamask(false);
      }
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      setAccountAddress(accounts[0]);
			setShortAddress(`${accounts[0].slice(0,5)}...${accounts[0].slice(-4)}`);
      setIsConnected(true);
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			console.log(await provider.getNetwork())
			checkIfNetworkCorrect();
    } catch (error) {
      setIsConnected(false);
    }
  };

	function toHex(num) {
		const val = Number(num);
		return `0x${val.toString(16)}`;
	};

	const switchNetwork = async () => {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		await provider.provider.request({
			method: "wallet_switchEthereumChain",
			params: [{ chainId: toHex(137) }],
		});
		setNetworkChange(false);
	}

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
			<Modal
			open={networkChange}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography id="modal-modal-title" variant="h6" component="h2">
            Connected to wrong network
          </Typography>
					<Typography id="modal-modal-description" sx={{ mt: 2 }}>
						Our dapp works best with Polygon Mainnet, please switch to the Polygon network
					</Typography>
					<Button sx={{
						position: 'absolute',
						}}
					variant="contained" 
					onClick={switchNetwork}>
						Switch Network
					</Button>
				</Box>
			</Modal>
      <Typography sx={{
					position: 'absolute',
					top: { xs: 20, sm: 30, md: 45},
					right: { xs: 130, sm: 140, md: 160},
					}}>{shortAddress}</Typography>
				{isConnected ?
				(
						<Button sx={{
							position: 'absolute',
							top: { xs: 16, sm: 24, md: 40 },
							right: { xs: 16, sm: 24, md: 40 },
							}}
						variant="contained" 
						onClick={disConnectWallet}
            color="error">
							Disconnect
						</Button>
				) : (	
					<Button sx={{
						position: 'absolute',
						top: { xs: 16, sm: 24, md: 40 },
						right: { xs: 16, sm: 24, md: 40 },
						}}
					variant="contained" 
					onClick={connectWallet}>
						Connect
					</Button>
					)
				}
        <Container maxWidth="lg">
          {/* <StyledContent sx={{
            minHeight: '5vh',
            mb: 0
          }}>
          
          </StyledContent> */}
          <StyledContent>
          <Typography variant="h4" align='center' sx={{ mt: 3, mb: 3, fontFamily: 'Helvetica'}}>
              Offset your COP27 Carbon Footprint
            </Typography>
            <Form address={accountAddress}/>
          </StyledContent>
         
        </Container>
        
      </StyledRoot>
    </>
  );
}
