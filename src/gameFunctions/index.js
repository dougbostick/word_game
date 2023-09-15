export const generateLetter = () => {
  //no one wants to guess with Q, X, Y, and Z
  const alphabet = 'ABCDEFGHIJKLMNOPRSTUVW';
  const randomNum = Math.floor(Math.random() * 26);
  const randomLetter = alphabet[randomNum];
  return randomLetter;
};

export const generateWordLength = () => {
  return Math.floor(Math.random() * 4 + 3);
};
