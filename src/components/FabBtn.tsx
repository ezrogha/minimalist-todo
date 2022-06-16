import React from 'react'
import { Fab, Icon } from 'native-base'
import { AntDesign } from '@expo/vector-icons'

interface Props {
    fabPressed: () => void
}

const FabBtn = ({fabPressed}: Props) => {
  return (
    <Fab
        onPress={fabPressed}
        renderInPortal={false}
        shadow={2}
        right={5}
        bottom={10}
        size="16"
        icon={<Icon color="white" as={AntDesign} name="plus" size="8" />}
    />
  )
}

export default FabBtn