import React from 'react';
import { StyleSheet, Text, TouchableOpacity, } from 'react-native';

const SelectedRadioCategory = ({ label, selected, onSelect }) => {

  return (
    <TouchableOpacity
      style={styles.radioWrapper}
      activeOpacity={0.5}
      onPress={onSelect}
    >
      <Text style={[styles.radioButton, selected && styles.radioButtonSelected]}>
      </Text>
      <Text> {label} </Text>
    </TouchableOpacity>
  )
  
};
const styles = StyleSheet.create({
  
  radioWrapper: {
    flexDirection: 'row',
    marginRight: 24,
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


export default SelectedRadioCategory;