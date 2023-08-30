
import { Alert, StyleSheet, Text, TouchableOpacity, } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const RadioCategoryItem = ({ item, selectedId, onSelect }) => {

  const navigateToHome = () => {
    useNavigation().navigate('Home');
  };
  if (item.id == -1) {
    alert('Please Add Category for your note');
    navigateToHome();
    return;
  }
  const isSelected = (item.id === selectedId);


  return (
    <TouchableOpacity
      style={styles.radioWrapper}
      activeOpacity={0.5}
      onPress={onSelect}
    >
      <Text style={[
        styles.radioButton,
        isSelected && styles.radioButtonSelected
      ]}>
      </Text>
      <Text> {item.name} </Text>
    </TouchableOpacity>
  )
};
const styles = StyleSheet.create({

  radioWrapper: {
    flexDirection: 'row',
    marginRight: 24,
    marginBottom: 40,
  },
  radioButton: {
    marginRight: 3,
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#AEAEB2',

  },
  radioButtonSelected: {
    borderColor: '#5DB075',
    backgroundColor: '#5DB075',
  },
  label: {
    color: '#333',
  },
  labelSelected: {
    color: 'white',
  },

});


export default RadioCategoryItem;