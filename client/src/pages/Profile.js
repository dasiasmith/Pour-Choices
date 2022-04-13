import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { useLocation, useNavigate } from "react-router-dom";

import { QUERY_USER, QUERY_ME, QUERY_RECIPES } from "../utils/queries";
import profileBar from "../assets/profileBar.png";
import RecipeForm from "../components/RecipeForm";
import RecipeList from "../components/RecipeList";
import Auth from "../utils/auth";
import logo from "../assets/PCLogo.png";
import "../App";

const Profile = () => {
  const navigate = useNavigate();
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <div
        className="flex-column justify-flex-start"
        style={{
          backgroundImage: `url(${profileBar})`,
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
      className=""
      style={{
        backgroundImage: `url(${profileBar})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
        overflowX: "scroll",
      }}
    >
      <header className="text-light flex-column align-center mb-5 p-5">
        <div className="flex-row justify-center">
          <a href="/">
            <img src={logo} />
          </a>
        </div>
        {Auth.loggedIn() && (
          <div className="flex-row justify-center align-center">
            <h5
              className="m-2 decoration-none text-light"
              style={{ cursor: "pointer" }}
              onClick={logout}
            >
              Log out
            </h5>
          </div>
        )}
      </header>
      {/* <Link to="/">Homepage</Link> */}
      <div className="flex-container">
        <div className="flex-row flex-child justify-center text-light">
          <h2 className="col-12 col-md-10 text-light p-3 mb-0">
            <h3> Viewing {Auth.getProfile().data.username}'s recipes</h3>
          </h2>
          <div className="col-12 col-md-10">
            <RecipeList
              recipes={user.recipes}
              title={`${user.username}'s recipes...`}
              showTitle={false}
              showUsername={false}
            />
          </div>
        </div>

        {/* <div className="profile col-md-10">
          <p>&#128516;</p>
          <div class="card-body">
            <p class="card-text">About Me</p>
          </div>
        </div>
        <div className="user-recipe">recipe goes here</div> */}
        {/* <div className="col-12 col-md-10 mb-5"></div>
        {!userParam && (
          <div
            className="col-12 col-md-10 mb-3 p-3"
            style={{ border: "1px dotted #1a1a1a" }}
          ></div>
        )} */}
        {!userParam && (
          <div
            className="flex-child col-12 col-md-10 mb-3 p-3"
            // style={{ border: "1px dotted #1a1a1a" }}
          >
            <RecipeForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
