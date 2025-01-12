import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface User {
  id: string;
  email: string;
  username: string;
  token: string;
}

const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await axios.get("/api/auth", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser({ ...data, token })
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logout = async () => {
    localStorage.removeItem("token"); 
    setUser(null); 
    router.push("/"); 
  };

  useEffect(() => {
    if (!loading && user === null) {
      router.push("/");
    }
  }, [loading, user, router]);

  return { user, loading, logout };
};

export default useUser;
