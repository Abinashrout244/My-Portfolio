import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
import Loader from "./components/Loader";
import CustomCursor from "./components/CustomCursor";
import { useState } from "react";

function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {/* Custom cursor — desktop only, hidden on touch */}
      <CustomCursor />

      {/* Loading screen — plays once on first mount */}
      <Loader onComplete={() => setLoaded(true)} />

      {/* Main site — always mounted so images preload behind loader */}
      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.5s ease",
          pointerEvents: loaded ? "auto" : "none",
        }}
      >
        <Header />
        <Home />
        <Footer />
      </div>
    </>
  );
}

export default App;
