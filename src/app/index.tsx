import { CategoryButton } from '@/components/CategoryButton'
import { Header } from '@/components/Header'
import { CATEGORIES } from '@/utils/data/products'
import { useState } from 'react'
import { FlatList, View } from 'react-native'

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0])

  return (
    <View className="flex-1 pt-12">
      <Header title="Faça seu pedido" cartQuantityItems={4} />

      <FlatList
        data={CATEGORIES}
        keyExtractor={(category) => category}
        renderItem={({ item }) => (
          <CategoryButton
            title={item}
            isSelected={item === selectedCategory}
            onPress={() => setSelectedCategory(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
        className="max-h-10 mt-5"
      />
    </View>
  )
}
