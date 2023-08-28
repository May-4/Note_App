import React from 'react';
import DialogInput from 'react-native-dialog-input';

import { useContext, useState } from 'react';
import CategoryContext from '../hooks/context/categoryContext';
import NoteContext from '../hooks/context/noteContext';
import { StyleSheet, Alert, View, Text, TouchableOpacity, } from 'react-native';
import { Feather } from "react-native-vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';


const CategoryItem = ({ item, selectedId, onSelect }) => {

  const [categorys, setCategorys] = useContext(CategoryContext);
  const [notes, setNotes] = useContext(NoteContext);

  const isSelected = (item.id === selectedId);
  const [isEditVisible, setEditVisible] = useState(false);

  const [categId, SetcategId] = useState('');
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [editCategory, setEditCategory] = useState({
    id: null,
    name: null,
  });


  const handleLongPress = (id) => {
    if (id != -1) {
      setEditVisible(true);
      SetcategId(id);
      return;
    }
    setEditVisible(false);
  };
  const handleEditCategory = (id) => {
    const item = categorys.find((category) => category.id == categId)
    setEditCategory(item);
    setDialogVisible(true);
  }
  //console.log(editCategory); // render for as length of category list


  const editCategoryItem = async (inputText) => {

    if (inputText.trim() !== '' && editCategory) {
      if (inputText === editCategory.name) {
        setDialogVisible(false);
      } else {
        const updatedCategories = categorys.map(category => {
          if (category.id === editCategory.id) {
            return { ...category, name: inputText };
          }
          return category;
        });
        setCategorys(updatedCategories);

        await AsyncStorage.setItem('categorys', JSON.stringify(updatedCategories));
        setDialogVisible(false)
      }
      setEditVisible(false);
    } else {
      setDialogVisible(false);
      setEditVisible(false);
    }
  }
  const handleDialogCancel = () => {
    setDialogVisible(false);
    setEditVisible(false);
  };
  // End Edit Category Item

  const showDialogConfirm = (id) => {
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
  const deleteCategoryItem = async (id) => {
    const newCategorys = categorys.filter((category) => category.id != id);
    setCategorys(newCategorys);

    const newNotes = notes.filter((note) => note.category_id != id);
    setNotes(newNotes);

    // Save categories and notes
    AsyncStorage.setItem('categorys', JSON.stringify(newCategorys))
      .then(() => {
        AsyncStorage.setItem('notes', JSON.stringify(newNotes))
          .then(() => {
            alert('Successfully Saved.');
          })
          .catch(error => {
            console.error('Error saving notes:', error);
          });
      })
      .catch(error => {
        console.error('Error saving categories:', error);
      });

  }
  // End Delete Category Item

  return (
    <View>
      <TouchableOpacity
        onPress={onSelect}
        onLongPress={() => handleLongPress(item.id)}
        activeOpacity={0.5}
        style={[
          styles.categoryItem,
          isSelected && styles.selectedCategory,
          isEditVisible && styles.d_flex
        ]}
      >
        <Text style={isSelected  && styles.selectedLabel}>{item.name}</Text>

        {
          isEditVisible && (
            <View style={styles.d_flex}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[styles.editIcon]}
                onPress={() => handleEditCategory(item.id)}
              >
                <Feather name="edit-3" size={10} color="white" />
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                style={[styles.editIcon]}
                onPress={() => showDialogConfirm(item.id)}
              >
                <Feather name="trash" size={10} color="white" />
              </TouchableOpacity>
            </View>
          )
        }
      </TouchableOpacity>

      < DialogInput
        isDialogVisible={isDialogVisible}
        title={'Edit Category'}
        initValueTextInput={editCategory.name ?? ''}
        submitInput={(inputText) => editCategoryItem(inputText)}
        closeDialog={() => handleDialogCancel()}
      />


    </View>
  )

};
const styles = StyleSheet.create({
  categoryItem: {
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    justifyContent: 'center',
    marginRight: 12,
    marginBottom: 40,

  },
  selectedCategory: {
    backgroundColor: '#1F2937',
  },
  selectedLabel: {
    color: 'white',
  },
  d_flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  editIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    marginLeft: 10,
  },

});
export default CategoryItem;
//edit icon only show one category item not all