import { Box } from "@chakra-ui/layout";
import Sidebar from "./sidebar";
// import { useEffect } from "react";

const PlayerLayout = ({ children }) => {
  // Sign up
  // useEffect(() => {
  //   async function fetchData() {
  //     fetch("http://localhost:3000/api/signup", {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       method: "POST",
  //       body: JSON.stringify({
  //         email: "test@gmail.com",
  //         password: "abcabc",
  //         username: "username1",
  //       }),
  //     });
  //   }

  //   fetchData();
  // }, []);

  // Sign in
  // useEffect(() => {
  //   async function fetchData() {
  //     fetch("http://localhost:3000/api/signin", {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       method: "POST",
  //       body: JSON.stringify({
  //         email: "test@gmail.com",
  //         password: "abcabc",
  //       }),
  //     });
  //   }

  //   fetchData();
  // }, []);

  return (
    <Box width="100vw" height="100vh">
      <Box position="absolute" top="0" width="250px" left="0">
        <Sidebar />
      </Box>
      <Box marginLeft="250px" marginBottom="100px">
        {children}
      </Box>
      <Box position="absolute" left="0" bottom="0">
        Player
      </Box>
    </Box>
  );
};

export default PlayerLayout;
