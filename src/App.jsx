import { Link, useNavigate } from "react-router-dom";

function App() {
  const user = JSON.parse(sessionStorage.getItem("user") || "null");
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  if (user && token) {
    // Inloggad vy
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white px-4">
        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl text-center max-w-md w-full">
          <h1 className="text-4xl font-extrabold mb-6 drop-shadow-lg">
             Välkommen till Chat App
          </h1>
          <img
            src={user.avatar || "https://i.pravatar.cc/200"}
            alt="avatar"
            className="w-28 h-28 rounded-full shadow-xl border-4 border-white mx-auto mb-4"
          />
          <p className="text-xl font-medium mb-6">{user.username}</p>
          <button
            onClick={() => navigate("/chat")}
            className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-xl shadow hover:bg-indigo-100 transition transform hover:scale-105"
          >
            Till chatten →
          </button>
        </div>
      </div>
    );
  }

  // Ej inloggad vy
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-2xl text-center max-w-md w-full">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
          💬 Välkommen till Chat App
        </h1>
        <p className="text-gray-600 mb-6 text-lg">
          Skapa ett konto eller logga in för att komma igång!
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/register"
            className="px-5 py-2 bg-indigo-600 text-white font-semibold rounded-xl shadow hover:bg-indigo-700 transition transform hover:scale-105"
          >
            Registrera
          </Link>
          <Link
            to="/login"
            className="px-5 py-2 bg-gray-200 text-gray-800 font-semibold rounded-xl shadow hover:bg-gray-300 transition transform hover:scale-105"
          >
            Logga in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default App;
