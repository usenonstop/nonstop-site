export const MinValue = ({
  value,
  onChange,
}: {
  value: number | null;
  onChange: (val: number | null) => void;
}) => {
  const active = "rounded bg-white shadow-lg";
  const handleClick = (val: number | null) => onChange(val);
  return (
    <div className="flex h-14 items-center justify-around rounded bg-gray-100 text-sm">
      <button
        onClick={() => handleClick(null)}
        className={`px-3 py-2 ${value === null ? active : ""}`}
      >
        Tanto faz
      </button>
      <button
        onClick={() => handleClick(1)}
        className={`px-3 py-2 ${value === 1 ? active : ""}`}
      >
        1+
      </button>
      <button
        onClick={() => handleClick(2)}
        className={`px-3 py-2 ${value === 2 ? active : ""}`}
      >
        2+
      </button>
      <button
        onClick={() => handleClick(3)}
        className={`px-3 py-2 ${value === 3 ? active : ""}`}
      >
        3+
      </button>
      <button
        onClick={() => handleClick(4)}
        className={`px-3 py-2 ${value === 4 ? active : ""}`}
      >
        4+
      </button>
      <button
        onClick={() => handleClick(5)}
        className={`px-3 py-2 ${value === 5 ? active : ""}`}
      >
        5+
      </button>
    </div>
  );
};
