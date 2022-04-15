import React, { useEffect, useState, useRef } from "react";

export default function randomDrink() {
    function getRandomCocktail() {
      fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
        .then(function (response) {
          if (response.status !== 200) {
            console.log("Problemo" + response.status);
            return;
          }
          response.json().then(function (data) {
            displayRandomCocktail(data);
          });
        })
        .catch(function (err) {
          console.log("Fetch Error :-5", err);
        });
    }
      function displayRandomCocktail(cocktail) {
      console.log(cocktail.drinks[0].strDrink); //Gives just drink name
  
      let drinkSection = document.querySelector("#drink-section"); // id name in html where drink section will be
      let drinkName = document.createElement("h2"); // Creates h2 element
      drinkName.innerHTML = cocktail.drinks[0].strDrink; // Drink name filled in h2 element
  
      drinkSection.appendChild(drinkName); // Name added to section
  
      let img = document.createElement("img");
      img.src = cocktail.drinks[0].strDrinkThumb;
  
      drinkSection.appendChild(img); // Image added to section
  
      for (let i = 1; i < 16; i++) {
        console.log(i);
        if (cocktail.drinks[0][`strIngredient${i}`] == null) {
          break;
        }
        let ingredient = document.createElement("li"); // Ingredients listed as list elements
        ingredient.innerHTML =
          cocktail.drinks[0][`strMeasure${i}`] + // This currently shows as '1 oz : Vodka' but bc this is an away bar I think we can only add the ingredients
          ":" +
          cocktail.drinks[0][`strIngredient${i}`];
  
        drinkSection.appendChild(ingredient); // Ingredients added to section
      }
  
      let card = document.createElement("li");
      card.innerHTML = cocktail.drinks[0].strInstructions;
  
      drinkSection.appendChild(card); // I think we can delete this bc the user is not making the drink only ordering
    }
  
  
    return (
      <div>
        <div><h1>Click for Randomly Generated Cocktail</h1>
        <button onClick={getRandomCocktail}>Random Cocktail</button>
        </div>
        <section id="drink-section"></section>
      </div>
    );
  }
  