import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Trophy, Star } from "lucide-react";

export default function Podium() {
  const location = useLocation();
  const navigate = useNavigate();
  const [food, setFood] = useState("");
  const [city, setCity] = useState("");
  const [showPodium, setShowPodium] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

  // Function to get a random restaurant image
  const getRandomRestaurantImage = () => {
    const randomIndex = Math.floor(Math.random() * 18) + 1; // 1-18
    return `/restaurants/restaurant${randomIndex}.png`;
  };

  // Mock data for restaurant recommendations with random images
  const mockRecommendations = [
    {
      id: 1,
      name: "Bar Antonio",
      rating: (Math.random() * 1 + 4).toFixed(1), // Random rating between 4.0 and 5.0
      image: getRandomRestaurantImage(),
      address: "123 Culinary St",
      price: "$$",
      distance: `${(Math.random() * 2 + 0.5).toFixed(1)} mi`, // Random distance 0.5-2.5mi
    },
    {
      id: 2,
      name: "Casa Pepe",
      rating: (Math.random() * 1 + 4).toFixed(1),
      image: getRandomRestaurantImage(),
      address: "456 Gourmet Ave",
      price: "$$$",
      distance: `${(Math.random() * 2 + 0.5).toFixed(1)} mi`,
    },
    {
      id: 3,
      name: "El Madroño",
      rating: (Math.random() * 1 + 4).toFixed(1),
      image: getRandomRestaurantImage(),
      address: "789 Delicious Blvd",
      price: "$$",
      distance: `${(Math.random() * 2 + 0.5).toFixed(1)} mi`,
    },
  ];

  useEffect(() => {
    if (location.state) {
      setFood(location.state.food);
      setCity(location.state.city);
    }
    // Set recommendations with random images
    setRecommendations(mockRecommendations);
    // Show podium after a slight delay for better UX
    const timer = setTimeout(() => {
      setShowPodium(true);
    }, 500);
    return () => clearTimeout(timer);
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
            <span className="text-yellow-400">{food.toUpperCase()}</span>
          </h2>
          <p className="mb-10 text-center text-zinc-400">
            Los 3 mejores sitios en {city} basados en su puntuación y
            popularidad
          </p>

          {/* Podium Section */}
          {showPodium && recommendations.length > 0 && (
            <div className="mb-8 flex flex-col items-center">
              <h3 className="mb-8 flex items-center text-2xl font-bold">
                <Trophy className="mr-2 h-6 w-6 text-yellow-400" />
                THE WINNERS PODIUM
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
                      <span className="text-3xl font-black text-black">1</span>
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
          )}

          <div className="mt-8 text-center">
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
