import { useState } from "react";
import CategoryIdContext from "../context/categoryIdContext";

const CategoryIdProvider = ({ children }) => {

  const [categoryById, setCategoryById] = useState('');
  return (
    <CategoryIdContext.Provider value={[categoryById, setCategoryById]}>
      {children}
    </CategoryIdContext.Provider>
  )
};

export default CategoryIdProvider;