import { LandingPage, Text } from "@/component";
import { useUser } from "@/hooks";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Home = () => {
  const { user, loading } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]); 

  if (loading) {
    return <Text level="h3" className="haeding-3 text-secondary">Loading...</Text>;
  }

  if (!user) {
    return <LandingPage />;
  }

  return null; 
};


export default Home;
