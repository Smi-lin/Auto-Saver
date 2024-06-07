import React, { useEffect, useState } from "react";
import HomeLoader from "./HomeLoader/HomeLoader";
import Layout from "./Layout";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);

  return (
    <>
      {isLoading ? (
        <HomeLoader />
      ) : (
        <Layout>
          <section
            className="home"
            style={{ fontFamily: "var(--font-family)" }}
          >
            <div className="all">
              <div className="homeCon">
                <h1>ÀJọ: Your Path to Financial Freedom</h1>
                <p>
                  Dive into a world of smart spending, savvy saving, and secure
                  transactions.
                </p>
              </div>
            </div>
          </section>
        </Layout>
      )}
    </>
  );
};

export default Home;