import React from "react";
import  Autocomplete  from '../components/Homebar/Autocomplete';
import homeBar from "../assets/homebar.png";
// import { useQuery } from "@apollo/client";

const Homebar = () => {
  return (
    <div
      className="flex-column justify-flex-start"
      style={{
        backgroundImage: `url(${homeBar})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
      }}
    >
      <main className="flex-row align-center min-100-vh">
        <header className="text-light">
          Select your ingredients
        </header> <br></br>
        <div className="center">
      <Autocomplete />
      </div>
      </main>
    </div>
  );
};

export default Homebar;
