const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const db = require("./db");
const port = 8000;

const {
  getPokemon,
  postLikedPokemon,
  deleteSinglePokemon,
  clearLikedPokemon,
} = require("./db/pokemon");
const pokemonRouter = require("./routes/pokemonRoute");

app.use(bodyParser.json());
app.use(cors());

// app.use("/pokemon", pokemonRouter);

app.get("/pokemon", getPokemon);
app.post("/pokemon/:id", postLikedPokemon);
app.delete("/pokemon", clearLikedPokemon);
app.delete("/pokemon/:id", deleteSinglePokemon);

app.listen(port, () => {
  console.log("listening on port", port);
});
