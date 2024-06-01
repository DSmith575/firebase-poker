import { getRandomColor } from '../../utils/game/getRandomColor';
describe('getRandomColor', () => {
  test('should return a random color from the colors array', () => {
    const colors = ['bg-red-400', 'bg-yellow-400', 'bg-green-400', 'bg-purple-200', 'bg-sky-500'];
    const randomColor = getRandomColor();

    expect(colors).toContain(randomColor);
  });
});
