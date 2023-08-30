import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import Header from "../components/Header";
import { useRoute } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import CategoryContext from "../hooks/context/categoryContext";
import { Feather } from "react-native-vector-icons";
import NoteContext from "../hooks/context/noteContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DetailNote = ({navigation}) => {
  const [detailNote, setDetailNote] = useState({
    id:'',
    title: '',
    category: '',
    content: '',
  });
  
  const { categ_lists, categ_id } = useContext(CategoryContext);
  const [categorys, setCategorys] = categ_lists;

  const [notes, setNotes] = useContext(NoteContext);

  const route = useRoute();
  const note = route.params ?? null;

  useEffect(() => {
    if (note) {
      const category = categorys.filter((categ) => categ.id == note.category_id)[0];
      setDetailNote((prev) => (
        { ...prev, 'id': note.id,'title': note.title, 'category': category.name, 'content': note.content }
      ));
    }
  }, [note]);

  const onEditNote = () => {
    navigation.navigate('CreateNote', note);
  }

  const showDialogConfirm =  (id) => {
    return Alert.alert(
      "Confirmation",
      "Are you sure you want to remove ?",
      [
        // The "Yes" button
        {
          text: "Yes",
          onPress: () => {
             deleteCategoryItem(id);
          },
        },
        
        // Does nothing but dismiss the dialog when tapped
        {
          text: "No",
        },
      ]
    );
  };
  const deleteCategoryItem =  async (id) => {
    const newNotes = notes.filter((note) => note.id != id);
    setNotes(newNotes);
    
    AsyncStorage.setItem('notes', JSON.stringify(newNotes))
    .then(() => {
      alert('Successfully Removed.');
    })
    .catch((error) => {
      console.error('Error while updating AsyncStorage:', error);
    });
    navigation.navigate('Home');
  }
  // End Delete Category Item


  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ marginHorizontal: 15 }}>

      <Header />

      <View style={styles.icon}>
        <TouchableOpacity
          onPress={onEditNote}
          style={[styles.editIcon]}
          activeOpacity={0.5} >
           <Feather name="edit-3" size={20} color="#B0E9CA" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={()=>showDialogConfirm(detailNote.id)}
          style={[styles.editIcon]}
          activeOpacity={0.5} >
           <Feather name="trash" size={20} color="#B0E9CA" />
        </TouchableOpacity>
      </View>

      <View style={styles.note}>
        <View style={styles.flexWrapper}>
          <Text style={styles.title}>{detailNote.title}</Text>
          <Text style={styles.category}>{detailNote.category}</Text>
        </View>
        <Text style={styles.content}>{detailNote.content}</Text>
      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  icon: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  note: {
    padding: 8,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  flexWrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 5,
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#B0E9CA'
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
  },
  category: {
    fontStyle: 'italic',
    backgroundColor: '#B0E9CA',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#B0E9CA',
  },
  content: {

  },
  editIcon: {
    width: 30,
    height: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    marginLeft: 10,
  },
})
export default DetailNote;