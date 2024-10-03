export const getRandomColor = () => {
  const colors = ['violet-500', 'amber-500', 'green-500', 'red-500', 'sky-500', 'black'];

  return colors[Math.floor(Math.random() * colors.length)];
};
