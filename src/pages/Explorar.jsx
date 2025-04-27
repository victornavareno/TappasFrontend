import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Explorar() {
  const [food, setFood] = useState("");
  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulamos una búsqueda con un timeout
    setTimeout(() => {
      setIsLoading(false);
      // Aquí iría la navegación a los resultados
      // navigate(`/resultados?food=${encodeURIComponent(food)}&city=${encodeURIComponent(city)}`);
      console.log("Buscando:", food, "en", city);
    }, 1500);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col text-white"
      style={{
        backgroundImage: "url('/backgrounds/TappasExplorerBackground.png')",
      }}
    >
      {/* Header consistente con la página principal */}
      <header className="container mx-auto px-6 py-4">
        <div className="flex items-center">
          <img
            src="/logo_tappas.png"
            alt="Tappas logo"
            className="h-24 w-auto"
          />
        </div>
      </header>

      {/* Contenido Principal de Búsqueda */}
      <main className="container mx-auto flex-1 flex flex-col items-center justify-center px-6 py-16">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-8 text-center">
          TAPPAS
        </h1>

        <div className="w-full max-w-md bg-black bg-opacity-70 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-yellow-400">
            ¿Qué te apetece comer hoy?
          </h2>

          <form onSubmit={handleSearch} className="space-y-6">
            {/* Campo para la tapa */}
            <div className="space-y-2">
              <label htmlFor="food" className="block text-lg font-medium">
                Tu tapa favorita
              </label>
              <div className="flex items-center rounded-full bg-gray-800 px-4 py-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-yellow-400 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  id="food"
                  type="text"
                  placeholder="Ej: Burger, Tortilla, Croquetas..."
                  className="w-full bg-transparent border-none text-white placeholder-gray-400 focus:outline-none"
                  value={food}
                  onChange={(e) => setFood(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Campo para la ciudad */}
            <div className="space-y-2">
              <label htmlFor="city" className="block text-lg font-medium">
                Tu ciudad
              </label>
              <div className="flex items-center rounded-full bg-gray-800 px-4 py-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-yellow-400 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <input
                  id="city"
                  type="text"
                  placeholder="Ej: Madrid, Barcelona, Sevilla..."
                  className="w-full bg-transparent border-none text-white placeholder-gray-400 focus:outline-none"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Botón de búsqueda */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-6 bg-yellow-400 hover:bg-yellow-300 text-black font-bold rounded-full text-lg transition-colors duration-300 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  BUSCANDO...
                </>
              ) : (
                "FIND NOW"
              )}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
