import React, { useEffect, useState } from "react";
import { UserData } from "../../../types";

const Header: React.FC = () => {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  if (!user) return null;

  return (
    <header className=" p-4 flex justify-between items-center shadow-md">
      <h1 className="text-lg font-semibold">خوش آمدید، {user.name ? user.name : user.username}!</h1>
      <button onClick={handleLogout} className="bg-danger hover:bg-red-600 text-white px-4 py-2 rounded transition-colors">
        خروج
      </button>
    </header>
  );
};

export default Header;
