const { Schema, model } = require('mongoose');

const recipeBookSchema = new Schema({
  // Book contents. Should be similar to thought model?
  
});

const recipeBook = model('recipeBook', recipeBookSchema);

module.exports = recipeBook;