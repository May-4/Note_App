import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, } from 'react-native';

import Home from './src/screens/Home';
import CreateNote from './src/screens/CreateNote';

//Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer >
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CreateNote" component={CreateNote} />
      </Stack.Navigator>
    </NavigationContainer>
  );

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    justifyContent: 'center',
  }
});
