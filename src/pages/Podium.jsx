import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Trophy, Star, ChevronRight } from "lucide-react";

export default function Podium() {
  const location = useLocation();
  const navigate = useNavigate();
  const [food, setFood] = useState("");
  const [city, setCity] = useState("");
  const [showPodium, setShowPodium] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    if (location.state) {
      const { food, city, recommendations } = location.state;
      setFood(food);
      setCity(city);

      if (recommendations && recommendations.length > 0) {
        const enriched = recommendations.map((r) => ({
          id: r.id || Math.random(),
          name: r.nombre || r.name || "Nombre no disponible",
          rating: r.puntuacion || r.rating || 0,
          image: r.imagen ? `/restaurants/${r.imagen}` : "/default_image.png",
          address: r.direccion || r.address || "Dirección no disponible",
          price: r.modalidad || "Restaurante",
        }));

        setRecommendations(enriched);
        setShowPodium(true);
      }
    }
  }, [location.state]);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col text-white"
      style={{
        backgroundImage: "url('/backgrounds/TappasExplorerBackground.png')",
      }}
    >
      {/* Header minimalista */}
      <header className="container mx-auto px-6 py-4 mb-0 pb-0">
        <div className="flex items-center">
          <img
            src="/logo_tappas.png"
            alt="Tappas logo"
            className="h-24 w-auto hover:cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => navigate("/")}
          />
        </div>
      </header>

      {/* Main Content - Adjusted for better centering */}
      <main className="flex-1 flex items-center justify-center overflow-y-auto mt-0 pt-0">
        <div className="w-full max-w-6xl bg-black bg-opacity-75 rounded-3xl p-10 shadow-2xl backdrop-blur-sm border border-yellow-400/20 my-8">
          <h2 className="mb-2 text-center text-3xl font-black uppercase tracking-tight sm:text-4xl">
            MEJORES SITIOS PARA{" "}
            <span className="text-yellow-400">{food.toUpperCase()}</span> EN{" "}
            <span className="text-white">{city.toUpperCase()}</span>
          </h2>
          <p className="mb-10 text-center text-zinc-400">
            Los 3 mejores sitios en {city} basados en su puntuación y
            popularidad
          </p>

          {/* Podium Section */}
          {showPodium && recommendations.length > 0 && (
            <>
              <div className="mb-8 flex flex-col items-center">
                <h3 className="mb-8 flex items-center text-2xl font-bold">
                  <Trophy className="mr-2 h-6 w-6 text-yellow-400" />
                  LAS MEJORES TAPPAS EN {city.toUpperCase()}
                </h3>

                {/* Adjusted podium container with proper spacing */}
                <div className="relative flex h-[380px] w-full max-w-4xl items-end justify-between px-4">
                  {/* Background Glow */}
                  <div className="absolute bottom-0 h-40 w-full rounded-3xl bg-yellow-400/5"></div>

                  {/* Second Place - Left (25% width) */}
                  <motion.div
                    className="relative z-10 flex w-[25%] flex-col items-center"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <div className="relative mb-3 h-20 w-20 overflow-hidden rounded-full border-4 border-zinc-800">
                      <img
                        src={recommendations[1].image}
                        alt={recommendations[1].name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="mb-2 flex items-center">
                      <Star className="mr-1 h-4 w-4 text-yellow-400" />
                      <span className="font-bold">
                        {recommendations[1].rating}
                      </span>
                    </div>
                    <p className="mb-2 text-center font-bold">
                      {recommendations[1].name}
                    </p>
                    <div className="flex h-[160px] w-full flex-col items-center rounded-t-xl bg-zinc-800">
                      <div className="mt-auto flex h-16 w-full items-center justify-center rounded-t-xl bg-zinc-700">
                        <span className="text-2xl font-black text-zinc-300">
                          2
                        </span>
                      </div>
                    </div>
                  </motion.div>

                  {/* First Place - Center (30% width) */}
                  <motion.div
                    className="relative z-20 flex w-[30%] flex-col items-center"
                    initial={{ opacity: 0, y: 70 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="relative mb-3 h-24 w-24 overflow-hidden rounded-full border-4 border-yellow-400">
                      <img
                        src={recommendations[0].image}
                        alt={recommendations[0].name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="mb-2 flex items-center">
                      <Star className="mr-1 h-5 w-5 text-yellow-400" />
                      <span className="text-lg font-bold">
                        {recommendations[0].rating}
                      </span>
                    </div>
                    <p className="mb-2 text-center text-lg font-bold">
                      {recommendations[0].name}
                    </p>
                    <div className="flex h-[220px] w-full flex-col items-center rounded-t-xl bg-zinc-800">
                      <div className="mt-auto flex h-16 w-full items-center justify-center rounded-t-xl bg-yellow-400">
                        <span className="text-3xl font-black text-black">
                          1
                        </span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Third Place - Right (25% width) */}
                  <motion.div
                    className="relative z-10 flex w-[25%] flex-col items-center"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    <div className="relative mb-3 h-20 w-20 overflow-hidden rounded-full border-4 border-zinc-800">
                      <img
                        src={recommendations[2].image}
                        alt={recommendations[2].name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="mb-2 flex items-center">
                      <Star className="mr-1 h-4 w-4 text-yellow-400" />
                      <span className="font-bold">
                        {recommendations[2].rating}
                      </span>
                    </div>
                    <p className="mb-2 text-center font-bold">
                      {recommendations[2].name}
                    </p>
                    <div className="flex h-[120px] w-full flex-col items-center rounded-t-xl bg-zinc-800">
                      <div className="mt-auto flex h-16 w-full items-center justify-center rounded-t-xl bg-zinc-700">
                        <span className="text-2xl font-black text-zinc-300">
                          3
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Restaurant Cards Section */}
              <div className="mt-12 grid gap-6 md:grid-cols-3">
                {recommendations.map((place, index) => (
                  <motion.div
                    key={place.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 * index }}
                    className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 text-white transition-all duration-300 hover:shadow-[0_0_15px_rgba(250,204,21,0.3)]"
                  >
                    <div className="relative h-48 w-full overflow-hidden">
                      <div
                        className={`absolute left-4 top-4 z-10 rounded-full ${
                          index === 0
                            ? "bg-yellow-400 text-black"
                            : "bg-zinc-800 text-white"
                        } px-3 py-1 text-sm font-bold`}
                      >
                        #{index + 1}
                      </div>
                      <img
                        src={place.image}
                        alt={place.name}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                    <div className="p-5">
                      <div className="mb-2 flex items-center justify-between">
                        <h3 className="text-xl font-bold">{place.name}</h3>
                        <span className="flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm font-bold text-black">
                          ★ {place.rating}
                        </span>
                      </div>
                      <div className="mb-4 flex items-center justify-between text-sm text-zinc-400">
                        <p>{place.address}</p>
                      </div>
                      <div className="mb-4 flex items-center gap-2">
                        <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs">
                          {place.price}
                        </span>
                        <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs">
                          {food}
                        </span>
                      </div>
                      <button className="mt-2 w-full rounded-full bg-zinc-800 px-4 py-2 text-white hover:bg-yellow-400 hover:text-black flex items-center justify-center">
                        Ver más <ChevronRight className="ml-1 h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}

          <div className="mt-12 text-center">
            <button
              onClick={() => navigate("/explorar")}
              className="rounded-full border-2 border-yellow-400 bg-transparent px-8 py-4 text-yellow-400 hover:bg-yellow-400 hover:text-black font-bold"
            >
              Search Again
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
