import { Button } from '@/components/Button'
import { LinkButton } from '@/components/LinkButton'
import { useCartStore } from '@/stores/cart-store'
import { PRODUCTS } from '@/utils/data/products'
import { formatCurrency } from '@/utils/functions/format-currency'
import { Feather } from '@expo/vector-icons'
import { Redirect, useLocalSearchParams, useNavigation } from 'expo-router'
import { Image, Text, View } from 'react-native'

export default function Product() {
  const { id } = useLocalSearchParams()
  const navigation = useNavigation()
  const cartStore = useCartStore()

  const product = PRODUCTS.find((product) => product.id === id)

  if (!product) return <Redirect href="/" />

  function handleAddProductToCart() {
    product && cartStore.add(product)

    navigation.goBack()
  }

  return (
    <View className="flex-1">
      <Image
        source={product.cover}
        alt={`Imagem do produto ${product.title}`}
        resizeMode="cover"
        className="h-52 w-full"
      />

      <View className="mt-8 flex-1 p-5">
        <Text className="font-heading text-xl text-white">{product.title}</Text>

        <Text className="my-2 font-heading text-2xl text-lime-400">
          {formatCurrency(product.price ?? 0)}
        </Text>

        <Text className="mb-6 font-body text-base/6 text-slate-400">
          {product.description}
        </Text>

        {product.ingredients.map((ingredient) => (
          <Text
            key={ingredient}
            className="font-body text-base/6 text-slate-400"
          >
            {'\u2022'} {ingredient}
          </Text>
        ))}
      </View>

      <View className="gap-5 p-5 pb-8">
        <Button onPress={handleAddProductToCart}>
          <Button.Icon>
            <Feather name="plus-circle" size={20} />
          </Button.Icon>

          <Button.Text>Adicionar ao pedido</Button.Text>
        </Button>

        <LinkButton title="Voltar ao cardápio" href="/" />
      </View>
    </View>
  )
}
