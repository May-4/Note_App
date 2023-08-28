import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { noteCategories, categoryType } from '../util/constant';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import SelectedItem from './SelectedItem';
import SelectedRadioCategory from './SelectedRadio';
import { useIsFocused, useRoute } from '@react-navigation/native';
import CategoryContext from '../hooks/context/categoryContext';


const CategoryList = ({ onUpdateCategory, refresh=false, changeCategory = null, type = null, }) => {

  const isFocused = useIsFocused();

  const [categorys, setCategorys] = useContext(CategoryContext);
  const [selectedCategory, setSelectedCategory] = useState('');

  const [categLists, setCategLists] = useState([]);

  const getCategorys = async () => {

    try {
      const existingCategory = await AsyncStorage.getItem("categorys");

      const lists = existingCategory ? JSON.parse(existingCategory) : noteCategories;

      setCategorys(lists);

    } catch (error) {
      alert(error);
    }

  }

  useEffect(() => {
    if (isFocused) {
      getCategorys();
    }
  }, [isFocused,refresh])
  // GEt Categorys from Async Storage

  useEffect(() => {
    if (categorys.length) {
      const lists = type ? categorys : [{ id: uuidv4(), name: 'all' }, ...categorys];

      setSelectedCategory(changeCategory ?? lists[0].name)
      onUpdateCategory(changeCategory ?? lists[0].name)

      setCategLists(lists);
    }
  }, [categorys, type])
  // change category list depending on type 

  const handleSelect = (name) => {
    setSelectedCategory(name);
    onUpdateCategory(name);
  };
  const renderCategoryItem = ({ item }) => {
    const isSelected = (item.name === selectedCategory);
    if (type == categoryType) {
      return (
        <SelectedRadioCategory
          label={item.name}
          selected={isSelected}
          onSelect={() => handleSelect(item.name)}
        />
      )
    }
    return (
      <SelectedItem
        label={item.name}
        selected={isSelected}
        onSelect={() => handleSelect(item.name)}
      />
    )
  }


  return (
    <View style={{ width: '85%' }}>
      <FlatList
        data={categLists}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )

}

export default CategoryList;
