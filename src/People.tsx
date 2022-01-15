import {
  Stack,
  Text,
  Link,
  Tag,
  Badge,
  Flex,
  HStack,
  Image,
  Center,
  Button,
  useBoolean,
} from '@chakra-ui/react';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { requestFunc } from 'api';
import { emblemTierMap } from 'getImage';
import { IPeople } from 'types';

export const People: React.FC<IPeople> = ({
  position,
  name,
  lolName,
  subPosition,
  discordId,
  tier,
}) => {
  const [loading, setLoading] = useBoolean();

  return (
    <Stack p="4" bg="white" boxShadow="lg" borderRadius="xl">
      <Flex flexWrap="wrap" justifyContent="space-between" alignItems="center">
        <HStack spacing={1}>
          <Text fontWeight="bold" fontSize="lg">
            {name}
          </Text>
          <Tag>#{discordId.split('#').pop()}</Tag>
        </HStack>
        <Link
          href={`https://www.op.gg/summoner/userName=${lolName}`}
          target="_blank"
          rel="noreferrer"
        >
          {lolName}
        </Link>
      </Flex>
      <Text pt={2}>
        주포지션: <Badge fontSize="md">{position}</Badge>
      </Text>
      <Text>
        부포지션: <Badge fontSize="md">{subPosition}</Badge>
      </Text>
      <Image src={emblemTierMap.get(Math.round(tier))} />
      <Flex justifyContent="space-around">
        <Button
          isLoading={loading}
          onClick={async () => {
            setLoading.on();
            await requestFunc({
              name,
              reason: '',
              type: 'down',
            });
            setLoading.off();
            alert('티어 조정 의견이 반영되었습니다.');
          }}
        >
          <TriangleDownIcon />
        </Button>
        <Center
          width={10}
          fontSize="xl"
          color="gray.900"
          bg="honeydew"
          fontWeight="bold"
        >
          {4 - ((Math.round(tier) - 1) % 4)}
        </Center>
        <Button
          isLoading={loading}
          onClick={async () => {
            setLoading.on();
            await requestFunc({
              name,
              reason: 'sdgsdg',
              type: 'up',
            });
            setLoading.off();
            alert('티어 조정 의견이 반영되었습니다.');
          }}
        >
          <TriangleUpIcon />
        </Button>
      </Flex>
    </Stack>
  );
};
