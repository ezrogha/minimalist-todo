import { View } from 'react-native'
import React, {useEffect} from 'react'
import { Box, HStack, Text, useColorModeValue, useTheme, themeTools } from 'native-base'
import Animated, { useSharedValue, withDelay, withTiming, useAnimatedStyle, interpolateColor } from 'react-native-reanimated'

interface Props {
    checked: boolean
    text: string
}

const TaskLabel = ({ checked, text }: Props) => {
  const strikeThruProgress = useSharedValue(0)
  const colorProgress = useSharedValue(0)
  const translateX = useSharedValue(0)

  const AnimatedBox = Animated.createAnimatedComponent(Box)
  const AnimatedLabel = Animated.createAnimatedComponent(Text)
  const theme = useTheme()
  const darkThemeTextColor = themeTools.getColor(
    theme,
    useColorModeValue('muted.400', 'muted.500')
  )
  const lightThemeTextColor = themeTools.getColor(
    theme,
    useColorModeValue('dark.50', 'blueGray.50')
  )

  const strikeThruAnimatedStyle = useAnimatedStyle(() => ({
    width: `${strikeThruProgress.value * 93}%`,
  }), [])

  const labelAnimatedStyle = useAnimatedStyle(() => ({
      color: interpolateColor(
        colorProgress.value,
        [0, 1],
        [lightThemeTextColor, darkThemeTextColor]
      )
  }))

  useEffect(() => {
    if(checked){
      colorProgress.value = withTiming(1, { duration: 200 })
      strikeThruProgress.value = withDelay(200, withTiming(1, { duration: 100 }))
    } else {
        colorProgress.value = 0
        strikeThruProgress.value = 0
    }
  }, [checked])
  

  return (
    <Box>
        <HStack alignItems="center" position="relative">
            <AnimatedLabel
                noOfLines={1}
                isTruncated
                px={1}
                fontSize={"15"}
                fontWeight={'bold'}
                style={[labelAnimatedStyle]}
            >
                {text}
            </AnimatedLabel>
            <AnimatedBox
                position={"absolute"}
                h={1}
                ml={1}
                borderBottomColor={darkThemeTextColor}
                borderBottomWidth={1}
                style={[strikeThruAnimatedStyle]}
            />
        </HStack>
    </Box>
  )
}

export default TaskLabel