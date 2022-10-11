import jwt_decode from "jwt-decode";

export const randomNumber = () => {
  const number = Math.floor(Math.random() * 905);

  return number;
};

export const captalzieFirstLetter = name => {
  return name[0].toUpperCase() + name.slice(1);
};

export const checkPasswordSize = password => {
  return password.length > 5;
};

export const parseJWT = token => {
  // console.log("token", token);
  try {
    return jwt_decode(token);
  } catch (err) {
    return null;
  }
};
export const checkSearchValue = value => {
  console.log("value", value);

  const { dexNumber } = value;
  console.log("dexnumber", dexNumber);

  if (dexNumber === "") {
    return false;
  }
  const intVal = parseInt(dexNumber);
  if (intVal < 0) {
    return false;
  }
  if (intVal > 0) {
    return intVal;
  }
  return intVal;
};

export const searchCurrentLikedPokemon = (likedPokemon, pokemon) => {
  return likedPokemon.find(
    curPokmeon => parseInt(curPokmeon.dexnumber) === parseInt(pokemon.dexnumber)
  );
};
