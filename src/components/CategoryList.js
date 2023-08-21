import { View, FlatList, } from 'react-native';
import { useEffect, useState } from 'react';

import { noteCategories, categoryType } from '../util/constant';
import SelectedItem from './SelectedItem';
import SelectedRadioCategory from './SelectedRadio';



const CategoryList = ({ onUpdateCategory, type = null }) => {

  const categories = (type == categoryType) ? [...noteCategories] : ['all', ...noteCategories];
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  useEffect(() => {
    onUpdateCategory(selectedCategory);
  })
  const handleSelect = (item) => {
    setSelectedCategory(item);
    onUpdateCategory(item);
  };
  
  const renderCategoryItem = ({ item }) => {
    if (type == categoryType) {
      return (
        <SelectedRadioCategory
          label={item}
          selected={item === selectedCategory}
          onSelect={() => handleSelect(item)}
        />
      )
    }
    return (
      <SelectedItem
        label={item}
        selected={item === selectedCategory}
        onSelect={() => handleSelect(item)}
      />
    )
  }


  return (
    //End Category Listing js 
    <View style={{ height: 40 }}>
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )

}

export default CategoryList;
