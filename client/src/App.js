import PokemonContainer from "./components/PokemonContainer/PokemonContainer";
import {
  NavLink,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import { useEffect, useState } from "react";

function App() {
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleUserId = id => {
    setUserId(id);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    console.log("logout triggered");
    setUserId("");
    setIsLoggedIn(false);
    navigate("/");
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
            // <Protected isLoggedIn={isLoggedIn}>
            <PokemonContainer userId={userId} handleLogout={handleLogout} />
            // </Protected>
          }
        ></Route>

        {/* <Route path="/profile" element={<h1> hello from porifle</h1>}></Route> */}
      </Routes>
    </>
  );
}

export default App;
