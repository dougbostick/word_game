export const generateLetter = () => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const randomNum = Math.floor(Math.random() * 26);
  const randomLetter = alphabet[randomNum];
  return randomLetter;
};

export const generateWordLength = () => {
  return Math.floor(Math.random() * 4 + 3);
};

export const countDown = (num) => {
  if (num > 0) {
    num -= 1;
  }
};
