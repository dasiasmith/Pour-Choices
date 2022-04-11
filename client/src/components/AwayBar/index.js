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
          console.log(category)
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
            // .filter(({ category }) => category.indexOf(search) > -1)
            .map((value, i) => {
              return (
                <div
                  onClick={() => updatecat(value.strCategory)}
                  className="option"
                  key={i}
                  tabIndex="0"
                >
                  <span>{value.strCategory}</span>
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



// import React, { useEffect, useState, useRef } from "react";


// const Auto = () => {
//   const [display, setDisplay] = useState(false);
//   const [options, setOptions] = useState([]);
//   const [search, setSearch] = useState("");
//   const wrapperRef = useRef(null);

//   useEffect(() => {
//     const category = [];
//     const promises = new Array(20)
//       .fill()
//       .map((v, i) => fetch(`https://pokeapi.co/api/v2/category-form/${i + 1}`));
//     Promise.all(promises).then(categoryArr => {
//       return categoryArr.map(value =>
//         value
//           .json()
//           .then(({ name, sprites: { front_default: sprite } }) =>
//             category.push({ strCategory, sprite })
//           )
//       );
//     });
//     setOptions(category);
//   }, []);

//   useEffect(() => {
//     window.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       window.removeEventListener("mousedown", handleClickOutside);
//     };
//   });

//   const handleClickOutside = event => {
//     const { current: wrap } = wrapperRef;
//     if (wrap && !wrap.contains(event.target)) {
//       setDisplay(false);
//     }
//   };

//   const updatePokeDex = cat => {
//     setSearch(cat);
//     setDisplay(false);
//   };

//   return (
//     <div ref={wrapperRef} className="flex-container flex-column pos-rel">
//       <input
//         id="auto"
//         onClick={() => setDisplay(!display)}
//         placeholder="Type to search"
//         value={search}
//         onChange={event => setSearch(event.target.value)}
//       />
//       {display && (
//         <div className="autoContainer">
//           {options
//             .filter(({ strCategory }) => strCategory.indexOf(search.toLowerCase()) > -1)
//             .map((value, i) => {
//               return (
//                 <div
//                   onClick={() => updatePokeDex(value.strCategory)}
//                   className="option"
//                   key={i}
//                   tabIndex="0"
//                 >
//                   <span>{value.strCategory}</span>
//                   <img src={value.sprite} alt="category" />
//                 </div>
//               );
//             })}
//         </div>
//       )}
//     </div>
//   );
// };

// function acomplete() {
//   return (
//     <div className="App">
//       <h1>Custom AutoComplete React</h1>
//       <div className="logo"></div>
//       <div className="auto-container">
//         <Auto />
//       </div>
//     </div>
//   );
// }

// export default acomplete;