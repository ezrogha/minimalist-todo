import { View, Text } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import Svg, { Path, Rect } from 'react-native-svg'
import Animated, { useSharedValue, withTiming, withDelay, useAnimatedProps, interpolateColor, Easing } from 'react-native-reanimated'
import { themeTools, useColorModeValue, useTheme } from 'native-base';

const SIZE = 74
const width = SIZE
const height = SIZE
const pathShape = "M13.5 36.9999C17.783 37.1619 25.9905 50.334 24 58.4999C43.8952 23.3223 52.9029 10.9147 65.5 1.5"

interface Props {
    checked: boolean
}

export const SvgCheckRect = () => {
  return (
    <Svg viewBox={[-7, 0,width,height].join(' ')}>
        <CheckRect />
    </Svg>
  )
}

const CheckRect = () => {  
  const theme = useTheme()
  
  const boxThemeColor = themeTools.getColor(
    theme,
    useColorModeValue('blueGray.900', 'blueGray.300')
  )

  return (
    <Rect
      x="0.5"
      y="3.5"
      width="63"
      height="63"
      rx="12.5"
      strokeWidth={2}
      stroke={boxThemeColor}
    />    
  )
}

const Checkbox = ({ checked }: Props) => {
  const [checkLength, setCheckLength] = useState(0)
  const checkRef = useRef(null)
  
  const progress = useSharedValue(0)

  const theme = useTheme()

  const checkThemeColor = themeTools.getColor(
    theme,
    useColorModeValue('blueGray.900', 'blueGray.300')
  )

  const AnimatedPath = Animated.createAnimatedComponent(Path)


  const animatedPathProps = useAnimatedProps(() => ({
    strokeDashoffset: (1 - progress.value) * checkLength
  }), [checkLength])

  useEffect(() => {
      progress.value = withDelay(50, withTiming(checked ? 1 : 0, {
          duration: checked ? 200 : 0,
      }))
  }, [checked])

  return (
    <Svg viewBox={[-7, 0,width,height].join(' ')}>
        <CheckRect />
        <AnimatedPath
          d={pathShape}
          stroke={checkThemeColor}
          strokeWidth="10"
          strokeLinejoin='round'
          strokeLinecap='round'
          ref={checkRef}
          onLayout={() => setCheckLength(checkRef.current?.getTotalLength())}
          strokeDasharray={checkLength}
          animatedProps={animatedPathProps}
          strokeOpacity={checked || false ? 1 : 0}
        />
    </Svg>
  )
}

export default Checkbox