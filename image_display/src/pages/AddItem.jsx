import React, { useState } from "react";
import { useItemContext } from "../context/ItemContext";

function AddItem() {
  const { addItem } = useItemContext();
  const [form, setForm] = useState({ name: "", type: "", desc: "", cover: null, additional: [] });
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("type", form.type);
    formData.append("desc", form.desc);
    formData.append("cover", form.cover);
    for (let img of form.additional) {
      formData.append("images", img);
    }
    await addItem(formData);
    setSuccess(true);
    setForm({ name: "", type: "", desc: "", cover: null, additional: [] });
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl mb-4 font-bold">Add New Item</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-lg p-6 rounded-xl space-y-4 max-w-lg mx-auto">
  <h2 className="text-2xl font-bold mb-4 text-center">Add New Item</h2>

  <input type="text" placeholder="Item Name" required className="w-full border p-3 rounded"
    value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />

  <select required className="w-full border p-3 rounded"
    value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
    <option value="">Select Type</option>
    <option>Shirt</option><option>Pant</option><option>Shoes</option><option>Sports Gear</option>
  </select>

  <textarea placeholder="Description" required className="w-full border p-3 rounded"
    value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })}></textarea>

  <label className="block font-semibold">Cover Image:</label>
  <input type="file" accept="image/*" required className="block"
    onChange={(e) => setForm({ ...form, cover: e.target.files[0] })} />

  {form.cover && (
    <img src={URL.createObjectURL(form.cover)} alt="preview"
         className="h-32 mt-2 rounded border object-cover" />
  )}

  <label className="block font-semibold mt-4">Additional Images:</label>
  <input type="file" accept="image/*" multiple className="block"
    onChange={(e) => setForm({ ...form, additional: e.target.files })} />

  <button className="bg-blue-600 hover:bg-blue-700 text-white w-full py-3 rounded mt-4">Add Item</button>
  {success && <p className="text-green-600 font-semibold text-center mt-2">Item successfully added</p>}
</form>

    </div>
  );
}

export default AddItem;