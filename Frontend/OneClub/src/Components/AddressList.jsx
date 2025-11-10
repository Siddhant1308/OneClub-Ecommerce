import React from "react";
import Title from "../Components/Title";

const AddressList = ({
  addresses,
  selectedAddressId,
  onSelect,
  onDelete,
  onProceed,
  onAddNew,
  onEdit,
}) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow mt-6">
      <div className="flex justify-between items-center mb-4">
        <Title text1="YOUR" text2="SAVED ADDRESSES" />
        <div className="flex gap-2">
          <button
            onClick={onAddNew}
            className="bg-white text-green-600 border border-green-600 text-xs px-4 py-2 rounded hover:bg-green-600 hover:text-white"
          >
            + Add New Address
          </button>
          <button
            onClick={onProceed}
            className="bg-black text-white text-xs px-4 py-2 rounded hover:bg-black"
          >
            Proceed Further
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {addresses.length === 0 ? (
          <p className="text-gray-500">No addresses found.</p>
        ) : (
          addresses.map((addr) => (
            <div
              key={addr.id}
              className={`flex items-start gap-3 rounded p-3 border ${
                addr.id === selectedAddressId ? "border-black shadow" : ""
              }`}
            >
              {/* Custom styled radio */}
              <input
                type="radio"
                name="defaultAddress"
                checked={addr.id === selectedAddressId}
                onChange={() => onSelect(addr.id)}
                className={`
                  mt-1 w-4 h-4 rounded-full border border-gray-400
                  cursor-pointer
                  checked:bg-black checked:border-black
                  focus:outline-none
                `}
              />

              <div className="flex-1">
                <p>
                  {addr.street}, {addr.city},
                  <br />{addr.state}- {addr.zip}
                  <br/>{addr.country}
                </p>
                
                <p className="text-sm text-gray-600">
                  Landmarks: {addr.landmarks}
                </p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => onEdit(addr)}
                     className="bg-white text-black border border-black text-xs px-3 py-1 rounded hover:bg-black hover:text-white"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => onDelete(addr.id)}
                    className="bg-white text-red-600 border border-red-600 text-xs px-3 py-1 rounded hover:bg-red-600 hover:text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AddressList;