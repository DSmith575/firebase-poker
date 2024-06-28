import Button from '../../button/Button';

const PlayerGridForm = ({ disabled, value, onClick, playerGridLabel }) => {
  return (
    <>
      <div className="flex space-x-2 border p-4 rounded-lg shadow-lg">
        <h1 className="flex items-center text-2xl">{playerGridLabel}</h1>

        {/* Map an array of 2...3 for the player limit. Unsure if there is a better way to do this */}
        {/* Could have just used an input, but it didn't look the part */}
        {[2, 3, 4, 5].map((number) => (
          <Button
            type={'button'}
            disabled={disabled}
            key={number}
            value={number}
            onClick={onClick}
            label={number}
            styles={`px-4 py-2 rounded-md focus:outline-none ${value === number ? 'bg-blue-500 text-white' : 'bg-red-500 text-gray-800'}`}
          />
        ))}
      </div>
    </>
  );
};

export default PlayerGridForm;
