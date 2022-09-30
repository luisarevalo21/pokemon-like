import React, { useState } from "react";
import Container from "../Container";
import styles from "./Login.module.css";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { login } from "../../api";
import { checkPasswordSize } from "../../util/index.js";
const Login = props => {
  // const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();

  const navigate = useNavigate();
  const handleSignUpClicked = async event => {
    event.preventDefault();

    if (!checkPasswordSize(password)) {
      setError("Password must be 6 characters");
      setPassword("");
      return;
    }
    const user = {
      username,
      password,
    };
    const response = await login(user);

    // console.log("response", response);

    setPassword("");
    setUsername("");
    console.log("response", response);
    if (response !== "login") {
      props.handleUserId(response);
      navigate("/pokemon");
    }
    setError("Error occured try signing in again");

    // setPassword("");
    // setUsername("");
    // navigate("/pokemon");
  };

  const handleChange = (event, inputName) => {
    if (inputName === "username") {
      setUsername(event.target.value);
      return;
    }
    setPassword(event.target.value);
  };
  let signupError = null;
  if (location.state) {
    signupError = location.state.message;
  }

  return (
    <Container>
      <form onSubmit={handleSignUpClicked}>
        <div className={styles.login}>
          <h2> Login</h2>
          {error}
          {signupError}
          <div className={styles.inputContainer}>
            <label placeholder="username">Username</label>
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={e => handleChange(e, "username")}
            />
          </div>

          <div className={styles.inputContainer}>
            <label placeholder="password">Password</label>
            <input
              placeholder="password"
              type="password"
              value={password}
              onChange={e => handleChange(e, "password")}
            />
          </div>

          <button>Login</button>
          <button>
            <NavLink to="/signup">Signup</NavLink>
          </button>
        </div>
      </form>
    </Container>
  );
};

export default Login;
