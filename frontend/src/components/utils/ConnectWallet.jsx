import { ethers, Contract } from "ethers";
import { autoSaveAddress, toks, toksAddress } from "../../../context/constant";
import { auto } from "../../../context/constant";
import Web3 from "web3";

export const connectWallet = async () => {
  try {
    let [signer, autoSaverContract, ajoTokenContract, provider, chainId] = [
      null,
      null,
      null,
      null,
      null,
    ];

    if (window.ethereum === null) {
      throw new Error("Metamask is not installed");
    }

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    let selectedAccount = accounts[0];

    if (!ethers.isAddress(selectedAccount)) {
      throw new Error("Invalid Ethereum address");
    }

    let chainIdHex = await window.ethereum.request({
      method: "eth_chainId",
    });

    chainId = parseInt(chainIdHex, 16);

    provider = new ethers.BrowserProvider(window.ethereum);
    signer = await provider.getSigner();

    const toksContractAddress = toksAddress.trim();
    const autoSaveContractAddress = autoSaveAddress.trim();

    if (!ethers.isAddress(toksContractAddress) || !ethers.isAddress(autoSaveContractAddress)) {
      throw new Error("Invalid contract address");
    }

    ajoTokenContract = new Contract(toksContractAddress, toks, signer);
    autoSaverContract = new Contract(autoSaveContractAddress, auto, signer);

    const web3 = new Web3(window.ethereum);
    const tokenContract = new web3.eth.Contract(toks, toksAddress);

    const balance = await tokenContract.methods.balanceOf(selectedAccount).call();
    const balanceInWei = ethers.formatUnits(balance.toString(), 18);

    const symbol = await tokenContract.methods.symbol().call();

    console.log("Selected Account:", selectedAccount);
    console.log("Token Balance:", balanceInWei);
    console.log("Token Symbol:", symbol);

    return {
      provider,
      selectedAccount,
      ajoTokenContract,
      autoSaverContract,
      chainId,
      balanceInWei,
      symbol,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};
