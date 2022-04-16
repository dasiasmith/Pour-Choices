import React, { useEffect, useState, useRef } from "react";
import { Auto2 } from "./categories";
import { Auto1 } from "./ingredients";
import RandomDrink from "./randomCocktail";
import "./suggest.css";
export default function Acomplete() {
  const [ingData, setingData] = useState([]);
  const [catData, setcatData] = useState([]);

  const commonIds = ingData.filter(function (o1) {
    return catData.some(function (o2) {
      return o1.id === o2.id; // return the ones with equal id
    });
  });

  commonIds.forEach((element) => getidUrl(element));

  function getidUrl(arr) {
    let idUrl = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";
    idUrl = idUrl + [arr];

    getCocktail(idUrl);
    function getCocktail(link) {
      fetch(link)
        .then(function (response) {
          if (response.status !== 200) {
            console.log("Problemo" + response.status);
            return;
          }
          response.json().then(function (data) {
            displayCocktail(data);
          });
        })
        .catch(function (err) {
          console.log("Fetch Error :-5", err);
        });
    }
    function displayCocktail(cocktail) {
      let cocktailSection = document.querySelector("#cocktail-section"); 
      let cocktailName = document.createElement("h2");
      cocktailName.innerHTML = cocktail.drinks[0].strDrink; 

      cocktailSection.appendChild(cocktailName); 

      let img = document.createElement("img");
      
      img.src = cocktail.drinks[0].strDrinkThumb + '/preview';
      img.setAttribute("id", "drinkimg")

      cocktailSection.appendChild(img);

      for (let i = 1; i < 16; i++) {
        if (cocktail.drinks[0][`strIngredient${i}`] == null) {
          break;
        }
        let ingredient = document.createElement("li");
        ingredient.innerHTML =
          cocktail.drinks[0][`strMeasure${i}`] +
          ":" +
          cocktail.drinks[0][`strIngredient${i}`];

        cocktailSection.appendChild(ingredient);
      }

      let drinkCard = document.createElement("li");
      drinkCard.innerHTML = cocktail.drinks[0].strInstructions; 

      cocktailSection.appendChild(drinkCard);
    }
  }

  return (
    <div className="text-light container m-5">
      <div className="row">
        <div className="col-lg-3">
          <div className="m-5">
            <h1>
              Choose Your Base
              <Auto1 ingIds={ingData} setIngredientData={setingData} />
            </h1>
            <h1>
              Choose a Category
              <Auto2 catIds={catData} setCategoryData={setcatData} />
            </h1>
          </div>
        </div>
        <div className="col-lg-8">
        <h1 >You should order:</h1>
          <div className="result-card">
            <section style={{
          height: '500px',
          overflow: 'auto',}} id="cocktail-section"></section>
          </div>
        </div>
      </div>
      <RandomDrink/>
    </div>
  );
}
