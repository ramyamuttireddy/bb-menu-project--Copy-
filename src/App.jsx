import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "./Menu/Header";
import MenuHome from "./Menu/MenuHome";
import Menu from "./Menu/Menu";
import Home from "./HomePage/Home";
import Preloader from "./Preloader/preloader";

import useBackground from "./hooks/useBackground";
import { refreshAuth } from "./API/api";
import ScrollToTop from "./BackArrow/ScrollTop";

function App() {
  const backgroundImage = useBackground();

  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (!backgroundImage) return;

    // 🔥 Delay before showing loader (avoid flicker)
    const timer = setTimeout(() => {
      setShowLoader(true);
    }, 400); // 👈 only show if slow

    const img = new Image();
    img.src = backgroundImage;

    img.onload = () => {
      clearTimeout(timer);     // stop showing loader
      setLoading(false);       // done loading
      setShowLoader(false);    // hide loader
    };

    return () => clearTimeout(timer);
  }, [backgroundImage]);

    useEffect(() => {
    refreshAuth(); // 🔥 app start lo token refresh
  }, []);

  return (
    <div className="relative min-h-screen">

      {/* ✅ SMART LOADER */}
      {loading && showLoader && <Preloader />}

      {/* Background */}
      {backgroundImage && (
        <div
          className="fixed inset-0 -z-10 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      <div className="fixed inset-0 -z-10 bg-black/40" />

      <BrowserRouter>
       <ScrollToTop /> 
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu-home" element={<MenuHome />} />
          <Route path="/menu/:categorySlug" element={<Menu />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;