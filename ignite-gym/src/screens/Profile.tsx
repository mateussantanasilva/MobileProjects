import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { ScreenHeader } from '@components/ScreenHeader'
import { Heading, ScrollView, VStack, useToast } from 'native-base'
import { useContext } from 'react'
import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { CustomError } from '@utils/CustomError'
import { AuthContext } from '@contexts/AuthContext'
import { api } from '@services/api'
import { AvatarSelector } from '@components/AvatarSelector'

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

      <ScrollView px="10">
        <AvatarSelector />

        <VStack>
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
        </VStack>

        <VStack mt="12" mb="9">
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
