import { Pressable, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Box, HStack, Icon, Input, VStack, Text, useColorModeValue, themeTools, useTheme, useToast } from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import { SvgCheckRect } from './Checkbox'
import shortid from 'shortid'
import { useAppDispatch } from '../hooks/redux'
import { addTodo, todo, updateTodo } from '../redux/todoSlice'
import { inputTaskTypes } from '../constants/states'

type taskType = inputTaskTypes.EDIT | inputTaskTypes.NEW

interface Props {
  openBottomInput: (value: boolean) => void
  inputTaskType: taskType
  selectedTodo: todo
}

const TodoInput = ({ openBottomInput, inputTaskType, selectedTodo }: Props) => {

  const theme = useTheme()
  const toast = useToast()

  const disabledBtn = themeTools.getColor(
    theme,
    useColorModeValue('muted.400', 'blueGray.700')
  )

  const enabledBtn = themeTools.getColor(
    theme,
    useColorModeValue('blueGray.700', 'blueGray.200')
  )

  const reminderBtnColor = themeTools.getColor(
    theme,
    useColorModeValue('blueGray.300', 'blueGray.700')
  )

  const dispatch = useAppDispatch()

  const [todoText, setTodoText] = useState('')

  useEffect(() => {
      if(!!selectedTodo){
        setTodoText(selectedTodo.text)
      }
  }, [selectedTodo])

  const addItem = () => {
    if(todoText.length < 1) return;

    if(inputTaskType === inputTaskTypes.NEW) {
        const todoData = {
            id: shortid.generate(),
            text: todoText,
            completed: false
        }
        dispatch(addTodo(todoData))  
    } else {
        dispatch(updateTodo({todo: selectedTodo, newText: todoText}))
    }

    openBottomInput(false)  
  }

  return (
    <>
      <Pressable
        onPress={() => {
            addItem()
            openBottomInput(false)
        }}
        style={styles.dismissableOverlay}
      />

      <Box
        w="full"
        minH="32"
        backgroundColor={useColorModeValue('blueGray.50', 'blueGray.800')}
        position="absolute"
        bottom={0}
        borderTopRadius={16}
        py="4"
        px="5"
      >
        <VStack justifyContent="space-between" pb={3} h="full">
          <VStack pb={4}>
            <HStack alignItems="center">
              <Box w="20px" h="20px" borderColor="black">
                <SvgCheckRect />
              </Box>
              <Input
                variant={'unstyled'}
                autoFocus={true}
                placeholder='Enter your TODO task'
                fontSize={16}
                multiline
                value={todoText}
                onSubmitEditing={addItem}
                onChangeText={text => {
                    setTodoText(text)                    
                }}
              />
            </HStack>
          </VStack>

          <HStack alignItems="center" justifyContent="space-between">
            <Pressable
              onPress={() => toast.show({ description: "Coming Soon! ☺️" })}
              style={{
                backgroundColor: reminderBtnColor,
                borderRadius: 20,
                paddingHorizontal: 12,
                paddingVertical: 5
              }}
            >
              <HStack alignItems="center">
                <Icon as={Ionicons} name="alarm-outline" size="lg" />
                <Text ml="1">Set reminder</Text>
              </HStack>
            </Pressable>
            <Pressable onPress={addItem}>
              <Text
                fontSize={16}
                color={todoText.length < 1 ? disabledBtn : enabledBtn}
                fontWeight="bold">
                Done
              </Text>
            </Pressable>
          </HStack>
        </VStack>
      </Box>
    </>
  )
}

export default TodoInput

const styles = StyleSheet.create({
  dismissableOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(10,10,10,.4)',
    width: '100%',
    height: '100%'
  }
})
