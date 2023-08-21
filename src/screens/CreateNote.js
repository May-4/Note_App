import { StyleSheet, ScrollView, SafeAreaView, Text, View, TextInput, FlatList, TouchableOpacity, } from 'react-native';

import { useState } from 'react';
import Header from '../components/Header';
import CategoryList from '../components/CategoryList';
import CreateButton from '../components/CreateButton';


const CreateNote = ({ navigation }) => {

  const [title, setTitle] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [detailText, setDetailText] = useState();

  const selectedcategoryItem = (value) => {
    setSelectedCategory(value);
  }
  const note = {
    title: title,
    content: detailText,
    category: selectedCategory,      
  };

  const resetNote = () => {
    setTitle('');
    setSelectedCategory('');
    setDetailText('');
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{marginHorizontal: 15}}>

      <Header />

      <View style={styles.titleWraper}>
        <Text style={styles.titleText}> Title </Text>
        <TextInput
          style={[styles.titleInput]}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter Title"
        />
      </View>
      {/*End Add Title */}

      <View>
        <Text style={styles.titleText}> Category </Text>
        <CategoryList onUpdateCategory={selectedcategoryItem} type='radioList' />
      </View>
      {/*End Category Radio List*/}

      <View>
        <Text style={styles.titleText}> Details </Text>
        <TextInput
          style={styles.textInput}
          multiline
          value={detailText}
          onChangeText={setDetailText}
        />
      </View>
      {/*End Add Detail Textarea*/}

      <CreateButton newNote={note} navigation={navigation}/>
      {/*End Create Button*/}

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  titleWraper: {
    marginVertical: 30,
  },
  titleText: {
    fontSize: 12,
    color: '#666666',
    lineHeight: 15,
    marginBottom: 8,
  },
  titleInput: {
    padding: 10,
    backgroundColor: '#F6F6F6',
    color: '#BDBDBD',
    borderWidth: 1,
    borderColor: "#ECECEC",
    borderRadius: 10,
    alignItems: "center",
    fontSize: 16,
  },

  textInput: {
    borderColor: '#ECECEC',
    backgroundColor: '#F6F6F6',
    borderWidth: 2,
    padding: 10,
    fontSize: 16,
    height: 300,
    textAlignVertical: 'top',
  },
});


export default CreateNote;