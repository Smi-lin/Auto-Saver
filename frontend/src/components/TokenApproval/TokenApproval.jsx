import React from "react";
import "../Withdrawal/Withdraw.css";
import { useRef, useContext } from "react";
import {ethers} from 'ethers'
import Web3Context from '../../../context/Web3Context'
import WebButton from '../Button/Button'
import toast from 'react-hot-toast'
import {useNavigate} from "react-router-dom"


const TokenApproval = () => {
  const {ajoTokenContract, autoSaverContract} = useContext(Web3Context)
  const approveTokenRef = useRef();
  const navigate = useNavigate()

  const approveToken = async (e) => {
    e.preventDefault();

    const amount = approveTokenRef.current.value.trim();
    if (isNaN(amount) || amount <= 0){
      toast.error("Please enter a valid positive number")

      return;
    }

    const amountToSend = ethers.parseUnits(amount, 18).toString();
    try {
      
      const transaction = await ajoTokenContract.approve(
        autoSaverContract.target, amountToSend
      );

      await toast.promise(transaction.wait(),{

        loading :"Transaction is pending....",
        success: "Token Approved!!", 
        error: "Transaction failed"
      })
      navigate('/dashboard')
    } catch (error) {
      console.error("Token Approval Failed", error.message)
    }
  }



  return (
    <div className="container">
      <section className="form-container">
        <h1>Approve Token</h1>
        <form onSubmit={approveToken}>
          <div>
            <label htmlFor="">Token Approval:</label>
            <input type="text" ref={approveTokenRef} placeholder="Enter amount" />
          </div>

          <button onClick={approveToken} type="submit" className="--btn-success --btn --btn-block">Approve</button>
        </form>
      </section>
    </div>
  );
};

export default TokenApproval;