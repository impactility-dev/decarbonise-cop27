import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Autocomplete, Popper, Select, MenuItem,
  Button, ButtonGroup, Card, Item
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { LoadingButton } from '@mui/lab';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
// components
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Divider from '@mui/material/Divider';
import FactoryIcon from '@mui/icons-material/Factory';
import NavigationIcon from '@mui/icons-material/Navigation';
import MoneyIcon from '@mui/icons-material/Money';
import Iconify from '../../components/iconify';
import { airports } from '../../utils/airportLists';
import { calculateFlightDistance } from './Calculator';

const StyledPopper = styled((props) => <Popper placement="bottom-start" {...props} />)({
  width: '300px !important',
});

export default function Form(props) {
  const navigate = useNavigate();

  const [departure, setDeparture] = useState();
	const [flightClass, setFlightClass] = useState('economy');
	const [roundTrip, setRoundTrip] = useState(true);
	const [passengers, setPassengers] = useState(1);
	const [flightDistance, setFlightDistance] = useState(0);
	const [flightEmission, setFlightEmission] = useState();


	useEffect(() => {
    async function getDetails(departure, roundTrip, flightClass) {
      const data = await calculateFlightDistance(departure, roundTrip, flightClass);
      setFlightDistance(data.distance);
      setFlightEmission(data.emission);
    }
		if (departure && flightClass && passengers) {
		 getDetails(departure, roundTrip, flightClass)
		}
  }, [departure, flightClass, roundTrip, passengers]);
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
  return (
    <>
    <Grid container spacing={4} direction="row" alignItems="center"
  justifyContent="center">
      <Grid item xs={10} sm={10} lg={6} >
      <Card
    sx={{
      p: 5,
      pt: 1,
      m: 2,
      boxShadow: '10px 5px 5px green',
      // textAlign: 'center',
      // alignContent: 'center',
    }}
  > 
    <h3>Configure Flight</h3>
      <Stack spacing={3}>
      <Autocomplete
          sx={{ width: 300, mt: 2 }}
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
        {/* <TextField name="email" label="Email address" />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        /> */}
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <p>RoundTrip</p>
        <Checkbox name="round-trip" label="Round Trip" checked={roundTrip} onChange={(event) => {
          setRoundTrip(!roundTrip)
        }}
          color="success"
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="center" sx={{ my: 2 }}>
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
          <Button color="success" onClick={handleDecrement} width="15%" sx={{ width: '15%' }}><RemoveIcon /></Button>
          <TextField
          inputProps={{style: { textAlign: 'center' }}}
          value={`${passengers} passenger(s)`}
          readOnly
          />
          {/* <Button width="70%" disabled sx={{ width: '70%' }}>{passengers} passenger&#40;s&#41;</Button> */}
          <Button width="15%" color="success" onClick={handleIncrement} sx={{ width: '15%' }}><AddIcon /></Button>
        </ButtonGroup>
      </Stack>
      </Card>
      </Grid>
      <Grid item xs={10} lg={6} sm={10}>
        <Card
    sx={{
      p: 5,
      pt: 1,
      m: 2,
      boxShadow: '10px 5px 5px blue',
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
        <ListItemText primary={`${flightDistance || '---'} km`} secondary="Distance(one-way)" />
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
        <ListItemText primary="5" secondary="MATIC" />
      </ListItem>
    </List>
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Button color="secondary"  variant="contained"onClick={handleDecrement} >Pay</Button>
        <Button color="secondary"  variant="contained" onClick={handleDecrement} >Pledge</Button>

      </Stack>
      </Card>
      </Grid>
    </Grid>
    
    </>
  );
}
