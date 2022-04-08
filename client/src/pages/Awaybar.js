import React from "react";

import awayBar from "../assets/awayBar.jpeg";
import { useQuery } from "@apollo/client";

const Awaybar = () => {
  return (
    <div
      className="flex-column justify-flex-start"
      style={{
        backgroundImage: `url(${awayBar})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
      }}
    >
      <main className="flex-row align-center min-100-vh">
        <header className="text-light">
          PourChoices
        </header>
        <div className="col-12 col-lg-12">
          <div className="card">
            <div className="card-body text-light">
              <p>wordy words</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Awaybar;