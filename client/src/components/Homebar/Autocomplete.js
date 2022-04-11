import React, { useState, useEffect } from 'react';
import randomCocktail from "./cocktailApi";
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CheckboxesTags() {

    const [data, setData] = useState([]);
    const [list, setList] = useState([]);
    const [selected, setSelected] = useState([]);
    const [title, setTitle] = useState([]);

    //get list of ingredients for the user
    useEffect(() => {
        fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list")
            .then(res => res.json())
            .then(data => {
                let newData = data.drinks;
                newData = newData.map(ele => {
                    const title = ele.strIngredient1;
                    return { "title": title };
                })
                setData(newData)
            });
    }, []);
    console.log("my selected: ", selected);

    const fetchList = () => {
        const query = selected.map((element) => element.title).join();
        console.log('query ===', query);
        fetch(`https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=${query}`)
            .then(res => res.json())
            .then(data => {
                let newData2 = data.drinks
                console.log(data.drinks);
                if (newData2.length && newData2 !== 'None Found') {
                    setList(newData2);
                } else {
                    setList([]);
                }
            });
    }

    return (
        <>
            <Autocomplete
                multiple
                id="checkboxes-tags-demo"
                options={data}
                onChange={(e, newValue) => {
                    setSelected(newValue);
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
                style={{ width: 500 }}
                renderInput={(params) => (
                    <TextField {...params} label="Checkboxes" placeholder="Favorites" />
                )}
            />

            <div className='row'>
                {list.length > 0 ? list.map((e) => (
                    <div key={e.idDrink}>
                        <p>{e.strDrink}</p>
                        <img src={e.strDrinkThumb} alt="" width="40px" height="40px" />
                    </div>
                )) : (<div><p style={{ color: 'white' }}>no data</p></div>)}
            </div>
        </>
    );
}
