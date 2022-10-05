import PokemonContainer from "./components/PokemonContainer/PokemonContainer";
import { NavLink, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";

function App() {
  const Protected = ({ isLoggedIn, children }) => {
    const token = localStorage.getItem("user");

    if (!token) return <Navigate to="/" replace />;

    return children;
  };
  const UserLoggedIn = ({ children }) => {
    const token = localStorage.getItem("user");
    if (token) return <Navigate to="/pokemon" replace />;
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
