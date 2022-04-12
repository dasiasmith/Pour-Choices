import React from "react";
import HTMLFlipBook from "react-pageflip";
import logo from "../assets/PCLogo.png";
import awayBar from "../assets/awayBar.jpeg";
lanzBranch
import { useQuery } from "@apollo/client";

const Awaybar = () => {
  return (
      <div
        className="flex-column justify-flex-start"
        style={{
          backgroundImage: `url(${awayBar})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100vw",
        }}
      >
        <main className="flex-column justify-center align-center">
        <header className="text-light mb-5 p-5">
          <img src={logo} />
          <div className="container flex-row justify-space-between-lg align-center">
            <nav>
              <h5>Profile</h5>
            </nav>
            <nav>
              <h5>Logout</h5>
            </nav>
          </div>
        </header>
        {/* <div className="col-12 col-lg-12"> */}
        {/* <div className="card">
              <div className="card-body text-light">
                <p>wordy words</p>
              </div>
            </div> */}
        <HTMLFlipBook width={300} height={500} showCover={true}>
          <div className="book-cover" data-density="hard">
            cover
          </div>
          <div className="book-page">Page 1</div>
          <div className="book-page">Page 2</div>
          <div className="book-page">Page 3</div>
          <div className="book-page">Page 4</div>
        </HTMLFlipBook>
        {/* </div> */}
        </main>
      </div>
  );
};
=======

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

export default function Awaybar(){
  function getRandomCocktail(){
      fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
      .then(
          function(response){
              if (response.status !== 200){
                  console.log('Problemo'+ response.status);
                  return;
              }
              response.json().then(function(data) {
                  // console.log(data);
                  displayRandomCocktail(data);
              });
          }
      )
      .catch(function(err) {
          console.log('Fetch Error :-5', err)
      })
  }
      function displayRandomCocktail(cocktail){
          console.log(cocktail.drinks[0].strDrink) //Gives just drink name

          let drinkSection = document.querySelector('#drink-section');
          let drinkName = document.createElement('h2');
          drinkName.innerHTML = cocktail.drinks[0].strDrink

          drinkSection.appendChild(drinkName)

          let img = document.createElement('img');
          img.src = cocktail.drinks[0].strDrinkThumb;

          drinkSection.appendChild(img);
      }

    return(
        <div>
            <button onClick={getRandomCocktail}>Click Me</button>
            <section style={{ color: "white" }} id="drink-section"></section>
        </div>
        
    )
}


// Alex
// const Awaybar = () => {
//   return (
//     <div
//       className="flex-column justify-flex-start"
//       style={{
//         backgroundImage: `url(${awayBar})`,
//         backgroundPosition: "center",
//         backgroundSize: "cover",
//         backgroundRepeat: "no-repeat",
//         width: "100vw",
//         height: "100vh",
//       }}
//     >
//       <main className="flex-row align-center min-100-vh">
//         <header className="text-light">
//           PourChoices
//         </header>
//         <div className="col-12 col-lg-12">
//           <div className="card">
//             <div className="card-body text-light">
//               <p>wordy words</p>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Awaybar;