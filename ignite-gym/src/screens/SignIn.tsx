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
import { AuthNavigationRoutesProps } from '@routes/auth.routes'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { useContext } from 'react'
import { AuthContext } from '@contexts/AuthContext'
import { CustomError } from '@utils/CustomError'

import BgImage from '@assets/background.png'
import LogoSvg from '@assets/logo.svg'

const signInFormSchema = yup.object({
  email: yup
    .string()
    .required('Preencha o campo de email corretamente.')
    .email('O formato do email é inválido.'),
  password: yup
    .string()
    .required('Preencha o campo de senha corretamente.')
    .min(6, 'A senha deve ter no mínimo 6 dígitos.'),
})
type SignInFormData = yup.InferType<typeof signInFormSchema>

export function SignIn() {
  const { navigate } = useNavigation<AuthNavigationRoutesProps>()

  const { authenticateUser } = useContext(AuthContext)

  // if you need to set initial values, use defaultValues
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: yupResolver(signInFormSchema),
  })

  const toast = useToast()

  async function handleAuthenticate({ email, password }: SignInFormData) {
    try {
      await authenticateUser(email, password)
    } catch (error) {
      const isCustomError = error instanceof CustomError
      const title = isCustomError
        ? error.message
        : 'Não foi possível entrar. Tente novamente mais tarde.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.600',
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
          <Heading color="gray.100" fontSize="xl" fontFamily="heading" mb="6">
            Acesse sua conta
          </Heading>

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
                returnKeyType="send"
                onSubmitEditing={handleSubmit(handleAuthenticate)}
              />
            )}
          />

          <Button
            title="Acessar"
            isLoading={isSubmitting}
            onPress={handleSubmit(handleAuthenticate)}
          />
        </Center>

        <Center mt="24">
          <Text color="gray.100" fontSize="sm" mb="3">
            Ainda não tem acesso?
          </Text>

          <Button
            title="Criar conta"
            variant="outline"
            onPress={() => navigate('signUp')}
          />
        </Center>
      </VStack>
    </ScrollView>
  )
}
