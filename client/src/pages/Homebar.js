import React from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import HTMLFlipBook from "react-pageflip";
import homeBar from "../assets/homeBar.png";
import bookBack from "../assets/bookbackground.jpg";
import { useQuery } from "@apollo/client";
import logo from "../assets/PCLogo.png";
import "./homebar.css";
import Auth from "../utils/auth";
import "../App";
import  Autocomplete  from '../components/Homebar/Autocomplete';
import homeBar from "../assets/homebar.png";
// import { useQuery } from "@apollo/client";

const Homebar = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <div
      className="flex-column justify-flex-start"
      style={{
        backgroundImage: `url(${homeBar})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100vw",
      }}
    >

      <main className="flex-column justify-center align-center">
        <header className="text-light flex-column align-center mb-5 p-5">
          <div className="flex-row justify-center">
            <a href="/">
              <img src={logo} />
            </a>
          </div>
          {Auth.loggedIn() ? (
            <div className="flex-row justify-space-between-lg justify-center align-center">
              <Link className="m-2 mx-5 decoration-none text-light" to="/me">
                <h5>{Auth.getProfile().data.username}'s profile</h5>
              </Link>
              <h5
                className="mx-5 decoration-none text-light"
                style={{ cursor: "pointer" }}
                onClick={logout}
              >
                Logout
              </h5>
            </div>
          ) : (
            <div className="flex-row">
              <Link className="m-2 decoration-none text-light" to="/login">
                <h5>Login</h5>
              </Link>
              <Link className=" m-2 decoration-none text-light" to="/signup">
                <h5>Signup</h5>
              </Link>
            </div>
          )}
        </header>
        {/* <div className="col-12 col-lg-12"> */}
        {/* <div className="card">
            <div className="card-body text-light">
              <p>wordy words</p>
            </div>
          </div> */}
        <div
          style={{
            backgroundImage: `url(${bookBack})`,
            // backgroundPosition: "center",
            // backgroundSize: "cover",
            // backgroundRepeat: "no-repeat",
            // width: "100vw",
          }}
        >
          <HTMLFlipBook width={300} height={500} showCover={true}>
            {/* <div className="book-cover" data-density="hard">
          cover
        </div>
        <div className="book-page">Page 1</div>
        <div className="book-page">Page 2</div>
        <div className="book-page">Page 3</div>
        <div className="book-page">Page 4</div> */}
            <div className="page page-cover page-cover-top" data-density="hard">
              <div className="page-content">
                <h2>BOOK TITLE</h2>
              </div>
            </div>
            <div className="page">
              <div className="page-content">
                <h2 className="page-header">Page header 1</h2>
                <div
                  className="page-image"
                  // style={{background-image: url(images/html/1.jpg)}}
                ></div>
                <div className="page-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                  cursus mollis nibh, non convallis ex convallis eu. Suspendisse
                  potenti. Aenean vitae pellentesque erat. Integer non tristique
                  quam. Suspendisse rutrum, augue ac sollicitudin mollis, eros
                  velit viverra metus, a venenatis tellus tellus id magna.
                  Aliquam ac nulla rhoncus, accumsan eros sed, viverra enim.
                  Pellentesque non justo vel nibh sollicitudin pharetra suscipit
                  ut ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit. In cursus mollis nibh, non convallis ex convallis eu.
                  Suspendisse potenti. Aenean vitae pellentesque erat. Integer
                  non tristique quam. Suspendisse rutrum, augue ac sollicitudin
                  mollis, eros velit viverra metus, a venenatis tellus tellus id
                  magna.
                </div>
                <div className="page-footer">2</div>
              </div>
            </div>
            {/* <!-- PAGES .... --> */}
            <div className="page">
              <div className="page-content">
                <h2 className="page-header">Page header - 15</h2>
                <div
                  className="page-image"
                  // style="background-image: url(images/html/7.jpg)"
                ></div>
                <div className="page-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                  cursus mollis nibh, non convallis ex convallis eu. Suspendisse
                  potenti. Aenean vitae pellentesque erat. Integer non tristique
                  quam. Suspendisse rutrum, augue ac sollicitudin mollis, eros
                  velit viverra metus, a venenatis tellus tellus id magna.
                  Aliquam ac nulla rhoncus, accumsan eros sed, viverra enim.
                  Pellentesque non justo vel nibh sollicitudin pharetra suscipit
                  ut ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit. In cursus mollis nibh, non convallis ex convallis eu.
                  Suspendisse potenti. Aenean vitae pellentesque erat. Integer
                  non tristique quam. Suspendisse rutrum, augue ac sollicitudin
                  mollis, eros velit viverra metus, a venenatis tellus tellus id
                  magna.
                </div>
                <div className="page-footer">16</div>
              </div>
            </div>
            <div className="page">
              <div className="page-content">
                <h2 className="page-header">Page header - 16</h2>
                <div
                  className="page-image"
                  // style="background-image: url(images/html/8.jpg)"
                ></div>
                <div className="page-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                  cursus mollis nibh, non convallis ex convallis eu. Suspendisse
                  potenti. Aenean vitae pellentesque erat. Integer non tristique
                  quam. Suspendisse rutrum, augue ac sollicitudin mollis, eros
                  velit viverra metus, a venenatis tellus tellus id magna.
                  Aliquam ac nulla rhoncus, accumsan eros sed, viverra enim.
                  Pellentesque non justo vel nibh sollicitudin pharetra suscipit
                  ut ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit. In cursus mollis nibh, non convallis ex convallis eu.
                  Suspendisse potenti. Aenean vitae pellentesque erat. Integer
                  non tristique quam. Suspendisse rutrum, augue ac sollicitudin
                  mollis, eros velit viverra metus, a venenatis tellus tellus id
                  magna.
                </div>
                <div className="page-footer">17</div>
              </div>
            </div>
            <div
              className="page page-cover page-cover-bottom"
              data-density="hard"
            >
              <div className="page-content">
                <h2>THE END</h2>
              </div>
            </div>
          </HTMLFlipBook>
        </div>
        {/* </div> */}

      <main className="flex-row align-center min-100-vh">
        <header className="text-light">
          Select your ingredients
        </header> <br></br>
        <div className="center">
      <Autocomplete />
      </div>
      </main>
    </div>  );
};

export default Homebar;
