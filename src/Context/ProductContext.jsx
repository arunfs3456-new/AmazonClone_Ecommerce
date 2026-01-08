import { createContext, useState } from "react";
import PRODUCTS from "../data/productsData";

export const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(PRODUCTS);

  const getProductById = (id) => products.find((p) => String(p.id) === String(id));

  return (
    <ProductContext.Provider value={{ products, getProductById }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
