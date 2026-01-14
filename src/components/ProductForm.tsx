import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { addProduct, updateProduct } from '../store/productsSlice';
import { navigateToList } from '../store/appSlice';
import type{ Product, RawMaterial, UnitOfMeasure, ProductCategory } from '../types';
import MaterialForm from './MaterialForm';

function ProductForm() {
  const dispatch = useAppDispatch();
  const currentView = useAppSelector(state => state.app.currentView);
  const selectedProductId = useAppSelector(state => state.app.selectedProductId);
  const products = useAppSelector(state => state.products.products);

  const isEditMode = currentView === 'edit';
  const existingProduct = isEditMode && selectedProductId
    ? products.find(p => p.id === selectedProductId)
    : null;

  const [name, setName] = useState('');
  const [unitOfMeasure, setUnitOfMeasure] = useState<UnitOfMeasure>('units');
  const [category, setCategory] = useState<ProductCategory>('Finished');
  const [expiryDate, setExpiryDate] = useState('');
  const [materials, setMaterials] = useState<RawMaterial[]>([]);

  useEffect(() => {
    if (existingProduct) {
      setName(existingProduct.name);
      setUnitOfMeasure(existingProduct.unitOfMeasure);
      setCategory(existingProduct.category);
      setExpiryDate(existingProduct.expiryDate);
      setMaterials(existingProduct.materials);
    }
  }, [existingProduct]);

  const totalCost = materials.reduce((sum, material) => sum + material.totalAmount, 0);

const handleAddMaterial = (material: RawMaterial) => {
  setMaterials(prev => [...prev, material]);
};

  const handleRemoveMaterial = (materialId: string) => {
    setMaterials(materials.filter(m => m.id !== materialId));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert('Please enter product name');
      return;
    }

    if (!expiryDate) {
      alert('Please select expiry date');
      return;
    }

    const selectedDate = new Date(expiryDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate <= today) {
      alert('Expiry date must be a future date');
      return;
    }

    if (materials.length === 0) {
      alert('Please add at least one raw material');
      return;
    }

    const product: Product = {
      id: isEditMode && selectedProductId ? selectedProductId : Date.now().toString(),
      name: name.trim(),
      unitOfMeasure,
      category,
      expiryDate,
      totalCost,
      materials,
    };

    if (isEditMode) {
      dispatch(updateProduct(product));
    } else {
      dispatch(addProduct(product));
    }

    dispatch(navigateToList());
  };

  const handleCancel = () => {
    dispatch(navigateToList());
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          {isEditMode ? 'Edit Product' : 'Add New Product'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Product Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter product name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unit of Measure *
              </label>
              <select
                value={unitOfMeasure}
                onChange={(e) => setUnitOfMeasure(e.target.value as UnitOfMeasure)}
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
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ProductCategory)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Finished">Finished</option>
                <option value="Semi finished">Semi finished</option>
                <option value="Subsidiary">Subsidiary</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date *
              </label>
              <input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Cost (₹)
            </label>
            <input
              type="text"
              value={totalCost.toFixed(2)}
              readOnly
              className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700 font-semibold"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Raw Materials</h2>

          <MaterialForm onAdd={handleAddMaterial} />

          {materials.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Added Materials ({materials.length})</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unit</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Qty</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Price</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tax (10%)</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Amt</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {materials.map(material => (
                      <tr key={material.id}>
                        <td className="px-4 py-3 text-sm text-gray-700">{material.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{material.unitOfMeasure}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{material.quantity}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">₹{material.price.toFixed(2)}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">₹{material.totalPrice.toFixed(2)}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">₹{material.taxAmount.toFixed(2)}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">₹{material.totalAmount.toFixed(2)}</td>
                        <td className="px-4 py-3 text-sm">
                          <button
                            type="button"
                            onClick={() => handleRemoveMaterial(material.id)}
                            className="text-red-600 hover:text-red-800 font-medium"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {isEditMode ? 'Update Product' : 'Save Product'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
