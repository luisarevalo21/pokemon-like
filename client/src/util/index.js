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

export const checkUserAuthenticated = response => {
  console.log("response", response);
  return response === "login";
};
