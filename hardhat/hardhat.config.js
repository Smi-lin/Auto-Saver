require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    alfajores: {
      url: process.env.CELO_URL,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
      gasLimit: 1000000,
      // chainId: 44787
    }
  }
};