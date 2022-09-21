const pool = require("./index");

const getPokemon = (req, res) => {
  pool.query("SELECT * FROM pokemon", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(results.rows);
  });
};

const postLikedPokemon = (req, res) => {
  const id = Number(req.body.dexnumber);

  const { name } = req.body;

  pool.query(
    `INSERT INTO pokemon (id, name, dexnumber) VALUES('${id}', '${name}', '${id}')`,
    (error, result) => {
      if (error) {
        console.log(error);
      }
      res.sendStatus(200);
    }
  );
};

const deleteSinglePokemon = (req, res, next) => {
  const dexnumber = Number(req.params.id);

  console.log("dexnumber", dexnumber);
  pool.query(
    `DELETE FROM pokemon WHERE id ='${dexnumber}'`,
    (error, result) => {
      if (error) return next(error);

      res.sendStatus(201);
    }
  );
};

const clearLikedPokemon = (req, res, next) => {
  pool.query("DELETE FROM pokemon", (error, result) => {
    if (error) return next(error);
    res.sendStatus(201);
  });
};
module.exports = {
  getPokemon,
  postLikedPokemon,
  deleteSinglePokemon,
  clearLikedPokemon,
};
