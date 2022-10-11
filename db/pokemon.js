const pool = require("./index");

const getLikedPokemon = (req, res) => {
  console.log("userid", req.userId);
  // console.log("REQ USER IN GET POKEMON", req.user);
  pool.query(
    "SELECT * FROM pokemon WHERE user_id = $1",
    [req.userId],
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
  const userId = req.userId;
  console.log("userid", req.userId);
  console.log("req.body", req.body);
  // const {name, dexnumber}
  // const userId = req.user;
  const id = Number(req.body.dexnumber);

  const { name, image } = req.body;
  console.log("name", name);

  pool.query(
    "INSERT INTO pokemon (id, name, dexnumber, user_id, img_src) VALUES($1, $2, $3, $4, $5)",
    [id, name, id, userId, image],
    (error, result) => {
      if (error) {
        return next(error);
      }
      res.sendStatus(201);
    }
  );
};

const deleteSinglePokemon = (req, res, next) => {
  const userId = req.userId;
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
  const userId = req.userId;
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
