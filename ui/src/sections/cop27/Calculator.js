import { BigNumber } from "../../utils/BigNumber";
import { airports } from "../../utils/airportLists";

function Location(latitude, longitude) {
	this.latitude = latitude;
	this.longitude = longitude;
}

const tokenDecimals = {
	NCT: 18,
	MATIC: 18,
};
/**
 * transforms an angle from dgrees to radians
 */
function toRad(angle) {
	return angle * Math.PI / 180;
}

async function findLatLong(airportName) {
	const result = await airports.find(element => element.Name === airportName)

	if (result) {
		return new Location(result.Latitude, result.Longitude);
	} 
	
	return undefined
	

}

async function calcGeodesicDistance(start, destination) {
	const earthRadius = 6371.009; // km mean earth radius (spherical approximation)

	// Calculate temporary elements of the formula:

	const deltaLambda = (destination.longitude - start.longitude);

	const A =
		(Math.cos(toRad(destination.latitude)) *
		Math.sin(toRad(deltaLambda))) ** 2;

	const B =
		(Math.cos(toRad(start.latitude)) * Math.sin(toRad(destination.latitude)) -
		Math.sin(toRad(start.latitude)) * Math.cos(toRad(destination.latitude)) *
		Math.cos(toRad(deltaLambda))) ** 2;

	const C = Math.sin(toRad(start.latitude)) * Math.sin(toRad(destination.latitude)) +
		Math.cos(toRad(start.latitude)) * Math.cos(toRad(destination.latitude)) *
		Math.cos(toRad(deltaLambda));

	// Vyncenty formula:
	const deltaSigma = Math.atan2(Math.sqrt(A + B), C);
	const distance = earthRadius * deltaSigma;
	return distance;
}
/**
 * Get flight distance from the two airport input fields
 */
export async function calculateFlightDistance(departure, roundTrip, flightClass) {

	const startName = departure
	let startLocation;
	if (startName) {
		startLocation = await findLatLong(startName)
	}

	const destinationName = "SSH, Sharm El Sheikh International Airport, Sharm el-Sheikh, Egypt";
	const destinationLocation = new Location(27.977301, 34.395);  // hard code Sharm El Sheikh International Airport co-ordinates
	// if (destinationName) {
	//   destinationLocation = await findLatLong(destinationName)
	// }

	if (startLocation && destinationLocation) {
		const totalDistance = await calcGeodesicDistance(startLocation, destinationLocation)
		const totalEmission = await calculateCarbonEmission(totalDistance, roundTrip, flightClass);
		return {'distance': totalDistance, 'emission': totalEmission}
	}
	return {'distance': 0, 'emission': null}
}

/**
 * get carbon emission from distance and other fields
 */
async function calculateCarbonEmission(totalDistance, roundTrip, flightClass) {
	// Formula follows myclimate estimation calculator
	// emission parameters (short distance)
	const emShort = {
		a: 0,
		b: 2.714,
		c: 1166.52,
		S: 153.51,
		PLF: 0.82,
		DC: 95,
		CF: 0.07,
		CW: {
			economy: 0.96,
			business: 1.26,
			first: 2.4,
		},
		EF: 3.15,
		M: 2,
		P: 0.54,
		AF: 0.00038,
		A: 11.68
	}
	// emission parameters (long distance)
	const emLong = {
		a: 0.0001,
		b: 7.104,
		c: 5044.93,
		S: 280.21,
		PLF: 0.82,
		DC: 95,
		CF: 0.23,
		CW: {
			economy: 0.8,
			business: 1.54,
			first: 2.4,
		},
		EF: 3.15,
		M: 2,
		P: 0.54,
		AF: 0.00038,
		A: 11.68
	}

	let emission = 0;
	if (totalDistance === 0) {
		// do nothing
	} else if (totalDistance < 1500) {  // short distance
		emission = singleEmissionCalc(emShort, totalDistance, flightClass);
	} else if (totalDistance > 2500) {  // long distance
		emission = singleEmissionCalc(emLong, totalDistance, flightClass);
	} else {  // intermediate distance (interpolation)
		const shortEM = singleEmissionCalc(emShort, totalDistance,flightClass);
		const longEM = singleEmissionCalc(emLong, totalDistance, flightClass);
		const longDistFactor = (totalDistance - 1500) / 1000; // 0@1500km, 1@2500km
		emission = (1 - longDistFactor) * shortEM + longDistFactor * longEM; // interpolation
	}

	// multiplier for round trip
	if (roundTrip)
		emission *= 2;
	
	const emissionTotal = new BigNumber(emission, tokenDecimals.NCT);
	return emissionTotal
}

/**
* calculates CO2 emission for an emission parameter set (em)
*/
function singleEmissionCalc(em, totalDistance, flightclass) {

	let emission = 0;
	const d = totalDistance + em.DC;
	emission = ((em.a * d * d + em.b * d + em.c) / (em.S * em.PLF)) *
		(1 - em.CF) *
		em.CW[flightclass] *
		(em.EF * em.M + em.P) +
		em.AF * d +
		em.A;
	emission = (emission / 1000).toFixed(3); // from kg to tonnes
	return emission
}