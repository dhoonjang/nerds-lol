/* eslint-disable no-alert */
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
  Textarea,
} from '@chakra-ui/react';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { requestApi } from 'api';
import { emblemTierMap } from 'getImage';
import { IPeople } from 'types';
import { useCallback, useState } from 'react';
import dayjs from 'dayjs';

export const People: React.FC<IPeople> = ({
  position,
  name,
  lolName,
  subPosition,
  discordId,
  tier,
}) => {
  const [reason, setReason] = useState<string>('');
  const [loading, setLoading] = useBoolean();

  const requestFunc = useCallback(
    async (type: 'up' | 'down'): Promise<void> => {
      const date = localStorage.getItem(name);
      if (date && dayjs().diff(date, 'minute') < 30) {
        alert(
          `한 사람의 티어 조정은 최소 30분이 지난 뒤에 다시 할 수 있습니다.
다음 투표 가능 시각: ${dayjs(date).add(30, 'minute').format('D일 HH:mm')}`
        );
        return;
      }
      setLoading.on();
      await requestApi({
        name,
        reason,
        type,
      });
      localStorage.setItem(name, dayjs().toISOString());
      setLoading.off();
      setReason('');
      alert('티어 조정 의견이 반영되었습니다.');
    },
    [name, reason, setLoading]
  );

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
          onClick={() => requestFunc('down')}
          isDisabled={reason.length < 10}
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
          onClick={() => requestFunc('up')}
          isDisabled={reason.length < 10}
        >
          <TriangleUpIcon />
        </Button>
      </Flex>
      <Textarea
        px="2"
        py="1"
        fontSize="sm"
        resize="none"
        placeholder="티어 조정 사유를 적어주세요"
        value={reason}
        onChange={(e) => setReason(e.currentTarget.value)}
      />
    </Stack>
  );
};
