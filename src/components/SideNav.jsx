import { useNavigate, useLocation } from "react-router-dom";

function SideNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(sessionStorage.getItem("user")) || {
    username: "Gäst",
    avatar: "https://i.pravatar.cc/50?img=10",
  };

  const logout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  const menuItems = [
    { path: "/chat", label: " Chat" },
    { path: "/profile", label: " Profil" },
  ];

  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col p-4 shadow-xl">
      {/* User Info */}
      <div className="flex items-center gap-3 mb-8">
        <img
          src={user.avatar}
          alt="avatar"
          className="w-12 h-12 rounded-full border-2 border-gray-600"
        />
        <div>
          <p className="font-semibold">{user.username}</p>
          <p className="text-xs text-gray-400">Online</p>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex flex-col gap-2 flex-1">
        {menuItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`text-left px-4 py-2 rounded-lg transition ${
              location.pathname === item.path
                ? "bg-blue-600 font-semibold"
                : "hover:bg-gray-700"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Logout Button */}
      <button
        onClick={logout}
        className="mt-auto px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition"
      >
         Logga ut
      </button>
    </div>
  );
}

export default SideNav;
