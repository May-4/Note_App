import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from "react";
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import NoteContext from "../hooks/context/noteContext";

const CreateButton = ({ newNote, navigation }) => {

  const [notes, setNotes] = useContext(NoteContext);

  const addNote = async () => {

    const hasEmptyProperties = Object.values(newNote).some(property => property === '');
    if (hasEmptyProperties) {
      alert('Please Fill Completely');
      return;
    } 
    
    try {
      const noteList = [newNote, ...notes];
      await AsyncStorage.setItem('notes', JSON.stringify(noteList));
      navigation.navigate('Home');

    } catch (error) {
      console.error('Error adding note:', error);
    }
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