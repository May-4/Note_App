import React from 'react';
import DialogInput from 'react-native-dialog-input';

import { useIsFocused } from '@react-navigation/native';
import { useContext, useState, useEffect } from 'react';
import CategoryContext from '../hooks/context/categoryContext';

import { StyleSheet, View, Text, TouchableOpacity, } from 'react-native';
import { Feather } from "react-native-vector-icons";

const SelectedItem = ({ label, selected, onSelect }) => {

  const [isEditVisible, setEditVisible] = useState(false);
  const isFocused = useIsFocused();

  const [dialogText, setDialogText] = useState('');
  const [isDialogVisible, setDialogVisible] = useState(false);

  const handleLongPress = (label) => {
    setEditVisible(true);
    setDialogText(label);
  };
  const handleEditCategory = (label) => {
    setDialogVisible(true);
    setDialogText(label);
  }

  const [categorys, setCategorys] = useContext(CategoryContext);

  const editCategoryItem = (inputText) => {

    if (inputText.trim() !== '') {
      const updatedCategories = categorys.map(category => {
        if (category.name === label) {
          return { ...category, name: inputText };
        }
        return category;
      });

      setCategorys(updatedCategories);
      setDialogVisible(false);
    }

  }

  const handleDialogCancel = () => {
    setDialogVisible(false);
  };


  return (
    <View>
      <TouchableOpacity
        onPress={onSelect}
        onLongPress={() => handleLongPress(label)}
        activeOpacity={0.5}
        style={[
          styles.categoryItem,
          selected && styles.selectedCategory,
          isEditVisible && styles.editCategory
        ]}
      >
        <Text style={selected && styles.selectedLabel}>{label}</Text>
        {
          isEditVisible && (
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.editIcon]}
              onPress={() => handleEditCategory(label)}
            >
              <Feather name="edit-3" size={10} color="white" />
            </TouchableOpacity>
          )
        }
      </TouchableOpacity>

      < DialogInput
        isDialogVisible={isDialogVisible}
        title={'Edit Category'}
        hintInput={dialogText}
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

  },
  selectedCategory: {
    backgroundColor: '#1F2937',
  },
  selectedLabel: {
    color: 'white',
  },
  editCategory: {
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
export default SelectedItem;