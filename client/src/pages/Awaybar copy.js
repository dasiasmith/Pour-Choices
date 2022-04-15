import { React, Autocomplete } from "react";

import awayBar from "../assets/awayBar.jpeg";
import Auto from "../components/AwayBar";
import { useQuery } from "@apollo/client";

export default function Awaybar() {
  function getRandomCocktail() {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
      .then(function (response) {
        if (response.status !== 200) {
          console.log("Problemo" + response.status);
          return;
        }
        response.json().then(function (data) {
          // console.log(data);
          displayRandomCocktail(data);
        });
      })
      .catch(function (err) {
        console.log("Fetch Error :-5", err);
      });
  }
    function displayRandomCocktail(cocktail) {
    console.log(cocktail.drinks[0].strDrink); //Gives just drink name

    let drinkSection = document.querySelector("#drink-section");
    let drinkName = document.createElement("h2");
    drinkName.innerHTML = cocktail.drinks[0].strDrink;

    drinkSection.appendChild(drinkName);

    let img = document.createElement("img");
    img.src = cocktail.drinks[0].strDrinkThumb;

    drinkSection.appendChild(img);

    for (let i = 1; i < 16; i++) {
      console.log(i);
      if (cocktail.drinks[0][`strIngredient${i}`] == null) {
        break;
      }
      let ingredient = document.createElement("li");
      ingredient.innerHTML =
        cocktail.drinks[0][`strMeasure${i}`] +
        ":" +
        cocktail.drinks[0][`strIngredient${i}`];

      drinkSection.appendChild(ingredient);
    }

    let card = document.createElement("li");
    card.innerHTML = cocktail.drinks[0].strInstructions;

    drinkSection.appendChild(card);
  }


  return (
    <div>
      <h1>What are you in the mood for?</h1>
      <Auto/>
      <div><h1>Click for Randomly Generate Cocktal</h1>
      <button onClick={getRandomCocktail}>Random Cocktail</button>
      </div>
      <section id="drink-section"></section>
    </div>
  );
}
