import { api } from '@services/api'
import { CustomError } from '@utils/CustomError'
import { Button } from './Button'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { AppNavigationRoutesProps } from '@routes/app.routes'
import { useToast } from 'native-base'

interface ExerciseRegisterButtonProps {
  exerciseId: string
}

export function ExerciseRegisterButton({
  exerciseId,
}: ExerciseRegisterButtonProps) {
  const [isSending, setIsSending] = useState(true)

  const { navigate } = useNavigation<AppNavigationRoutesProps>()

  const toast = useToast()

  async function handleRegisterExerciseInHistoric() {
    try {
      setIsSending(true)

      await api.post('history', {
        exercise_id: exerciseId,
      })

      toast.show({
        title: 'Exercício registrado no histórico!',
        placement: 'top',
        textAlign: 'center',
        bgColor: 'green.700',
      })

      navigate('historic')
    } catch (error) {
      const isCustomError = error instanceof CustomError
      const title = isCustomError
        ? error.message
        : 'Não foi possível registrar o exercício. Tente novamente mais tarde.'

      toast.show({
        title,
        placement: 'top',
        textAlign: 'center',
        bgColor: 'red.600',
      })
    } finally {
      setIsSending(false)
    }
  }

  return (
    <Button
      title="Marcar como realizado"
      isLoading={isSending}
      onPress={handleRegisterExerciseInHistoric}
    />
  )
}
