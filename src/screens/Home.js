import { StyleSheet, SafeAreaView, Text, View, TextInput, Alert, FlatList, TouchableOpacity, } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { Feather } from "react-native-vector-icons";
import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values';

//********Component******** */
import Header from '../components/Header';
import InputSearch from '../components/InputSearch';
import CategoryList from '../components/CategoryList';
import FilterNote from '../components/FilterNote';
import CategoryContext from '../hooks/context/categoryContext';
import { useIsFocused, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddCategory from '../components/AddCategory';

const Home = ({ navigation }) => {

  const [search, setSearch] = useState('');
  const [categoryName, setCategoryName] = useState(null);
  const [categorys, setCategorys] = useContext(CategoryContext);

  

  const searchValue = (value) => {
    setSearch(value);
  }
  const selectedcategoryItem = (value) => {
    setCategoryName(value);
  }
  //Update Set Value
  const [refreshCategoryList, setRefreshCategoryList] = useState(false);
  const refrehCategory = (value) => {
    setRefreshCategoryList(value);
  }

  return (
    <SafeAreaView style={{ marginHorizontal: 15, }}>

      <View style={styles.topContainer}>

        <Header />

        <InputSearch onUpdateSearch={searchValue} />
        {/*End Search Bar */}

        <View style={styles.cate_wrapper}>
          <CategoryList onUpdateCategory={selectedcategoryItem} refresh={refreshCategoryList}/>
          <AddCategory onRefresh={refrehCategory} />  
        </View>

        {/*End Category  */}
      </View>
      {/*End Search and Category Section*/}

      <View>
        <FilterNote search={search} cate_name={categoryName} />
        {/*End Display Notes Section  cate_id={categoryId} **/}

        <TouchableOpacity activeOpacity={0.8} style={styles.circle}
          onPress={() => navigation.navigate('CreateNote')} >
          <Feather name="plus" size={30} color="white" />
        </TouchableOpacity>
        {/*//*End Circle Add Note Button**/}
      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    rowGap: 18,
    marginBottom: 38,
  },
  cate_wrapper: {
    flexDirection: 'row', 
    justifyContent: 'flex-start', 
    alignItems: 'center', 
    height: 40,
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    position: 'absolute',
    right: 10,
    bottom: '0%',
  },
});

export default Home;