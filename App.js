import React, { useState } from 'react';
import './App.css';

function App() {
  // State to store the list of menu items
  const [menuItems, setMenuItems] = useState([]);

  // State to handle form inputs
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: null, // Add image field
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({
      ...newItem,
      [name]: value,
    });
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      setNewItem({
        ...newItem,
        image: URL.createObjectURL(file), // Create a URL for the image
      });
    }
  };

  // Add a new menu item
  const addMenuItem = () => {
    if (newItem.name && newItem.description && newItem.price && newItem.category && newItem.image) {
      setMenuItems([...menuItems, newItem]);
      setNewItem({
        name: '',
        description: '',
        price: '',
        category: '',
        image: null,
      });
    } else {
      alert('Please fill in all fields and select an image.');
    }
  };

  // Delete a menu item
  const deleteMenuItem = (index) => {
    const updatedMenu = menuItems.filter((_, i) => i !== index);
    setMenuItems(updatedMenu);
  };

  return (
    <div className="App">
      <h1>Hotel Menu Management</h1>
      {/* Form to add menu items */}
      <div className="form">
        <input
          type="text"
          name="name"
          placeholder="Item Name"
          value={newItem.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newItem.description}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newItem.price}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={newItem.category}
          onChange={handleInputChange}
        />
        {/* File input for image */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        <button onClick={addMenuItem}>Add Item</button>
      </div>
      {/* Display menu items in 3 columns per row */}
      <div className="menu">
        <h2>Menu Items</h2>
        {menuItems.length === 0 ? (
          <p>No items in the menu.</p>
        ) : (
          <div className="menu-grid">
            {menuItems.map((item, index) => (
              <div key={index} className="menu-item">
                <div className="item">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <p>Price: ${item.price}</p>
                  <p>Category: {item.category}</p>
                  {/* Display the image */}
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="item-image"
                    />
                  )}
                  <button onClick={() => deleteMenuItem(index)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;