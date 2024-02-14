import { Button } from '@/components/Button'
import { Header } from '@/components/Header'
import { Input } from '@/components/Input'
import { LinkButton } from '@/components/LinkButton'
import { Product } from '@/components/Product'
import { ProductCartProps, useCartStore } from '@/stores/cart-store'
import { formatCurrency } from '@/utils/functions/format-currency'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from 'expo-router'
import { useState } from 'react'
import { Linking, Alert, ScrollView, Text, View } from 'react-native'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const PHONE_NUMBER = '5511943464488'

export default function Cart() {
  const [address, setAddress] = useState('')
  const cartStore = useCartStore()
  const navigation = useNavigation()

  const total = formatCurrency(
    cartStore.products.reduce(
      (total, product) => total + product.price * product.quantity,
      0,
    ),
  )

  function handleRemoveProduct(product: ProductCartProps) {
    Alert.alert('Remover', `Deseja remover ${product.title} do carrinho?`, [
      {
        text: 'Cancelar',
      },
      {
        text: 'Remover',
        onPress: () => cartStore.remove(product.id),
      },
    ])
  }

  function handleOrder() {
    if (address.trim().length === 0)
      return Alert.alert('Pedido', 'Informe os dados da entrega.')

    const products = cartStore.products
      .map((product) => `\n ${product.quantity} ${product.title}`)
      .join(' ')

    const message = `
    🍔 NOVO PEDIDO
    \n Entregar em: ${address}

    ${products}

    \n Valor total: ${total}
    `

    Linking.openURL(
      `https://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`,
    )

    cartStore.clear()
    navigation.goBack()
  }

  return (
    <View className="flex-1 pt-14">
      <Header title="Seu carrinho" />

      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        extraHeight={100}
      >
        <ScrollView>
          <View className="flex-1 p-5">
            {cartStore.products.length > 0 ? (
              <View className="border-b border-slate-700">
                {cartStore.products.map((product) => (
                  <Product
                    key={product.id}
                    data={product}
                    onPress={() => handleRemoveProduct(product)}
                  />
                ))}
              </View>
            ) : (
              <Text className="my-8 text-center font-body text-slate-400">
                Seu carrinho está vazio.
              </Text>
            )}

            <View className="mb-4 mt-5 flex-row items-center gap-x-2">
              <Text className="font-subtitle text-xl text-white">Total:</Text>
              <Text className="font-heading text-2xl text-lime-400">
                {total}
              </Text>
            </View>

            <Input
              placeholder="Informe o endereço de entrega com rua, bairro, CEP, número e complemento..."
              onChangeText={setAddress} // no need to retrieve the text using (text) => because the value is already known
              onSubmitEditing={handleOrder} // submit with ENTER from the keyboard
              blurOnSubmit // submit instead of changing line (multiline input)
              returnKeyType="next" // change submit button icon
            />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>

      <View className="gap-5 p-5 pb-8">
        <Button onPress={handleOrder}>
          <Button.Text>Enviar pedido</Button.Text>
          <Button.Icon>
            <Feather name="arrow-right-circle" size={20} />
          </Button.Icon>
        </Button>

        <LinkButton title="Voltar ao cardápio" href="/" />
      </View>
    </View>
  )
}
