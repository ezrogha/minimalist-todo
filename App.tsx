import 'react-native-gesture-handler'
import { NativeBaseProvider } from 'native-base'
import Navigator from './src/navigation'
import theme from './src/theme'
import { Provider } from 'react-redux'
import { store } from './src/redux/store'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import AppContainer from './src/screens/AppContainer'

export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
        <SafeAreaProvider>
          <AppContainer />
        </SafeAreaProvider>
      </NativeBaseProvider>
    </Provider>
  )
}
