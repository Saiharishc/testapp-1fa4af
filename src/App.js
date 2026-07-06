import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [newItemName, setNewItemName] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [updatedItemName, setUpdatedItemName] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const response = await fetch('/api/items');
    const data = await response.json();
    setItems(data);
  };

  const handleCreateItem = async () => {
    if (newItemName.trim() === '') return;
    await fetch('/api/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: newItemName }),
    });
    setNewItemName('');
    fetchItems();
  };

  const handleSelectItem = async (id) => {
    const response = await fetch(`/api/items/${id}`);
    const data = await response.json();
    setSelectedItem(data);
    setUpdatedItemName(data.name || '');
  };

  const handleUpdateItem = async (id) => {
    if (updatedItemName.trim() === '') return;
    await fetch(`/api/items/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: updatedItemName }),
    });
    setSelectedItem(null);
    setUpdatedItemName('');
    fetchItems();
  };

  const handleDeleteItem = async (id) => {
    await fetch(`/api/items/${id}`, {
      method: 'DELETE',
    });
    setSelectedItem(null);
    fetchItems();
  };

  return (
    <div className="App">
      <h1>TestApp</h1>

      <h2>Items</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name || `Item ${item.id}`}
            <button onClick={() => handleSelectItem(item.id)}>Edit</button>
            <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h2>Add New Item</h2>
      <input
        type="text"
        value={newItemName}
        onChange={(e) => setNewItemName(e.target.value)}
        placeholder="Item name"
      />
      <button onClick={handleCreateItem}>Add Item</button>

      {selectedItem && (
        <div>
          <h2>Edit Item {selectedItem.id}</h2>
          <input
            type="text"
            value={updatedItemName}
            onChange={(e) => setUpdatedItemName(e.target.value)}
            placeholder="New name"
          />
          <button onClick={() => handleUpdateItem(selectedItem.id)}>Update</button>
        </div>
      )}
    </div>
  );
}

export default App;
