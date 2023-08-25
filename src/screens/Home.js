import { StyleSheet, SafeAreaView, Text, View, TextInput, FlatList, TouchableOpacity, } from 'react-native';
import React, { useContext, useState } from 'react';

//********Component******** */
import Header from '../components/Header';
import InputSearch from '../components/InputSearch';
import CategoryList from '../components/CategoryList';
import AddButton from '../components/AddButton';
import FilterNote from '../components/FilterNote';

const Home = ({ navigation }) => {

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState();

  const searchValue = (value) => {
    setSearch(value);
  }
  const selectedcategoryItem = (value) => {
    setSelectedCategory(value);
  }
  //Update Set Value
  
  return (
    <SafeAreaView style={{ marginHorizontal: 15, }}>
      
      <View style={styles.topContainer}>

        <Header />

        <InputSearch onUpdateSearch={searchValue} />
        {/*End Search Bar */}

        <CategoryList onUpdateCategory={selectedcategoryItem} />
        {/*End Category  */}
      </View>
      {/*End Search and Category Section*/}
     
      <FilterNote search={search} category={selectedCategory} />
      {/*End Display Notes Section*/}
      
      <AddButton link={navigation}  />
      {/*End Circle Add Note Button*/}

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
});

export default Home;