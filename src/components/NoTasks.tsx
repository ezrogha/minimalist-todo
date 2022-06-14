import React from 'react'
import { Center, VStack, Image, Text, useColorModeValue } from 'native-base'

const NoTasks = () => {
  return (
    <Center mt={'40%'}>
      <VStack alignItems="center">
        <Image
          source={{
            uri: 'https://res.cloudinary.com/dsg2ktuqk/image/upload/v1655229109/checklist_v9dnbi.png'
          }}
          style={{
            width: 80,
            height: 80
          }}
          alt={'No tasks'}
        />
        <Text
          fontSize={14}
          fontWeight="black"
          mt={2}
          color={useColorModeValue('muted.500', 'muted.400')}
        >
          No Tasks available
        </Text>
      </VStack>
    </Center>
  )
}

export default NoTasks
