// import { Pressable, View, StyleSheet } from 'react-native'
import { Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import {
  StatusBar,
  useColorMode,
  VStack,
  Box,
  Text,
  HStack,
} from 'native-base'
import TodoInput from '../components/TodoInput'
import { useAppSelector } from '../hooks/redux'
import ThemeToggle from '../components/ThemeToggle'
import { restoreTodos, todo } from '../redux/todoSlice'
import { inputTaskTypes } from '../constants/states'
import NoTasks from '../components/NoTasks'
import StorageService from '../storage/StorageService'
import { useDispatch } from 'react-redux'
import FabBtn from '../components/FabBtn'
import TodoList from '../components/TodoList'


const AppContainer = () => {
  const [isBottomInput, openBottomInput] = useState(false)
  const [inputTaskType, setInputTaskType] = useState(inputTaskTypes.NEW)
  const [selectedTodo, setSelectedTodo] = useState<todo | null>(null)
  const { colorMode } = useColorMode()

  const todos = useAppSelector(state => state.todos)
  const dispatch = useDispatch()

  useEffect(() => {
    (async() => {
      const todos = await StorageService.getTodos()
      if(todos){
        dispatch(restoreTodos(JSON.parse(todos)))
      }
    })()
  }, [])


  const openInput = () => {
    openBottomInput(true)
  }

  const selectTodo = (todo: todo) => {
    setSelectedTodo(todo)
    setInputTaskType(inputTaskTypes.EDIT)
  }

  const fabPressed = () => {
      openBottomInput(true)
      setInputTaskType(inputTaskTypes.NEW)
      setSelectedTodo(null)
  }
  

  return (
    <>
      <Box
        _dark={{ bg: 'blueGray.900' }}
        _light={{ bg: 'light.100' }}
        flex={1}
        safeArea
      >
        <VStack alignItems="center" py='2' flex={1}>
          <HStack
            pb='2'
            px='2'
            alignItems='center'
            justifyContent='space-between'
            w='full'
          >
            <Text fontSize={'50'}>Tasks</Text>
            <ThemeToggle />
          </HStack>
          {
            todos.done.length === 0 &&
              todos.undone.length === 0 ? 
                <NoTasks /> :
                <TodoList {...{ openInput, selectTodo }} />
          }
        </VStack>
        <StatusBar
          barStyle={colorMode === 'light' ? 'dark-content' : 'light-content'}
        />
      </Box>
      {!isBottomInput && <FabBtn {...{fabPressed}} />}
      {isBottomInput && <TodoInput {...{ openBottomInput, inputTaskType, selectedTodo }} />}
    </>
  )
}

export default AppContainer
