import PokemonContainer from "./components/PokemonContainer/PokemonContainer";
import { NavLink, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import SelectedPokemon from "./components/SelectedPokemon/SelectedPokemon";
import { parseJWT } from "./util/index";
import { logout } from "./api/index";
import Header from "./components/Header/Header";
import React from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const AuthVerify = () => {
    const user = localStorage.getItem("user");
    // console.log("user", user);
    if (user) {
      const decodedJwt = parseJWT(user);
      // console.log(decodedJwt);
      if (decodedJwt.exp * 1000 < Date.now()) {
        logout();
        return false;
      }
      return true;
    }
  };

  const Protected = ({ isLoggedIn, children }) => {
    const result = AuthVerify();
    console.log("result", result);
    if (result === undefined) return <Navigate to="/" replace />;

    return children;
  };
  const UserLoggedIn = ({ children }) => {
    const result = AuthVerify();
    // console.log("result", result);

    if (result) return <Navigate to="/pokemon" replace />;
    return children;
  };
  const handleHeaderClicked = () => {
    console.log("handle header clicked");
    navigate("/pokemon");
  };
  const handleLogout = async () => {
    logout();

    // if (response.ok) {
    // props.handleLogout();
    navigate("/");
    // }
  };

  return (
    <>
      {/* <ul>
        <li>
          <NavLink to="/">Login</NavLink>
        </li>
        <li>
          <NavLink to="/signup">Signup</NavLink>
        </li>
        <li>
          <NavLink to="/pokemon">Pokemon</NavLink>
        </li>
      </ul> */}

      <Routes>
        <Route
          path="/"
          element={
            <UserLoggedIn>
              <Login />
            </UserLoggedIn>
          }
        ></Route>
        <Route
          path="/signup"
          element={
            <UserLoggedIn>
              <Signup />
            </UserLoggedIn>
          }
        ></Route>
        <Route
          path="/pokemon/:id"
          element={
            <Protected>
              <Header
                handleLogout={handleLogout}
                selected={false}
                handleHeaderClicked={handleHeaderClicked}
              />
              <SelectedPokemon />
            </Protected>
          }
        ></Route>

        <Route
          path="/pokemon"
          element={
            <Protected>
              <PokemonContainer />
            </Protected>
          }
        ></Route>
      </Routes>
    </>
  );
}

export default App;
