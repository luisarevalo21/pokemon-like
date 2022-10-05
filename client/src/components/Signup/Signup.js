import React, { useState } from "react";
import Container from "../Container";
import styles from "./Signup.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { signup } from "../../api";
import { checkPasswordSize } from "../../util";

const Signup = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async event => {
    event.preventDefault();

    if (!checkPasswordSize(password)) {
      setError("Password must be 6 characters long");
      setPassword("");
      return;
    }

    if (username !== "" && password !== "") {
      const user = {
        username,
        password,
      };

      const response = await signup(user);
      console.log("response", response);
      setPassword("");
      setUsername("");
      if (response.error) {
        setError(response.error);
        navigate("/", { state: { message: response.error } });
      }

      localStorage.setItem("token", response.token);
      navigate("/", { state: { message: "please login " } });
    }
  };
  const handleChange = (event, inputName) => {
    if (inputName === "username") {
      setUsername(event.target.value);
      return;
    }
    setPassword(event.target.value);
  };
  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <div className={styles.login}>
          <h2>Signup</h2>
          {error}
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

          {/* <button type="submit">Submit</button> */}
          <button>Signup</button>

          <button>
            <NavLink to="/">Login </NavLink>
          </button>
        </div>
      </form>
    </Container>
  );
};

export default Signup;
