import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navigate, useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { QUERY_USER, QUERY_ME, QUERY_RECIPES } from "../utils/queries";
import { LOGIN_USER } from "../utils/mutations";
import homeBar from "../assets/homeBar.png";
import { useQuery } from "@apollo/client";
import logo from "../assets/PCLogo.png";
import Auth from "../utils/auth";
import "../App";
import Autocomplete from "../components/Homebar/Autocomplete";
import { useLocation, useNavigate } from "react-router-dom";

const Homebar = () => {
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
          backgroundImage: `url(${homeBar})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100vw",
          height: "100vh",
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
        backgroundImage: `url(${homeBar})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
        overflowY: "scroll"
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
        <Autocomplete />
      </main>
    </div>
  );
};

export default Homebar;
