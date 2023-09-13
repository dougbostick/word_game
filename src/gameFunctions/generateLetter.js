export const generateLetter = () => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const randomNum = Math.floor(Math.random() * 26);
  const randomLetter = alphabet[randomNum];
  console.log(randomLetter);
  return randomLetter;
};
