export const randomNumber = () => {
  const number = Math.floor(Math.random() * 905);

  return number;
};

export const captalzieFirstLetter = name => {
  return name[0].toUpperCase() + name.slice(1);
};
