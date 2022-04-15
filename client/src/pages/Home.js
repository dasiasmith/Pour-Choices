import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { QUERY_USER, QUERY_ME, QUERY_RECIPES } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import loginBar from "../assets/loginBar.jpeg";
import Auth from "../utils/auth";
import logo from "../assets/PCLogo.png";
import { useLocation, useNavigate } from "react-router-dom";

const Home = (props) => {
  const navigate = useNavigate();
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // // submit form
  // const handleFormSubmit = async (event) => {
  //   event.preventDefault();
  //   console.log(formState);
  //   try {
  //     const { data } = await login({
  //       variables: { ...formState },
  //     });

  //     Auth.login(data.login.token);
  //   } catch (e) {
  //     console.error(e);
  //   }

  //   // clear form values
  //   setFormState({
  //     email: "",
  //     password: "",
  //   });
  // };

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
          backgroundImage: `url(${loginBar})`,
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
                  <Link to="/signup">Sign up</Link>
                  {" or "}
                  <Link to="/login">log in</Link>!
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
        backgroundImage: `url(${loginBar})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
      }}
    >
      <header className="text-light flex-column align-center mb-5 p-5">
        <div className="flex-row justify-center">
          <img src={logo} />
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
              Log out
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
      <main className="flex-column justify-center align-center text-light m-5">
        <h1>Where are you?</h1>
        <div className="col-5 text-light ">
          <div className="card float-left w-40">
            <div className="card-body">
              <form>
                <Link
                  className="btn btn-block"
                  style={{ cursor: "pointer" }}
                  Link
                  to="/Homebar"
                >
                  Home
                </Link>
              </form>
            </div>
          </div>
          <div className="card float-right w-40">
            <div className="card-body">
              <form>
                <Link
                  className="btn btn-block"
                  style={{ cursor: "pointer" }}
                  Link
                  to="/Awaybar"
                >
                  Away
                </Link>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
