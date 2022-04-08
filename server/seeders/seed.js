const db = require("../config/connection");
const { User, Recipe } = require("../models");
const userSeeds = require("./userSeeds.json");
const recipeSeeds = require("./thoughtSeeds.json");

db.once("open", async () => {
  try {
    await Recipe.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < recipeSeeds.length; i++) {
      const { _id, thoughtAuthor } = await Recipe.create(recipeSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: thoughtAuthor },
        {
          $addToSet: {
            thoughts: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("all done!");
  process.exit(0);
});
