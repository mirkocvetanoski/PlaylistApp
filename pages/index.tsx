import { Box, Flex, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import GradientLayout from "./components/gradientLayout";
import Artist from "./models/Artist";

const Home = ({ artists }) => {
  return (
    <GradientLayout
      color="purple"
      subtitle="profile"
      title="Mirko Cvetanoski"
      description="15 public playlists"
      roundImage
      image="https://img.notionusercontent.com/ext/https%3A%2F%2Fdl.dropboxusercontent.com%2Fs%2Fbgiv0ssz3xpotz9%2Fpeep.png%3Fdl%3D0/size/w=2000?exp=1731401073&sig=eiu5T0nMhYE5l1-B4GLjMxo9f_Ds-ABRbVyOEWfaGNY"
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
            <Box padding="10px" width="20%" key={artist.id}>
              <Box bg="gray.900" borderRadius="4px" padding="15px" width="100%">
                <Image
                  src="https://placecats.com/millie/300/300"
                  borderRadius="100%"
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

export const getServerSideProps = async () => {
  const artists = await Artist.find({});

  return {
    props: {
      artists: JSON.parse(JSON.stringify(artists)),
    },
  };
};

export default Home;
