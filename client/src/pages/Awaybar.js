import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import { QUERY_USER, QUERY_ME, QUERY_RECIPES } from "../utils/queries";
import { Link } from "react-router-dom";
import logo from "../assets/PCLogo.png";
import awayBar from "../assets/awayBar.jpeg";
import { useQuery } from "@apollo/client";
import Auth from "../utils/auth";
import "../App";
import { useLocation, useNavigate } from "react-router-dom";

import Auto from "../components/AwayBar";

const Awaybar = () => {
  const navigate = useNavigate();
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN_USER);

  const logout = (event) => {
    event.preventDefault();
    navigate("/");
    Auth.logout();
  };

  if (!user?.username) {
    return (
      <div
        className="flex-column justify-flex-start"
        style={{
          backgroundImage: `url(${awayBar})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100vw",
          height: "100vh"
        }}
      >
        <main className="flex-row justify-center align-center min-100-vh">
          <div className="col-12 col-lg-4">
            <div className="card-error">
              <div className="card-body text-light text-center">
                <h4>
                  You need to be logged in to see this!
                  <br></br>
                  <a href="./signup">Sign up</a>
                  {" or "}
                  <a href="/login">log in</a>!
                </h4>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
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

        <header className="text-light flex-column align-center mb-5 p-5 absolute">
          <div className="flex-row justify-center">
            <a href="/">
              <img src={logo} />
            </a>
          </div>
          {Auth.loggedIn() && (
            <div className="flex-row justify-space-between-lg justify-center align-center">
              <Link className="m-2 mx-5 decoration-none text-light" to="/me">
                <h4>{Auth.getProfile().data.username}'s profile</h4>
              </Link>
              <h4
                className="mx-5 decoration-none text-light"
                style={{ cursor: "pointer" }}
                onClick={logout}
              >
                Logout
              </h4>
            </div>
          )}
        </header>
        <main>
        <Auto/>
        </main>
        </div>
    );
};

export default Awaybar;