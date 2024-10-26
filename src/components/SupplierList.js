// src/components/SupplierList.js
import React from 'react';

const SupplierList = ({ suppliers, onEditClick, onDeleteClick }) => {
  return (
    <div className="mt-4">
      <h2>Supplier List</h2>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact Details</th>
              <th>Items Supplied</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center">No suppliers found</td>
              </tr>
            ) : (
              suppliers.map(supplier => (
                <tr key={supplier.id}>
                  <td>{supplier.name}</td>
                  <td>{supplier.contact}</td>
                  <td>{Array.isArray(supplier.items) ? supplier.items.join(', ') : ''}</td> {/* Check if items is an array */}
                  <td>
                    <button onClick={() => onEditClick(supplier)} className="btn btn-secondary btn-sm me-2">Edit</button>
                    <button onClick={() => onDeleteClick(supplier.id)} className="btn btn-danger btn-sm">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupplierList;
