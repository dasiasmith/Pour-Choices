import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import loginBar from "../assets/loginBar.jpeg";
import Auth from "../utils/auth";
import logo from "../assets/PCLogo.png";
import { useLocation, useNavigate } from "react-router-dom";

const Login = (props) => {
  const navigate = useNavigate();
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

  const logout = (event) => {
    event.preventDefault();
    navigate("/");
    Auth.logout();
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
      <main className="flex-column justify-center align-center">
        <header className="text-light flex-column align-center mb-5 p-5">
          <div className="flex-row justify-center">
            <img src={logo} />
          </div>
          {Auth.loggedIn() ? (
            <div className="flex-row justify-space-between-lg justify-center align-center">
              <h4
                className="m-2"
                style={{ cursor: "pointer" }}
                onClick={logout}
              >
                Log out
              </h4>
            </div>
          ) : (
            <div className="flex-row">
              <Link className="m-2 decoration-none text-light" to="/signup">
                <h4>Sign up</h4>
              </Link>
            </div>
          )}
        </header>
        <div className="col-12 col-lg-4">
          <div className="card">
            <h1 className="card-header text-dark text-center">Login</h1>
            <div className="card-body">(
                <form onSubmit={handleFormSubmit}>
                  <input
                    className="form-input"
                    placeholder="Email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                  />
                  <input
                    className="form-input"
                    placeholder="******"
                    name="password"
                    type="password"
                    value={formState.password}
                    onChange={handleChange}
                  />
                  <button
                    className="btn btn-block"
                    style={{ cursor: "pointer" }}
                    type="submit"
                  >
                    Submit
                  </button>
                </form>

              {error && (
                <div className="my-3 p-3 bg-danger text-white">
                  {error.message}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
