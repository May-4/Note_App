import CategoryContext from "../context/categoryContext";
import { useState } from 'react';

const CategoryProvider = ({ children }) => {

  const [categorys, setCategorys] = useState([]);
  const [categoryById, setCategoryById] = useState('');
  
  const contextValues = {
    categ_lists: [categorys, setCategorys],
    categ_id: [categoryById, setCategoryById],
  };

  return (
    <CategoryContext.Provider value={contextValues}>
      {children}
    </CategoryContext.Provider >
  )
}


export default CategoryProvider;