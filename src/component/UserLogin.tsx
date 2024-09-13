import { Button, InputField, Image, Link, Text } from "@/component";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface UserLoginProps {
  toggleView: () => void; 
}

const UserLogin = ({ toggleView }: UserLoginProps) => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  const handleLoginUser = async () => {
    try {
      const loginUser = await axios.post("/api/login", {
        emailOrUsername,
        password,
      });
      setSuccessMessage("User Login successfully!");
      console.log("Login successful:", loginUser.data);

      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed");
    }

    setEmailOrUsername("");
    setPassword("");
  };

  return (
    <>
      <div className="flex flex-col md:flex-row mx-auto justify-center p-2 gap-4 mt-2 mb-6">
        <div className="">
          <Image
            src="/signIn.png"
            alt="signIn"
            loading="lazy"
            className="p-4"
          />
        </div>
        <div className="flex flex-col gap-4 border border-2 rounded-xl py-4 px-4 md:w-1/3 w-full h-fit shadow-xl md:mt-4">
          <div className="flex justify-between items-baseline">
            <Text level="h2" className="heading-2 text-secondary font-bold">
              Welcome Back <strong className="text-primary">!</strong>
            </Text>
            <Link href="#" onClick={toggleView}>
              <Text
                level="h5"
                className="heading-5 text-secondary font-bold underline decoration-secondary"
              >
                Sign
                <strong className="text-primary underline decoration-primary">
                  Up
                </strong>
              </Text>
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            <InputField
              onChange={(e) => setEmailOrUsername(e.target.value)}
              type="text"
              value={emailOrUsername}
              placeholder="Email or User Name"
              className="text-greyDark"
            />
            <InputField
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              value={password}
              placeholder="Password"
              className="text-greyDark"
            />
          </div>
          <div className="flex">
            <Button
              variant="PRIMARY"
              onClick={handleLoginUser}
              className="w-full rounded-xl px-2 mx-1"
              size="md"
            >
              Login
            </Button>
          </div>
          {successMessage && (
            <Text level="p" className="text-green-600 paragraph">
              {successMessage}
            </Text>
          )}
        </div>
      </div>
    </>
  );
};

export default UserLogin;
