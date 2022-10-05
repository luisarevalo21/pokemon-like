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
// const flash = require("express-flash");
const session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;

const path = require("path");
const generateAccessToken = require("./generateToken");
// const methodOverride = require("method-override");

const initializePassport = require("./passport-config");

initializePassport(passport);

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

// app.get("/profile", (req, res, next) => {
//   // console.log("profile triggered");
//   console.log("REQ USER", req.user);
//   const token = jwt.sign({ id: req.user.id }, "jwt_secret");
//   res.json({ token: token });
// });

// app.get("/error", (req, res, next) => {
//   console.log("redirected to /");
//   res.json("login");
// });

app.post("/pokemon/logout", (req, res, next) => {
  // console.log("logout triggred");
  // req.logout((err, result) => {
  //   if (err) return next(err);
  //   res.redirect("/login");
  // });
  // res.redirect("/");
  // res.json("logout");
});

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
    // const token = generateAccessToken(response.rows[0].username);

    // res.json({ token: `Bearer ${token}` });
    // res.json(response.rows[0].id);
  } catch (err) {
    console.log(err);
  }
});

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    res.sendStatus(403).json({
      message: "No token provided!",
    });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.sendStatus(403).json({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

//   if (await bcrypt.compare(password, user.password)) {
//     const token = generateAccessToken(user.username);
//     res.json({ token: `Bearer ${token}` });
//   } else {
//     res.sendStatus(401);
//   }
// } catch (err) {
//   return err;
// }

// const validateToken = (req, res, next) => {
//   console.log("vlicated token triggered");
//   const authHeader = req.headers["authorization"];
//   console.log("authheader", authHeader);
//   const token = authHeader && authHeader.split(" ")[1];
//   console.log("token", token);
//   if (token == null) return res.sendStatus(401);
//   jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
//     if (err) {
//       return res.sendStatus(403);
//     }
//     req.tokenData = decoded;
//     next();
//   });
// };
// const checkIsAuthenticated = (req, res, next) => {
//   console.log("check authetniece triggered", req.isAuthenticated());
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect("/error");
// };
// const checkIsNotAuthenticated = (req, res, next) => {
//   if (req.isAuthenticated()) {
//     return res.redirect("/error");
//   }
//   next();
// };

app.post("/login", async (req, res) => {
  console.log("login triggered");
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
      });
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    return err;
  }
});

// app.get("/pokemon", checkIsAuthenticated, getPokemon);
app.get("/pokemon", verifyToken, getLikedPokemon);

app.post("/pokemon", verifyToken, postLikedPokemon);
app.delete("/pokemon/:id", verifyToken, deleteSinglePokemon);
app.delete("/pokemon", verifyToken, clearLikedPokemon);

app.get("/login", (req, res) => {
  return res.json("login");
});

app.get("/signup", (req, res) => {
  return res.json("signup");
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/"));
});

app.listen(PORT, () => {
  console.log("listening on port", PORT);
});

// app.post(
//   "/login",
//   passport.authenticate(
//     "local",
//     // { session: false },
//     // (req, res) => {
//     //   console.log(req.user);
//     //   // const token = jwt.sign({ id: req.user.id }, "jwt_secret");
//     //   // res.json({ token: token });
//     // },
//     {
//       failureRedirect: "/error",
//       successRedirect: "/profile",
//     }
//   )
// );
