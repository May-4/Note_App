import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useEffect } from "react";
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import NoteContext from '../hooks/context/noteContext';

const UpdateButton = ({ newNote=null, navigation }) => {
  
  const [notes, setNotes] = useContext(NoteContext);
  //console.log(newNote);
  const addNote = async () => {
    
    const updatedNotes = notes.map((n) => {
      if (n.id == newNote.id) {
        return ( {...n, ...newNote} )
      }
      return n;
    })
    try {
      await AsyncStorage.setItem("notes", JSON.stringify(updatedNotes));
      navigation.navigate('Home');
      
    } catch (error) {
      alert(error);
    }

  }
 
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.createBtn}
      onPress={addNote}
    >
      <Text style={styles.createBtnText}> Update </Text>
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
export default UpdateButton;