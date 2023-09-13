export const generateLetter = () => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const randomNum = Math.ceil(Math.random() * 25);
  const randomLetter = alphabet[randomNum];
  console.log(randomLetter);
  return randomLetter;
};
