import { forwardRef } from 'react'
import {
  Image,
  ImageProps,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native'

interface ProductData {
  title: string
  description: string
  thumbnail: ImageProps
  quantity?: number
}

interface ProductProps extends TouchableOpacityProps {
  data: ProductData
}

export const Product = forwardRef<TouchableOpacity, ProductProps>(
  function Product({ data, ...props }, ref) {
    return (
      <TouchableOpacity
        className="w-full flex-row items-center pb-4"
        ref={ref}
        {...props}
      >
        <Image
          source={data.thumbnail}
          alt={`Imagem do produto ${data.title}`}
          className="h-20 w-20 rounded-md"
        />

        <View className="ml-3 flex-1">
          <View className="flex-row items-center">
            <Text className="flex-1 font-subtitle text-base text-slate-100">
              {data.title}
            </Text>

            {data.quantity && (
              <Text className="font-subtitle text-sm text-slate-400">
                {`x ${data.quantity}`}
              </Text>
            )}
          </View>

          <Text className="mt-0.5 text-xs/5 text-slate-400">
            {data.description}
          </Text>
        </View>
      </TouchableOpacity>
    )
  },
)
