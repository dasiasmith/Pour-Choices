import { responsePathAsArray } from "graphql";
import React, { useEffect, useState, useRef } from "react";


const Auto1 = () => {
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
    console.log(ing) // Logs user input/selection
    const tourl = ing.replace(/ /g,"_"); // Replaces spaces with underscore
    console.log(tourl)
    let ingUrl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i='+tourl
    getCatapi(ingUrl)
  };


  // Returns api data from fetch
  async function getCatapi(link){
    const data = await fetch(link)
    .then(res => res.json())
    const idData = data.drinks //json array of all drinks within the category

    let ingIds = [];
    ingIds.push(...idData.map(drink => drink.idDrink)); // ingIds = array of only drink ids
    localStorage.setItem("ingredientIds", JSON.stringify(ingIds)); // Stores ids locally
  }

  var getingIds = JSON.parse(localStorage.getItem('ingredientIds')) // Get ids from local storage
  console.log(getingIds);

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
  );
};



//-------------------------------------------------//




// Category function
const Auto2 = () => {
  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState("");
  const wrapperRef = useRef(null);

  useEffect(() => {
    const ingredient = [];
      fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list")
      .then(function (response) {
        if (response.status !==200) {
          console.log(response.status);
          return
        }
        response.json().then(function (data) {
          
        for (let i = 0; i < 10; i++ ) {
          ingredient.push(data.drinks[i].strCategory)
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

  // Category search
  const updatecat = cat => {
    setSearch(cat);
    setDisplay(false);
    console.log(cat) // Logs user input/selection
    const tourl = cat.replace(/ /g,"_");
    console.log(tourl)
    let catUrl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c='+tourl
    getCatapi(catUrl)
  };


  // Returns api data from fetch
  async function getCatapi(link){
    const data = await fetch(link)
    .then(res => res.json())
    const idData = data.drinks //json array of all drinks within the category

    let catIds = [];
    catIds.push(...idData.map(drink => drink.idDrink)); // catIds = array of only drink ids
    localStorage.setItem("categoryIds", JSON.stringify(catIds)); // Stores ids locally
  }

  var getcatIds = JSON.parse(localStorage.getItem('categoryIds')) // Get ids from local storage
  console.log(getcatIds);

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
        <div className="autoContainer">
          {options
            .filter((option) => option.indexOf(search) > -1)
            .map((value, i) => {
              return (
                <div
                  onClick={() => updatecat(value)}
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
  );
};









function acomplete() {
  return (
    <div className="App">
      <h1>Choose Your Base</h1>
      <div className="logo"></div>
      <div className="auto-container">
        <Auto1 />
      </div>
      <h1>Choose a Category</h1>
      <div className="logo"></div>
      <div className="auto-container">
        <Auto2 />
      </div>
    </div>
  );
}

export default acomplete;