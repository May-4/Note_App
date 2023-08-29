import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { noteCategories, categoryType } from '../util/constant';

import CategoryItem from './CategoryItem';
import RadioCategoryItem from './RadioCategoryItem';
import { useIsFocused, useRoute } from '@react-navigation/native';
import CategoryContext from '../hooks/context/categoryContext';


const CategoryList = ({ refresh = false, updateCategId=null, type = null, }) => {

  const isFocused = useIsFocused();

  const { categ_lists, categ_id } = useContext(CategoryContext);
  const [categorys, setCategorys] = categ_lists;
  const [categoryById, setCategoryById] = categ_id;

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
  }, [isFocused, refresh])
  // GEt Categorys from Async Storage

  useEffect(() => {
    if (categorys.length) {
      const lists = type ? categorys : [{ id: '-1', name: 'all' }, ...categorys];

      setCategoryById( updateCategId ?? (categoryById.length==0 ? lists[0].id : categoryById) );
      setCategLists(lists);
    }
  }, [categorys, type, updateCategId ])
  // change category list depending on type  and Filter flatlist
  
  const handleSelect = (id) => {
    setCategoryById(id)
  };
  const renderCategoryItem = ({ item }) => {

    if (type) {
      return (
        <RadioCategoryItem
          item={item}
          selectedId={categoryById}
          onSelect={() => handleSelect(item.id)}
        />
      )
    }
    return (
      <CategoryItem
        item={item}
        selectedId={categoryById}
        onSelect={() => handleSelect(item.id)}
      />
    )
  }
  
  return (
    <View style={{ width: '85%' }}>
      <FlatList
        horizontal
        data={categLists}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )

}

export default CategoryList;
