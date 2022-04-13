const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const recipeSchema = new Schema({
  recipeName: {
    type: String,
    required: "You need to leave a name!",
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  //   recipeAuthor: {

  //     type: Schema.Types.ObjectId,
  //     ref: "User",

  // },
  recipeAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  ingredients: {
    type: String,
    required: "You need to create a ingredients!",
    minlength: 1,
    trim: true,
  },
  instructions: {
    type: String,
    required: "You need to create a instructions!",
    minlength: 1,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

const Recipe = model("Recipe", recipeSchema);

module.exports = Recipe;
