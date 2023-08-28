export const noteLists = [
  {
    id: 1,
    title: 'Team Meeting',
    content: 'In this example, each category item in the FlatList is given a fixed height and styled to have a padding, margin, and a background color. The horizontal prop is set on the FlatList',
    category: 'work',
  },
  {
    id: 2,
    title: 'Assignment 1',
    content: 'the FlatList is padding, margin, and a background color. item in the FlatList is given a fixed height and styled to/ The horizontal prop is set on the FlatList',
    category: 'ideas',
  },
  {
    id: 3,
    title: 'Shopping list',
    content: 'category item in the FlatList is padding, margin, and a background color. The horizontal prop is set on the FlatList',
    category: 'shopping',
  },
  {
    id: 4,
    title: 'Discussion',
    content: 'This approach provides an interactive and user-friendly way for users to select categories using the FlatList and TouchableOpacity components.',
    category: 'work',
  },
  
  {
    id: 5,
    title: 'component list 2 ',
    content: 'The horizontal prop is set on the TouchableOpacity components.',
    category: 'study',
  },
  {
    id: 6,
    title: 'Shopping list',
    content: 'category item in the FlatList is padding, margin, and a background color. The horizontal prop is set on the FlatList',
    category: 'ideas',
  },
  {
    id: 7,
    title: 'Home Work',
    content: 'By using these styles and props, you can achieve the "inline block" appearance for each category item in the FlatList. in the FlatList is given a fixed height and styled to have a padding, margin, and a background color. The horizontal prop is set on the FlatList',
    category: 'study',
  },
  {
    
    id: 8,
    title: 'Home Work',
    content: 'By using these styles and props, you can achieve the "inline block" appearance for each category item in the FlatList. in the FlatList is given a fixed height and styled to have a padding, margin, and a background color. The horizontal prop is set on the FlatList',
    category: 'ideas',
  },
];

export const colors = [
  '#D9E8FC',
  '#FFD8F4',
  '#FDE99D',
  '#B0E9CA',
  '#FFEADD',
];

import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export const noteCategories = [
  {
    id: uuidv4(),
    name : "work",
  },
  {
    id: uuidv4(),
    name : "study",
  },
  {
    id: uuidv4(),
    name : "ideas",
  },
  {
    id: uuidv4(),
    name : "shopping",
  },
  {
    id: uuidv4(),
    name : "recipes",
  },
  {
    id: uuidv4(),
    name : "meetings",
  },
 
];

export const categoryType = 'radioList';