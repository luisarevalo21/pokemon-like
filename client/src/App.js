import PokemonContainer from "./components/PokemonContainer/PokemonContainer";
import { NavLink, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import { useState } from "react";

function App() {
  const [userId, setUserId] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log("user id", userId);
  const handleUserId = id => {
    setUserId(id);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setUserId("");
    setIsLoggedIn(false);
  };

  const Protected = ({ isLoggedIn, children }) => {
    if (!isLoggedIn) return <Navigate to="/" replace />;
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
          exact
          path="/"
          element={<Login handleUserId={handleUserId} />}
        ></Route>
        <Route
          path="/signup"
          element={<Signup handleUserId={handleUserId} />}
        ></Route>

        <Route
          path="/pokemon"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <PokemonContainer userId={userId} handleLogout={handleLogout} />
            </Protected>
          }
        ></Route>

        {/* <Route path="/profile" element={<h1> hello from porifle</h1>}></Route> */}
      </Routes>
    </>
  );
}

export default App;
