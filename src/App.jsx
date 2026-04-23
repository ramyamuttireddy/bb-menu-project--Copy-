import { HashRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "./Menu/Header";
import MenuHome from "./Menu/MenuHome";
import Menu from "./Menu/Menu";
import Home from "./HomePage/Home";
import Preloader from "./Preloader/preloader";

import useBackground from "./hooks/useBackground";
import { refreshAuth } from "./API/api";
import ScrollToTop from "./BackArrow/ScrollTop";

import usePullToRefresh from "./hooks/usePullToRefresh";

function App() {
  const backgroundImage = useBackground();

  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(false);

  // 🔥 refresh function
  const handleRefresh = () => {
    console.log("Refreshing...");
    
    // Option 1: full reload (simple)
    window.location.reload();

    // Option 2 (better): trigger state refresh
    // setKey(prev => prev + 1);
  };

  // 🔥 attach pull-to-refresh
  usePullToRefresh(handleRefresh);

  useEffect(() => {
    if (!backgroundImage) return;

    const timer = setTimeout(() => {
      setShowLoader(true);
    }, 400);

    const img = new Image();
    img.src = backgroundImage;

    img.onload = () => {
      clearTimeout(timer);
      setLoading(false);
      setShowLoader(false);
    };

    return () => clearTimeout(timer);
  }, [backgroundImage]);

  useEffect(() => {
    refreshAuth();
  }, []);

  return (
    <div className="relative min-h-screen">
      {loading && showLoader && <Preloader />}

      {backgroundImage && (
        <div
          className="fixed inset-0 -z-10 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      <div className="fixed inset-0 -z-10 bg-black/40" />

      <HashRouter>
        <ScrollToTop />
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu-home" element={<MenuHome />} />
          <Route path="/menu/:categorySlug" element={<Menu />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;