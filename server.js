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

const jwt = require("jsonwebtoken");
// const flash = require("express-flash");
const session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;

// const methodOverride = require("method-override");

const initializePassport = require("./passport-config");

initializePassport(passport);

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
// app.use(cors()); // Enable CORS
app.use(express.json()); // Recognize Request Objects as JSON objects
app.use(express.static("build")); // serve static files (css & js) from the 'public' directory
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "23kldlksjkfljlckjlds",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
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

app.post(
  "/login",
  passport.authenticate(
    "local",
    // { session: false },
    // (req, res) => {
    //   console.log(req.user);
    //   // const token = jwt.sign({ id: req.user.id }, "jwt_secret");
    //   // res.json({ token: token });
    // },
    {
      failureRedirect: "/error",
      successRedirect: "/profile",
    }
  )
);

app.post("/register", (req, res, next) => {
  const { username, password } = req.body;

  const id = uuidv4();
  pool.query(
    "SELECT * FROM users WHERE username = $1",
    [username],
    async (err, result) => {
      // console.log("err", err);
      if (err) {
        return next(err);
      }
      if (result.rows.length >= 1) {
        return res.status(400).json({
          error:
            "Email already there, No need to register again. Please login instead",
        });
      }

      try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const response = await pool.query(
          "INSERT INTO users (id, username, password) VALUES($1, $2, $3) RETURNING * ",
          [id, username, hashedPassword]
        );

        // Token
        const token = jwt.sign({ id: response.rows[0].id }, "jwt_secret");
        res.json({ token: token });
        // res.json(response.rows[0].id);
      } catch (err) {
        console.log(err);
      }
    }
  );
});

app.get("/profile", (req, res, next) => {
  // console.log("profile triggered");
  console.log("REQ USER", req.user);
  const token = jwt.sign({ id: req.user.id }, "jwt_secret");
  res.json({ token: token });
});

app.get("/error", (req, res, next) => {
  console.log("redirected to /");
  res.json("login");
});

app.post("/pokemon/logout", (req, res, next) => {
  console.log("logout triggred");
  req.logout((err, result) => {
    if (err) return next(err);

    res.redirect("/login");
  });

  // res.redirect("/");
  // res.json("logout");
});

//erroring here on sign up when redirected
//check why req.authetncated is false
const checkIsAuthenticated = (req, res, next) => {
  console.log("check authetniece triggered", req.isAuthenticated());
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/error");
};
const checkIsNotAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/error");
  }
  next();
};

// app.get("/pokemon", checkIsAuthenticated, getPokemon);
app.get("/pokemon", checkIsAuthenticated, getLikedPokemon);

app.post("/pokemon", checkIsAuthenticated, postLikedPokemon);
app.delete("/pokemon/:id", checkIsAuthenticated, deleteSinglePokemon);
app.delete("/pokemon", checkIsAuthenticated, clearLikedPokemon);

app.get("/login", checkIsNotAuthenticated, (req, res) => {
  return res.json("login");
});

app.get("/signup", checkIsNotAuthenticated, (req, res) => {
  return res.json("signup");
});

app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
