import React from "react";
import { useItemContext } from "../context/ItemContext";
import { useState } from "react";
import ItemModal from "../components/ItemModal";

function ViewItem() {
  const { items } = useItemContext();
  const [selected, setSelected] = useState(null);

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4 font-bold">Items</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
  {items.map((item, i) => (
    <div key={i}
         className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:scale-105 transition-transform"
         onClick={() => setSelected(item)}>
      <img src={`http://localhost:5000/${item.cover}`} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">Name : {item.name}</h3>
        <p className="text-sm text-gray-500"> Type: {item.type}</p>
      </div>
    </div>
  ))}
</div>

      {selected && <ItemModal item={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

export default ViewItem;