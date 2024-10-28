import { useState } from "react";

export const useAsideFilters = (initialCategory = null) => {
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  const handleCategoryClick = (category, fetchProductos) => {
    setActiveCategory(category);
    fetchProductos(category);
  };

  return {
    activeCategory,
    handleCategoryClick,
  };
};
