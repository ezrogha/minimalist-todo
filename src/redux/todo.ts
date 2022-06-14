import { CHANGE_INPUT } from "./actionNames";

export const todoReducer = (prevState: any, action:any) => {
    switch (action.type) {
      case CHANGE_INPUT:
        const { payload: { key, value } } = action
        
        return [
          ...prevState,
          {[key]: value}
        ]
  
      default:
        return prevState;
    }
  }

export const initialTodoState = []
