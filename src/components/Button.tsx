import {
  Text,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps,
} from 'react-native'

function Button(props: TouchableOpacityProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="h-12 flex-row items-center justify-center rounded-md bg-lime-400"
      {...props}
    />
  )
}

function ButtonText(props: TextProps) {
  return <Text className="mx-2 font-heading text-base text-black" {...props} />
}

function ButtonIcon(props: ViewProps) {
  return <View {...props} />
}

Button.Text = ButtonText
Button.Icon = ButtonIcon

export { Button }
