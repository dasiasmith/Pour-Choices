import React, { useEffect, useState, useRef } from "react";

export const Auto1 = ({ingIds, setIngredientData}) => {
    const [display, setDisplay] = useState(false);
    const [options, setOptions] = useState([]);
    const [search, setSearch] = useState("");
    const wrapperRef = useRef(null);
  
    useEffect(() => {
      const ingredient = [];
        fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list") //List of bases
        .then(function (response) {
          if (response.status !==200) {
            console.log(response.status);
            return
          }
          response.json().then(function (data) {
            
          for (let i = 0; i < 100; i++ ) {
            ingredient.push(data.drinks[i].strIngredient1.toLowerCase())
          }
          });
        });
        setOptions(ingredient);
    }, []);
    
  
    useEffect(() => {
      window.addEventListener("mousedown", handleClickOutside);
      return () => {
        window.removeEventListener("mousedown", handleClickOutside);
      };
    });
  
    // Removes dropdown when clicked outside container
    const handleClickOutside = event => {
      const { current: wrap } = wrapperRef;
      if (wrap && !wrap.contains(event.target)) {
        setDisplay(false);
      }
    };
  
    // Ingredient search
    const updateIng = ing => {
      setSearch(ing);
      setDisplay(false);
      const tourl = ing.replace(/ /g,"_"); // Replaces spaces with underscore
      let ingUrl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i='+tourl
      getCatapi(ingUrl)
    };
  
  
    // Returns api data from fetch
    async function getCatapi(link){
      const data = await fetch(link)
      .then(res => res.json())
      const idData = data.drinks //json array of all drinks within the category
  
      let ingArr = [];
      ingArr.push(...idData.map(drink => drink.idDrink)); // ingArr = array of only drink ids
      setIngredientData(ingArr)
    }
    
    // Page layout
    return (
      <div ref={wrapperRef} className="flex-container flex-column pos-rel">
        <input
          id="auto"
          onClick={() => setDisplay(!display)}
          placeholder="Type to search"
          value={search}
          onChange={event => setSearch(event.target.value)}
        />
        {display && (
          <div className="autoContainer" style={{
          height: '100px',
          overflow: 'auto',}}>
            {options
              
              .filter((option) => option.indexOf(search) > -1)
              .map((value, i) => {
                return (
                  <div
                  
                    onClick={() => updateIng(value)}
                    className="option"
                    key={i}
                    tabIndex="0"
                  >
                    <span>{value}</span>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    )
  }