import { Avatar } from '@components/Avatar'
import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { ScreenHeader } from '@components/ScreenHeader'
import {
  Center,
  Heading,
  ScrollView,
  Skeleton,
  Text,
  VStack,
  useToast,
} from 'native-base'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

const profileFormSchema = yup.object({
  name: yup.string().required('Preencha o campo de nome corretamente.'),
  email: yup
    .string()
    .required('Preencha o campo de email corretamente.')
    .email('O formato do email é inválido.'),
  previousPassword: yup
    .string()
    .required('Preencha o campo de senha antiga corretamente.'),
  newPassword: yup
    .string()
    .required('Preencha o campo de nova senha corretamente.')
    .min(6, 'A senha deve ter no mínimo 6 dígito.'),
  newPasswordConfirmed: yup
    .string()
    .required('Confirme sua nova senha.')
    .oneOf([yup.ref('password'), ''], 'As senhas devem ser iguais.'),
})
type ProfileFormData = yup.InferType<typeof profileFormSchema>

export function Profile() {
  const [isLoadindPhoto, setisLoadindPhoto] = useState(false)
  const [userPhoto, setUserPhoto] = useState(
    'https://github.com/mateussantanasilva.png',
  )

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ProfileFormData>({
    resolver: yupResolver(profileFormSchema),
  })

  const toast = useToast()

  async function handleSelectUserPhoto() {
    try {
      setisLoadindPhoto(true)

      const selectedPhoto = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1, // 0 to 1
        aspect: [4, 4],
        allowsEditing: true,
      })

      if (selectedPhoto.canceled || !selectedPhoto.assets[0].uri) return

      const photoInfo = await FileSystem.getInfoAsync(
        selectedPhoto.assets[0].uri,
      )

      if (!photoInfo.exists) return

      const photoSizeInMB = photoInfo.size / 1024 / 1024

      if (photoSizeInMB > 5)
        return toast.show({
          title: 'Essa imagem é muito grande. Escolha uma de até 5MB.',
          placement: 'top',
          bg: 'red.600',
        })

      setUserPhoto(selectedPhoto.assets[0].uri)
    } catch (error) {
      if (error instanceof Error) throw error

      throw new Error()
    } finally {
      setisLoadindPhoto(false)
    }
  }

  function handleUpdateProfile(data: ProfileFormData) {
    console.log(data)
  }

  return (
    <VStack flex="1">
      <ScreenHeader title="Perfil" />

      <ScrollView>
        <Center mt="6" px="10">
          {isLoadindPhoto ? (
            <Skeleton
              w="33"
              h="33"
              rounded="full"
              startColor="gray.500"
              endColor="gray.400"
            />
          ) : (
            <Avatar source={{ uri: userPhoto }} size={33} />
          )}

          <TouchableOpacity activeOpacity={0.7} onPress={handleSelectUserPhoto}>
            <Text
              color="green.500"
              fontWeight="bold"
              fontSize="md"
              mt="2"
              mb="8"
            >
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nome"
                bg="gray.600"
                value={value}
                onChangeText={onChange}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={() => (
              <Input placeholder="E-mail" isDisabled bg="gray.600" />
            )}
          />
        </Center>

        <VStack px="10" mt="12" mb="9">
          <Heading color="gray.200" fontSize="md" fontFamily="heading" mb="2">
            Alterar senha
          </Heading>

          <Controller
            control={control}
            name="previousPassword"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Senha antiga"
                type="password"
                bg="gray.600"
                value={value}
                onChangeText={onChange}
                errorMessage={errors.previousPassword?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="newPassword"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nova senha"
                type="password"
                bg="gray.600"
                value={value}
                onChangeText={onChange}
                errorMessage={errors.newPassword?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="newPasswordConfirmed"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Confirme nova senha"
                type="password"
                bg="gray.600"
                value={value}
                onChangeText={onChange}
                errorMessage={errors.newPasswordConfirmed?.message}
                returnKeyType="send"
                onSubmitEditing={handleSubmit(handleUpdateProfile)}
              />
            )}
          />

          <Button
            title="Atualizar"
            mt="4"
            onPress={handleSubmit(handleUpdateProfile)}
          />
        </VStack>
      </ScrollView>
    </VStack>
  )
}
