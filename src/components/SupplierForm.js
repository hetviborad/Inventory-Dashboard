// src/components/SupplierForm.js
import React, { useState, useEffect } from 'react';

const SupplierForm = ({ onAddSupplier, editingSupplier, onUpdateSupplier }) => {
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [items, setItems] = useState(['']); // Initialize with an empty item

    useEffect(() => {
        if (editingSupplier) {
            setName(editingSupplier.name);
            setContact(editingSupplier.contact);
            setItems(editingSupplier.items || ['']); // Ensure items is an array
        } else {
            setName('');
            setContact('');
            setItems(['']); // Reset to default empty state
        }
    }, [editingSupplier]);

    const handleAddItem = () => {
        setItems([...items, '']);
    };

    const handleRemoveItem = (index) => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
    };

    const handleChangeItem = (index, value) => {
        const newItems = [...items];
        newItems[index] = value;
        setItems(newItems);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const supplierData = { name, contact, items: items.filter(item => item) }; // Filter out empty strings
        if (editingSupplier) {
            onUpdateSupplier({ ...editingSupplier, ...supplierData });
        } else {
            onAddSupplier({ id: Date.now(), ...supplierData }); // Unique id generation
        }
        setName('');
        setContact('');
        setItems(['']);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Supplier management</h2>
            <div className="mb-3">
                <input
                    type="text"
                    placeholder="Supplier Name"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <input
                    type="text"
                    placeholder="Contact Details"
                    className="form-control"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <label>Items Supplied:</label>
                {items.map((item, index) => (
                    <div className="d-flex mb-2" key={index}>
                        <input
                            type="text"
                            className="form-control me-2"
                            value={item}
                            onChange={(e) => handleChangeItem(index, e.target.value)}
                            placeholder={`Item ${index + 1}`}
                            required
                        />
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => handleRemoveItem(index)}
                        >
                            Remove
                        </button>
                    </div>
                ))}
                <button type="button" className="btn btn-success" onClick={handleAddItem}>
                    Add Item
                </button>
            </div>
            <div className="col-12">
                <button type="submit" className="btn btn-primary w-100">
                    {editingSupplier ? 'Update Supplier' : 'Add Supplier'}
                </button>
            </div>
        </form >
    );
};

export default SupplierForm;
