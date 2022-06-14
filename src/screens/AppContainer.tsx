import { Pressable, View, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import {
  Center,
  StatusBar,
  useColorMode,
  Fab,
  Icon,
  VStack,
  Box,
  FlatList,
  Text,
  HStack
} from 'native-base'
import { AntDesign } from '@expo/vector-icons'
import TaskItem from '../components/TaskItem'
import { useReducer } from 'react'
import { todoReducer, initialTodoState } from '../redux/todo'
import TodoInput from '../components/TodoInput'
import { useAppSelector } from '../hooks/redux'
import ThemeToggle from '../components/ThemeToggle'
import { todo } from '../redux/todoSlice'

export enum inputTaskTypes {
  NEW = 'new',
  EDIT = 'edit'
}

const AppContainer = () => {
  const [isBottomInput, openBottomInput] = useState(false)
  const [inputTaskType, setInputTaskType] = useState(inputTaskTypes.NEW)
  const [selectedTodo, setSelectedTodo] = useState<todo | null>(null)
  const { colorMode } = useColorMode()

  // const [state, dispatch] = useReducer(todoReducer, initialTodoState)

  const todos = useAppSelector(state => state.todos)

  const openInput = () => {
    openBottomInput(true)
  }

  const selectTodo = (todo: todo) => {
    setSelectedTodo(todo)
    setInputTaskType(inputTaskTypes.EDIT)
  }

  return (
    <>
      <Box
        _dark={{ bg: 'blueGray.900' }}
        _light={{ bg: 'light.200' }}
        // px={4}

        flex={1}
        safeArea
      >
        <VStack alignItems="center" py='2'>
          <Box pb='4'>
            <ThemeToggle />
          </Box>
          {todos.undone.map(todo => {
            return <TaskItem key={todo.id} {...{ openInput, todo, selectTodo }} />
          })}
          {todos.done.length > 0 && (
            <HStack ml='12' my='5' width='full'>
              <Text fontWeight='medium' color="muted.400">Completed {todos.done.length}</Text>
            </HStack>
          )}
          {todos.done.map(todo => {
            return <TaskItem key={todo.id} {...{ openInput, todo, selectTodo }} />
          })}
        </VStack>
        <StatusBar
          barStyle={colorMode === 'light' ? 'dark-content' : 'light-content'}
        />
        {/* <VStack space={2} alignItems="center">
          <Box w="30px" h="30px">
            <Pressable onPress={() => setChecked(!checked)}>
              <Checkbox checked={checked} />
            </Pressable>
          </Box>
          <Box p={10} bg={useColorModeValue('red.500', 'yellow.500')}>
            <Text>Hola</Text>
          </Box>
          <ThemeToggle />
        </VStack> */}        
      </Box>
      {!isBottomInput && (
        <Fab
          onPress={() => {
            openBottomInput(true)
            setInputTaskType(inputTaskTypes.NEW)
            setSelectedTodo(null)
          }}
          renderInPortal={false}
          shadow={2}
          right={5}
          bottom={20}
          size="16"
          icon={<Icon color="white" as={AntDesign} name="plus" size="8" />}
        />
      )}
      {isBottomInput && <TodoInput {...{ openBottomInput, inputTaskType, selectedTodo }} />}
    </>
  )
}

export default AppContainer
