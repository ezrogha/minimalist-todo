// import { Pressable, View, StyleSheet } from 'react-native'
import { Pressable } from 'react-native'
import React, { useState } from 'react'
import {
  StatusBar,
  useColorMode,
  Fab,
  Icon,
  VStack,
  Box,
  Text,
  HStack,
  ScrollView,
} from 'native-base'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import TaskItem from '../components/TaskItem'
import TodoInput from '../components/TodoInput'
import { useAppSelector } from '../hooks/redux'
import ThemeToggle from '../components/ThemeToggle'
import { todo } from '../redux/todoSlice'
import { inputTaskTypes } from '../constants/states'
import NoTasks from '../components/NoTasks'


const AppContainer = () => {
  const [isBottomInput, openBottomInput] = useState(false)
  const [inputTaskType, setInputTaskType] = useState(inputTaskTypes.NEW)
  const [selectedTodo, setSelectedTodo] = useState<todo | null>(null)
  const [isCompletedHidden, showComplete] = useState(true)
  const { colorMode } = useColorMode()

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
        _light={{ bg: 'light.100' }}
        flex={1}
        safeArea
      >
        <VStack alignItems="center" py='2' flex={1}>
          <HStack
            pb='4'
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
              todos.undone.length === 0 ? <NoTasks /> : (       
                <ScrollView
                  contentContainerStyle={{ alignItems: 'center' }}
                  flex={1} width='full'
                >
                  {todos.undone.map(todo => {
                    return <TaskItem key={todo.id} {...{ openInput, todo, selectTodo }} />
                  })}
                  {todos.done.length > 0 && (
                    <Box w='full' ml='10'>
                      <Pressable onPress={() => showComplete(!isCompletedHidden)}>
                        <HStack
                          my='5'
                          alignItems="center"
                        >
                          <Icon
                            name={isCompletedHidden ? "chevron-down-outline" : "chevron-up-outline"}
                            color="muted.400"
                            as={Ionicons}
                            size="5" mr="1"
                          />
                          <Text fontWeight='medium' color="muted.400">Completed {todos.done.length}</Text>
                        </HStack>
                      </Pressable>
                    </Box>
                  )}
                  {isCompletedHidden && todos.done.map(todo => {
                    return <TaskItem key={todo.id} {...{ openInput, todo, selectTodo }} />
                  })}
                </ScrollView>
              )
          }
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
