import { GroupItem } from './GroupItem'
import { api } from '@services/api'
import { CustomError } from '@utils/CustomError'
import { FlatList, useToast } from 'native-base'
import { useState, useCallback, useEffect } from 'react'

interface GroupListProps {
  selectedGroup: string
  onSetSelectedGroup: (group: string) => void
  onSetIsLoading: (state: boolean) => void
}

export function GroupList({
  selectedGroup,
  onSetSelectedGroup,
  onSetIsLoading,
}: GroupListProps) {
  const [groups, setGroups] = useState<string[]>([])

  const toast = useToast()

  const fetchGroups = useCallback(async () => {
    try {
      onSetIsLoading(true)

      const response = await api.get('/groups')

      setGroups(response.data)
    } catch (error) {
      const isCustomError = error instanceof CustomError
      const title = isCustomError
        ? error.message
        : 'Não foi possível carregar os grupos musculares. Tente novamente mais tarde.'

      toast.show({
        title,
        placement: 'top',
        textAlign: 'center',
        bgColor: 'red.600',
      })
    } finally {
      onSetIsLoading(false)
    }
  }, [toast, onSetIsLoading])

  useEffect(() => {
    fetchGroups()
  }, [fetchGroups])

  return (
    <FlatList
      data={groups}
      keyExtractor={(item) => item}
      renderItem={({ item }) => (
        <GroupItem
          name={item}
          isActive={selectedGroup === item}
          onPress={() => onSetSelectedGroup(item)}
        />
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
      _contentContainerStyle={{
        px: 8,
      }}
      my="10"
      maxH="10"
      minH="10"
    />
  )
}
