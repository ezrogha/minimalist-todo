import React, { useEffect, useState } from 'react'
import { Text, StyleSheet } from 'react-native'
import { Box, Button, HStack, Pressable, View, Icon, useColorModeValue } from 'native-base'
import Animated, {
  runOnJS,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
  withSpring,
  withDelay,
  interpolateColor,
  useAnimatedGestureHandler
} from 'react-native-reanimated'
import { Ionicons } from '@expo/vector-icons'
import Checkbox from './Checkbox'
import TaskLabel from './TaskLabel'
import { CONTENT_WIDTH } from '../constants/size'
import { removeTodo, todo, toggleTodo } from '../redux/todoSlice'
import { useAppDispatch } from '../hooks/redux'
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import { Dimensions } from 'react-native'

const TASK_HEIGHT = 80
const DEL_SIZE = TASK_HEIGHT * 0.8
const {width: SCREEN_WIDTH} = Dimensions.get('window')
const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.3

interface Props {
  openInput: () => void
  todo: todo
  selectTodo: (todo:todo) => void
}

const TaskItem = ({ openInput, todo, selectTodo }: Props) => {
  const [taskDisabled, disableTask] = useState(false)
  const [delZIndex, setDelZIndex] = useState(0)

  const checkedProgress = useSharedValue(0)
  const selectedProgress = useSharedValue(0)
  const translateX = useSharedValue(0)
  const delOpacity = useSharedValue(0)
  const taskHeight = useSharedValue(TASK_HEIGHT)
  const dispatch = useAppDispatch()

  useEffect(() => {
    checkedProgress.value = withSequence(
      withTiming(1, { duration: 100 }),
      withDelay(200, withTiming(0, { duration: 100 }))
    )
  }, [todo.completed])

  // const AnimatedView = Animated.createAnimatedComponent(View)
  const AnimatedDelBtn = Animated.createAnimatedComponent(Button)

  const taskAnimatedStyles = useAnimatedStyle(
    () => {
      const transform = [
        {
          scale: interpolate(
            checkedProgress.value,
            [0, 1, 0],
            [1, todo.completed ? 1.05 : 0.95, 1]
          )
        }
      ]

      return { transform }
    },
    [todo.completed]
  )

  const selectTaskAnimatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      selectedProgress.value,
      [0, 1, 0],
      ['white', 'rgb(220, 220, 220)', 'white']
    )
    const transform = [
      {
        scale: interpolate(
          selectedProgress.value,
          [0, 1, 0],
          [1, 0.95, 1]
        )
      }
    ]
    return { backgroundColor, transform }
  })

  const delAnimatedStyles = useAnimatedStyle(() => ({
    opacity: delOpacity.value,
    transform: [{scale: delOpacity.value }]
  }))

  const swipeAnimatedStyle = useAnimatedStyle(() => ({
    height: taskHeight.value,
    transform: [{ translateX: translateX.value }]
  }))

  const containerAnimatedStyles = useAnimatedStyle(() => ({
    height: taskHeight.value
  }))

  const toggleCheck = () => {
    dispatch(toggleTodo(todo))
  }

  const handleTodoSelection = () => {
    selectedProgress.value = withSequence(
      withTiming(1, { duration: 100 }),
      withTiming(0, { duration: 100 })
    )
    openInput()
    selectTodo(todo)
  }

  const deleteTask = () => {
    dispatch(removeTodo(todo))
  }

  const handleDelete = () => {
    translateX.value = withTiming(-SCREEN_WIDTH, { duration: 200 }, () => {
      delOpacity.value = withSpring(0)
      taskHeight.value = withTiming(0, undefined, () => {
        runOnJS(deleteTask)()
      })
    })
  }

  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive(event){
      translateX.value = event.translationX

      if(translateX.value < 0 && -DEL_SIZE < translateX.value) {
        delOpacity.value = withSpring(translateX.value/-DEL_SIZE)
      }

    },
    onEnd(){
      const shouldDismissTask = TRANSLATE_X_THRESHOLD > translateX.value
      if(shouldDismissTask) {
        translateX.value = withTiming(-SCREEN_WIDTH, undefined, () => {
          taskHeight.value = withTiming(0, undefined, () => {
            runOnJS(deleteTask)()
          })
        }) 
        delOpacity.value = withSpring(0)
        runOnJS(disableTask)(true)        
        
      } else {
        if(-DEL_SIZE > translateX.value){
          translateX.value = withSpring(-DEL_SIZE * 1.3) 
          runOnJS(setDelZIndex)(100)            
          runOnJS(disableTask)(true)
        } else {
          translateX.value = withSpring(0)
          delOpacity.value = withSpring(0)
          runOnJS(setDelZIndex)(0) 
          runOnJS(disableTask)(false)          
        }
      }
    }
  })


  return (
    <HStack
      mb="2"
      alignItems="center"
    >
      <AnimatedDelBtn
        w={`${DEL_SIZE}px`}
        h={`${DEL_SIZE}px`}
        zIndex={delZIndex}
        right={'1%'}
        borderRadius={`${DEL_SIZE/2}px`}
        position='absolute'
        backgroundColor='error.600'
        style={[delAnimatedStyles]}
        onPress={handleDelete}
        leftIcon={
          <Icon
            as={Ionicons}
            name="trash-outline"
            size="lg"
          />
        }
      />
      <Pressable
        disabled={taskDisabled}
        onPress={handleTodoSelection}
      >
        <PanGestureHandler activeOffsetX={[-1, 1]} onGestureEvent={panGesture}>
          <Animated.View
            style={[
              styles.container,
              taskAnimatedStyles,
              selectTaskAnimatedStyle,
              swipeAnimatedStyle
            ]}
          >
            <View
              style={styles.container}
              shadow='3'
              pl='20px'
              bg={useColorModeValue('blueGray.50', 'blueGray.800')}
            >
              <HStack alignItems="center">
                <Box w="20px" h="20px" mr={2}>
                  <Pressable onPress={toggleCheck}>
                    <Checkbox checked={todo.completed} />
                  </Pressable>
                </Box>
                <TaskLabel checked={todo.completed} text={todo.text} />
              </HStack>
            </View>
          </Animated.View>
        </PanGestureHandler>
      </Pressable> 
    </HStack>
  )
}

export default TaskItem

const styles = StyleSheet.create({
  container: {
    width: CONTENT_WIDTH,
    height: TASK_HEIGHT,
    borderRadius: 20,
    justifyContent: 'center'
  }
})
