export const generateLetter = () => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const randomNum = Math.floor(Math.random() * 26);
  const randomLetter = alphabet[randomNum];
  return randomLetter;
};

export const generateWordLength = () => {
  return Math.floor(Math.random() * 6 + 3);
};
