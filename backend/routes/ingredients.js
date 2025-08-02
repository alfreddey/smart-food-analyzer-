const express = require("express");
const router = express.Router();

router.get("/ingredients", async function (req, res) {
  const apiKey = process.env.SPOONACULAR_API_KEY;
  try {
    // TODO: Get query from query params. Add error handling for an empty query string.
    const fClassParam = req.query?.fClass || "pizza";
    const url =
      "https://api.spoonacular.com/recipes/complexSearch" +
      "?" +
      `query=${fClassParam}&number=1`;
    const foodRes = await fetch(url, {
      headers: {
        "x-api-key": apiKey,
      },
    });

    if (!foodRes.ok) {
      throw new Error("Internal Server Error. Couldn't get food id.");
    }

    const foodData = await foodRes.json();
    const foodId = foodData.results[0].id;

    const recipeUrl = `https://api.spoonacular.com/recipes/${foodId}/ingredientWidget.json`;
    const recipeRes = await fetch(recipeUrl, {
      headers: {
        "x-api-key": apiKey,
      },
    });

    if (!recipeRes.ok) {
      throw new Error("Internal Server Error. Couldn't get the ingredients.");
    }

    const recipe = await recipeRes.json();
    const ingredients = recipe["ingredients"].map((elem) => elem.name);

    res.status(200).json({ id: foodId, ingredients });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      error: err.message,
    });
  }
});

module.exports = router;
