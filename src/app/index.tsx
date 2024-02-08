import { CategoryButton } from '@/components/CategoryButton'
import { Header } from '@/components/Header'
import { Product } from '@/components/Product'
import { useCartStore } from '@/stores/cart-store'
import { CATEGORIES, MENU } from '@/utils/data/products'
import { Link } from 'expo-router'
import { useRef, useState } from 'react'
import { FlatList, SectionList, Text, View } from 'react-native'

export default function Home() {
  const cartStore = useCartStore()
  const cartQuantityItems = cartStore.products.reduce(
    (total, product) => total + product.quantity,
    0,
  )

  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0])

  const sectionListRef = useRef<SectionList>(null)

  function handleSelectCategory(selectedCategory: string) {
    setSelectedCategory(selectedCategory)

    const sectionIndex = CATEGORIES.findIndex(
      (category) => category === selectedCategory,
    )

    if (sectionListRef.current) {
      sectionListRef.current.scrollToLocation({
        animated: true,
        itemIndex: 0,
        sectionIndex,
      })
    }
  }

  return (
    <View className="flex-1 pt-14">
      <Header title="Faça seu pedido" cartQuantityItems={cartQuantityItems} />

      <FlatList
        data={CATEGORIES}
        keyExtractor={(category) => category}
        renderItem={({ item }) => (
          <CategoryButton
            title={item}
            isSelected={item === selectedCategory}
            onPress={() => handleSelectCategory(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
        className="mt-5 max-h-10"
      />

      <SectionList
        ref={sectionListRef}
        sections={MENU}
        keyExtractor={(item) => item.id}
        renderSectionHeader={({ section }) => (
          <Text className="mb-3 mt-8 font-heading text-xl text-white">
            {section.title}
          </Text>
        )}
        renderItem={({ item }) => (
          <Link href={`/product/${item.id}`} asChild>
            <Product data={item} />
          </Link>
        )}
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        className="flex-1 p-5"
      />
    </View>
  )
}
