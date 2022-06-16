import { Pressable } from 'react-native'
import React from 'react'
import { Box, HStack, Icon, Text } from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import { todos } from '../redux/todoSlice'

interface Props {
  showComplete: (isComplete: boolean) => void
  isCompletedHidden: boolean
  todos: todos
}

const CompleteDropdown = ({
  showComplete,
  isCompletedHidden,
  todos
}: Props) => {
  return (
    <Box w="full" ml="10">
      <Pressable onPress={() => showComplete(!isCompletedHidden)}>
        <HStack my="5" alignItems="center">
          <Icon
            name={
              isCompletedHidden ? 'chevron-down-outline' : 'chevron-up-outline'
            }
            color="muted.400"
            as={Ionicons}
            size="5"
            mr="1"
          />
          <Text fontWeight="medium" color="muted.400">
            Completed {todos.done.length}
          </Text>
        </HStack>
      </Pressable>
    </Box>
  )
}

export default CompleteDropdown
