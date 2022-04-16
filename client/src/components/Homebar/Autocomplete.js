import React, { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Cocktail from "../Cocktail";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CheckboxesTags() {
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const [singleDrink, setSingleDrink] = useState([]);

  //get list of ingredients for the user
  useEffect(() => {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list")
      .then((res) => res.json())
      .then((data) => {
        let newData = data.drinks;
        newData = newData.map((ele) => {
          const title = ele.strIngredient1;
          return { title: title };
        });
        setData(newData);
      });
  }, []);
  console.log("my selected: ", selected);
  //fetch a list based on the selected ingredients
  const fetchList = () => {
    const query = selected.map((element) => element.title).join();
    console.log("query ===", query);
    fetch(
      `https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=${query}`
    )
      .then((res) => res.json())
      .then((data) => {
        let newData2 = data.drinks;
        console.log(newData2);
        if (newData2.length && newData2 !== "None Found") {
          setList(newData2);
        } else {
          setList([]);
        }
      });
  };
  console.log(list);
  const fetchRecipe = (id) => {
    fetch(
      `https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setIsFetched(true);
        let newData3 = data.drinks[0];
        // setSingleDrink(newData3)
        console.log(newData3);
        let ing = [];
        let mea = [];
        for (let i = 1; i < 15; i++) {
          console.log(newData3[`strIngredient${i}`]);
          newData3[`strIngredient${i}`] &&
            ing.push(newData3[`strIngredient${i}`]);
          newData3[`strIngredient${i}`] && mea.push(newData3[`strMeasure${i}`]);
        }
        newData3.ingredients = ing;
        newData3.measurements = mea;
        setSingleDrink(newData3);
        console.log(ing);
        console.log(mea);
        console.log(singleDrink, "sin");
      });
  };
  // renders the checkbox and its items
  return (
    <>
      <Autocomplete
        multiple
        id="checkboxes-tags-demo"
        options={data}
        onChange={(e, newValue) => {
          console.log(newValue);
          setSelected(newValue);
        }}
        onClose={(e) => {
          // fetchList();
          if (selected.length) fetchList();
          // alert("fetch me the stuff")
        }}
        disableCloseOnSelect
        getOptionLabel={(option) => option.title}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.title}
          </li>
        )}
        style={{ width: 500, background: "white", margin: 30}}
        renderInput={(params) => (
          <TextField {...params} label="" placeholder="Ingredients" />
        )}
      />
      {/* populates the drinks options and their images */}
      <div className="row w-100"> 
        <div className="col-9 flex-row justify-center">
          {list.length > 0
            ? list.map((e) => (
                <Cocktail cocktail={e} fetchRecipe={fetchRecipe} />
              ))
            : // returns no data if the user selected ingredients that can't generate a cocktail
              null}
          {selected.length && !list.length ? (
            <div>
              <p style={{ color: "white" }}></p>
            </div>
          ) : null}
          {/* renders the recipe and the ingredients for the cocktail */}
        </div>
        {isFetched && (
          <div className="col-3 mt-2 ing-card" style={{ color: "white" }}>
            <h2>Ingredients</h2>

            <ul>
              {singleDrink.ingredients?.map((item, index) => (
                <li key={index}>
                  {item} : {singleDrink.measurements[index]}
                </li>
              ))}
            </ul>
            <p>
              <b>Instructions:</b> {singleDrink.strInstructions}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
