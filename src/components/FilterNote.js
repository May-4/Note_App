import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors,noteLists } from '../util/constant';
import { useIsFocused } from '@react-navigation/native';

const FilterNote = ({ search, category }) => {

  const isFocused = useIsFocused();
  const [noteContentsFilters, setNoteContentsFilters] = useState([]);
  const noteList = async () => {
    try {
      
      const existingNotes = await AsyncStorage.getItem("notes");

      if (!existingNotes) {
        await AsyncStorage.setItem('notes', JSON.stringify(noteLists));
      }
      const noteContents = existingNotes ? JSON.parse(existingNotes) : [];
      
      const filters = noteContents.filter((note) => {
        const noteItem = note.content.toLowerCase() + note.title.toLowerCase();
        const searchbyContent = noteItem.includes(search.toLowerCase().trim());
        if (!category || category === "all") {
          return searchbyContent;
        }
        return searchbyContent && note.category === category;
      });

      setNoteContentsFilters(filters);

    } catch (error) {
      console.error("An error occurred:", error);
      return;
    }
  };
  useEffect(() => {
    if (isFocused) {
      noteList();
    }
  }, [search, category, isFocused]);


  const renderNoteItem = ({ item, index }) => {

    index = (index + 1) % colors.length;
    const randomColor = colors[index];

    return (

      <View style={[styles.noteItem, { backgroundColor: randomColor }]}>
        < TouchableOpacity activeOpacity={0.5}>
          <Text style={styles.noteItemTitle}>{item.title}</Text>
          <Text style={styles.noteItemText}>
            {item.content.slice(0, 30)}
            {item.content.length > 30 ? "..." : ""}
          </Text>
        </TouchableOpacity>
      </View>

    )
  };
  //End Note Listing


  return (
    <FlatList
      numColumns={2}
      data={noteContentsFilters}
      renderItem={renderNoteItem}
      contentContainerStyle={styles.noteList}
      showsVerticalScrollIndicator={false}
      style={{ height: '70%'}}
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