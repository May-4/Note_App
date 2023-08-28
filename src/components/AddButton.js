import { StyleSheet, TouchableOpacity, } from 'react-native';
import { Feather } from "react-native-vector-icons";
import { useNavigation } from '@react-navigation/native';

const AddButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.circle}
      onPress={navigation.navigate('CreateNote')} >
      <Feather name="plus" size={30} color="white" />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  circle: {
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    position: 'absolute',
    right: 10,
    bottom: '5%',
  },
})
export default AddButton;