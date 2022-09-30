const pool = require("./index");

const getLikedPokemon = (req, res) => {
  console.log("REQ USER IN GET POKEMON", req.user);
  pool.query(
    "SELECT * FROM pokemon WHERE user_id = $1",
    [req.user],
    (error, results) => {
      if (error) {
        throw error;
      }
      if (results.rows.length === 0) {
        res.status(200).json([]);
        return;
      }
      res.status(200).json(results.rows);
    }
  );
};

const postLikedPokemon = (req, res, next) => {
  console.log("RWQ USER inside post liekd", req.user);

  const userId = req.user;
  const id = Number(req.body.dexnumber);

  const { name } = req.body;

  pool.query(
    "INSERT INTO pokemon (id, name, dexnumber, user_id) VALUES($1, $2, $3, $4)",
    [id, name, id, userId],
    (error, result) => {
      if (error) {
        return next(error);
      }
      res.sendStatus(200);
    }
  );
};

const deleteSinglePokemon = (req, res, next) => {
  const userId = req.user;
  const dexnumber = Number(req.params.id);

  console.log("dexnumber", dexnumber);
  pool.query(
    "DELETE FROM pokemon WHERE id = $1 AND user_id = $2",
    [dexnumber, userId],
    (error, result) => {
      if (error) return next(error);

      res.sendStatus(201);
    }
  );
};

const clearLikedPokemon = (req, res, next) => {
  const userId = req.user;
  console.log("clear liekd pokemon triggered");
  console.log("userid", userId);
  pool.query(
    "DELETE FROM pokemon WHERE user_id = $1",
    [userId],
    (error, result) => {
      if (error) return next(error);
      res.sendStatus(201);
    }
  );
};
module.exports = {
  // getPokemon,
  postLikedPokemon,
  deleteSinglePokemon,
  clearLikedPokemon,
  getLikedPokemon,
};
