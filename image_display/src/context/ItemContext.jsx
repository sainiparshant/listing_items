import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const getItems = async () => {
    const res = await axios.get("http://localhost:5000/api/items");
    setItems(res.data);
  };

  const addItem = async (formData) => {
    const res = await axios.post("http://localhost:5000/api/items", formData);
    setItems((prev) => [...prev, res.data]);
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <ItemContext.Provider value={{ items, addItem }}>
      {children}
    </ItemContext.Provider>
  );
};

export const useItemContext = () => useContext(ItemContext);