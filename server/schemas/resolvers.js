const { AuthenticationError } = require("apollo-server-express");
const { User, Recipe } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return await User.find().populate("recipes");
    },
    user: async (parent, { username }) => {
      return await User.findOne({ username }).populate("recipes");
    },
    // ??? no username is ok
    recipes: async (parent, { username }) => {
      const params = username ? { username } : {};
      return await Recipe.find(params).sort({ createdAt: -1 });
    },
    recipe: async (parent, { recipeId }) => {
      return await Recipe.findOne({ _id: recipeId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id }).populate(
          "recipes"
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    addRecipe: async (
      parent,
      { recipeName, ingredients, instructions },
      context
    ) => {
      if (context.user) {
        const recipe = await Recipe.create({
          recipeName,
          ingredients,
          instructions,
          recipeAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { recipes: recipe._id } }
        );

        return recipe;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    // addComment: async (parent, { thoughtId, commentText }, context) => {
    //   if (context.user) {
    //     return Thought.findOneAndUpdate(
    //       { _id: thoughtId },
    //       {
    //         $addToSet: {
    //           comments: { commentText, commentAuthor: context.user.username },
    //         },
    //       },
    //       {
    //         new: true,
    //         runValidators: true,
    //       }
    //     );
    //   }
    //   throw new AuthenticationError('You need to be logged in!');
    // },
    removeRecipe: async (parent, { recipeId }, context) => {
      if (context.user) {
        const recipe = await Recipe.findOneAndDelete({
          _id: recipeId,
          recipeAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { recipes: recipe._id } }
        );

        return recipe;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    // removeComment: async (parent, { thoughtId, commentId }, context) => {
    //   if (context.user) {
    //     return Thought.findOneAndUpdate(
    //       { _id: thoughtId },
    //       {
    //         $pull: {
    //           comments: {
    //             _id: commentId,
    //             commentAuthor: context.user.username,
    //           },
    //         },
    //       },
    //       { new: true }
    //     );
    //   }
    //   throw new AuthenticationError('You need to be logged in!');
    // },
  },
};

module.exports = resolvers;
