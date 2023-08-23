import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const CreateButton = ({ newNote, navigation }) => {
  
  const addNote = async () => {

    try {
      const existingNotes = await AsyncStorage.getItem("notes");

      const notesArr = existingNotes ? JSON.parse(existingNotes) : [];
      notesArr.unshift(newNote);
     
      await AsyncStorage.setItem('notes', JSON.stringify(notesArr));
      navigation.navigate('Home');

    } catch (error) {
      console.error('Error adding note:', error);
    }

    //await AsyncStorage.removeItem('notes'); 
    //return;

  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.createBtn}
      onPress={addNote}
    >
      <Text style={styles.createBtnText}> Create </Text>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  createBtn: {
    paddingVertical: 16,
    marginTop: 26,
    width: 120,
    borderRadius: 20,
    backgroundColor: '#5DB075',
    marginHorizontal: '30%',
  },
  createBtnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});
export default CreateButton;