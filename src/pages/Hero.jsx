import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  const buttonStyles =
    "px-12 py-4 text-xl rounded-full font-bold shadow-lg transition-all duration-500 transform hover:scale-105 hover:text-xl will-change-transform";

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col text-white"
      style={{
        backgroundImage: "url('/backgrounds/TappasLandingBackground.png')",
      }}
    >
      {/* Header - Reducimos el padding vertical para que afecte menos */}
      <header className="container mx-auto px-6 py-4">
        {" "}
        {/* Cambiado de py-8 a py-4 */}
        <div className="flex items-center">
          <img
            src="/logo_tappas.png"
            alt="Tappas logo"
            className="h-24 w-auto"
          />
        </div>
      </header>

      {/* Contenido Principal - Ajustar para centrado perfecto */}
      <main className="container mx-auto flex-1 flex flex-col items-center justify-center text-center px-6 pb-20">
        <h1 className="text-6xl md:text-8xl italic font-extrabold mb-4">
          TAPPAS
        </h1>
        <p className="text-2xl md:text-3xl mb-0 max-w-2xl transform translate-y-[-1rem]">
          Elige tu ciudad y qué te apetece y te recomendamos el mejor sitio!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button className={`${buttonStyles} bg-white text-black`}>
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
  );
}

export default Landing;
