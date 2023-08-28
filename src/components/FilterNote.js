import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { colors, noteLists } from '../util/constant';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import NoteContext from '../hooks/context/noteContext';

const FilterNote = ({ search, cate_name }) => {

  const isFocused = useIsFocused();
  const [notes, setNotes] = useContext(NoteContext);
  const [filterNotes, setFilterNotes] = useState([]);

  const noteList = async () => {
    //await AsyncStorage.removeItem("notes"); return;
    try {
      const existingNotes = await AsyncStorage.getItem("notes");
      const noteContents = existingNotes ? JSON.parse(existingNotes) : noteLists;
      setNotes(noteContents);

    } catch (error) {
      console.error("An error occurred:", error);
      return;
    }

  };

  useEffect(() => {
    if (isFocused) {
      noteList();
    }
  }, [isFocused]);
  //Show All NoteList

  useEffect(() => {
    if (notes.length) {
      const lowerSearch = search.toLowerCase().trim();
      const lowerCateName = cate_name ? cate_name.toLowerCase() : '';

      const filteredNotes = notes.filter(note => {
        const noteItem = note.content.toLowerCase() + note.title.toLowerCase();
        const searchByContent = noteItem.includes(lowerSearch);
        if (!lowerCateName || lowerCateName === 'all') {
          return searchByContent;
        }
        return searchByContent && note.category.toLowerCase() === lowerCateName;
      });

      setFilterNotes(filteredNotes);
    }
  }, [notes, search, cate_name]);
  //Show Filter NoteList By Search and Category

  const navigation = useNavigation();
  const navigateToCreatePage = (updateItem) => {
    navigation.navigate('CreateNote', updateItem);
  };
  // Navigation To Crate Note wit updateItem for editing 

  const renderNoteItem = ({ item, index }) => {

    index = (index + 1) % colors.length;
    randomColor = colors[index];
    return (
      <View style={[styles.noteItem, { backgroundColor: randomColor }]}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigateToCreatePage(item)} >

          <Text style={styles.noteItemTitle}>{item.title}</Text>
          <Text style={styles.noteItemText}>
            {item.content.slice(0, 30)}
            {item.content.length > 30 ? "..." : ""}
          </Text>

        </TouchableOpacity>
      </View>
    )
  };
  //Show Item from Note Listing 


  return (
    <FlatList
      numColumns={2}
      data={filterNotes}
      renderItem={renderNoteItem}
      contentContainerStyle={styles.noteList}
      showsVerticalScrollIndicator={false}
      style={{ height: '65%' }}
    />
  )
}


const styles = StyleSheet.create({
  noteList: {
    gap: 18,
  },
  noteItem: {
    marginRight: 18,
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderRadius: 16,
    width: 150,
    backgroundColor: '#D9E8FC',
  },
  noteItemTitle: {
    color: '#131313',
    fontSize: 14,
    fontWeight: "700",
  },
  noteItemText: {
    color: '#131313',
    fontSize: 12,
    paddingTop: 8,
  },

});

export default FilterNote;