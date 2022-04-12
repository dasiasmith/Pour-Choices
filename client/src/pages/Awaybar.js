import React from "react";
import HTMLFlipBook from "react-pageflip";
import logo from "../assets/PCLogo.png";
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
        }}
      >
        <main className="flex-column justify-center align-center">
        <header className="text-light mb-5 p-5">
          <img src={logo} />
          <div className="container flex-row justify-space-between-lg align-center">
            <nav>
              <h5>Profile</h5>
            </nav>
            <nav>
              <h5>Logout</h5>
            </nav>
          </div>
        </header>
        {/* <div className="col-12 col-lg-12"> */}
        {/* <div className="card">
              <div className="card-body text-light">
                <p>wordy words</p>
              </div>
            </div> */}
        <HTMLFlipBook width={300} height={500} showCover={true}>
          <div className="book-cover" data-density="hard">
            cover
          </div>
          <div className="book-page">Page 1</div>
          <div className="book-page">Page 2</div>
          <div className="book-page">Page 3</div>
          <div className="book-page">Page 4</div>
        </HTMLFlipBook>
        {/* </div> */}
        </main>
      </div>
  );
};

export default Awaybar;