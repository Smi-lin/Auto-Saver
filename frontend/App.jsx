import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./src/components/Home";
import Dashboard from "./src/components/Dashboard/Dashboard";
import Layout from "./src/components/Layout";
import WithdrawalPage from "./src/components/Withdrawal/WithdrawalPage";
import WithsrawalSuccess from "./src/components/Withdrawal/WithdrawalSuccess";
import SaveAsset from "./src/components/Save/SaveAsset";
import AutoSave from "./src/components/Save/AutoSave";
import Wallet from "./src/components/Wallet/Wallet";
import TokenApproval from "./src/components/TokenApproval/TokenApproval";
import { AutoSaveProvider } from "./context/AutoSaveContext";

function App() {
  return (
    <>
      <Wallet>
        <AutoSaveProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/withdrawal-page"
              element={
                <Layout>
                  <WithdrawalPage />
                </Layout>
              }
            />

            <Route
              path="/save-asset"
              element={
                <Layout>
                  <SaveAsset />
                </Layout>
              }
            />
            <Route
              path="/auto-save-asset"
              element={
                <Layout>
                  <AutoSave />
                </Layout>
              }
            />
            <Route
              path="/withdrawal-success-page"
              element={<WithsrawalSuccess />}
            />

            <Route path="/token-approval" element={<TokenApproval />} />
          </Routes>
        </AutoSaveProvider>
      </Wallet>
    </>
  );
}

export default App;