import {ethers} from 'ethers';
const offsetContract = require('../artifacts/contracts/carbon_offset_contract.sol/COP27_Offset_Pool.json');
const contractAddress = '0x4903Bc527FEEF092Ab0E1365531D73bfAEaE5F7c';
const provider = new ethers.providers.JsonRpcProvider("https://rpc-mainnet.matic.network");

async function main() {
	const contract = new ethers.Contract(contractAddress, offsetContract.abi, provider);
	let addresses = await contract.contributions("0xc059f03ec645e1eAf7C97Bc8FBc28330BDF86e7b");

	console.log(addresses);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
