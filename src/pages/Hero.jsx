import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a1a] via-[#1a1a3a] to-[#2a1a4a] text-white">
      {/* Header */}
      <header className="container mx-auto px-6 py-8">
        <div className="flex items-center">
          <img src="/logo_tango.png" alt="Tango logo" className="h-16 mt-6" />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 flex flex-col lg:flex-row items-center justify-between mt-12 gap-8">
        {/* Left Column */}
        <div className="max-w-2xl">
          <h1 className="text-6xl lg:text-7xl font-extrabold tracking-tight leading-none mb-6">
            <span className="inline-block">
              Encuentra{" "}
              <span className="bg-gradient-to-r from-[#e32eff] to-[#ec008c] bg-clip-text text-transparent">
                amigos
              </span>
            </span>
            <br />
            <span className="inline-block">en tu ciudad!</span>
          </h1>
          <p className="text-2xl text-gray-300 mb-10">
            <span className="font-normal">Únete a eventos y disfruta</span>
            <br />
            <span className="font-bold">experiencias</span> únicas en grupo
          </p>
          <div className="flex justify-center md:justify-start space-x-4">
            <button className="px-12 py-4 bg-white/10 text-white text-xl rounded-lg shadow-lg transition-all duration-500 transform hover:scale-105 hover:text-xl will-change-transform">
              Saber más
            </button>
            <button
              className="px-12 py-4 bg-gradient-to-r from-[#ec008c] to-[#882eff] text-white text-xl font-bold rounded-lg shadow-lg transition-all duration-500 transform hover:scale-105 hover:text-xl will-change-transform"
              onClick={() => navigate("/userSelection")}
            >
              Prueba Tango!
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="relative -ml-8">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#ec008c] to-[#882eff] opacity-30 blur-2xl rounded-[32px]" />
          <img
            src="/friends2.png"
            alt="Friends enjoying time together"
            className="relative rounded-[32px] max-w-[600px] w-full object-cover"
          />
        </div>
      </main>
    </div>
  );
}

export default Hero;
