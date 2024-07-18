import "./Loader.css";
const Loader = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="loader">
        <span className="circle c1"></span>
        <span className="circle c2"></span>
        <span className="circle c3"></span>
      </div>
    </div>
  );
};

export default Loader;
