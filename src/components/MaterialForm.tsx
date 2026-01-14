import { useState } from "react";
import type { RawMaterial, UnitOfMeasure } from "../types";

interface MaterialFormProps {
  onAdd: (material: RawMaterial) => void;
}

function MaterialForm({ onAdd }: MaterialFormProps) {
  const [name, setName] = useState("");
  const [unitOfMeasure, setUnitOfMeasure] = useState<UnitOfMeasure>("units");
  const [quantity, setQuantity] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);

  const totalPrice = quantity * price;
  const taxAmount = totalPrice * 0.1;
  const totalAmount = totalPrice + taxAmount;

  const handleAdd = () => {
    if (!name.trim()) {
      alert("Please enter material name");
      return;
    }

    if (quantity <= 0 || price <= 0) {
      alert("Quantity and Price must be greater than 0");
      return;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Please enter material name");
      return;
    }

    if (quantity <= 0) {
      alert("Quantity must be greater than 0");
      return;
    }

    if (price <= 0) {
      alert("Price must be greater than 0");
      return;
    }

    const material: RawMaterial = {
      id: Date.now().toString(),
      name: name.trim(),
      unitOfMeasure,
      quantity,
      price,
      totalPrice,
      taxAmount,
      totalAmount,
    };

    onAdd(material);

    setName("");
    setQuantity(0);
    setPrice(0);
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        Add Raw Material
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Material Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter material name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Unit of Measure *
            </label>
            <select
              value={unitOfMeasure}
              onChange={(e) =>
                setUnitOfMeasure(e.target.value as UnitOfMeasure)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ml">ml</option>
              <option value="ltr">ltr</option>
              <option value="gm">gm</option>
              <option value="kg">kg</option>
              <option value="mtr">mtr</option>
              <option value="mm">mm</option>
              <option value="box">box</option>
              <option value="units">units</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity *
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0"
              min="0"
              step="0.01"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price per Unit (₹) *
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
              min="0"
              step="0.01"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Price (₹)
            </label>
            <input
              type="text"
              value={totalPrice.toFixed(2)}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tax Amount (10%) (₹)
            </label>
            <input
              type="text"
              value={taxAmount.toFixed(2)}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Amount (₹)
            </label>
            <input
              type="text"
              value={totalAmount.toFixed(2)}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            onClick={handleAdd}
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            + Add Material
          </button>
        </div>
      </form>
    </div>
  );
}

export default MaterialForm;
