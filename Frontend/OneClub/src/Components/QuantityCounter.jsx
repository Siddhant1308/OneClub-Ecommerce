
const QuantityCounter = ({ quantity, onDecrease, onIncrease }) => (
  <div className="flex items-center bg-gray-100 rounded px-2 py-1 shadow-sm h-8">
    <button
      onClick={onDecrease}
      className="text-lg px-2 hover:text-red-600"
    >
      −
    </button>
    <span className="bg-black text-white font-medium px-3 rounded text-sm flex items-center justify-center h-full">
      {quantity}
    </span>
    <button
      onClick={onIncrease}
      className="text-lg px-2 hover:text-green-600"
    >
      +
    </button>
  </div>
);

export default QuantityCounter;
