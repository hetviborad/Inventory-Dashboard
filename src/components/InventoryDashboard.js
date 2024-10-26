// src/components/InventoryDashboard.js
import React, { useState } from 'react';
import InventoryItemForm from './InventoryItemForm';
import SupplierForm from './SupplierForm';
import SupplierList from './SupplierList';

const InventoryDashboard = () => {
  const [items, setItems] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [search, setSearch] = useState('');

  // Inventory Item Functions
  const handleAddItem = (item) => {
    setItems([...items, item]);
  };

  const handleUpdateItem = (updatedItem) => {
    setItems(items.map(item => (item.id === updatedItem.id ? updatedItem : item)));
    setEditingItem(null);
  };

  const handleDeleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  // Supplier Functions
  const handleAddSupplier = (supplier) => {
    setSuppliers([...suppliers, supplier]);
  };

  const handleUpdateSupplier = (updatedSupplier) => {
    setSuppliers(suppliers.map(supplier => (supplier.id === updatedSupplier.id ? updatedSupplier : supplier)));
    setEditingSupplier(null);
  };

  const handleDeleteSupplier = (id) => {
    setSuppliers(suppliers.filter(supplier => supplier.id !== id));
  };

  const handleEditSupplier = (supplier) => {
    setEditingSupplier(supplier);
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
  };

  const filteredItems = items.filter(item =>
    item.category.toLowerCase().includes(search.toLowerCase()) ||
    item.supplier.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h1>Inventory Dashboard</h1>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search by category or supplier"
          className="form-control"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <InventoryItemForm
        onAddItem={handleAddItem}
        editingItem={editingItem}
        onUpdateItem={handleUpdateItem}
      />
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Category</th>
              <th>Supplier</th>
              <th>Stock Level</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">No items found</td>
              </tr>
            ) : (
              filteredItems.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.category}</td>
                  <td>{item.supplier}</td>
                  <td>
                    <span className={`badge ${item.quantity < 5 ? 'bg-danger' : 'bg-success'}`}>
                      {item.quantity < 5 ? 'Low Stock' : 'Sufficient Stock'}
                    </span>
                  </td>
                  <td>
                    <button onClick={() => handleEditItem(item)} className="btn btn-secondary btn-sm me-2">Edit</button>
                    <button onClick={() => handleDeleteItem(item.id)} className="btn btn-danger btn-sm">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Supplier Management Section */}
      <SupplierForm
        onAddSupplier={handleAddSupplier}
        editingSupplier={editingSupplier}
        onUpdateSupplier={handleUpdateSupplier}
      />
      <SupplierList
        suppliers={suppliers}
        onEditClick={handleEditSupplier}
        onDeleteClick={handleDeleteSupplier}
      />
    </div>
  );
};

export default InventoryDashboard;
