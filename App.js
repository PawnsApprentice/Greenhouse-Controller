import * as React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import NavContainer from './navigation/NavContainer';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function App() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        <NavContainer />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default App;
