import React from "react";
import styles from "./Header.module.css";
const Header = props => {
  const handleLogout = () => {
    props.handleLogout();
  };
  return (
    <div className={styles.Header}>
      <h3>Favorite Pokemon</h3>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Header;
