import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { NativeBaseProvider } from 'native-base'
import Navigator from './src/navigation'
import theme from './src/theme'
import { Provider } from 'react-redux'
import { store } from './src/redux/store'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
        <SafeAreaProvider>
          <Navigator />
        </SafeAreaProvider>
      </NativeBaseProvider>
    </Provider>
  )
}
