import React from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router";
const ProFastLogo = () => {
  return (
    <Link to="/">
      <div className="flex items-end">
        <img className="mb-4" src={logo} alt="" />
        <p className="text-[32px] font-extrabold -ml-4">Profast</p>
      </div>
    </Link>
  );
};

export default ProFastLogo;
