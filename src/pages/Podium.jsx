import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Trophy, Star, ChevronRight, Crown, Sparkles } from "lucide-react";

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
          ...r, // Spread all other properties
        }));

        setRecommendations(enriched);
        setShowPodium(true);
      }
    }
  }, [location.state]);

  const handleRestaurantClick = (restaurant) => {
    navigate(`/restaurant/${restaurant.id}`, { state: { restaurant } });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col text-white"
      style={{
        backgroundImage: "url('/backgrounds/TappasExplorerBackground.png')",
      }}
    >
      {/* Header */}
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

      {/* Main Content */}
      <main className="flex-1 flex items-start justify-center overflow-y-auto pb-8">
        <div className="w-full max-w-6xl bg-black bg-opacity-75 rounded-3xl p-8 shadow-2xl backdrop-blur-sm border border-yellow-400/20">
          {/* MEJORES PLATOS PARA TAPA EN CIUDAD */}
          <h2 className="mb-2 text-center text-3xl font-black uppercase tracking-tight sm:text-4xl">
            MEJORES SITIOS PARA{" "}
            <span className="text-yellow-400">{food.toUpperCase()}</span>
          </h2>

          {/* Podium Section */}
          {showPodium && recommendations.length > 0 && (
            <>
              <div className="mb-4 flex flex-col items-center">
                <h3 className="mb-6 flex items-center text-2xl font-bold">
                  <Trophy className="mr-2 h-6 w-6 text-yellow-400" />
                  LAS MEJORES TAPPAS EN {city.toUpperCase()}
                </h3>

                {/* Podium container */}
                <div className="relative mt-24 flex h-[320px] w-full max-w-4xl items-end justify-center gap-4 px-4">
                  {/* Gold glow effect for first place */}
                  <div className="absolute inset-0 flex items-end justify-center">
                    <div className="h-[220px] w-[30%] max-w-[280px] bg-yellow-400/10 rounded-t-xl blur-xl"></div>
                  </div>

                  {/* Second Place */}
                  <motion.div
                    className="relative z-10 flex w-[25%] max-w-[220px] flex-col items-center"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <div className="relative mb-3 h-20 w-20 overflow-hidden rounded-full border-4 border-white-500 shadow-lg">
                      <img
                        src={recommendations[1].image}
                        alt={recommendations[1].name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="mb-2 flex items-center">
                      <Star className="mr-1 h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span className="font-bold">
                        {recommendations[1].rating}
                      </span>
                    </div>
                    <p className="mb-2 text-center font-bold line-clamp-1">
                      {recommendations[1].name}
                    </p>
                    <div className="flex h-[180px] w-full flex-col items-center rounded-t-xl bg-gradient-to-b from-slate-700 to-slate-800 shadow-lg">
                      <div className="mt-auto flex h-16 w-full items-center justify-center rounded-t-xl bg-gradient-to-b from-slate-500 to-slate-600">
                        <span className="text-2xl font-black text-white">
                          2
                        </span>
                      </div>
                    </div>
                  </motion.div>

                  {/* First Place - Enhanced */}
                  <motion.div
                    className="relative z-20 flex w-[30%] max-w-[280px] flex-col items-center"
                    initial={{ opacity: 0, y: 70 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="relative mb-3 h-24 w-24 overflow-hidden rounded-full border-4 border-yellow-400 shadow-lg shadow-yellow-400/50">
                      <img
                        src={recommendations[0].image}
                        alt={recommendations[0].name}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-1">
                        <Crown className="h-5 w-5 text-black" />
                      </div>
                    </div>
                    <div className="mb-2 flex items-center">
                      <Star className="mr-1 h-5 w-5 text-yellow-400 fill-yellow-400" />
                      <span className="text-lg font-bold">
                        {recommendations[0].rating}
                      </span>
                    </div>
                    <p className="mb-2 text-center text-lg font-bold line-clamp-1">
                      {recommendations[0].name}
                    </p>
                    <div className="flex h-[220px] w-full flex-col items-center rounded-t-xl bg-gradient-to-b from-yellow-500/20 to-yellow-600/30 shadow-lg">
                      <div className="mt-auto flex h-16 w-full items-center justify-center rounded-t-xl bg-gradient-to-b from-yellow-400 to-yellow-500 relative overflow-hidden">
                        <span className="text-3xl font-black text-black z-10">
                          1
                        </span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Third Place */}
                  <motion.div
                    className="relative z-10 flex w-[25%] max-w-[220px] flex-col items-center"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    <div className="relative mb-3 h-20 w-20 overflow-hidden rounded-full border-4 border-white shadow-lg">
                      <img
                        src={recommendations[2].image}
                        alt={recommendations[2].name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="mb-2 flex items-center">
                      <Star className="mr-1 h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span className="font-bold">
                        {recommendations[2].rating}
                      </span>
                    </div>
                    <p className="mb-2 text-center font-bold line-clamp-1">
                      {recommendations[2].name}
                    </p>
                    <div className="flex h-[160px] w-full flex-col items-center rounded-t-xl bg-gradient-to-b from-slate-700 to-slate-800 shadow-lg">
                      <div className="mt-auto flex h-16 w-full items-center justify-center rounded-t-xl bg-gradient-to-b from-gray-500 to-gray-700">
                        <span className="text-2xl font-black text-white">
                          3
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Spacer */}
              <div className="h-16"></div>

              {/* Restaurant Cards Section */}
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {recommendations.map((place, index) => (
                  <motion.div
                    key={place.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 * index }}
                    className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 text-white transition-all duration-300 hover:shadow-[0_0_15px_rgba(250,204,21,0.3)] hover:-translate-y-1 cursor-pointer"
                    onClick={() => handleRestaurantClick(place)}
                  >
                    <div className="relative h-48 w-full overflow-hidden">
                      <div
                        className={`absolute left-4 top-4 z-10 rounded-full ${
                          index === 0
                            ? "bg-yellow-400 text-black"
                            : index === 1
                            ? "bg-black text-white"
                            : "bg-black text-white"
                        } px-3 py-1 text-sm font-bold flex items-center`}
                      >
                        #{index + 1}
                        {index === 0 && <Crown className="ml-1 h-4 w-4" />}
                      </div>
                      <img
                        src={place.image}
                        alt={place.name}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                    <div className="p-5">
                      <div className="mb-2 flex items-center justify-between">
                        <h3 className="text-xl font-bold line-clamp-1">
                          {place.name}
                        </h3>
                        <span className="flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm font-bold text-black">
                          ★ {place.rating}
                        </span>
                      </div>
                      <div className="mb-4 flex items-center justify-between text-sm text-zinc-400">
                        <p className="line-clamp-1">{place.address}</p>
                      </div>
                      <div className="mb-4 flex items-center gap-2">
                        <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs">
                          {place.price}
                        </span>
                        <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs">
                          {food}
                        </span>
                      </div>
                      <button
                        className="mt-2 w-full rounded-full bg-zinc-800 px-4 py-2 text-white hover:bg-yellow-400 hover:text-black flex items-center justify-center"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRestaurantClick(place);
                        }}
                      >
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
              className="rounded-full border-2 border-yellow-400 bg-transparent px-8 py-3 text-yellow-400 hover:bg-yellow-400 hover:text-black font-bold transition-colors duration-300"
            >
              Search Again
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
