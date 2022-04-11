import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { QUERY_USER, QUERY_ME, QUERY_RECIPES } from "../utils/queries";

import RecipeForm from "../components/RecipeForm";
import RecipeList from "../components/RecipeList";
import Auth from "../utils/auth";

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  console.log("user data---->", user);
  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <main className="flex-row justify-center align-center mb-4 min-100-vh">
        <div className="col-12 col-lg-6">
          <div className="card">
            <h4 className="card-header p-2 text-center"></h4>
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
    );
  }

  return (
    <div>
      <div className="flex-row justify-center mb-3">
        <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
          Viewing {userParam ? `${user.username}'s` : "your"} profile.
        </h2>
        <div className="col-12 col-md-10 mb-5">
          <RecipeList
            recipes={user.recipes}
            title={`${user.username}'s recipes...`}
            showTitle={false}
            showUsername={false}
          />
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
            className="col-12 col-md-10 mb-3 p-3"
            style={{ border: "1px dotted #1a1a1a" }}
          >
            <RecipeForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
