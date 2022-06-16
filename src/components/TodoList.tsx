import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'native-base'
import TaskItem from './TaskItem'
import CompleteDropdown from './CompleteDropdown'
import { todo, todos } from '../redux/todoSlice'
import { useAppSelector } from '../hooks/redux'

interface Props {
    openInput: ()=> void
    selectTodo: (todo: todo) => void
}

const TodoList = ({ openInput, selectTodo }: Props) => {
  const [isCompletedHidden, showComplete] = useState(true)
  const todos = useAppSelector(state => state.todos)

  return (
    <ScrollView
      contentContainerStyle={{ alignItems: 'center' }}
      flex={1}
      width="full"
    >
      {todos.undone.map(todo => {
        return <TaskItem key={todo.id} {...{ openInput, todo, selectTodo }} />
      })}
      {todos.done.length > 0 && (
        <CompleteDropdown {...{ showComplete, isCompletedHidden, todos }} />
      )}
      {isCompletedHidden &&
        todos.done.map(todo => {
          return <TaskItem key={todo.id} {...{ openInput, todo, selectTodo }} />
      })}
    </ScrollView>
  )
}

export default TodoList
