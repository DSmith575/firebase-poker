// Function for GameCard components, to cycle random colors for the background
export const getRandomColor = () => {
  const colors = ['bg-red-400', 'bg-yellow-400', 'bg-green-400', 'bg-purple-200', 'bg-sky-500'];

  return colors[Math.floor(Math.random() * colors.length)];
};
