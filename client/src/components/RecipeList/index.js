import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { REMOVE_RECIPE } from "../../utils/mutations";
import Auth from "../../utils/auth";
import { QUERY_RECIPES, QUERY_ME } from "../../utils/queries";
import RecipeEditForm from "../RecipeEditForm";

const CardBody = ({ recipe, handleEditButton, handleDeleteRecipe }) => (
  <div className="card-body p-2">
    <p>{recipe.recipeName}</p>
    <p>ingredients: {recipe.ingredients}</p>
    <p>instructions: {recipe.instructions}</p>
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-around",
      }}
    >
      <button
        className="btn btn-info"
        onClick={() => handleEditButton(recipe._id)}
      >
        Edit Recipe
      </button>
      <button
        className="btn btn-danger"
        onClick={() => handleDeleteRecipe(recipe._id)}
      >
        Delete Recipe
      </button>
    </div>
  </div>
);

const RecipeList = ({
  recipes,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  const [isEdit, setIsEdit] = useState();
  const [removeRecipe, { error }] = useMutation(REMOVE_RECIPE);
  if (!recipes.length) {
    return <h1>No Recipes Yet</h1>;
  }

  const handleDeleteRecipe = async (recipeId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeRecipe({
        variables: { recipeId },
        update(cache, { data: { removeRecipe } }) {
          const { me } = cache.readQuery({ query: QUERY_ME });
          cache.writeQuery({
            query: QUERY_ME,
            data: {
              me: {
                ...me,
                recipes: me.recipes.filter(
                  (recipe) => recipe._id !== removeRecipe._id
                ),
              },
            },
          });
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {recipes &&
        recipes.map((recipe) => (
          <div key={recipe._id} className="card mb-3">
            <h3 className="card-header text-dark p-2 m-0">
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/profiles/${recipe.recipeAuthor}`}
                >
                  {recipe.recipeAuthor} <br />
                  <span style={{ fontSize: "1.35rem" }}>
                    created this recipe on {recipe.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: "1.35rem" }}>
                    created this recipe on {recipe.createdAt}
                  </span>
                </>
              )}
            </h3>
            {isEdit === recipe._id ? (
              <RecipeEditForm recipeInfo={recipe} setIsEdit={setIsEdit} />
            ) : (
              <CardBody
                recipe={recipe}
                handleEditButton={() => setIsEdit(recipe._id)}
                handleDeleteRecipe={handleDeleteRecipe}
              />
            )}
          </div>
        ))}
    </div>
  );
};

export default RecipeList;
