import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Box, HStack, Pressable } from 'native-base'
import Checkbox from './Checkbox'
import TaskLabel from './TaskLabel'
import { CONTENT_WIDTH } from '../constants/size'
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
  withDelay,
  interpolateColor
} from 'react-native-reanimated'
import { todo, toggleTodo } from '../redux/todoSlice'
import { useAppDispatch } from '../hooks/redux'

interface Props {
  openInput: () => void
  todo: todo
  selectTodo: (todo:todo) => void
}

const TaskItem = ({ openInput, todo, selectTodo }: Props) => {

  const checkedProgress = useSharedValue(0)
  const selectedProgress = useSharedValue(0)
  const dispatch = useAppDispatch()

  useEffect(() => {
    checkedProgress.value = withSequence(
      withTiming(1, { duration: 100 }),
      withDelay(200, withTiming(0, { duration: 100 }))
    )
  }, [todo.completed])

  const taskAnimatedStyles = useAnimatedStyle(
    () => ({
      transform: [
        {
          scale: interpolate(
            checkedProgress.value,
            [0, 1, 0],
            [1, todo.completed ? 1.05 : 0.95, 1]
          )
        }
      ]
    }),
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

  return (
    <Pressable pb="2" onPress={handleTodoSelection}>
      <Animated.View
        style={[
          styles.container,
          taskAnimatedStyles,
          selectTaskAnimatedStyle
        ]}
      >
        <HStack alignItems="center">
          <Box w="20px" h="20px" mr={2}>
            <Pressable onPress={toggleCheck}>
              <Checkbox checked={todo.completed} />
            </Pressable>
          </Box>
          <TaskLabel checked={todo.completed} text={todo.text} />
        </HStack>
      </Animated.View>
    </Pressable>
  )
}

export default TaskItem

const styles = StyleSheet.create({
  container: {
    width: CONTENT_WIDTH,
    backgroundColor: 'white',
    padding: 10,
    height: 80,
    borderRadius: 12,
    justifyContent: 'center'
  }
})
