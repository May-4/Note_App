
import DialogInput from 'react-native-dialog-input';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Feather } from "react-native-vector-icons";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import { useIsFocused } from '@react-navigation/native';
import { useContext, useState, useEffect } from 'react';
import CategoryContext from '../hooks/context/categoryContext';


const AddCategory = ({ onRefresh }) => {

  const { categ_lists} = useContext(CategoryContext);
  const [categorys, setCategorys] = categ_lists;

  const isFocused = useIsFocused();
  const [dialogText, setDialogText] = useState('');
  const [isDialogVisible, setDialogVisible] = useState(false);

  const handleAddCategory = () => {
    setDialogVisible(true);
  }

  const handleDialogSubmit = (inputText) => {
    setDialogText(inputText);
  };
  const handleDialogCancel = () => {
    setDialogVisible(false);
  };

  useEffect(() => {
    if (isFocused && dialogText.trim() !== '') {
      const addCategoryItem = async () => {
        const categList = [...categorys, { id: uuidv4(), name: dialogText }];
        await AsyncStorage.setItem('categorys', JSON.stringify(categList));

        onRefresh(true);
        setDialogVisible(false);
      };
      addCategoryItem()
    }
    setDialogText('');
    onRefresh(false);

  }, [dialogText, isFocused]);


  return (
    <View>
      <TouchableOpacity activeOpacity={0.8} style={[styles.circle, styles.cate_circle]}
        onPress={handleAddCategory} >
        <Feather name="plus" size={20} color="white" />
      </TouchableOpacity>

      < DialogInput
        isDialogVisible={isDialogVisible}
        title={'Add Category'}
        hintInput={'Category name'}
        submitInput={(inputText) => handleDialogSubmit(inputText)}
        closeDialog={() => handleDialogCancel()}
      />
    </View>
  )
}

const styles = StyleSheet.create({

  cate_circle: {
    width: 30,
    height: 30,
    marginLeft: 10,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1F2937',
  },
})
export default AddCategory;