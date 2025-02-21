import { useState, useEffect } from "react";

const useIsAdmin = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      const role = parsedUser.role;
      setIsAdmin(role === "admin");
    }
  }, []);

  return isAdmin;
};

export default useIsAdmin;
