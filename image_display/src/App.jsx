import React from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ViewItems from "./pages/ViewItem";
import AddItem from "./pages/AddItem";
import { ItemProvider } from "./context/ItemContext";

function App() {
  return (
    <ItemProvider>
      <BrowserRouter>
        <nav className="p-4 bg-blue-500 text-white flex gap-4">
          <Link to="/">View Items</Link>
          <Link to="/add">Add Item</Link>
        </nav>
        <Routes>
          <Route path="/" element={<ViewItems />} />
          <Route path="/add" element={<AddItem />} />
        </Routes>
      </BrowserRouter>
    </ItemProvider>
  );
}

export default App;
