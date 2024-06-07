import React from "react";
import { FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Withdraw.css"

const WithsrawalSuccess = () => {
  return (
    <div className="withdrawalSuccWrapper">
      <span>
        <FaCheck color="green" size={55}/>
      </span>

      <div>
        <p>Withdrawal Successful</p>
        <p>You have successfully withdrawn $100 in to your wallet</p>

        <Link to="/" className="">Dismiss</Link>
      </div>
    </div>
  );
};

export default WithsrawalSuccess;