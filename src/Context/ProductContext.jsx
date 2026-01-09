import { createContext, useState } from "react";
import MobilePhones from "../data/MobilePhones";
import ToysProducts from "../data/toys";
import HomeElectronics from "../data/HomeElectonics";
import Grocery from "../data/grocerry";
import TvAppliances from "../data/TvAppliances";
import HomeFurniture from "../data/furniture.js";

export const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {
  const [products] = useState({
    phone: MobilePhones,
    tvAppliances: TvAppliances,
    toys: ToysProducts,
    grocery: Grocery,
    homeElectronics: HomeElectronics,
    homeFurniture: HomeFurniture
  });

  const getProductById = (id) => {
    for (const category in products) {
      const item = products[category].find((p) => String(p.id) === String(id));
      if (item) return item;
    }
    return null;
  };

  return (
    <ProductContext.Provider value={{ products, getProductById }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
