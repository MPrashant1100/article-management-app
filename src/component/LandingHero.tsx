import { Button, Image, InputField, Link, Text, UserLogin } from "@/component";
import axios from "axios";
import { useRouter } from "next/navigation"; 
import { useState } from "react";

const LandingHero = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSignInView, setIsSignInView] = useState(false); 
  const router = useRouter(); 

  const handleRegisterUser = async () => {
    try {
      const registerUser = await axios.post("/api/register", {
        username,
        email,
        password,
      });

      setSuccessMessage("User registered successfully!");
      console.log("Registration successful:", registerUser.data);

      router.push("/dashboard");
    } catch (error) {
      console.error("Registration failed");
    }

    setUsername("");
    setPassword("");
    setEmail("");
  };

  const toggleView = () => {
    setIsSignInView(!isSignInView); 
  };

  return (
    <>
      {isSignInView ? (
        <UserLogin toggleView={toggleView} />
      ) : (
        <div className="flex flex-col md:flex-row mx-auto justify-center p-2 gap-4 mt-2 mb-6">
          <div className="">
            <Image
              src="/signUp.png"
              alt="signUp"
              loading="lazy"
              className="p-4"
            />
          </div>
          <div className="flex flex-col gap-4 border border-2 rounded-xl py-4 px-4 md:w-1/3 w-full h-fit shadow-xl md:mt-4">
            <div className="flex justify-between items-baseline">
              <Text level="h2" className="heading-2 text-secondary font-bold">
                Let us know <strong className="text-primary">!</strong>
              </Text>
              <Link href="#" onClick={toggleView}>
                <Text
                  level="h5"
                  className="heading-5 text-secondary font-bold underline decoration-secondary"
                >
                  Sign
                  <strong className="text-primary underline decoration-primary">
                    In
                  </strong>
                </Text>
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              <InputField
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                value={username}
                placeholder="User Name"
                className="text-greyDark"
              />
              <InputField
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                value={password}
                placeholder="Password"
                className="text-greyDark"
              />
              <InputField
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                value={email}
                placeholder="Email"
                className="text-greyDark"
              />
            </div>
            <div className="flex">
              <Button
                variant="PRIMARY"
                onClick={handleRegisterUser}
                className="w-full rounded-xl px-2 mx-1"
                size="md"
              >
                Register User
              </Button>
            </div>
            {successMessage && (
              <Text level="p" className="text-green-600 paragraph">
                {successMessage}
              </Text>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default LandingHero;
