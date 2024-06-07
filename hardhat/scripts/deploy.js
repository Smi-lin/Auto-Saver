const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const AutoSaver = await ethers.getContractFactory("AutoSaver");
  const autoSaver = await AutoSaver.deploy("0xdEf80fE8D48EC03130A68dc890AFB280642C7c3B");
  // await autoSaver.deployed();

  console.log("AutoSaver deployed to:", autoSaver.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


// DEPLOY = 0xFAB251E691369bC518dAaE0Beb81ABA50F9B8a83