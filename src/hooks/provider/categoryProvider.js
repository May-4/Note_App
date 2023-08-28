import CategoryContext from "../context/categoryContext";
import { useState } from 'react';

const CategoryProvider = ({ children }) => {

  const [categorys, setCategorys] = useState([]);
  return (
    <CategoryContext.Provider value={[categorys, setCategorys]}>
      {children}
    </CategoryContext.Provider >
  )
}


export default CategoryProvider;