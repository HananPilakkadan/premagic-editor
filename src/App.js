import { useEffect, useState } from "react";
import "./App.css";
import Editor from "./components/Editor";
import Loading from "./components/LoadingPage";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  return <>{loading ? <Loading loading={loading} /> : <Editor />}</>;
}

export default App;
