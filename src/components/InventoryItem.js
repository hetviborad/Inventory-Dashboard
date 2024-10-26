import React, { useState } from 'react';

const InventoryItem = ({ item, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedItem, setUpdatedItem] = useState(item);

  const handleUpdate = () => {
    onUpdate(item.id, updatedItem);
    setIsEditing(false);
  };

  return (
    <tr>
      {isEditing ? (
        <>
          <td><input type="text" value={updatedItem.name} onChange={(e) => setUpdatedItem({ ...updatedItem, name: e.target.value })} /></td>
          <td><input type="number" value={updatedItem.quantity} onChange={(e) => setUpdatedItem({ ...updatedItem, quantity: e.target.value })} /></td>
          <td><input type="text" value={updatedItem.category} onChange={(e) => setUpdatedItem({ ...updatedItem, category: e.target.value })} /></td>
          <td><input type="text" value={updatedItem.supplier} onChange={(e) => setUpdatedItem({ ...updatedItem, supplier: e.target.value })} /></td>
          <td>
            <button onClick={handleUpdate} className="btn btn-success btn-sm">Save</button>
          </td>
        </>
      ) : (
        <>
          <td>{item.name}</td>
          <td className={item.quantity < 10 ? 'text-danger' : 'text-success'}>{item.quantity}</td>
          <td>{item.category}</td>
          <td>{item.supplier}</td>
          <td>
            <button onClick={() => setIsEditing(true)} className="btn btn-warning btn-sm me-2">Edit</button>
            <button onClick={() => onDelete(item.id)} className="btn btn-danger btn-sm">Delete</button>
          </td>
        </>
      )}
    </tr>
  );
};

export default InventoryItem;
