import { Box, Container, Heading, HStack } from '@chakra-ui/react';
import { apiAgent } from 'api';
import useSWR from 'swr';

export interface IPeople {
  name: string;
  discordId: string;
  lolName: string;
  position: string;
  subPosition: string;
  tier: number;
}

const Main: React.FC = () => {
  const { data: people } = useSWR<IPeople[]>('/people', async (key) => {
    return (await apiAgent.get(key)).data ?? [];
  });

  return (
    <Box bg="gray.50" minH="100vh">
      <Container pt={10}>
        <Heading textAlign="center">찌질이들의 리그 오브 레전드 대회</Heading>
        <Box bg="white" borderRadius="xl">
          {people && people.map((p) => <HStack>{p.name}</HStack>)}
        </Box>
      </Container>
    </Box>
  );
};

export default Main;
