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
      {/* Header */}
      <header className="container mx-auto px-6 py-2">
        <div className="flex items-center">
          <img
            src="/logo_tappas.png"
            alt="Tappas logo"
            className="h-24 w-auto"
          />
        </div>
      </header>

      <main className="container mx-auto flex-1 flex flex-col items-center justify-center text-center px-6 mt-[-4rem]">
        <h1 className="text-6xl md:text-8xl font-extrabold mb-6 italic">
          TAPPAS
        </h1>

        <p className="text-xl md:text-3xl mb-10 max-w-2xl">
          Elige tu ciudad y qué te apetece y te recomendamos el mejor sitio!
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
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
