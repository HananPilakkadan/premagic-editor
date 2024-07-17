import "./Loader.css";
const Loader = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div class="loader">
        <span class="circle c1"></span>
        <span class="circle c2"></span>
        <span class="circle c3"></span>
      </div>
    </div>
  );
};

export default Loader;
