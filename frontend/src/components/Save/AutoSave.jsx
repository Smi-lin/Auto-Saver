import React, { useRef, useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Withdrawal/Withdraw.css";
import Web3Context from "../../../context/Web3Context";
import { ethers } from "ethers";
import AutoSaveContext from "../../../context/AutoSaveContext";
import toast from "react-hot-toast";

const AutoSave = () => {
  const { autoSaverContract, selectedAccount } = useContext(Web3Context);
  const { isReload, setIsReload } = useContext(AutoSaveContext);
  const autoDepositAmountRef = useRef();
  const autoWithdrawAmountRef = useRef();
  const autoDepositTimeRef = useRef();
  const autoWithdrawTimeRef = useRef();
  const currentTime = new Date();
  const [balanceVal, setBalanceVal] = useState('0');

  const automatedDeposit = async (e) => {
    e.preventDefault();

    const inputedTime = autoDepositTimeRef.current.value.trim();
    const [hours, minutes] = inputedTime.split(":");
    const inputTimeDate = new Date();
    inputTimeDate.setHours(hours);
    inputTimeDate.setMinutes(minutes);
    inputTimeDate.setSeconds(0);

    const timeDifference = inputTimeDate.getTime() - currentTime.getTime();
    const timeDifferenceInSeconds = Math.abs(timeDifference / 1000);

    if (timeDifferenceInSeconds <= 0) {
      toast.error("Time must be in the future");
      return;
    }

    const amount = autoDepositAmountRef.current.value.trim();
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid positive number");
      return;
    }

    const timeDifferenceInSecondsToString = Math.round(timeDifferenceInSeconds).toString();
    const amountToDeposit = ethers.parseUnits(amount, 18).toString();
    
    try {
      const transaction = await autoSaverContract.setAutoDeposit(amountToDeposit, timeDifferenceInSecondsToString);
      await toast.promise(transaction.wait(), {
        loading: "Transaction is Pending...",
        success: "Amount Deposited Successfully",
        error: "Transaction Failed",
      });
      autoDepositAmountRef.current.value = "";
      autoDepositTimeRef.current.value = "";
      setIsReload(!isReload);
    } catch (error) {
      toast.error("Auto Deposit Failed");
      console.error(error.message);
    }
  };

  const automatedWithdrawal = async (e) => {
    e.preventDefault();

    const inputedTime = autoWithdrawTimeRef.current.value.trim();
    const [hours, minutes] = inputedTime.split(":");
    const inputTimeDate = new Date();
    inputTimeDate.setHours(hours);
    inputTimeDate.setMinutes(minutes);
    inputTimeDate.setSeconds(0);

    const timeDifference = inputTimeDate.getTime() - currentTime.getTime();
    const timeDifferenceInSeconds = Math.abs(timeDifference / 1000);

    if (timeDifferenceInSeconds <= 0) {
      toast.error("Time must be in the future");
      return;
    }

    const amount = autoWithdrawAmountRef.current.value.trim();
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid positive number");
      return;
    }

    const timeDifferenceInSecondsToString = Math.round(timeDifferenceInSeconds).toString();
    const amountToWithdraw = ethers.parseUnits(amount, 18).toString();

    try {
      const transaction = await autoSaverContract.setAutoWithdraw(amountToWithdraw, timeDifferenceInSecondsToString);
      await toast.promise(transaction.wait(), {
        loading: "Transaction is Pending...",
        success: "Amount Withdrawn Successfully",
        error: "Transaction Failed",
      });
      autoWithdrawAmountRef.current.value = "";
      autoWithdrawTimeRef.current.value = "";
      setIsReload(!isReload);
    } catch (error) {
      toast.error("Auto Withdraw Failed");
      console.error(error.message);
    }
  };

  useEffect(() => {
    const fetchBalanceInfo = async () => {
      try {
        const balanceValueWei = await autoSaverContract.getAutoBalance(selectedAccount);
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

  return (
    <div className="container">
      <section className="form-container">
        <h1>Auto Save Token</h1>
        <div>
          <Link to="/save-asset" className="--btn --btn-success">
            Manual
          </Link>
          <Link to="/auto-save-asset" className="--btn --btn-primary">
            Automated
          </Link>
        </div>
        <form onSubmit={automatedDeposit}>
          <h3>Auto Deposit</h3>
          <div>
            <label htmlFor="">Amount to deposit:</label>
            <input ref={autoDepositAmountRef} type="text" placeholder="Enter amount" />
          </div>
          <div>
            <label htmlFor="">Time to deposit:</label>
            <input ref={autoDepositTimeRef} type="time" defaultValue="00:00" />
          </div>
          <button className="--btn-primary --btn --btn-block">
            Schedule Deposit
          </button>
        </form>

        <form onSubmit={automatedWithdrawal}>
          <h3>Auto Withdraw</h3>
          <div>
            <label htmlFor="">Amount to withdraw:</label>
            <input ref={autoWithdrawAmountRef} type="text" placeholder="Enter amount" />
          </div>
          <div>
            <label htmlFor="">Time to withdraw:</label>
            <input ref={autoWithdrawTimeRef} type="time" defaultValue="00:00" />
          </div>
          <button className="--btn-primary --btn --btn-block">
            Schedule Withdraw
          </button>
        </form>

        <p>Auto Balance: {balanceVal}</p>
      </section>
    </div>
  );
};

export default AutoSave;
