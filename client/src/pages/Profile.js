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

const Profile = () => {
  const navigate = useNavigate();
  // const logout = (event) => {
  //   event.preventDefault();
  //   Auth.logout();
  // };
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
                  <Link to="/signup">Sign up</Link> or{" "}
                  <Link to="/login">log in!</Link>
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
        backgroundImage: `url(${profileBar})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div>
        <Link className="text-light" to="/">
          <h3 className="m-0">Homepage</h3>
        </Link>
      </div>
      <div>
        {Auth.loggedIn() ? (
          <>
            <Link className="btn btn-sm btn-info  m-2" to="/me">
              {Auth.getProfile().data.username}'s profile
            </Link>
            <button
              className="btn btn-sm btn-light m-2"
              onClick={() => {
                navigate("/");
                Auth.logout();
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="btn btn-lg btn-info m-2" to="/login">
              Login
            </Link>
            <Link className="btn btn-lg btn-light m-2" to="/signup">
              Signup
            </Link>
          </>
        )}
      </div>
      {/* <Link to="/">Homepage</Link> */}
      <div className="flex-container">
        <div className="flex-row  flex-child justify-center mb-3">
          <h2 className="col-12 col-md-10  text-dark p-3 mb-5">
            Viewing {userParam ? `${user.username}'s` : "your"} recipes.
          </h2>
          <div className="col-12 col-md-10 mb-5">
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
