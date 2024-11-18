import { Box, Flex, Input, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useSWRConfig } from "swr";
import { auth } from "../lib/mutations";
import { useState } from "react";
import Image from "next/image";

const AuthForm: React.FC<{ mode: "signin" | "signup" }> = ({ mode }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    await auth(mode, { username, email, password });
    setIsLoading(false);
    router.push("/");
  };

  return (
    <Box height="100vh" width="100vw" bg="black" color="white">
      <Flex
        justify="center"
        align="center"
        height="100px"
        borderBottom="white 1px solid"
      >
        <Image
          src="/logo.svg"
          alt="Trax Logo"
          height={60}
          width={120}
          priority
        />
      </Flex>
      <Flex justify="center" align="center" height="calc(100vh - 100px)">
        <Box padding="50px" bg="gray.900" borderRadius="6px">
          <form onSubmit={handleSubmit}>
            {mode === "signup" && (
              <Input
                placeholder="username"
                type="text"
                onChange={(e) => setUsername(e.target.value)}
              />
            )}
            <Input
              placeholder="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              bg="green.500"
              isLoading={isLoading}
              sx={{
                "&:hover": {
                  bg: "green.300",
                },
              }}
            >
              {mode}
            </Button>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};

export default AuthForm;
