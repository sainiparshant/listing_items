import React from "react";

function ItemModal({ item, onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl mx-4 md:mx-0 relative overflow-hidden">
       
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-2xl"
        >
          &times;
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          
          <div className="space-y-4">
            <img
              src={`http://localhost:5000/${item.cover}`}
              alt="Cover"
              className="rounded-xl w-full h-64 object-cover shadow"
            />
            <div className="flex overflow-x-auto gap-3 scrollbar-hide">
              {item.images.map((img, index) => (
                <img
                  key={index}
                  src={`http://localhost:5000/${img}`}
                  alt={`preview-${index}`}
                  className="h-20 w-20 object-cover rounded border shadow"
                />
              ))}
            </div>
          </div>

         
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">{item.name}</h2>
            <p className="text-sm text-gray-500 capitalize">{item.type}</p>
            <p className="text-gray-700">{item.desc}</p>

            <button
              onClick={() => alert('Enquiry Sent!')}
              className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-lg font-medium"
            >
              Enquire
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemModal