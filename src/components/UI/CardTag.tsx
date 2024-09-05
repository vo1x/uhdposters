const CardTag = ({ children }: { children: any }) => {
  return (
    <div className="text-xs font-semibold text-slate-500 p-1 rounded-md min-w-8 text-center bg-slate-800 ">
      {children}
    </div>
  );
};

export default CardTag;
