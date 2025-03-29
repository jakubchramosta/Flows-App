const SquareWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid h-5 w-5 place-content-center rounded-md border border-input bg-background text-sm shadow-sm">
      {children}
    </div>
  );
};

export default SquareWrapper;
