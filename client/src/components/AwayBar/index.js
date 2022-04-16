import React, { useEffect, useState, useRef } from "react";
import { Auto2 } from "./categories";
import { Auto1 } from "./ingredients";
import randomDrink from "./randomCocktail";
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
    console.log(idUrl);

    getCocktail(idUrl);
    function getCocktail(link) {
      fetch(link)
        .then(function (response) {
          if (response.status !== 200) {
            console.log("Problemo" + response.status);
            return;
          }
          response.json().then(function (data) {
            console.log(data);
            displayCocktail(data);
          });
        })
        .catch(function (err) {
          console.log("Fetch Error :-5", err);
        });
    }
    function displayCocktail(cocktail) {
      console.log(cocktail.drinks[0].strDrink); //Gives just drink name

      let cocktailSection = document.querySelector("#cocktail-section"); // This is the same setup as the randomCocktail.js. Drinks are listed as list elements
      let cocktailName = document.createElement("h2");
      cocktailName.innerHTML = cocktail.drinks[0].strDrink; // const name = cocktail.drinks[0].strDrink

      cocktailSection.appendChild(cocktailName); // If you want to change the style just change the create element

      let img = document.createElement("img");
      img.src = cocktail.drinks[0].strDrinkThumb; // drinkImg = cocktail.drink[0].strDrinkThumb

      cocktailSection.appendChild(img);

      for (let i = 1; i < 16; i++) {
        console.log(i);
        if (cocktail.drinks[0][`strIngredient${i}`] == null) {
          break;
        }
        let ingredient = document.createElement("li");
        ingredient.innerHTML =
          cocktail.drinks[0][`strMeasure${i}`] + // const measurement = cocktail.drink[0][`strMeasure${i}`]
          ":" +
          cocktail.drinks[0][`strIngredient${i}`]; // const ingredient = cocktail.drink[0][`strIngredient${i}`]

        cocktailSection.appendChild(ingredient);
      }

      let drinkCard = document.createElement("li");
      drinkCard.innerHTML = cocktail.drinks[0].strInstructions; // again, instructions might not be needed bc user is ordering not making

      cocktailSection.appendChild(drinkCard);
    }
  }

  return (
    <div className="text-light container m-5">
      <div class="row">
        <div class="col-lg-3">
          <div class="m-5">
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
        <div class="col-lg-8">
        <h1 className="flex-column">You should order:</h1>
          <div class="result-card">
            <section style={{
          height: '500px',
          overflow: 'auto',}} id="cocktail-section"></section>
          </div>
        </div>
      </div>
      <randomDrink />
    </div>
  );
}
