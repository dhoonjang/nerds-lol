import { Box, Container, Heading, Grid } from '@chakra-ui/react';
import { getPeopleFunc } from 'api';
import useSWR from 'swr';
import { IPeople } from 'types';
import { People } from 'People';

const Main: React.FC = () => {
  const { data: people } = useSWR<IPeople[]>('/people', getPeopleFunc);

  return (
    <Box bg="gray.50" minH="100vh" pb={10}>
      <Container pt={10} size="lg" maxW={1200}>
        <Heading textAlign="center" mb={10}>
          찌질이들의 리그 오브 레전드 대회
        </Heading>
        <Grid gridTemplateColumns={['1fr 1fr', '1fr 1fr 1fr 1fr']} gap={[2, 4]}>
          {people && people.map((p) => <People {...p} />)}
        </Grid>
      </Container>
    </Box>
  );
};

export default Main;
