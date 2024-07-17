import React from "react";
import { Assets } from "../../assets/assets";

const Header = () => {
  return (
    <div className="bg-primary-color py-2 w-full fixed top-0 z-40">
      <h1 className="w-1/12 m-auto">
        <img src={Assets?.premagic_logo} alt="Logo" />
      </h1>
    </div>
  );
};

export default Header;
