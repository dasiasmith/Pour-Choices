import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      recipes {
        _id
        recipeName
        ingredients
        instructions
        createdAt
      }
    }
  }
`;

export const QUERY_RECIPES = gql`
  query getRecipes {
    recipes {
      _id
      recipeName
      ingredients
      instructions
      recipeAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_RECIPE = gql`
  query getSingleRecipe( $recipeId: ID!) {
    recipe(recipeId: $recipeId) {
      _id
      recipeName
      ingredients
      instructions
      recipeAuthor
      createdAt
    }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      recipes {
        _id
        recipeName
        ingredients
        instructions
        recipeAuthor
        createdAt
      }
    }
  }
`;
