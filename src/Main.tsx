import {
  Box,
  Container,
  Heading,
  Stack,
  Text,
  Grid,
  Badge,
  Link,
  Tag,
  HStack,
} from '@chakra-ui/react';
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
    return (await apiAgent.get(key)).data.people ?? [];
  });

  return (
    <Box bg="gray.50" minH="100vh">
      <Container pt={10} size="lg" maxW={1200}>
        <Heading textAlign="center" mb={10}>
          찌질이들의 리그 오브 레전드 대회
        </Heading>
        <Grid gridTemplateColumns={['1fr 1fr', '1fr 1fr 1fr 1fr']} gap={[2, 4]}>
          {people &&
            people.map((p) => (
              <Stack p="4" bg="white" boxShadow="lg" borderRadius="xl">
                <HStack flexWrap="wrap">
                  <Text fontWeight="bold" fontSize="lg">
                    {p.name}
                  </Text>
                  <Tag>#{p.discordId.split('#').pop()}</Tag>
                  <Link
                    href={`https://www.op.gg/summoner/userName=${p.lolName}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {p.lolName}
                  </Link>
                </HStack>
              </Stack>
            ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Main;
