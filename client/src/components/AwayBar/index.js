import { responsePathAsArray } from "graphql";
import React, { useEffect, useState, useRef } from "react";
import { Auto2 } from "./categories";
import { Auto1 } from "./ingredients";

export default function Acomplete() {
  const [ingData, setingData] = useState([])
  const [catData, setcatData] = useState([])

  const commonIds = ingData.filter(function (o1) {
    return catData.some(function (o2) {
        return o1.id === o2.id; // return the ones with equal id
   });
  });
  
  commonIds.forEach(element => getidUrl(element));

  function getidUrl(arr){
    let idUrl = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
    idUrl = idUrl + [arr]
    console.log(idUrl)

    getCocktail(idUrl)
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
  
      let cocktailSection = document.querySelector("#cocktail-section");
      let cocktailName = document.createElement("h2");
      cocktailName.innerHTML = cocktail.drinks[0].strDrink;
  
      cocktailSection.appendChild(cocktailName);
  
      let img = document.createElement("img");
      img.src = cocktail.drinks[0].strDrinkThumb;
  
      cocktailSection.appendChild(img);
  
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
  
        cocktailSection.appendChild(ingredient);
      }
  
      let drinkCard = document.createElement("li");
      drinkCard.innerHTML = cocktail.drinks[0].strInstructions;
  
      cocktailSection.appendChild(drinkCard);
    }
    
  }



  return (
    <div className="App">
      <h1>Choose Your Base</h1>
      <div className="logo"></div>
      <div className="auto-container">
        <Auto1 ingIds = {ingData} setIngredientData = {setingData}/>
      </div>
      <h1>Choose a Category</h1>
      <div className="logo"></div>
      <div className="auto-container">
        <Auto2 catIds = {catData} setCategoryData = {setcatData}/>
      </div>
      <h1>You should order:</h1>
      <section style={{
          height: '500px',
          overflow: 'auto',}} id="cocktail-section"></section>
      </div>
  );
}