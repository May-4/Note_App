import { StyleSheet, Text, View, TextInput, } from 'react-native';
import { useState } from 'react';
import { Feather } from "react-native-vector-icons";


const InputSearch = ({ onUpdateSearch }) => {
  
  const [search, setSearch] = useState();

  const handleSearchChange = (newSearch) => {
    
    setSearch(newSearch);
    onUpdateSearch(newSearch); 
  };

  return (
    <View style={styles.searchBarWrapper}>
      <Text>
        <Feather
          name='search'
          size={20}
          color='#7C7C7C'
        />
      </Text>

      <TextInput
        style={[styles.search]}
        value={search}
        onChangeText={handleSearchChange}
        placeholder="Search For Notes"
      />

      {
        search && (
          <Text onPress={()=>handleSearchChange('')} >
            <Feather name="x" size={20} color="#7C7C7C" />
          </Text>
        )
      }
    </View>
  )

}


const styles = StyleSheet.create({
  searchBarWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ECECEC",
    borderRadius: 12,
    alignItems: "center",
    width: '100%',
  },
  search: {
    fontSize: 14,
    marginLeft: 12,
    color: '#ABABAB',
    width: '80%',
  },

});
export default InputSearch;