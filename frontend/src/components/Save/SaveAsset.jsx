import React, { useRef, useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Withdrawal/Withdraw.css";
import Web3Context from "../../../context/Web3Context";
import { ethers } from "ethers";
import AutoSaveContext from "../../../context/AutoSaveContext";
import toast from "react-hot-toast";

const SaveAsset = () => {
  const { autoSaverContract, selectedAccount } = useContext(Web3Context);
  const { isReload, setIsReload } = useContext(AutoSaveContext);
  const depositAmountRef = useRef();
  const withdrawAmountRef = useRef();
  const [balanceVal, setBalanceVal] = useState('0');

  useEffect(() => {
    const fetchBalanceInfo = async () => {
      try {
        const balanceValueWei = await autoSaverContract.manualBalances(selectedAccount);
        const balanceValueEth = ethers.formatUnits(balanceValueWei, 18).toString();
        const roundedBalance = parseFloat(balanceValueEth).toFixed(2);
        setBalanceVal(roundedBalance);
      } catch (error) {
        toast.error("Error Fetching Balance");
        console.error(error.message);
      }
    };
    const interval = setInterval(() => {
      autoSaverContract && fetchBalanceInfo();
    }, 2000);
    return () => clearInterval(interval);
  }, [autoSaverContract, selectedAccount]);

  const depositToken = async (e) => {
    e.preventDefault();
    const amount = depositAmountRef.current.value.trim();

    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid positive number");
      return;
    }

    const amountToDeposit = ethers.parseUnits(amount, 18).toString();
    try {
      const transaction = await autoSaverContract.deposit(amountToDeposit);
      await toast.promise(transaction.wait(), {
        loading: "Transaction is Pending...",
        success: "Amount Deposited Successfully",
        error: "Transaction Failed",
      });

      depositAmountRef.current.value = "";
      setIsReload(!isReload);
    } catch (error) {
      toast.error("Deposit Failed");
      console.error(error.message);
    }
  };

  const withdrawToken = async (e) => {
    e.preventDefault();
    const amount = withdrawAmountRef.current.value.trim();

    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid positive number");
      return;
    }

    const amountToWithdraw = ethers.parseUnits(amount, 18).toString();
    try {
      const transaction = await autoSaverContract.withdraw(amountToWithdraw);
      await toast.promise(transaction.wait(), {
        loading: "Transaction is Pending...",
        success: "Amount Withdrawn Successfully",
        error: "Transaction Failed",
      });

      withdrawAmountRef.current.value = "";
      setIsReload(!isReload);
    } catch (error) {
      toast.error("Withdraw Failed");
      console.error(error.message);
    }
  };

  return (
    <div className="container">
      <section className="form-container">
        <h1>Save Token</h1>
        <div>
          <Link to="/save-asset" className="--btn --btn-success">
            Manual
          </Link>
          <Link to="/auto-save-asset" className="--btn --btn-primary">
            Automated
          </Link>
        </div>
        <form onSubmit={depositToken}>
          <div>
            <label htmlFor="">Deposit Amount:</label>
            <input ref={depositAmountRef} type="text" placeholder="Enter amount" />
          </div>
          <button type="submit" onClick={depositToken} className="--btn-primary --btn --btn-block">
            Deposit
          </button>
        </form>
        <form onSubmit={withdrawToken}>
          <div>
            <label htmlFor="">Withdraw Amount:</label>
            <input ref={withdrawAmountRef} type="text" placeholder="Enter amount" />
          </div>
          <button type="submit" onClick={withdrawToken} className="--btn-danger --btn --btn-block">
            Withdraw
          </button>
        </form>
        <p>Balance: <span> {balanceVal}</span></p>
      </section>
    </div>
  );
};

export default SaveAsset;
