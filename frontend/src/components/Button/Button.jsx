import React from "react";

const WebButton = ({ onClick, label }) => {
    return (
      <button onClick={onClick} className="--btn --btn-primary" >
        {label}
      </button>
      
    );
  };
  
  export default WebButton;