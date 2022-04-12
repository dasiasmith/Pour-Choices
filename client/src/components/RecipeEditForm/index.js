import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import { UPDATE_RECIPE } from "../../utils/mutations";
import { QUERY_ME } from "../../utils/queries";

const RecipeEditForm = ({ recipeInfo, setIsEdit }) => {
  // set state
  const [recipeName, setRecipeName] = useState(recipeInfo.recipeName);
  const [ingredients, setIngredients] = useState(recipeInfo.ingredients);
  const [instructions, setInstructions] = useState(recipeInfo.instructions);
  // add recipe
  const [updateRecipe, { error }] = useMutation(UPDATE_RECIPE);
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await updateRecipe({
        variables: {
          recipedId: recipeInfo._id,
          recipeName,
          ingredients,
          instructions,
        },
        update(cache, { data: { updateRecipe } }) {
          const updatedRecipe = {
            ...updateRecipe,
            recipeName,
            ingredients,
            instructions,
          };
          const { me } = cache.readQuery({ query: QUERY_ME });
          cache.writeQuery({
            query: QUERY_ME,
            data: {
              me: {
                ...me,
                recipes: me.recipes.map((recipe) =>
                  recipe._id === updateRecipe._id ? updatedRecipe : recipe
                ),
              },
            },
          });
        },
      });
      setRecipeName("");
      setIngredients("");
      setInstructions("");
      setIsEdit("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (event) => {
    const { target } = event;
    const inputType = target.name;
    const inputValue = target.value;
    // based on input type, set state for recipeName, ingredient, instructions

    if (inputType === "recipeName") {
      setRecipeName(inputValue);
    } else if (inputType === "ingredients") {
      setIngredients(inputValue);
    } else {
      setInstructions(inputValue);
    }
  };
  return (
    <div>
      <div className="col-12 col-lg-9">
        <textarea
          name="recipeName"
          value={recipeName}
          className="form-input w-100"
          style={{ lineHeight: "1.5", resize: "vertical" }}
          onChange={handleInputChange}
        ></textarea>
        <textarea
          name="ingredients"
          value={ingredients}
          className="form-input w-100"
          style={{ lineHeight: "1.5", resize: "vertical" }}
          onChange={handleInputChange}
        ></textarea>
        <textarea
          name="instructions"
          placeholder="Here is the instructions"
          value={instructions}
          className="form-input w-100"
          style={{ lineHeight: "1.5", resize: "vertical" }}
          onChange={handleInputChange}
        ></textarea>
      </div>
      <div>
        <button
          className="btn btn-primary btn-block py-3"
          onClick={handleFormSubmit}
        >
          Update Changes
        </button>
      </div>
    </div>
  );
};

export default RecipeEditForm;

// , {
//     update(cache, { data: { addRecipe } }) {
//       try {
//         const { recipes } = cache.readQuery({ query: QUERY_RECIPES });
//         cache.writeQuery({
//           query: QUERY_RECIPES,
//           data: { recipes: [updateRecipe, ...recipes] },
//         });
//       } catch (e) {
//         console.log(e);
//       }
//       // update me object's cache
//       const { me } = cache.readQuery({ query: QUERY_ME });
//       cache.writeQuery({
//         query: QUERY_ME,
//         data: {
//           me: {
//             ...me,
//             recipes: me.recipes.map((recipe) =>
//               recipe._id === recipeInfo._id ? updateRecipe : recipe
//             ),
//           },
//         },
//       });
//     },
//   }
