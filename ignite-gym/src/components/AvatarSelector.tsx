import { Avatar } from '@components/Avatar'
import { Center, Skeleton, Text, useToast } from 'native-base'
import { TouchableOpacity } from 'react-native'
import { useContext, useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { AuthContext } from '@contexts/AuthContext'
import { api } from '@services/api'
import { CustomError } from '@utils/CustomError'

import userPhotoDefaultImage from '@assets/userPhotoDefault.png'

export function AvatarSelector() {
  const { user, updateUserProfile } = useContext(AuthContext)

  const [isLoadindPhoto, setisLoadindPhoto] = useState(false)

  const toast = useToast()

  const userAvatar = `${api.defaults.baseURL}/avatar/${user.avatar}`

  async function handleSelectUserPhoto() {
    try {
      setisLoadindPhoto(true)

      const selectedPhoto = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1, // 0 to 1
        aspect: [4, 4],
        allowsEditing: true,
      })

      if (selectedPhoto.canceled || !selectedPhoto.assets[0].uri) return

      const photoInfo = await FileSystem.getInfoAsync(
        selectedPhoto.assets[0].uri,
      )

      if (!photoInfo.exists) return

      const photoSizeInMB = photoInfo.size / 1024 / 1024

      if (photoSizeInMB > 5)
        return toast.show({
          title: 'Essa imagem é muito grande. Escolha uma de até 5MB.',
          placement: 'top',
          bg: 'red.600',
          textAlign: 'center',
        })

      const fileExtension = selectedPhoto.assets[0].uri.split('.').pop()

      const photoFile = {
        name: `${user.name}.${fileExtension}`.toLowerCase(),
        uri: selectedPhoto.assets[0].uri,
        type: `${selectedPhoto.assets[0].type}/${fileExtension}`,
      }

      const userPhotoUploadForm = new FormData()
      userPhotoUploadForm.append('avatar', JSON.stringify(photoFile))

      const response = await api.patch('/users/avatar', userPhotoUploadForm, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })

      const updatedUser = {
        ...user,
        avatar: response.data.avatar,
      }

      await updateUserProfile(updatedUser)

      toast.show({
        title: 'Foto atualizada com sucesso!',
        placement: 'top',
        bgColor: 'green.700',
        textAlign: 'center',
      })
    } catch (error) {
      if (error instanceof CustomError || error instanceof Error) throw error

      throw new Error()
    } finally {
      setisLoadindPhoto(false)
    }
  }

  return (
    <Center mt="6" mb="8">
      {isLoadindPhoto ? (
        <Skeleton
          w="33"
          h="33"
          rounded="full"
          startColor="gray.500"
          endColor="gray.400"
        />
      ) : (
        <Avatar
          source={user.avatar ? userAvatar : userPhotoDefaultImage}
          size={33}
        />
      )}

      <TouchableOpacity activeOpacity={0.7} onPress={handleSelectUserPhoto}>
        <Text color="green.500" fontWeight="bold" fontSize="md" mt="2">
          Alterar foto
        </Text>
      </TouchableOpacity>
    </Center>
  )
}
