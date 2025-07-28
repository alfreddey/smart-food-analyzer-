const express = require("express");
const router = express.Router();

router.get("/macros", async function (req, res) {
  const apiKey = process.env.SPOONACULAR_API_KEY;
  try {
    const fClassParam = req.query.fClass || "pizza";
    const url =
      "https://api.spoonacular.com/recipes/guessNutrition" +
      "?" +
      `title=${fClassParam}`;
    const macrosRes = await fetch(url, {
      headers: {
        "x-api-key": apiKey,
      },
    });

    if (!macrosRes.ok) {
      throw new Error(
        "Internal Server Error. Unable to get the macronutrients."
      );
    }

    const macros = await macrosRes.json();
    res.json({ macros });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
