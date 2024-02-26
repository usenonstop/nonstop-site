export const IconValue = ({
  icon,
  value,
}: {
  icon: React.ReactNode;
  value?: string | number | null;
}) => {
  if (!value) return null;
  return (
    <div className="flex items-center gap-1">
      {icon}
      {value}
    </div>
  );
};
