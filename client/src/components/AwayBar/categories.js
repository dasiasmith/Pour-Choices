import React, { useEffect, useState, useRef } from "react";
 
 // Category function
 export const Auto2 = ({catIds, setCategoryData}) => {
    const [display, setDisplay] = useState(false);
    const [options, setOptions] = useState([]);
    const [search, setSearch] = useState("");
    const wrapperRef = useRef(null);

    useEffect(() => {
      const ingredient = [];
      fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list")
        .then(function (response) {
          if (response.status !== 200) {
            console.log(response.status);
            return;
          }
          response.json().then(function (data) {
            for (let i = 0; i < 10; i++) {
              ingredient.push(data.drinks[i].strCategory.toLowerCase());
            }
          });
        }
      );
      setOptions(ingredient);
    }, []);

    useEffect(() => {
      window.addEventListener("mousedown", handleClickOutside);
      return () => {
        window.removeEventListener("mousedown", handleClickOutside);
      };
    });

    // Removes dropdown when clicked outside container
    const handleClickOutside = (event) => {
      const { current: wrap } = wrapperRef;
      if (wrap && !wrap.contains(event.target)) {
        setDisplay(false);
      }
    };

    // Category search
    const updatecat = (cat) => {
      setSearch(cat);
      setDisplay(false);
      const tourl = cat.replace(/ /g, "_");
      let catUrl =
        "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=" + tourl;
      getCatapi(catUrl);
    };

    // Returns api data from fetch
    async function getCatapi(link) {
      const data = await fetch(link).then((res) => res.json());
      const idData = data.drinks; //json array of all drinks within the category

      let catArr = [];
      catArr.push(...idData.map((drink) => drink.idDrink)); // catIds = array of only drink ids
      setCategoryData(catArr)
    }

    // Page layout
    // Categories and ingredients use a simple drop down so I don't think there will need to be much styling here
    return (
      <div ref={wrapperRef} className="flex-container flex-column pos-rel">
        <input
          id="auto"
          onClick={() => setDisplay(!display)}
          placeholder="Type to search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
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