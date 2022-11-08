// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {

  const offsetContract = await hre.ethers.getContractFactory("COP27_Offset_Pool");
  const offsetContractPool = await offsetContract.deploy("0xdA78a11FD57aF7be2eDD804840eA7f4c2A38801d");

  await offsetContractPool.deployed();

  console.log(
    `deployed to ${offsetContractPool.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
