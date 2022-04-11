import React from "react";
import { Link } from "react-router-dom";

const RecipeList = ({
  recipes,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  console.log("recipe---->", recipes);
  if (!recipes.length) {
    return <h3>No Recipes Yet</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {recipes &&
        recipes.map((recipe) => (
          <div key={recipe._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/profiles/${recipe.recipeAuthor}`}
                >
                  {recipe.recipeAuthor} <br />
                  <span style={{ fontSize: "1rem" }}>
                    had this recipe on {recipe.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: "1rem" }}>
                    You had this recipe on {recipe.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{recipe.recipeName}</p>
              <p>ingredients: {recipe.ingredients}</p>
              <p>instructions: {recipe.instructions}</p>
            </div>
            {/* <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/recipes/${recipe._id}`}
            >
              Join the discussion on this recipe.
            </Link> */}
          </div>
        ))}
    </div>
  );
};

export default RecipeList;
