const { default: mongoose } = require('mongoose');
const { Schema, model } = require('mongoose');

const userRecipeSchema = new Schema({
  name: {
    type: String,
    required: 'You need to create a title!',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  recipe: {
    type: String,
    required: 'You need to create a recipe!',
    minlength: 1,
    trim: true,
  },
  recipeAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  // Used to track how many other users have favorited this recipe
  favorites: [{type: Schema.Types.ObjectId, ref: 'User'}],

  noOfFavorites: {type: Number, default: 0}
});

// Can possible use as a virtual with a return? This is formatted as if there was a createdRecipe controller
favCount = await userRecipe.find({}).exec();
favCount = userRecipe.sort( (a,b) => b.favorites.length - a.favorites.length)

const userRecipe = model('userRecipe', userRecipeSchema);

module.exports = userRecipe;