import React from "react";
import "./HomeLoader.css";
import { FaBox } from "react-icons/fa";

const HomeLoader = () => {
  return (
    <div className="__wrapper">
      <span>
        <FaBox color="#fff" size={60} />
      </span>
      <h1>ÀJọ </h1>
      <div className="spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p>Spend Less And Save More</p>
    </div>
  );
};

export default HomeLoader;