if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const app = express();
const PORT = process.env.PORT || 8000; // use either the host env var port (PORT) provided by Heroku or the local port (5000) on your machine
const cors = require("cors");
const bodyParser = require("body-parser");

const { v4: uuidv4 } = require("uuid");
const { secret } = require("./config");

const jwt = require("jsonwebtoken");
const session = require("express-session");

const path = require("path");

app.use(cors({ "Access-Control-Allow-Origin": "*" }));

// app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.json()); // Recognize Request Objects as JSON objects

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

if (process.env.NODE_ENV === "production") {
  //also works because index.js is in the root and goes into client and into build
  // app.use(express.static("client/build"));

  app.use(express.static(path.join(__dirname, "client/build")));
}
// Step 1:
// app.use(express.static(path.resolve(__dirname, "./client/build")));
// // Step 2:
// app.get("*", function (request, response) {
//   response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
// });

// app.use(express.static("build"));

// app.use(methodOverride("_method"));

const pool = require("./db/index.js");

const {
  getPokemon,
  postLikedPokemon,
  deleteSinglePokemon,
  clearLikedPokemon,
  getLikedPokemon,
} = require("./db/pokemon");

app.post("/pokemon/logout", (req, res, next) => {});

//erroring here on sign up when redirected
//check why req.authetncated is false

const checkDuplicateUsername = async (req, res, next) => {
  const { username } = req.body;

  try {
    const response = await pool.query(
      "SELECT * from users WHERE username = $1",
      [username]
    );
    const user = response.rows[0];
    if (user) {
      return res.status(400).send({
        message: "Failed! Username is already in use!",
      });
    }
    next();
  } catch (err) {
    console.log(err);
  }
};

app.post("/register", checkDuplicateUsername, async (req, res, next) => {
  const id = uuidv4();
  const { username, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const response = await pool.query(
      "INSERT INTO users (id, username, password) VALUES($1, $2, $3) RETURNING * ",
      [id, username, hashedPassword]
    );

    if (response) {
      res.json({
        message: "User was registered successfully!",
      });
    }
  } catch (err) {
    console.log(err);
  }
});

const verifyToken = (req, res, next) => {
  // console.log("req.headers", req.headers);
  let token = req.headers["x-access-token"];
  console.log("token ", token);
  if (!token) {
    res.sendStatus(403).json({
      message: "No token provided!",
    });
  }

  jwt.verify(token, secret, (err, decoded) => {
    console.log("err", err);
    if (err) {
      return res.sendStatus(403).json({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const response = await pool.query(
      "SELECT * from users WHERE username = $1",
      [username]
    );
    const user = response.rows[0];

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user.id }, secret, {
        expiresIn: 86400,
      });
      res.status(200).json({
        accessToken: token,
        id: response.rows.id,
        username: user.username,
        expiresIn: token.expiresIn,
      });
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    return err;
  }
});

app.get("/pokemon", verifyToken, getLikedPokemon);

app.post("/pokemon", verifyToken, postLikedPokemon);
app.delete("/pokemon/:id", verifyToken, deleteSinglePokemon);
app.delete("/pokemon", verifyToken, clearLikedPokemon);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/"));
});

app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
