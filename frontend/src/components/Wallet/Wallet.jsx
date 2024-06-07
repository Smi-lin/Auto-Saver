import React from "react";
import { useState, useEffect } from "react";
import { connectWallet } from "../utils/ConnectWallet";
import Web3Context from "../../../context/Web3Context";
import WebButton from "../Button/Button";
import { handleAccountChange } from "../utils/handleAccountChange";
import { handleChainChange } from "../utils/handleChainChange";
import { Link, useLocation } from "react-router-dom";

const Wallet = ({ children }) => {
  const [state, setState] = useState({
    provider: null,
    selectedAccount: null,
    autoSaverContract: null,
    ajoTokenContract: null,
    chainId: null,
  });

  const disconnect = () => {
    setState({ selectedAccount: null });
  };

  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  useEffect(() => {
    window.ethereum.on("accountsChanged", () => handleAccountChange(setState));
    window.ethereum.on("chainChanged", () => handleChainChange(setState));

    return () => {
      window.ethereum.removeListener("accountsChanged", () =>
        handleAccountChange(setState)
      );

      window.ethereum.removeListener("chainChanged", () =>
        handleChainChange(setState)
      );
    };
  }, []);

  const handleWallet = async () => {
    try {
      setIsLoading(true);
      const {
        provider,
        selectedAccount,
        ajoTokenContract,
        autoSaverContract,
        chainId,
      } = await connectWallet();
      console.log(
        "Provider:",
        provider,
        "selectedAccount:",
        selectedAccount,
        "autoSaverContract:",
        autoSaverContract,
        "ajoTokenContract:",
        ajoTokenContract,
        "chainId:",
        chainId
      );
      setState({
        provider,
        selectedAccount,
        ajoTokenContract,
        autoSaverContract,
        chainId,
      });
    } catch (error) {
      console.error("Error connecting Wallet: ", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <WebButton
        onClick={handleWallet}
        type="button"
        label={
          state.selectedAccount ? (
            "Disconnect"
          ) : (
            "Connect"
          )
        }
        disabled={isLoading}
      />
      <Web3Context.Provider value={state}>{children}</Web3Context.Provider>
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default Wallet;