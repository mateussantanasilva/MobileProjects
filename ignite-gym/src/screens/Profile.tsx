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
import { useContext, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { CustomError } from '@utils/CustomError'
import { AuthContext } from '@contexts/AuthContext'
import { api } from '@services/api'

const profileFormSchema = yup.object({
  name: yup.string().required('Preencha o campo de nome corretamente.'),
  email: yup.string(),
  previousPassword: yup.string(),
  newPassword: yup
    .string()
    .min(6, 'A senha deve ter no mínimo 6 dígitos.')
    .nullable()
    .transform((value) => value || null), // if the user clears the input before submitting the form, it ensures that the field is optional (return null instead '')
  newPasswordConfirmed: yup.string().when('newPassword', {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    is: (field: any) => field, // if there is content in newPassword field
    then: (schema) =>
      schema
        .required('Confime a nova senha.')
        .nullable()
        .transform((value) => value || null)
        .oneOf(
          [yup.ref('newPassword'), ''],
          'As novas senhas devem ser iguais.',
        ),
  }),
})
type ProfileFormData = yup.InferType<typeof profileFormSchema>

export function Profile() {
  const { user, updateUserProfile } = useContext(AuthContext)

  const [isLoadindPhoto, setisLoadindPhoto] = useState(false)
  const [userPhoto, setUserPhoto] = useState(
    'https://github.com/mateussantanasilva.png',
  )

  // if you need to set initial values, use defaultValues
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<ProfileFormData>({
    resolver: yupResolver(profileFormSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
    },
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
          textAlign: 'center',
        })

      setUserPhoto(selectedPhoto.assets[0].uri)
    } catch (error) {
      if (error instanceof CustomError || error instanceof Error) throw error

      throw new Error()
    } finally {
      setisLoadindPhoto(false)
    }
  }

  async function handleUpdateProfile(data: ProfileFormData) {
    try {
      const updatedUser = {
        ...user,
        name: data.name,
      }

      await api.put('/users', {
        name: data.name,
        password: data.newPassword,
        old_password: data.previousPassword,
      })

      await updateUserProfile(updatedUser)

      toast.show({
        title: 'Pefil atualizado com sucesso!',
        placement: 'top',
        bgColor: 'green.700',
        textAlign: 'center',
      })
    } catch (error) {
      const isCustomError = error instanceof CustomError
      const title = isCustomError
        ? error.message
        : 'Não foi possível atualizar o perfil. Tente novamente mais tarde.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.600',
        textAlign: 'center',
      })
    }
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
            render={({ field: { onChange } }) => (
              <Input
                placeholder="Nova senha"
                type="password"
                bg="gray.600"
                onChangeText={onChange}
                errorMessage={errors.newPassword?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="newPasswordConfirmed"
            render={({ field: { onChange } }) => (
              <Input
                placeholder="Confirme nova senha"
                type="password"
                bg="gray.600"
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
            isLoading={isSubmitting}
            onPress={handleSubmit(handleUpdateProfile)}
          />
        </VStack>
      </ScrollView>
    </VStack>
  )
}
