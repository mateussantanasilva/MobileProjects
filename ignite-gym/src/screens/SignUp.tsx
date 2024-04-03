import {
  Center,
  Heading,
  Image,
  ScrollView,
  Text,
  VStack,
  useToast,
} from 'native-base'
import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { useNavigation } from '@react-navigation/native'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { api } from '@services/api'
import { CustomError } from '@utils/CustomError'

import BgImage from '@assets/background.png'
import LogoSvg from '@assets/logo.svg'
import { useContext } from 'react'
import { AuthContext } from '@contexts/AuthContext'

const signUpFormSchema = yup.object({
  name: yup.string().required('Preencha o campo de nome corretamente.'),
  email: yup
    .string()
    .required('Preencha o campo de email corretamente.')
    .email('O formato do email é inválido.'),
  password: yup
    .string()
    .required('Preencha o campo de senha corretamente.')
    .min(6, 'A senha deve ter no mínimo 6 dígitos.'),
  passwordConfirmed: yup
    .string()
    .required('Confirme sua senha.')
    .oneOf([yup.ref('password'), ''], 'As senhas devem ser iguais.'),
})
type SignUpFormData = yup.InferType<typeof signUpFormSchema>

export function SignUp() {
  const { goBack } = useNavigation()

  // if you need to set initial values, use defaultValues
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: yupResolver(signUpFormSchema),
  })

  const toast = useToast()

  const { authenticateUser } = useContext(AuthContext)

  async function handleCreateAccount({
    name,
    email,
    password,
  }: SignUpFormData) {
    try {
      await api.post('/users', {
        name,
        email,
        password,
      })

      await authenticateUser(email, password)
    } catch (error) {
      const isCustomError = error instanceof CustomError
      const title = isCustomError
        ? error.message
        : 'Não foi possível criar a conta. Tente novamente mais tarde.'

      return toast.show({
        title,
        placement: 'top',
        bg: 'red.600',
        textAlign: 'center',
      })
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex="1" px="10" pb="16">
        <Image
          source={BgImage}
          defaultSource={BgImage} // loads the image quickly because it memorizes
          alt="Imagem de fundo de duas mulheres malhando"
          resizeMode="contain"
          position="absolute"
        />

        <Center my={24}>
          <LogoSvg />

          <Text color="gray.100" fontSize="sm">
            Treine sua mente e o seu corpo
          </Text>
        </Center>

        <Center>
          <Heading color="gray.100" fontSize="xl" mb="6" fontFamily="heading">
            Crie sua conta
          </Heading>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange } }) => (
              <Input
                placeholder="Nome"
                onChangeText={onChange}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange } }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange } }) => (
              <Input
                placeholder="Senha"
                type="password"
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="passwordConfirmed"
            render={({ field: { onChange } }) => (
              <Input
                placeholder="Confirme a senha"
                type="password"
                errorMessage={errors.passwordConfirmed?.message}
                onChangeText={onChange}
                onSubmitEditing={handleSubmit(handleCreateAccount)}
                returnKeyType="send"
              />
            )}
          />

          <Button
            title="Criar e acessar"
            isLoading={isSubmitting}
            onPress={handleSubmit(handleCreateAccount)}
          />
        </Center>

        <Button
          mt="20"
          title="Voltar para o login"
          variant="outline"
          onPress={goBack}
        />
      </VStack>
    </ScrollView>
  )
}
