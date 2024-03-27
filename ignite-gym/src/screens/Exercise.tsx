import {
  Box,
  HStack,
  Heading,
  Icon,
  Image,
  ScrollView,
  Text,
  VStack,
} from 'native-base'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native'

import BodySvg from '@assets/body.svg'
import SeriesSvg from '@assets/series.svg'
import RepetitionsSvg from '@assets/repetitions.svg'
import { Button } from '@components/Button'

export function Exercise() {
  const { goBack } = useNavigation()

  return (
    <VStack flex="1">
      <VStack px="8" bg="gray.600" pt="12">
        <TouchableOpacity activeOpacity={0.7} onPress={goBack}>
          <Icon as={Feather} name="arrow-left" color="green.500" size="6" />
        </TouchableOpacity>

        <HStack
          justifyContent="space-between"
          mt="4"
          mb="8"
          alignItems="center"
        >
          <Heading
            color="gray.100"
            fontSize="lg"
            fontFamily="heading"
            mr="2"
            flex="1"
          >
            Puxada frontal
          </Heading>

          <HStack alignItems="center">
            <BodySvg />
            <Text color="gray.200" textTransform="capitalize" ml="1">
              Costas
            </Text>
          </HStack>
        </HStack>
      </VStack>

      <ScrollView>
        <VStack p="8">
          <Image
            source={{
              uri: 'https://conteudo.imguol.com.br/c/entretenimento/0c/2019/12/03/remada-unilateral-com-halteres-1575402100538_v2_600x600.jpg',
            }}
            alt="Demonstração do exercício"
            w="full"
            h="80"
            resizeMode="cover"
            rounded="lg"
            mb="3"
          />

          <Box bg="gray.600" rounded="md" pt="5" px="4" pb="4">
            <HStack alignItems="center" justifyContent="space-evenly" mb="6">
              <HStack alignItems="center">
                <SeriesSvg />
                <Text color="gray.200" ml="2">
                  3 séries
                </Text>
              </HStack>

              <HStack alignItems="center">
                <RepetitionsSvg />
                <Text color="gray.200" ml="2">
                  12 repetições
                </Text>
              </HStack>
            </HStack>

            <Button title="Marcar como realizado" />
          </Box>
        </VStack>
      </ScrollView>
    </VStack>
  )
}
