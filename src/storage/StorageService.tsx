import AsyncStorage from '@react-native-async-storage/async-storage';

class StorageService {
    private TODOS_KEY = 'TODOS';

    saveTodos = async (todos: string) => {
        try {            
            await AsyncStorage.setItem(this.TODOS_KEY, todos)
        } catch (error) {
            __DEV__ && console.warn("StorageClient: Failed to put token:", Error)
        }
    }

    getTodos = async() => {
        try {            
            return await AsyncStorage.getItem(this.TODOS_KEY)
        } catch (error) {
            __DEV__ &&  console.warn("StorageClient: Failed to get token:", error)

        }
    }
}


export default new StorageService();
