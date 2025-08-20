import { useState } from "react";
import { useNavigate } from "react-router-dom";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const getCsrfToken = async () => {
    await fetch("https://chatify-api.up.railway.app/csrf", {
      method: "PATCH",
      credentials: "include",
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await getCsrfToken();
      const csrfToken = getCookie("csrfToken");
      if (!csrfToken) {
        setError("Kunde inte hämta CSRF-token. Ladda om sidan och försök igen.");
        return;
      }
      const res = await fetch("https://chatify-api.up.railway.app/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, email, password, csrfToken }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Registrering misslyckades");
        return;
      }
      setSuccess(" Registrering lyckades! Du skickas vidare till inloggning...");
      setTimeout(() => navigate("/login"), 1500);
    } catch {
      setError("Något gick fel vid registrering.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-extrabold text-center text-white mb-6 drop-shadow">
          Registrera
        </h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            placeholder="Användarnamn"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-lg p-3 bg-white/80 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <input
            placeholder="E-post"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg p-3 bg-white/80 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <input
            type="password"
            placeholder="Lösenord"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg p-3 bg-white/80 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition transform hover:scale-105"
          >
            Registrera
          </button>
        </form>
        {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
        {success && <p className="text-green-400 mt-4 text-center">{success}</p>}
      </div>
    </div>
  );
}

export default Register;
