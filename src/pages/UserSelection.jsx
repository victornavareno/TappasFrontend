import { useNavigate } from "react-router-dom";
import Header from "../components/Header"; // Import the new Header component

function UserSelection() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#0a0a1a] via-[#1a1a3a] to-[#2a1a4a] text-white relative">
      {/* Header with Logo */}
      <Header />
      {/* Main Content */}
      <div className="text-center px-6">
        <h1 className="text-5xl font-extrabold text-white mb-1 leading-tight">
          ¿Cómo quieres usar Tango?
        </h1>
        <p className="text-gray-400 text-2xl mb-12">
          Únete a nuestra comunidad y comienza a disfrutar de eventos únicos.
        </p>

        {/* Selection Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl mx-auto">
          {/* Local/Host Option */}
          <div
            onClick={() => {
              const state = { role: "host" };
              console.log("Role: " + state.role);
              navigate("/register", { state });
            }} // PASO EL ROL COMO STATE para REGISTER
            className="group bg-white/10 rounded-xl p-10 flex flex-col items-center justify-between hover:scale-105 transition-transform cursor-pointer shadow-lg"
          >
            <div>
              <h2 className="text-5xl font-bold text-white mb-6">
                Soy un Local
              </h2>
              <p className="text-xl text-gray-300">
                Propón y crea Eventos en tu ciudad!
              </p>
            </div>
            <button className="mt-8 px-8 py-4 bg-white text-gray-600 rounded-lg font-semibold text-xl transition hover:bg-gray-200">
              Crear Evento
            </button>
          </div>
          {/* Normal User Option */}
          <div
            onClick={() => {
              const state = { role: "subscriber" };
              console.log("Role: " + state.role);
              navigate("/explorar-eventos", { state });
            }} // PASO EL ROL COMO STATE para EXPLORAR EVENTOS
            className="group bg-gradient-to-r from-[#ec008c] to-[#882eff] rounded-xl p-10 flex flex-col items-center justify-between hover:scale-105 transition-transform cursor-pointer shadow-lg"
          >
            <div>
              <h2 className="text-5xl font-bold text-white mb-6">
                Soy Usuario
              </h2>
              <p className="text-xl text-gray-300">
                Explora y únete a Eventos en tu ciudad!
              </p>
            </div>
            <button className="mt-8 px-8 py-4 bg-white text-purple-600 rounded-lg font-semibold text-xl transition hover:bg-gray-200">
              Explorar Eventos
            </button>
          </div>
        </div>
      </div>
      {/* Decorative Footer */}
      <footer className="absolute bottom-10 text-center text-gray-400 text-base">
        © 2025 Tango. Todos los derechos reservados.
      </footer>
    </div>
  );
}

export default UserSelection;
