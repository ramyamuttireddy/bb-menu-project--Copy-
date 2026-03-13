import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <header className="w-full bg-[#728D3E] border-b-2 border-white shadow-2xl">

      <div className="max-w-7xl mx-auto flex flex-col items-center py-6">

        {/* Logo Section */}
        <div
          onClick={() => navigate("/")}
          className="cursor-pointer flex flex-col items-center"
        >
          <img
            src="/assets/Logo.png"
            alt="Bharat Bhavan"
            className="h-16 md:h-20 object-contain"
          />
        </div>

      </div>

    </header>
  );
}

export default Header;