import { Box, Flex, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import GradientLayout from "../components/gradientLayout";
import Artist from "../models/Artist";
import connectDB from "../config/database";
import User from "../models/User";
import jwt from "jsonwebtoken";

const Home = ({ artists, user }) => {
  return (
    <GradientLayout
      color="purple"
      subtitle="profile"
      title={`${user?.firstName} ${user?.lastName}`}
      description={`${user?.playlists.length} public playlists`}
      roundImage
      image={user?.image}
    >
      <Box color="white" paddingX="40px">
        <Box marginBottom="40px">
          <Text fontSize="2xl" fontWeight="bold">
            Top artist this month
          </Text>
          <Text fontSize="md">only visible to you</Text>
        </Box>
        <Flex>
          {artists.map((artist) => (
            <Box padding="10px" width="15%" key={artist._id}>
              <Box bg="gray.900" borderRadius="4px" padding="15px" width="100%">
                <Image
                  src={artist.image}
                  borderRadius="100%"
                  width="175px"
                  height="175px"
                  justifySelf="center"
                />
                <Box marginTop="20px">
                  <Text fontSize="large">{artist.name}</Text>
                  <Text fontSize="small">Artist</Text>
                </Box>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    </GradientLayout>
  );
};

export const getServerSideProps = async ({ req, res }) => {
  await connectDB();

  const artists = await Artist.find({});
  const token = req.cookies.TRAX_ACCESS_TOKEN;

  if (token) {
    const { id } = jwt.verify(token, "hello");
    const user = await User.findOne({ id: id });

    return {
      props: {
        artists: JSON.parse(JSON.stringify(artists)),
        user: JSON.parse(JSON.stringify(user)),
      },
    };
  }
};

export default Home;
