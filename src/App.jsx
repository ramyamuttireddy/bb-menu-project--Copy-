import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Menu/Header";
import MenuHome from "./Menu/MenuHome";
import Menu from "./Menu/Menu";

import useBackground from "./hooks/useBackground";

function App() {
  const backgroundImage = useBackground();

  return (
    <div className="relative min-h-screen">
      
      {/* Background */}
      {backgroundImage && (
        <div
          className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      {/* Overlay */}
      <div className="fixed inset-0 -z-10 bg-black/40" />

      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<MenuHome />} />
          <Route path="/menu/:categorySlug" element={<Menu />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App