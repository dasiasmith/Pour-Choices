import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import loginBar from "../assets/loginBar.jpeg";
import Auth from "../utils/auth";
import logo from "../assets/PCLogo.png";

const Navi = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <div
      className="flex-column justify-flex-start"
      style={{
        backgroundImage: `url(${loginBar})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
      }}
    >
      <header className="text-light flex-row justify-center mb-5 p-5">
        <img src={logo} />
        <div className="flex-row justify-space-between-lg justify-center align-center">
          <nav>
            <h5>Profile</h5>
          </nav>
          <nav>
            <h5>Logout</h5>
          </nav>
        </div>
      </header>
      <main className="flex-column justify-center align-center">
        <div className="col-5 text-light">
          <div className="card float-left w-40">
            <div className="card-body">
            <form onSubmit={handleFormSubmit}>
              <button
                className="btn btn-block"
                style={{ cursor: "pointer" }}
                type="submit"
              >
                Home
              </button>
              </form>
            </div>
          </div>
          <div className="card float-right w-40">
            <div className="card-body">
            <form onSubmit={handleFormSubmit}>
              <button
                className="btn btn-block"
                style={{ cursor: "pointer" }}
                type="submit"
              >
                Away
              </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Navi;
