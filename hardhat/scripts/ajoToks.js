const { ethers } = require('hardhat');

const main = async() => {
  const AjoToken = await ethers.getContractFactory('AjoToken');
  
  const initialSupply = 1000;  
  const ajoToken = await AjoToken.deploy(initialSupply);

  console.log('working..........')
  // await ajoToken.deployed();

  console.log("Contract deployed to: ", ajoToken.target);
}

const ajo = async() => {
  try {
    await main();
    process.exit(0);
  } catch(error) {
    console.error("Error deploying contract:", error);
    process.exit(1);
  }
}

ajo();

  
//AJOTOKS = 0xdEf80fE8D48EC03130A68dc890AFB280642C7c3B