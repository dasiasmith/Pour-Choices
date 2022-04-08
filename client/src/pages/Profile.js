import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import profileBar from "../assets/profileBar.png";
import Auth from "../utils/auth";

const Profile = () => {
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
                  <a Link to="/signup">
                    Sign up
                  </a>{" "}
                  or <a href="">log in</a>!
                </h4>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div>
      <div className="flex-row justify-center mb-3">
        <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
          Viewing {userParam ? `${user.username}'s` : "your"} profile.
        </h2>

        <div className="col-12 col-md-10 mb-5"></div>
        {!userParam && (
          <div
            className="col-12 col-md-10 mb-3 p-3"
            style={{ border: "1px dotted #1a1a1a" }}
          ></div>
        )}
      </div>
    </div>
  );
};

export default Profile;
