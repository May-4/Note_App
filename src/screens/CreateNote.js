import { StyleSheet, ScrollView, SafeAreaView, Text, View, TextInput, FlatList, TouchableOpacity, } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useState, useEffect } from 'react';

import Header from '../components/Header';
import CategoryList from '../components/CategoryList';
import CreateButton from '../components/CreateButton';
import UpdateButton from '../components/UpdateButton';
import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values';

const CreateNote = ({ navigation }) => {
  const uniqueId = uuidv4();
  const [note, setNote] = useState({
    id: uniqueId,
    title: '',
    content: '',
    category: '',
  });


  const selectedcategoryItem = (value) => {
    setNote((prevNote) => ({
      ...prevNote,
      category: value,
    }));
  }
  // Get category from <CategroyList>

  const route = useRoute();
  const updateNote = route.params ?? null;
  useEffect(() => {
    if (updateNote) {
      setNote(updateNote);
    }
  }, [])
  //Get Parameter From FilterNote.js For Edit

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ marginHorizontal: 15 }}>

      <Header />

      <View style={styles.titleWraper}>
        <Text style={styles.titleText}> Title </Text>
        <TextInput
          style={[styles.titleInput]}
          value={note.title}
          onChangeText= {(text) => setNote((prevNote) => ({ ...prevNote, title: text }))}
          placeholder="Enter Title"
        />
      </View>
      {/*End Add Title */}

      <View>
        <Text style={styles.titleText}> Category </Text>
        <CategoryList
          onUpdateCategory={selectedcategoryItem}
          type='radioList'
          changeCategory={updateNote ? updateNote.category : null}
        />
      </View>
      {/*End Category Radio List*/}

      <View>
        <Text style={styles.titleText}> Details </Text>
        <TextInput
          style={styles.textInput}
          multiline
          value={note.content}
          onChangeText= {(text) => setNote((prevNote) => ({ ...prevNote, content: text }))}
        />
      </View>
      {/*End Add Detail Textarea*/}

      {!updateNote && <CreateButton newNote={note} navigation={navigation} />}
      
      { updateNote && <UpdateButton newNote={note} navigation={navigation} />}
      {/*End Create Button*/}

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  titleWraper: {
    marginVertical: 30,
  },
  titleText: {
    fontSize: 12,
    color: '#666666',
    lineHeight: 15,
    marginBottom: 8,
  },
  titleInput: {
    padding: 10,
    backgroundColor: '#F6F6F6',
    color: '#BDBDBD',
    borderWidth: 1,
    borderColor: "#ECECEC",
    borderRadius: 10,
    alignItems: "center",
    fontSize: 16,
  },

  textInput: {
    borderColor: '#ECECEC',
    backgroundColor: '#F6F6F6',
    borderWidth: 2,
    padding: 10,
    fontSize: 16,
    height: 300,
    textAlignVertical: 'top',
  },
});


export default CreateNote;