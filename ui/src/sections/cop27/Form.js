import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Autocomplete, Popper, Select, MenuItem,
  Button, ButtonGroup
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
// components
import { styled } from '@mui/material/styles';
import Iconify from '../../components/iconify';
import { airports } from '../../utils/airportLists';


const StyledPopper = styled((props) => <Popper placement="bottom-start" {...props} />)({
  width: '300px !important',
});

export default function Form() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [departure, setDeparture] = useState();
	const [flightClass, setFlightClass] = useState('economy');
	const [roundTrip, setRoundTrip] = useState(true);
	const [passengers, setPassengers] = useState(1);
	const [flightDistance, setFlightDistance] = useState(0);
	const [flightEmission, setFlightEmission] = useState();

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
      <Stack spacing={3}>
      <Autocomplete
          sx={{ width: 300 }}
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
    </>
  );
}
