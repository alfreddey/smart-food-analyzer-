const express = require("express");
const router = express.Router();

router.get("/ingredients", async function (req, res) {
  const url =
    "https://trackapi.nutritionix.com/v2/search/item/?upc=49000000450";
  const body = { query: "Coca-Cola Classic" };

  try {
    const response = await fetch(url, {
      headers: {
        "x-app-id": process.env.NUTRITIONIX_APP_ID,
        "x-app-key": process.env.NUTRITIONIX_APP_KEY,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    res.send(await response.json());
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Failed to fetch ingredients" });
  }
});

module.exports = router;
