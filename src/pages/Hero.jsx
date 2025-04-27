import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  const buttonStyles =
    "px-12 py-4 text-3xl rounded-full shadow-lg font-bold transition-all duration-500 transform hover:scale-105 hover:text-3xl will-change-transform";

  const handleLearnMore = () => {
    const footer = document.getElementById("footer");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col">
      {/* Contenedor principal que ocupa toda la pantalla */}
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col text-white"
        style={{
          backgroundImage: "url('/backgrounds/TappasLandingBackground.png')",
        }}
      >
        {/* Header */}
        <header className="container mx-auto px-6 py-4">
          <div className="flex items-center">
            <img
              src="/logo_tappas.png"
              alt="Tappas logo"
              className="h-24 w-auto"
            />
          </div>
        </header>

        {/* Contenido Principal */}
        <main className="container mx-auto flex-1 flex flex-col items-center justify-center text-center px-6 pb-20">
          <h1 className="text-6xl md:text-8xl italic font-extrabold mb-4">
            TAPPAS
          </h1>
          <p className="text-2xl md:text-3xl mb-0 max-w-2xl transform translate-y-[-1rem]">
            Elige tu ciudad y qué te apetece y te recomendamos el mejor sitio!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              className={`${buttonStyles} bg-white text-black`}
              onClick={handleLearnMore}
            >
              SABER MÁS
            </button>
            <button
              className={`${buttonStyles} bg-yellow-400 text-black`}
              onClick={() => navigate("/explorar")}
            >
              ¡A COMER!
            </button>
          </div>
        </main>
      </div>

      {/* Footer (ahora está fuera del contenedor principal) */}
      <footer
        id="footer"
        className="bg-gray-950 text-yellow-400 px-6 py-16 flex flex-col items-center justify-center text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6">¿Qué es TAPPAS?</h2>
        <p className="text-lg md:text-xl max-w-3xl mb-10 text-white">
          TAPPAS es tu mejor aliado para encontrar las mejores tapas en
          cualquier ciudad. Nuestra app crea un exclusivo podio seleccionando
          los <strong>3 mejores restaurantes </strong>
          según valoraciones reales, basándose en la tapa que tú elijas. Fácil,
          rápido y delicioso: encuentra dónde disfrutar lo mejor de lo mejor.
        </p>

        <div className=" w-full mt-10 pt-6 text-sm text-white">
          © Tappas 2025. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}

export default Landing;
