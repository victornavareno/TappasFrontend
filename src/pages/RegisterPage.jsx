import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../components/Header";

function RegisterPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [role, setRole] = useState(location.state?.role || "subscriber");

  useEffect(() => {
    if (location.state?.role) {
      setRole(location.state.role);
    }
  }, [location.state]);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    city: "Caceres",
    terms: false,
    address: "",
  });

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: form.username,
      email: form.email,
      password: form.password,
      role: role,
      city: form.city,
      ...(role === "host" && { address: form.address }),
    };

    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("User registered:", data);

        const loginResponse = await fetch("http://localhost:5000/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: form.email,
            password: form.password,
          }),
        });

        const loginData = await loginResponse.json();
        if (loginResponse.ok) {
          localStorage.setItem("token", loginData.token);
          localStorage.setItem("role", loginData.role);
          console.log("User logged in:", loginData);

          navigate(
            loginData.role === "host"
              ? "/hostDashboard"
              : "/subscriberDashboard"
          );
        } else {
          alert(
            "Login failed after registration. Please try logging in manually."
          );
        }
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1533] via-[#2d1b4e] to-[#1a1533] text-white flex flex-col items-center justify-center relative">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-12 p-8 w-full max-w-4xl">
        {/* Form Section */}
        <div className="bg-white/10 p-8 rounded-lg shadow-lg w-full max-w-lg">
          <h1 className="text-3xl font-bold text-center">Crea tu cuenta</h1>
          <p className="text-white/60 text-center mt-2">
            Ya tienes cuenta?{" "}
            <span
              className="text-pink-500 cursor-pointer font-semibold"
              onClick={() => {
                console.log(location.state);
                navigate("/login", { role: location.state });
              }}
            >
              Log in
            </span>
          </p>

          <form className="space-y-4 mt-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-white mb-1">
                {role === "host" ? "Nombre del Local" : "Nombre de Usuario"}
              </label>
              <input
                id="username"
                type="text"
                placeholder="Enter your name"
                value={form.username}
                onChange={handleChange}
                className="w-full p-3 bg-white/5 border border-white/10 text-white rounded-lg"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-white mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-3 bg-white/5 border border-white/10 text-white rounded-lg"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-white mb-1">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                placeholder="Create a password"
                value={form.password}
                onChange={handleChange}
                className="w-full p-3 bg-white/5 border border-white/10 text-white rounded-lg"
              />
            </div>
            <div>
              <label htmlFor="city" className="block text-white mb-1">
                Ciudad
              </label>
              <select
                id="city"
                value={form.city}
                onChange={handleChange}
                className="w-full p-3 bg-white/5 border border-white/10 text-white rounded-lg"
              >
                <option value="Caceres">Cáceres</option>
                <option value="Badajoz">Badajoz</option>
              </select>
            </div>
            {role === "host" && (
              <div>
                <label htmlFor="address" className="block text-white mb-1">
                  Dirección del Local
                </label>
                <input
                  id="address"
                  type="text"
                  placeholder="Introduce la dirección"
                  value={form.address}
                  onChange={handleChange}
                  className="w-full p-3 bg-white/5 border border-white/10 text-white rounded-lg"
                />
              </div>
            )}
            <div className="flex items-center">
              <input
                id="terms"
                type="checkbox"
                checked={form.terms}
                onChange={handleChange}
                className="mr-2 h-4 w-4"
              />
              <label htmlFor="terms" className="text-sm text-white/60">
                Acepto los{" "}
                <span
                  className="text-white cursor-pointer"
                  onClick={() => navigate("/terms")}
                >
                  Términos y Condiciones
                </span>
              </label>
            </div>
            <button
              type="submit"
              className="w-full py-4 text-lg bg-gradient-to-r from-[#ec008c] to-[#882eff] text-white rounded-lg font-bold shadow-lg"
            >
              Crear Cuenta {role === "host" ? "como Local" : "como Usuario"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default RegisterPage;
