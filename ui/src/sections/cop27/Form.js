import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// @mui
import { Stack, InputAdornment, TextField, Checkbox, Autocomplete, Popper, Select, MenuItem,
  Button, ButtonGroup, Card, FormControl
} from '@mui/material';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
// components
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import FactoryIcon from '@mui/icons-material/Factory';
import NavigationIcon from '@mui/icons-material/Navigation';
import MoneyIcon from '@mui/icons-material/Money';
import Iconify from '../../components/iconify';
import { airports } from '../../utils/airportLists';
import { calculateFlightDistance } from './Calculator';
import { BigNumber } from '../../utils/BigNumber';
import { addresses }from '../../utils/addresses';

const contract = require('../../abi/offsetContractABI.json');

const StyledPopper = styled((props) => <Popper placement="bottom-start" {...props} />)({
  width: '300px !important',
});

const tokenDecimals = {
	NCT: 18,
	MATIC: 18,
};

export default function Form(props) {

	const contractAddress = '0x4903Bc527FEEF092Ab0E1365531D73bfAEaE5F7c';
	const poapEventId = "81814";
	const poapUrl = "https://poap.offset.cop27/";
	const accountAddress = props.address;
	const web3Instance = props.web3Instance;
  const [departure, setDeparture] = useState();
	const [flightClass, setFlightClass] = useState('economy');
	const [roundTrip, setRoundTrip] = useState(true);
	const [passengers, setPassengers] = useState(1);
	const [flightDistance, setFlightDistance] = useState(0);
	const [flightEmission, setFlightEmission] = useState();
  const [finalAmount, setFinalAmount] = useState(0);
  const [token, setToken] = useState("MATIC");
	const [mint, setMint] = useState(false);
	const [nftStatus, setNFTStatus] = useState("Mint");
	const [pay, setPay] = useState(false);
	const [pledge, setPledge] = useState(false);
	

	useEffect(() => {
    async function getDetails(departure, roundTrip, flightClass, passengers) {
      const data = await calculateFlightDistance(departure, roundTrip, flightClass);
      setFlightDistance(data.distance);
      setFlightEmission(data.emission);
      calculateOffsetAmount(passengers, data.emission);
    }
		if (departure && flightClass && passengers) {
		 getDetails(departure, roundTrip, flightClass, passengers)
		}
  }, [departure, flightClass, roundTrip, passengers]);

	useEffect(() => {
    async function calculateAmount() {
      await calculateOffsetAmount(passengers, flightEmission);
    }

		if (token && flightEmission) {
		 calculateAmount();
		}
  }, [token]);

	useEffect(() => {
		if (!accountAddress) { 
			setPay(false);
			setPledge(false);
		} else if (accountAddress && finalAmount) {
			setPay(true);
			setPledge(true);
		}
  }, [accountAddress]);

	const checkNFTStatus = async() => {
  	const url = `${poapUrl}getCollectorStatus/${poapEventId}/${accountAddress}`;
  	let response;
		try {
			response = await fetch(url, {
				method: "GET",
				mode: "cors",
				headers: {
					'Accept': 'application/json',
				},
			});

		} catch (err) {
			setMint(false);
		}
  
		const getCollectorStatusResponse = await response.json();
	
		if (getCollectorStatusResponse.collector_status === "is_eligible") {
			setMint(true);
			setNFTStatus("Mint");
		}
		if (getCollectorStatusResponse.collector_status === "has_collected") {
			setMint(false);
			setNFTStatus("Collected");
		}
	}

  const handleIncrement = () => {
		const counter = passengers + 1
		setPassengers(counter)
	}

	const handleDecrement = () => {
    if (passengers > 1) {
      const counter = passengers - 1
      setPassengers(counter)  
    }
	}

	const initContract = async() => {
		const provider = new ethers.providers.Web3Provider(web3Instance);
		const offsetContract = new ethers.Contract(contractAddress, contract.abi, provider);
		return offsetContract;
	}

	const initContractWithSigner = async() => {
		const provider = new ethers.providers.Web3Provider(web3Instance);
		const offsetContract = new ethers.Contract(contractAddress, contract.abi, provider);
		const offsetContractWithSigner = offsetContract.connect(provider.getSigner());
		return offsetContractWithSigner;
	}

	const calculateOffsetAmount = async (passengers, flightEmission) => {
		let finalAmount;
		const paymentToken = token;
		const value = new BigNumber(flightEmission?.asFloat() * passengers);
		
		if (paymentToken === "NCT") {
			finalAmount = value;
		} else {
			const contract = await initContract();
			let amount = await contract.calculateNeededAmount(addresses.WMATIC, value.asBigNumber());
    	amount = new BigNumber(amount, tokenDecimals.MATIC);
			finalAmount =  new BigNumber(1.01 * amount?.asFloat(), tokenDecimals.MATIC);
		}

    setFinalAmount(finalAmount?.asFloat());
		if(accountAddress) {
			setPay(true);
			setPledge(true);
		}
	}

  const infoToast = (transaction) => (
    <div>
      Transaction Sent - <a target="_blank" rel="noreferrer" href={`https://polygonscan.com/tx/${transaction.hash}`}>{`https://polygonscan.com/tx/${transaction.hash}`}</a>
    </div>
  );

	const successToast = (transaction) => (
    <div>
      Transaction Successful - <a target="_blank" rel="noreferrer" href={`https://polygonscan.com/tx/${transaction.hash}`}>{`https://polygonscan.com/tx/${transaction.hash}`}</a>
    </div>
  );

	const pledgeAmount = async () => {
    const pledgeValue = flightEmission;
		const contract = await initContractWithSigner();
		const transaction = await contract.capturePledge(pledgeValue.asBigNumber(), {gasLimit: 10000});

		toast.info(infoToast(transaction), {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
		});

		await transaction.wait();

		toast.success(successToast(transaction), {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false, 
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
		});

		setMint(true);
	};

	const payAmount = async () => {
    await calculateOffsetAmount(passengers, flightEmission);
    const paymentValue = new BigNumber(finalAmount);
		const contract = await initContractWithSigner();
		let transaction;

		if (token === "NCT") {
			transaction = await contract.participateWithToken(addresses.NCT, paymentValue.asBigNumber(), {gasLimit: 30000});
		} else {
			transaction = await contract.participateWithMatic(paymentValue.asBigNumber(), {value: paymentValue.asBigNumber(), gasLimit: 30000});
		}

		toast.info(infoToast(transaction), {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
		});

		await transaction.wait();

		toast.success(successToast(transaction), {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false, 
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
		});

		setMint(true);
	}


  return (
    <>
    <Grid container spacing={4} direction="row" alignItems="center"
  justifyContent="center">
      <Grid item xs={10} sm={10} lg={4} >
      <Card
    sx={{
      p: 5,
      pt: 1,
      m: 2,
      boxShadow: '10px 5px 5px #22D388',
      height: "460px",
    }}
  > 
    <h3>Configure Flight</h3>
      <Stack spacing={5}>
      <Autocomplete
          sx={{ mt: 2 }}
          autoHighlight
          popupIcon={null}
          PopperComponent={StyledPopper}
          options={airports}
          getOptionLabel={(post) => post.Name}
          isOptionEqualToValue={(option, value) => option.Name === value.Name}
          onChange={(event, newValue) => {
            setDeparture(newValue.Name)
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Departure Airport"
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon={'eva:search-fill'} sx={{ ml: 1, width: 20, height: 20, color: 'text.disabled' }} />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        <Select
          id="travel-class"
          value={flightClass}
          onChange={(event) => {
            setFlightClass(event.target.value)
          }}
        >
          <MenuItem value="economy">Economy Class</MenuItem>
          <MenuItem value="business">Business Class</MenuItem>
          <MenuItem value="first">First Class</MenuItem>
        </Select>
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 4, mb: 5 }}>
        <p>RoundTrip</p>
        <Checkbox name="round-trip" label="Round Trip" checked={roundTrip} onChange={(event) => {
          setRoundTrip(!roundTrip)
        }}
          color="flight"
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="center" sx={{ my: 2 }}>
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
          <Button color="flight" onClick={handleDecrement} width="15%" sx={{ width: '15%' }}><RemoveIcon /></Button>
          <TextField
          inputProps={{style: { textAlign: 'center' }}}
          value={`${passengers} passenger(s)`}
          readOnly
          />
          {/* <Button width="70%" disabled sx={{ width: '70%' }}>{passengers} passenger&#40;s&#41;</Button> */}
          <Button width="15%" color="flight" onClick={handleIncrement} sx={{ width: '15%' }}><AddIcon /></Button>
        </ButtonGroup>
      </Stack>
      </Card>
      </Grid>
      <Grid item xs={10} lg={4} sm={10}>
        <Card
    sx={{
      p: 5,
      pt: 1,
      m: 2,
      boxShadow: '10px 5px 5px #6079E8',
      height: "460px"
    }}
  > 
    <h3>Offset Flight</h3>
      <Stack spacing={6}>
      
      {/* <p>Flight Distance: 100km</p>
      <p>Flight Distance: 100km</p>
      <p>Flight Distance: 100km</p> */}
      <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
      }}
    >
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <NavigationIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={`${Math.round(flightDistance) || '---'} km`} secondary="Distance(one-way)" />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <FactoryIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={`${flightEmission?.asFloat() * passengers || '---'} tCO2`} secondary="Emissions" />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <MoneyIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={`${finalAmount}`} secondary={
          <FormControl size="small" variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <Select
            id="token"
            value={token}
            sx={{
              width: '80px',
              border: 0,
              fontSize: '14px'
            }}
            size="small"
            onChange={(event) => {
             setToken(event.target.value)
            }}
          >
            <MenuItem value="MATIC">MATIC</MenuItem>
            <MenuItem value="NCT">NCT</MenuItem>
            </Select>
          </FormControl>}
        />
      </ListItem>
    </List>
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 6 }}>
        <Button color="offset"  variant="contained" onClick={payAmount} disabled={!pay}>Contribute</Button>
				{/* <ToastContainer /> */}
        <Button color="offset"  variant="contained" onClick={pledgeAmount} disabled={!pledge}>Pledge</Button>
				{/* <ToastContainer /> */}
      </Stack>
      <ToastContainer />
      </Card>
      </Grid>

      <Grid item xs={10} lg={4} sm={10}>
        <Card
					sx={{
						p: 5,
						pt: 1,
						m: 2,
						boxShadow: '10px 5px 5px #9289FF',
            height: "460px"
					}}
				> 
    <h3>Mint your POAP</h3>
      <Stack spacing={6} alignItems="center">
				<img src='/assets/cop27-poap-1.png' alt="POAP art work" width="60%" height="60%" />
				<br/>This POAP will enable you to vote on a nature conservation project. Participants will be notified about the vote on poap.vote shortly after COP 27<br/>
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Button color="poap"  variant="contained" onClick={payAmount} disabled={!mint}>{nftStatus}</Button>
        <Button color="poap"  variant="contained" target="_blank" href={`https://app.poap.xyz/scan/${accountAddress}`} disabled={!accountAddress}>My POAPs</Button>
      </Stack>
      <ToastContainer />
      </Card>
      </Grid>
    </Grid>
    
    </>
  );
}