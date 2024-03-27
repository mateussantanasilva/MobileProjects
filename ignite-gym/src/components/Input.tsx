import { FormControl, IInputProps, Input as NativeInput } from 'native-base'

interface InputProps extends IInputProps {
  errorMessage?: string
}

export function Input({ errorMessage, ...props }: InputProps) {
  const isInvalid = !!errorMessage

  return (
    <FormControl isInvalid={isInvalid} mb="4">
      <NativeInput
        bg="gray.700"
        h="14"
        px="4"
        borderWidth="1"
        borderColor="gray.700"
        rounded="sm"
        fontSize="md"
        color="white"
        fontFamily="body"
        placeholderTextColor="gray.300"
        isInvalid={isInvalid}
        _invalid={{
          borderWidth: '1',
          borderColor: 'red.500',
        }}
        _focus={{
          bg: 'gray.700',
          borderColor: 'green.500',
        }}
        {...props}
      />

      <FormControl.ErrorMessage _text={{ color: 'red.500' }}>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  )
}
