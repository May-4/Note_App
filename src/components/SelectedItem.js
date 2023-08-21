import React from 'react';
import { StyleSheet, Text, TouchableOpacity, } from 'react-native';

const SelectedItem = ({ label, selected, onSelect }) => {
  return (
    <TouchableOpacity
      onPress={onSelect}
      activeOpacity={0.5}
      style={[
        styles.categoryItem,
        selected && styles.selectedCategory
      ]}
    >
      <Text style={selected && styles.selectedLabel}>{label}</Text>
    </TouchableOpacity>
  )
  
};
const styles = StyleSheet.create({
  categoryItem: {
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    justifyContent: 'center',
    marginRight: 12,

  },
  selectedCategory: {
    backgroundColor: '#1F2937',
  },
  selectedLabel: {
    color: 'white',
  },
});
export default SelectedItem;