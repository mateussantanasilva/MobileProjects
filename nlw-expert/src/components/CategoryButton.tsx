import clsx from 'clsx'
import { Pressable, PressableProps, Text } from 'react-native'

interface CategoryButtonProps extends PressableProps {
  title: string
  isSelected?: boolean
}

export function CategoryButton({
  title,
  isSelected,
  ...props
}: CategoryButtonProps) {
  return (
    <Pressable
      className={clsx(
        'h-10 justify-center rounded-md border-2 border-slate-800 bg-slate-800 px-4',
        isSelected && 'border-lime-300',
      )}
      {...props}
    >
      <Text className="font-subtitle text-sm text-slate-100">{title}</Text>
    </Pressable>
  )
}
