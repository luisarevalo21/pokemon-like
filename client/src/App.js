import PokemonContainer from "./components/PokemonContainer/PokemonContainer";
import { NavLink, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import SelectedPokemon from "./components/SelectedPokemon/SelectedPokemon";
import { parseJWT } from "./util/index";
import { logout } from "./api/index";

function App() {
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
    // console.log("result", result);
    if (result === undefined) return <Navigate to="/" replace />;

    return children;
  };
  const UserLoggedIn = ({ children }) => {
    const result = AuthVerify();
    // console.log("result", result);

    if (result) return <Navigate to="/pokemon" replace />;
    return children;
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
