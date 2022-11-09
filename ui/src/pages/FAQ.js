import { Helmet } from 'react-helmet-async';
import { styled } from '@mui/material/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Paper, Container, Typography, Link, Box, Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import Tooltip from '@mui/material/Tooltip';
import TwitterIcon from '@mui/icons-material/Twitter';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import WavesIcon from '@mui/icons-material/Waves';
import { FAQPage } from '../sections/faq';
import './main.css';
// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
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

export default function FAQ() {

  return (
    <div className="main">
      <Helmet>
        <title> Decarbonise COP27 - FAQ </title>
      </Helmet>
			
      <StyledRoot>
				<Link to="/" component={RouterLink}>
					<Button sx={{
						position: 'absolute',
						top: { xs: 16, sm: 24, md: 40 },
						left: { xs: 16, sm: 24, md: 40 },
						}}
					variant="text" 
					>
						COP27 Carbon Offset Dapp
					</Button>
				</Link>	
        <Container maxWidth="lg">
          <StyledContent sx={{
            minHeight: '0vh',
            mb: 0
          }} />
          
          <Typography variant="h4" sx={{mt: 4, mb: -2, fontFamily: 'Helvetica'}}>
              FAQs
					</Typography>
					<StyledContent>
            <FAQPage />
          </StyledContent>    
        </Container>
        
      </StyledRoot>
			<Paper sx={{marginTop: 'calc(10% + 0px)',
				background: 'none',
				border: 0,
				width: '100%',
				position: 'static',
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
