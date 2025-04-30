import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Star,
  MapPin,
  ArrowLeft,
  Clock,
  Phone,
  Users,
  Utensils,
  Wifi,
  CreditCard,
  ParkingCircle,
} from "lucide-react";

export default function Restaurant() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location.state?.restaurant) {
      setRestaurant(location.state.restaurant);
      setLoading(false);
    } else {
      // Si no hay datos en el estado, redirigir al inicio
      navigate("/");
    }
  }, [id, location.state, navigate]);

  if (loading || !restaurant) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-zinc-700 border-t-yellow-400"></div>
      </div>
    );
  }

  // Datos por defecto si no están disponibles
  const restaurantData = {
    provincia: restaurant.provincia || "Sin provincia",
    modalidad: restaurant.modalidad || "Restaurante",
    nombre: restaurant.name || restaurant.nombre || "Nombre no disponible",
    municipio: restaurant.municipio || restaurant.city || "Sin municipio",
    direccion:
      restaurant.direccion || restaurant.address || "Dirección no disponible",
    codigoPostal: restaurant.codigoPostal || "",
    mejoresPlatos: restaurant.mejoresPlatos || [
      restaurant.food || "Especialidad de la casa",
    ],
    rating: restaurant.rating || restaurant.puntuacion || 0,
    imagen: restaurant.image || restaurant.imagen || "/default_image.png",
    especialidad:
      restaurant.especialidad || restaurant.food || "Especialidad de la casa",
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
          {/* Banner de imagen */}
          <div className="relative h-64 w-full rounded-t-2xl overflow-hidden mb-8">
            <img
              src={restaurantData.imagen}
              alt={restaurantData.nombre}
              className="h-full w-full object-cover brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

            {/* Botón de regreso */}
            <button
              onClick={() => navigate(-1)}
              className="absolute left-4 top-4 z-10 rounded-full bg-black/50 p-3 text-white backdrop-blur-sm hover:bg-yellow-400 hover:text-black"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>

            {/* Logo TAPPAS */}
            <div className="absolute right-4 top-4 z-10 flex items-center">
              <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400">
                <MapPin className="h-4 w-4 text-black" />
              </div>
              <span className="text-xl font-extrabold tracking-tighter">
                TAPPAS
              </span>
            </div>
          </div>

          {/* Información del restaurante */}
          <motion.div
            className="rounded-2xl bg-zinc-900 p-6 shadow-xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <h1 className="text-3xl font-bold">{restaurantData.nombre}</h1>
              </div>
              <div className="flex items-center rounded-full bg-yellow-400 px-4 py-2 text-black">
                <Star className="mr-1 h-5 w-5 fill-yellow-900" />
                <span className="text-lg font-bold">
                  {restaurantData.rating}
                </span>
              </div>
            </div>

            <div className="mb-6 grid gap-4 md:grid-cols-2">
              <div className="flex items-start">
                <MapPin className="mr-2 mt-1 h-5 w-5 text-yellow-400" />
                <div>
                  <p className="font-medium">Dirección</p>
                  <p className="text-zinc-400">{restaurantData.direccion}</p>
                  <p className="text-zinc-400">
                    {restaurantData.municipio}, {restaurantData.provincia}{" "}
                    {restaurantData.codigoPostal}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Users className="mr-2 mt-1 h-5 w-5 text-yellow-400" />
                <div>
                  <p className="font-medium">Modalidad</p>
                  <p className="text-zinc-400">{restaurantData.modalidad}</p>
                </div>
              </div>
            </div>

            {/* Etiquetas */}
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-zinc-800 px-3 py-1 text-sm">
                {restaurantData.provincia}
              </span>
              <span className="rounded-full bg-zinc-800 px-3 py-1 text-sm">
                {restaurantData.modalidad}
              </span>
            </div>
          </motion.div>

          {/* Mejores platos */}
          <div className="mb-8">
            <h2 className="mb-6 text-2xl font-bold">
              <span className="border-b-2 border-yellow-400 pb-1">
                Mejores Platos
              </span>
            </h2>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {restaurantData.mejoresPlatos.map((plato, index) => (
                <motion.div
                  key={index}
                  className="overflow-hidden rounded-xl bg-zinc-900 shadow-md transition-all duration-300 hover:shadow-[0_0_15px_rgba(250,204,21,0.3)]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <div className="relative h-48 w-full">
                    <img
                      src={`/placeholder.svg?height=300&width=400&text=${encodeURIComponent(
                        plato
                      )}`}
                      alt={plato}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="mb-2 text-lg font-semibold">{plato}</h3>
                    <div className="flex justify-between">
                      <span className="text-sm text-zinc-400">
                        Especialidad de la casa
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <button
              className="flex-1 rounded-full bg-yellow-400 py-4 text-black hover:bg-yellow-300 font-bold"
              onClick={() =>
                window.open(`tel:${restaurantData.telefono}`, "_blank")
              }
            >
              Reservar mesa
            </button>
            <button className="flex-1 rounded-full border-2 border-yellow-400 bg-transparent py-4 text-yellow-400 hover:bg-yellow-400 hover:text-black font-bold">
              Ver menú completo
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
