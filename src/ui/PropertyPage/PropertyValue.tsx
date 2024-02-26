export const PropertyValue = <T extends string | number | null | undefined>({
  label,
  value,
  transform,
  highlight,
  noBorder,
}: {
  label: string;
  value: T;
  transform?: (val: T) => string;
  highlight?: boolean;
  noBorder?: boolean;
}) => {
  if (!value) return null;
  return (
    <div
      className={`flex items-center justify-between ${
        noBorder ? "" : "border-b"
      }  py-2 ${highlight ? "border-ns-100" : ""}`}
    >
      <div className={`${highlight ? "text-ns-700" : ""}`}>{label}</div>
      <div className={`text-gray-600 ${highlight ? "text-ns-700" : ""}`}>
        {!!transform ? transform(value) : value}
      </div>
    </div>
  );
};
