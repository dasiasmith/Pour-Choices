import React, { useEffect, useState, useRef } from "react";

export default function RandomDrink() {
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
      console.log(cocktail.drinks[0].strDrink); 
  
      let drinkSection = document.querySelector("#drink-section"); 
      let drinkName = document.createElement("h2"); 
      drinkName.innerHTML = cocktail.drinks[0].strDrink; 
  
      drinkSection.appendChild(drinkName); 
  
      let img = document.createElement("img");
      img.src = cocktail.drinks[0].strDrinkThumb + '/preview';
  
      for (let i = 1; i < 16; i++) {
        if (cocktail.drinks[0][`strIngredient${i}`] == null) {
          break;
        }
        let ingredient = document.createElement("li"); // Ingredients listed as list elements
        ingredient.innerHTML =
          cocktail.drinks[0][`strMeasure${i}`] + 
          ":" +
          cocktail.drinks[0][`strIngredient${i}`];
  
        drinkSection.appendChild(ingredient); // Ingredients added to section
      }
    }
  
    return (
      <div>
        <div style={{marginTop: '1rem'}} className="row">
        <h1 className="col-lg-3">Click for Randomly Generated Cocktail</h1>
        <button style={{borderRadius: 5, backgroundColor: 'black', color: 'white'}} onClick={getRandomCocktail}>Random Cocktail</button>
        <section style={{marginLeft: '0.8rem'}} id="drink-section"></section>
        </div>

      </div>
    );
  }
  