import React from "react";
import "./cocktail.css";

const Cocktail = ({cocktail, fetchRecipe}) => {
return (
    <div className="cocktail-card" key={cocktail.idDrink} style={{ cursor: 'pointer'}}>
    <p style={{color: 'white' }}> {cocktail.strDrink} </p>
      <img
        src={cocktail.strDrinkThumb}
        onClick={() => fetchRecipe(cocktail.idDrink)}
        alt="alt"
        width="120px"
        height="120px"
      />
   
  </div>


)
}

export default Cocktail;