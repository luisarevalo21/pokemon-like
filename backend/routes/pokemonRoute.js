const express = require("express");

const pokemonRouter = express.Router();

pokemonRouter.get("/", (req, res) => {
  console.log("hello from pokemon ");
});
