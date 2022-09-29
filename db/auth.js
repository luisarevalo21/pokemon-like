// const express = require("express");
// const passport = require("passport");
// const LocalStrategy = require("passport-local");

// const pool = require("./index");

// passport.use(
//   new LocalStrategy(function (username, password, cb) {
//     pool.query("SELECT * FROM users", (err, row) => {
//       if (err) return cb(err);

//       if (!row) {
//         return cb(null, false, { message: "Incorrect username or password." });
//       }

//       if (username !== row.username) {
//         return cb(null, false);
//       }
//       if (password !== row.password) {
//         return cb(null, false);
//       }
//       return cb(null, trzue);
//     });
//   })
// );x
