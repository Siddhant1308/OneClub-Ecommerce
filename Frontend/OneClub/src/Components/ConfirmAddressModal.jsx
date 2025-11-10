import React from "react";

const ConfirmAddressModal = ({
  mode,
  address,
  regAddress,
  handleAddressSubmit,
  onSave,
  onClose,
  onConfirm,
  userDetails,
}) => {
  const isConfirm = mode === "confirm";

  const baseClasses = "border px-3.5 py-1.5 rounded w-full";
  const readOnlyClasses = "bg-gray-100 text-gray-500 cursor-not-allowed";

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg relative">
        <button onClick={onClose} className="absolute right-4 top-2 text-xl">×</button>
        <h2 className="text-xl font-semibold mb-4">
          {isConfirm ? "Confirm Order Details" : mode === "add" ? "Add New Address" : "Update Address"}
        </h2>
        <form onSubmit={handleAddressSubmit(isConfirm ? onConfirm : onSave)} className="flex flex-col gap-3">
          
          {isConfirm && (
            <>
              <input
                {...regAddress("name", { required: "Receiver name is required" })}
                defaultValue={userDetails.name}
                placeholder="Receiver Name"
                autoComplete="name"
                className={baseClasses}
              />
              <input
                {...regAddress("phone", { required: "Receiver phone is required" })}
                defaultValue={userDetails.phone}
                placeholder="Receiver Phone"
                autoComplete="tel"
                className={baseClasses}
              />
            </>
          )}

          <input
            {...regAddress("street", { required: !isConfirm && "Street is required" })}
            defaultValue={address.street}
            placeholder="Street"
            autoComplete="address-line1"
            readOnly={isConfirm}
            className={`${baseClasses} ${isConfirm ? readOnlyClasses : ""}`}
          />
          <input
            {...regAddress("city", { required: !isConfirm && "City is required" })}
            defaultValue={address.city}
            placeholder="City"
            autoComplete="address-level2"
            readOnly={isConfirm}
            className={`${baseClasses} ${isConfirm ? readOnlyClasses : ""}`}
          />
          <input
            {...regAddress("state", { required: !isConfirm && "State is required" })}
            defaultValue={address.state}
            placeholder="State"
            autoComplete="address-level1"
            readOnly={isConfirm}
            className={`${baseClasses} ${isConfirm ? readOnlyClasses : ""}`}
          />
          <input
            {...regAddress("zip", { required: !isConfirm && "Zipcode is required" })}
            defaultValue={address.zip}
            placeholder="Zipcode"
            autoComplete="postal-code"
            readOnly={isConfirm}
            className={`${baseClasses} ${isConfirm ? readOnlyClasses : ""}`}
          />
          <input
            {...regAddress("country", { required: !isConfirm && "Country is required" })}
            defaultValue={address.country}
            placeholder="Country"
            autoComplete="country"
            readOnly={isConfirm}
            className={`${baseClasses} ${isConfirm ? readOnlyClasses : ""}`}
          />
          <textarea
            {...regAddress("landmarks")}
            defaultValue={address.landmarks}
            placeholder="Landmarks"
            autoComplete="off"
            readOnly={isConfirm}
            className={`${baseClasses} resize-none ${isConfirm ? readOnlyClasses : ""}`}
          />

          <div className="flex justify-end mt-4 gap-2">
            {!isConfirm && (
              <button type="submit" className="bg-black text-white text-xs px-4 py-2 rounded hover:bg-black">
                {mode === "add" ? "Add Address" : "Update Address"}
              </button>
            )}
            {isConfirm && (
              <button type="submit" className="bg-black text-white text-xs px-4 py-2 rounded hover:bg-black">
                Confirm Order
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfirmAddressModal;
