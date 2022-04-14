import React, { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CheckboxesTags() {
  const [data, setData] = useState([]);
  const [drinkid, setDrinkid] = useState([]);
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState([]);
  const [title, setTitle] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const [singleDrink, setSingleDrink] = useState([])

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
        setIsFetched(true)
        let newData3 = data.drinks[0];
        setSingleDrink(newData3)
        //console.log(newData3);
      });
  };

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
          fetchList();
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
        style={{ width: 500, background: 'white' }}
        renderInput={(params) => (
          <TextField {...params} label="Checkboxes" placeholder="Favorites" />
        )}
      />

      <div className="row">
        {list.length > 0 ? (
          list.map((e) => (
            <div key={e.idDrink} style={{ cursor: 'pointer'}}>
              <p style={{color: 'white'}}> {e.strDrink} </p>
                <img
                  src={e.strDrinkThumb}
                  onClick={() => fetchRecipe(e.idDrink)}
                  alt="alt"
                  width="40px"
                  height="40px"
                />
             
            </div>
          ))
          
        ) : (
          <div>
            <p style={{ color: "white" }}>no data</p>
          </div>
        )}
      </div>
      {
        isFetched && <div style={{color: 'white'}}>
        <h2>Ingredients</h2>
        <ul>
          <li>{ singleDrink.strIngredient1 } : { singleDrink.strMeasure1 }</li>
          <li>{ singleDrink.strIngredient2 } : { singleDrink.strMeasure2 }</li>
          <li>{ singleDrink.strIngredient3 } : { singleDrink.strMeasure3 }</li>
          <li>{ singleDrink.strIngredient4 } : { singleDrink.strMeasure4 }</li>
          <li>{ singleDrink.strIngredient5 } : { singleDrink.strMeasure5 }</li>
          <li>{ singleDrink.strIngredient6 } : { singleDrink.strMeasure6 }</li>
          <li>{ singleDrink.strIngredient7 } : { singleDrink.strMeasure7 }</li>
          <li>{ singleDrink.strIngredient8 } : { singleDrink.strMeasure8 }</li>
          <li>{ singleDrink.strIngredient9 } : { singleDrink.strMeasure9 }</li>
        </ul>
        <p><b>Instructions:</b> { singleDrink.strInstructions }</p>
      </div>
      } 
    </>
  );
}
