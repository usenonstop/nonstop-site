export const Spinner = ({ className }: { className?: string }) => {
  return (
    <div
      className={`border-t-solid border-r-solid border-t-ns-500 h-full w-full animate-spin rounded-full border-r-2 border-t-2 border-r-transparent ${
        className ?? ""
      }`}
    />
  );
};
