import { IImageProps, Image } from 'native-base'

interface AvatarProps extends IImageProps {
  size: number
}

export function Avatar({
  size,
  alt = 'Imagem de perfil',
  ...props
}: AvatarProps) {
  return (
    <Image
      alt={alt}
      width={size}
      height={size}
      rounded="full"
      borderWidth="2"
      borderColor="gray.400"
      {...props}
    />
  )
}
