import {
  Box,
  Container,
  Heading,
  Stack,
  Text,
  Grid,
  Link,
  Tag,
  Badge,
  Flex,
  HStack,
  Image,
  Center,
  Button,
} from '@chakra-ui/react';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { apiAgent } from 'api';
import { emblemTierMap } from 'getImage';
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
    <Box bg="gray.50" minH="100vh" pb={10}>
      <Container pt={10} size="lg" maxW={1200}>
        <Heading textAlign="center" mb={10}>
          찌질이들의 리그 오브 레전드 대회
        </Heading>
        <Grid gridTemplateColumns={['1fr 1fr', '1fr 1fr 1fr 1fr']} gap={[2, 4]}>
          {people &&
            people.map((p) => (
              <Stack p="4" bg="white" boxShadow="lg" borderRadius="xl">
                <Flex
                  flexWrap="wrap"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <HStack spacing={1}>
                    <Text fontWeight="bold" fontSize="lg">
                      {p.name}
                    </Text>
                    <Tag>#{p.discordId.split('#').pop()}</Tag>
                  </HStack>
                  <Link
                    href={`https://www.op.gg/summoner/userName=${p.lolName}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {p.lolName}
                  </Link>
                </Flex>
                <Text pt={2}>
                  주포지션: <Badge fontSize="md">{p.position}</Badge>
                </Text>
                <Text>
                  부포지션: <Badge fontSize="md">{p.subPosition}</Badge>
                </Text>
                <Image src={emblemTierMap.get(p.tier)} />
                <Flex justifyContent="space-around">
                  <Button>
                    <TriangleDownIcon />
                  </Button>
                  <Center
                    width={10}
                    fontSize="xl"
                    color="gray.900"
                    bg="honeydew"
                    fontWeight="bold"
                  >
                    {4 - ((p.tier - 1) % 4)}
                  </Center>
                  <Button>
                    <TriangleUpIcon />
                  </Button>
                </Flex>
              </Stack>
            ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Main;
