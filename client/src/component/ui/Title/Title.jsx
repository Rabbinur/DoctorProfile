

const Title = ({ children }) => {
  return (
    <h2 className="lg:text-2xl text-lg font-bold uppercase tracking-widest text-black 
    text-center relative before:absolute before:h-[1px] before:w-[120px] 
     before:bg-primary before:bottom-[-10px] before:left-1/2 before:-translate-x-1/2">
      {children}
    </h2>
  );
};

export default Title;