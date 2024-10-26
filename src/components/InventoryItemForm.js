// src/components/InventoryItemForm.js
import React, { useState, useEffect } from 'react';

const InventoryItemForm = ({ onAddItem, editingItem, onUpdateItem }) => {
  const [item, setItem] = useState({ name: '', quantity: '', category: '', supplier: '' });

  useEffect(() => {
    if (editingItem) {
      setItem(editingItem);
    } else {
      setItem({ name: '', quantity: '', category: '', supplier: '' });
    }
  }, [editingItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingItem) {
      onUpdateItem(item);
    } else {
      onAddItem({ ...item, id: Date.now() });
    }
    setItem({ name: '', quantity: 0, category: '', supplier: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="row g-3">
        <div className="col-md-6">
          <label htmlFor="name" className="form-label">Item Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={item.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="quantity" className="form-label">Quantity</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            className="form-control"
            value={item.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="category" className="form-label">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            className="form-control"
            value={item.category}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="supplier" className="form-label">Supplier</label>
          <input
            type="text"
            id="supplier"
            name="supplier"
            className="form-control"
            value={item.supplier}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary w-100">
            {editingItem ? 'Update Item' : 'Add Item'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default InventoryItemForm;
