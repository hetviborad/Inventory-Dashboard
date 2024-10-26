import React, { useState } from 'react';
import SupplierForm from './SupplierForm';

const SupplierManagement = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [editingSupplier, setEditingSupplier] = useState(null);

  const addSupplier = (supplier) => {
    setSuppliers([...suppliers, { ...supplier, id: Date.now() }]);
  };

  const updateSupplier = (updatedSupplier) => {
    setSuppliers(suppliers.map(s => (s.id === updatedSupplier.id ? updatedSupplier : s)));
    setEditingSupplier(null);
  };

  const editSupplier = (supplier) => {
    setEditingSupplier(supplier);
  };

  return (
    <div className="my-5">
      <h2>Supplier Management</h2>
      <SupplierForm onAddSupplier={addSupplier} onUpdateSupplier={updateSupplier} editingSupplier={editingSupplier} />
      <div className="table-responsive mt-3">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Contact Details</th>
              <th>Items Supplied</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => (
              <tr key={supplier.id}>
                <td>{supplier.name}</td>
                <td>{supplier.contact}</td>
                <td>{supplier.itemsSupplied.join(', ')}</td>
                <td>
                  <button onClick={() => editSupplier(supplier)} className="btn btn-warning btn-sm me-2">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupplierManagement;
