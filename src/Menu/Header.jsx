import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <header className="
      w-full 
      bg-[#728D3E] 
      border-b-2 border-white 
      shadow-2xl
      sticky top-0 z-50
    ">

      <div className="max-w-7xl mx-auto flex flex-col items-center py-4">

        {/* Logo Section */}
        <div
          onClick={() => navigate("/")}
          className="cursor-pointer flex flex-col items-center"
        >
          <img
            src="/assets/Logo.png"
            alt="Bharat Bhavan"
            className="w-[65%] h-[65%] object-contain"
          />
        </div>

      </div>

    </header>
  );
}

export default Header;