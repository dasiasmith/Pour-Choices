import { responsePathAsArray } from "graphql";
import React, { useEffect, useState, useRef } from "react";


const Auto = () => {
  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState("");
  const wrapperRef = useRef(null);

  useEffect(() => {
    const category = [];
      fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list")
      .then(function (response) {
        if (response.status !==200) {
          console.log(response.status);
          return
        }
        response.json().then(function (data) {
          
        for (let i = 0; i < 10; i++ ) {
          category.push(data.drinks[i].strCategory)
        }
        });
      });
      setOptions(category);
  }, []);
  

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleClickOutside = event => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false);
    }
  };

  const updatecat = cat => {
    setSearch(cat);
    setDisplay(false);
  };

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
      <h1>Custom AutoComplete React</h1>
      <div className="logo"></div>
      <div className="auto-container">
        <Auto />
      </div>
    </div>
  );
}

export default acomplete;