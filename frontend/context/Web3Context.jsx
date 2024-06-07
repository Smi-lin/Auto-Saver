import { createContext } from "react";

const Web3Context = createContext();

export default Web3Context;







// // Web3Context.js
// import React, { createContext, useState, useEffect } from "react";
// import { ethers } from "ethers";

// // Import the ABI
// import CONTRACT_ABI from "./autoSave.json";

// const Web3Context = createContext();

// const Web3Provider = ({ children }) => {
//   const [selectedAccount, setSelectedAccount] = useState(null);
//   const [autoSaverContract, setAutoSaverContract] = useState(null);

//   useEffect(() => {
//     const initialize = async () => {
//       try {
//         // Check if window.ethereum is available
//         if (!window.ethereum) {
//           console.error("Metamask not detected");
//           return;
//         }

//         // Initialize provider and contract instances
//         const provider = new ethers.providers.Web3Provider(window.ethereum);
//         const signer = provider.getSigner();
//         const contract = new ethers.Contract(
//           "0xC220eeF6Bf7f5Dd9118Fc9f4c264BA4397149d1C",
//           CONTRACT_ABI,
//           signer
//         );

//         // Fetch the selected account from the provider
//         const accounts = await provider.listAccounts();
//         setSelectedAccount(accounts[0]);

//         // Set the contract instance
//         setAutoSaverContract(contract);
//       } catch (error) {
//         console.error("Error initializing Web3:", error);
//       }
//     };

//     initialize();
//   }, []);

//   return (
//     <Web3Context.Provider value={{ selectedAccount, autoSaverContract }}>
//       {children}
//     </Web3Context.Provider>
//   );
// };

// export { Web3Context, Web3Provider };