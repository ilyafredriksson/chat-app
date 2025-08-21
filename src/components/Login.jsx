import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); 
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const getCsrfToken = async () => {
    const res = await fetch("https://chatify-api.up.railway.app/csrf", {
      method: "PATCH",
    });
    const data = await res.json();
    if (data.csrfToken) {
      sessionStorage.setItem("csrfToken", data.csrfToken);
      return data.csrfToken;
    }
    return null;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await getCsrfToken();
      const csrfToken = sessionStorage.getItem("csrfToken");
      if (!csrfToken) {
        setError("Kunde inte hämta CSRF-token. Ladda om sidan och försök igen.");
        return;
      }
      const res = await fetch("https://chatify-api.up.railway.app/auth/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password, csrfToken }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Felaktiga inloggningsuppgifter.");
        return;
      }
      const token = data.token;
      const decoded = jwtDecode(token);
      sessionStorage.setItem("token", token);
      sessionStorage.setItem(
        "user",
        JSON.stringify({
          id: decoded.id,
          username: decoded.username,
          avatar: decoded.avatar,
        })
      );
      navigate("/chat");
    } catch {
      setError("Något gick fel vid inloggning.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-extrabold text-center text-white mb-6 drop-shadow">
          Logga in
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            placeholder="Användarnamn"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            Logga in
          </button>
        </form>
        {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
}

export default Login;
