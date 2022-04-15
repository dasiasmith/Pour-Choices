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
        minheight: "100vh",
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
        </main>
        </div>
    );
};

export default Awaybar;

// import { useParams } from 'react-router-dom';
// import { useQuery } from '@apollo/client';

// export default function Awaybar(){
//   function getRandomCocktail(){
//       fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
//       .then(
//           function(response){
//               if (response.status !== 200){
//                   console.log('Problemo'+ response.status);
//                   return;
//               }
//               response.json().then(function(data) {
//                   // console.log(data);
//                   displayRandomCocktail(data);
//               });
//           }
//       )
//       .catch(function(err) {
//           console.log('Fetch Error :-5', err)
//       })
//   }
//       function displayRandomCocktail(cocktail){
//           console.log(cocktail.drinks[0].strDrink) //Gives just drink name

//           let drinkSection = document.querySelector('#drink-section');
//           let drinkName = document.createElement('h2');
//           drinkName.innerHTML = cocktail.drinks[0].strDrink

//           drinkSection.appendChild(drinkName)

//           let img = document.createElement('img');
//           img.src = cocktail.drinks[0].strDrinkThumb;

//           drinkSection.appendChild(img);
//       }

//     return(
//         <div>
//             <button onClick={getRandomCocktail}>Click Me</button>
//             <section style={{ color: "white" }} id="drink-section"></section>
//         </div>

//     )
// }
