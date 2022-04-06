const { default: mongoose } = require('mongoose');
const { Schema, model } = require('mongoose');

const savedRecipeSchema = new Schema({
    recipeId: { // Recipe is from book. Do we need to use the same recipeId from the recipe book?
        type: Schema.Types.ObjectId,
        ref: 'recipeBook'
    },
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
    }

});

const savedRecipe = model('savedRecipe', savedRecipeSchema);

module.exports = savedRecipe;