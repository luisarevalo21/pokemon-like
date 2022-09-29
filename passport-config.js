const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const pool = require("./db");

function initalize(passport) {
  const authenticateUser = async (username, password, done) => {
    console.log("authenticateUser called");
    try {
      const response = await pool.query(
        "SELECT * from users WHERE username = $1",
        [username]
      );
      console.log("response", response.rows[0]);
      const user = response.rows[0];

      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err);
    }
  };

  passport.use(new LocalStrategy("local", authenticateUser));

  passport.serializeUser((user, done) => {
    console.log("inside serialized called");

    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    console.log("inside deserialzie");
    try {
      const response = await pool.query("SELECT * from users WHERE id = $1", [
        id,
      ]);
      //   console.log("response", response.rows[0]);
      return done(null, response.rows[0].id);
    } catch (err) {
      return done(null, false);
    }
  });
}

module.exports = initalize;
