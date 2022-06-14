import { View, Text } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import Svg, { Path } from 'react-native-svg'
import { Dimensions } from 'react-native'
import Animated, { useAnimatedProps, useSharedValue, withTiming, withRepeat, withSpring } from 'react-native-reanimated'
import { Button } from 'native-base'

const { height, width } = Dimensions.get("screen")
// const WIDTH = width
const HEIGHT = width * 0.47

const House = () => {
  const [houseLength, setHouseLength] = useState(0)
  const houseRef = useRef(null)

  const progress = useSharedValue(1)

  const AnimatedPath = Animated.createAnimatedComponent(Path)

  const houseAnimatedProps = useAnimatedProps(() => ({
    strokeDashoffset: progress.value * houseLength
  }))

  useEffect(() => {
    progress.value = withRepeat(withTiming(0, { duration: 5000 }), 50, true)
  }, [])

  return (
      <>
    <Svg width={width} height={HEIGHT} viewBox={[0, 0, width, HEIGHT].join(" ")}>
        <AnimatedPath
            d="M0 120.5H119V66H106C134.118 41.7875 149.882 28.2125 178 4L194 17.5L199.5 11.5H211.5V31.5L247 61V66H237.5V120.5H194V75.5H179H165V120.5H121.5"
            stroke="black"
            strokeWidth="5"
            ref={houseRef}
            onLayout={() => setHouseLength(houseRef.current.getTotalLength())}            
            strokeDasharray={houseLength}
            animatedProps={houseAnimatedProps}
        />
    </Svg>
    {/* <Button onPress={() => {
        progress.value = withTiming(1, { duration: 500 })
    }}>Start</Button>
    <Button onPress={() => {
        progress.value = withTiming(0, { duration: 500 })
    }}>Back</Button> */}
    </>
  )
}

export default House