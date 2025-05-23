import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Explorar() {
  const [food, setFood] = useState("");
  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [foodSuggestions, setFoodSuggestions] = useState([]);
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [showFoodSuggestions, setShowFoodSuggestions] = useState(false);
  const [showCitySuggestions, setShowCitySuggestions] = useState(false);
  const navigate = useNavigate();

  // Cargar sugerencias de tapas
  useEffect(() => {
    const fetchFoodSuggestions = async () => {
      if (food.length < 2) {
        setFoodSuggestions([]);
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:8080/restaurantes/tapas"
        );
        if (!response.ok) throw new Error("Error al cargar sugerencias");
        const data = await response.json();

        // Filtrar tapas que comiencen con el texto ingresado (insensible a mayúsculas)
        const filtered = data.filter((tapa) =>
          tapa.toLowerCase().startsWith(food.toLowerCase())
        );
        setFoodSuggestions(filtered);
      } catch (error) {
        console.error("Error fetching food suggestions:", error);
      }
    };

    const timer = setTimeout(() => {
      fetchFoodSuggestions();
    }, 300); // Debounce para no hacer muchas peticiones

    return () => clearTimeout(timer);
  }, [food]);

  // Cargar sugerencias de ciudades
  useEffect(() => {
    const fetchCitySuggestions = async () => {
      if (city.length < 2) {
        setCitySuggestions([]);
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:8080/restaurantes/ciudades"
        );
        if (!response.ok) throw new Error("Error al cargar ciudades");
        const data = await response.json();

        // Filtrar ciudades que comiencen con el texto ingresado (insensible a mayúsculas)
        const filtered = data.filter((ciudad) =>
          ciudad.toLowerCase().startsWith(city.toLowerCase())
        );
        setCitySuggestions(filtered);
      } catch (error) {
        console.error("Error fetching city suggestions:", error);
      }
    };

    const timer = setTimeout(() => {
      fetchCitySuggestions();
    }, 300); // Debounce

    return () => clearTimeout(timer);
  }, [city]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        `http://localhost:8080/restaurantes/top3/${encodeURIComponent(
          food
        )}/${encodeURIComponent(city)}`
      );

      if (!response.ok)
        throw new Error("No se pudo obtener el top 3 de restaurantes");

      const data = await response.json();

      console.log("Respuesta JSON:", data);

      if (!data || (Array.isArray(data) && data.length === 0)) {
        alert("No se encontró ningún restaurante con esos criterios.");
      } else {
        navigate("/podium", { state: { food, city, recommendations: data } });
      }
    } catch (error) {
      console.error("Error al buscar recomendaciones:", error);
      alert(
        "No se pudo encontrar el top 3 de restaurantes. Inténtalo más tarde."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleFoodSuggestionClick = (suggestion) => {
    setFood(suggestion);
    setShowFoodSuggestions(false);
  };

  const handleCitySuggestionClick = (suggestion) => {
    setCity(suggestion);
    setShowCitySuggestions(false);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col text-white"
      style={{
        backgroundImage: "url('/backgrounds/TappasExplorerBackground.png')",
      }}
    >
      {/* Header minimalista */}
      <header className="container mx-auto px-6 py-4">
        <div className="flex items-center">
          <img
            src="/logo_tappas.png"
            alt="Tappas logo"
            className="h-24 w-auto hover:cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => navigate("/")}
          />
        </div>
      </header>

      {/* Contenido Principal - Centrado vertical y horizontalmente */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl bg-black bg-opacity-75 rounded-3xl p-10 shadow-2xl backdrop-blur-sm border border-yellow-400/20">
          {/* Título principal más destacado */}
          <h1 className="text-6xl md:text-7xl font-extrabold mb-2 text-center text-white italic">
            TAPPAS
          </h1>

          {/* Subtítulo */}
          <p className="text-2xl text-center mb-8 text-gray-300">
            Encuentra las mejores tapas en tu ciudad
          </p>

          {/* Formulario de búsqueda mejorado */}
          <form onSubmit={handleSearch} className="space-y-6">
            {/* Campo para la tapa - más grande */}
            <div className="space-y-3 relative">
              <div className="flex items-center rounded-xl bg-gray-800/80 px-6 py-4 border border-gray-700 hover:border-yellow-400/50 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-yellow-400 mr-3"
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
                  type="text"
                  placeholder="¿Qué te apetece comer? "
                  className="w-full bg-transparent border-none text-xl text-white placeholder-gray-400 focus:outline-none"
                  value={food}
                  onChange={(e) => {
                    setFood(e.target.value);
                    setShowFoodSuggestions(true);
                  }}
                  onFocus={() => setShowFoodSuggestions(true)}
                  onBlur={() =>
                    setTimeout(() => setShowFoodSuggestions(false), 200)
                  }
                  required
                />
              </div>

              {/* Lista de sugerencias para tapas */}
              {showFoodSuggestions && foodSuggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-gray-800 rounded-lg shadow-lg border border-gray-700 max-h-60 overflow-auto">
                  {foodSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="px-4 py-3 hover:bg-gray-700 cursor-pointer text-white"
                      onClick={() => handleFoodSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Campo para la ciudad - más grande */}
            <div className="space-y-3 relative">
              <div className="flex items-center rounded-xl bg-gray-800/80 px-6 py-4 border border-gray-700 hover:border-yellow-400/50 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-yellow-400 mr-3"
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
                  type="text"
                  placeholder="Tu ciudad (Cáceres, Badajoz, Mérida...)"
                  className="w-full bg-transparent border-none text-xl text-white placeholder-gray-400 focus:outline-none"
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    setShowCitySuggestions(true);
                  }}
                  onFocus={() => setShowCitySuggestions(true)}
                  onBlur={() =>
                    setTimeout(() => setShowCitySuggestions(false), 200)
                  }
                  required
                />
              </div>

              {/* Lista de sugerencias para ciudades */}
              {showCitySuggestions && citySuggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-gray-800 rounded-lg shadow-lg border border-gray-700 max-h-60 overflow-auto">
                  {citySuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="px-4 py-3 hover:bg-gray-700 cursor-pointer text-white"
                      onClick={() => handleCitySuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Botón de búsqueda - más destacado */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-5 px-6 bg-yellow-400 hover:bg-yellow-300 text-black font-bold rounded-xl text-xl transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-yellow-400/20"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-6 w-6 text-black"
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
                "BUSCAR"
              )}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
