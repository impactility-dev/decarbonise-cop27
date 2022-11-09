import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import GitHubIcon from '@mui/icons-material/GitHub';
import Tooltip from '@mui/material/Tooltip';
import TwitterIcon from '@mui/icons-material/Twitter';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { styled } from '@mui/material/styles';
import WavesIcon from '@mui/icons-material/Waves';
import { Paper, Container, Typography, Link, Button, Modal, Box } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
// sections
import { Form } from '../sections/cop27';
import './main.css';
// ----------------------------------------------------------------------

const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;

const providerOptions = {
	walletconnect: {
		package: WalletConnectProvider,
		options: {
			rpc: {
				137: "https://polygon-rpc.com",
			},
		},
	},
}

const web3Modal = new Web3Modal({
	network: "matic", // optional
	networkID: 137,
	cacheProvider: false, // choose every time
	providerOptions, // required
	disableInjectedProvider: false, // For MetaMask / Brave / Opera.
});

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
  padding: theme.spacing(6, 0),
}));

// ----------------------------------------------------------------------

export default function Cop27() {
	const [haveMetamask, sethaveMetamask] = useState(true);
  const [accountAddress, setAccountAddress] = useState('');
	const [shortAddress, setShortAddress] = useState('');
  const [isConnected, setIsConnected] = useState(false);
	const [networkChange, setNetworkChange] = useState(false);
	const [web3Instance, setWeb3Instance] = useState({});

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
		const provider = new ethers.providers.Web3Provider(web3Instance, "any");
		provider.provider.on("chainChanged", (chainId) => {
			console.log("chain Changed", chainId);
			if (parseInt(chainId, 16) !== 137) {
				setNetworkChange(true)
			}
		})
	}
	
	const checkIfNetworkCorrect = async (instance) => {
		const provider = new ethers.providers.Web3Provider(instance, "any");
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

			const instance = await web3Modal.connect();
			const provider = new ethers.providers.Web3Provider(instance, "any");
			const signer = await provider.getSigner();
			const address = await signer.getAddress();

			setWeb3Instance(instance);
			setAccountAddress(address);
			setShortAddress(`${address.slice(0,5)}...${address.slice(-4)}`);
      setIsConnected(true);			
			checkIfNetworkCorrect(instance);
    } catch (error) {
      setIsConnected(false);
    }
  };

	function toHex(num) {
		const val = Number(num);
		return `0x${val.toString(16)}`;
	};

	const switchNetwork = async () => {
		const provider = new ethers.providers.Web3Provider(web3Instance, "any");
		try {
			await provider.provider.request({
				method: "wallet_switchEthereumChain",
				params: [{ chainId: toHex(137) }],
			});
		} catch(err) {
			await provider.provider.request({
				method: "wallet_addEthereumChain",
				params: [{
					chainId: toHex(137),
					chainName: 'Polygon Mainnet',
					nativeCurrency: {
							name: 'MATIC',
							symbol: 'MATIC',
							decimals: 18
					},
					rpcUrls: ['https://rpc-mainnet.matic.network'],
					blockExplorerUrls: ['https://polygonscan.com']
					}],
			});
		}

		setNetworkChange(false);
	}

	const disConnectWallet = async () => {
		await web3Modal.clearCachedProvider();
		window.localStorage.clear();
		setAccountAddress('');
		setIsConnected(false);
		setShortAddress('');
  };

  return (
    <div className="main">
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
						mt: 3,
            float: 'right'
						}}
					variant="contained" 
					onClick={switchNetwork}>
						Switch Network
					</Button>
				</Box>
			</Modal>
			<Link to="/faq" component={RouterLink}>
					<Button sx={{
						position: 'absolute',
						top: { xs: 16, sm: 24, md: 40 },
						left: { xs: 16, sm: 24, md: 40 },
						}}
					variant="text" 
					>
						FAQs
					</Button>
			</Link>
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
          <StyledContent sx={{
            minHeight: '0vh',
            mb: 0
          }} />
          
          <Typography variant="h2" align='center' sx={{mt: 0, mb: -7, fontFamily: 'Helvetica'}}>
              Offset your COP27 Carbon Footprint
            </Typography>
          <StyledContent>
            <Form address={accountAddress} web3Instance={web3Instance}/>
          </StyledContent>
         
        </Container>
        
      </StyledRoot>
			<Paper sx={{marginTop: 'calc(10% + 0px)',
				background: 'none',
				border: 0,
				width: '100%',
				position: window.screen.width < 800 ? 'static' : 'sticky',
				bottom: 0,
			}} component="footer" square variant="outlined">
				<Container maxWidth="lg">
					<Box
						sx={{
							flexGrow: 1,
							justifyContent: "left",
							display: "flex",
							flexWrap: "wrap",
							my:1
						}}
					>
						<Box
							sx={{
								flexGrow: 1,
								justifyContent: "left",
								display: "flex",
								mb: 2,
							}}
						>
						<Typography variant="caption" color="primary" sx={{
							fontSize: window.screen.width < 800 ? '15px' : '20px',
							color: 'white',
							fontFace: 'Comic Sans'
						}}>
							<Link href="https://impact.club" target="_blank" style={{ textDecoration: 'none', color: 'white',
							fontFace: 'Comic Sans' }}>
								<img src="/assets/impactility.svg" alt="" height={window.screen.width < 800 ? "22px" : "30px"} width={window.screen.width < 800 ? "22px" : "30px"} display="inline" style={{ float: "left"}}/> &nbsp;Impact Club @ 2022
							</Link>
						</Typography>
						</Box>
						<Box
							sx={{
								flexGrow: 1,
								justifyContent: "right",
								display: "flex",
								mb: 2,
							}}
						>
							<Link href="https://github.com/impactility-dev/decarbonise-cop27" target="_blank">
								<Tooltip title="Github" arrow>
									<GitHubIcon sx={{ color: "white", fontSize: window.screen.width < 800 ? '25px' : '35px', mr: 1}} />
								</Tooltip>
							</Link>
							<Link href="https://polygonscan.com/address/0x4903Bc527FEEF092Ab0E1365531D73bfAEaE5F7c" target="_blank">
								<Tooltip title="Offset Contract" arrow>
									<ReceiptLongIcon sx={{ color: "white", fontSize: window.screen.width < 800 ? '25px' : '35px', mr: 1}} />
								</Tooltip>
							</Link>
							<Link href="https://polygonscan.com/address/0x38515e69405866245Fc9778395dE7cecc999382A" target="_blank">
								<Tooltip title="Community Pool Contract" arrow>
									<WavesIcon sx={{ color: "white", fontSize: window.screen.width < 800 ? '25px' : '35px', mr: 1}} />
								</Tooltip>
							</Link>
							<Link href="https://twitter.com/ImpactClubWeb3" target="_blank">
								<Tooltip title="Twitter" arrow>
									<TwitterIcon sx={{ color: "white", fontSize: window.screen.width < 800 ? '25px' : '35px', mr: 1}} />
								</Tooltip>
							</Link>
						</Box>
					</Box>
				</Container>
    	</Paper>
    </div>
  );
}
