import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";

import {
  ADD_RECIPE,
  REMOVE_RECIPE,
  UPDATE_RECIPE,
} from "../../utils/mutations";
import { QUERY_RECIPES, QUERY_ME } from "../../utils/queries";

import Auth from "../../utils/auth";
const RecipeForm = () => {
  // set state
  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  // add recipe
  const [addRecipe, { error }] = useMutation(ADD_RECIPE, {
    update(cache, { data: { addRecipe } }) {
      try {
        const { recipes } = cache.readQuery({ query: QUERY_RECIPES });
        cache.writeQuery({
          query: QUERY_RECIPES,
          data: { recipes: [addRecipe, ...recipes] },
        });
      } catch (e) {
        console.log(e);
      }
      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, recipes: [...me.recipes, addRecipe] } },
      });
    },
  });
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addRecipe({
        variables: {
          recipeName,
          ingredients,
          instructions,
          recipeAuthor: Auth.getProfile.data.username,
        },
      });
      setRecipeName("");
      setIngredients("");
      setInstructions("");
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
      <h3>What's on your mind?</h3>

      {Auth.loggedIn() ? (
        <>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="recipeName"
                placeholder="Here is the name of recipe"
                value={recipeName}
                className="form-input w-100"
                style={{ lineHeight: "1.5", resize: "vertical" }}
                onChange={handleInputChange}
              ></textarea>
              <textarea
                name="ingredients"
                placeholder="Here is the ingredients"
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

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Recipe
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your thoughts. Please{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default RecipeForm;
