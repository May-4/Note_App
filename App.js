import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, } from 'react-native';

import Home from './src/screens/Home';
import CreateNote from './src/screens/CreateNote';

//Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import NoteProvider from './src/hooks/provider/noteProvider';
import CategoryProvider from './src/hooks/provider/categoryProvider';
import CategoryIdProvider from './src/hooks/provider/idProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DetailNote from './src/screens/DetailNote';

const Stack = createNativeStackNavigator();
export default function App() {
  //const removeNote = async () => {
  //  await AsyncStorage.removeItem('notes');
  //  await AsyncStorage.removeItem('categorys');
  //};
  //removeNote(); return;

  return (
    <NoteProvider >
      <CategoryProvider>
        <CategoryIdProvider>
          <NavigationContainer >
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="CreateNote" component={CreateNote} />
              <Stack.Screen name='DetailNote' component={DetailNote} />
            </Stack.Navigator>
          </NavigationContainer>
        </CategoryIdProvider>
      </CategoryProvider>
    </NoteProvider>
  );

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    justifyContent: 'center',
  }
});
