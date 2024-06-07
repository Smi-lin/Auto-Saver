import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Load from "../HomeLoader/Load";
import Layout from "../Layout";
import { Link } from "react-router-dom";
import { connectWallet } from "../utils/ConnectWallet";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [walletAddress, setWalletAddress] = useState(null);
  const [walletBalance, setWalletBalance] = useState(null);
  const [walletSymbol, setWalletSymbol] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const walletData = await connectWallet();
        setWalletAddress(walletData.selectedAccount);

        setWalletBalance(walletData.balanceInWei);
        setWalletSymbol(walletData.symbol);
        setLoading(false);
      } catch (error) {
        console.error("Error connecting wallet:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <Load />
      ) : (
        <Layout>
          <section className="dashboard__">
            <nav>
              <p>Wallet Address: {walletAddress}</p>
              <p>
                Available Balance: {walletBalance} {walletSymbol}{" "}
              </p>

              <div>
                <Link to="/save-asset" className="--btn --btn-primary">
                  Save Token
                </Link>

                <Link to="/token-approval" className="--btn --btn-danger">
                  Approve Token
                </Link>
              </div>
            </nav>
          </section>
        </Layout>
      )}
    </>
  );
};

export default Dashboard;