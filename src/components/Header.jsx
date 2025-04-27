import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); // Check if user is logged in

  return (
    <header className="fixed top-8 left-20 w-full flex items-center justify-between px-10 py-4 bg-transparent z-50">
      {/* Logo */}
      <img
        src="/logo_tango.png"
        alt="Tango logo"
        className="h-16 cursor-pointer"
        onClick={() => navigate("/")}
      />

      {/* Show "My Profile" button only if user is logged in */}
      {user && (
        <button
          className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold text-lg transition hover:bg-purple-700"
          onClick={() => navigate("/profile")}
        >
          Mi Perfil
        </button>
      )}
    </header>
  );
};

export default Header;
