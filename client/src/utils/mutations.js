import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_RECIPE = gql`
  mutation addRecipe(
    $recipeName: String!
    $ingredients: String!
    $instructions: String!
  ) {
    addRecipe(
      recipeName: $recipeName
      ingredients: $ingredients
      instructions: $instructions
    ) {
      _id
      recipeName
      ingredients
      instructions
      recipeAuthor
      createdAt
    }
  }
`;
export const REMOVE_RECIPE = gql`
  mutation removeRecipe($recipeId: ID!) {
    removeRecipe(recipeId: $recipeId) {
      _id
      recipeName
      ingredients
      instructions
      recipeAuthor
      createdAt
    }
  }
`;
export const UPDATE_RECIPE = gql`
  mutation UpdateRecipe(
    $recipedId: ID!
    $recipeName: String!
    $ingredients: String!
    $instructions: String!
  ) {
    updateRecipe(
      recipedId: $recipedId
      recipeName: $recipeName
      ingredients: $ingredients
      instructions: $instructions
    ) {
      _id
      recipeName
      ingredients
      instructions
      recipeAuthor
      createdAt
    }
  }
`;
export const UPDATE_RECIPE_COPY = gql`
  mutation UpdateRecipe(
    $recipedId: ID!
    $recipeName: String!
    $ingredients: String!
    $instructions: String!
  ) {
    updateRecipe(
      recipedId: $recipedId
      recipeName: $recipeName
      ingredients: $ingredients
      instructions: $instructions
    ) {
      _id
      recipeName
      ingredients
      instructions
      recipeAuthor
      createdAt
    }
  }
`;
