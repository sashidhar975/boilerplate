import React, { useState, useEffect } from 'react';
import { Form, Button, ListGroup, InputGroup, FormControl } from 'react-bootstrap';

function Crud() {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [editItemId, setEditItemId] = useState(null);
  const [editItemName, setEditItemName] = useState('');

  useEffect(() => {
    setItems([
      { id: 1, name: 'Item 1' },
      
    ]);
  }, []);

  const addItem = async () => {
    if (itemName.trim() !== '') {
      const newItem = { name: itemName };
      try {
        const response = await fetch('http://localhost:3000/api/items', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newItem),
        });
        if (response.ok) {
          const data = await response.json();
          setItems([...items, data]);
          setItemName('');
          window.alert('Item added successfully!');
        } else {
          console.error('Failed to add item');
          window.alert('Failed to add item. Please try again.');
        }
      } catch (error) {
        console.error('Error adding item:', error);
        window.alert('An error occurred while adding the item.');
      }
    } else {
      window.alert('Please enter a valid item name.');
    }
  };

  const editItem = (id, name) => {
    setEditItemId(id);
    setEditItemName(name);
  };

  const updateItem = () => {
    if (editItemName.trim() !== '') {
      setItems(
        items.map((item) =>
          item.id === editItemId ? { ...item, name: editItemName } : item
        )
      );
      setEditItemId(null);
      setEditItemName('');
    }
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div>
      <div>CRUD Example Items</div>
      <p style={{ fontSize: "14px", color: "#888" }}>
        Interactive CRUD example to explore and understand features
      </p>
      <hr />
      <div className="container mt-5">
        <Form onSubmit={(e) => { e.preventDefault(); addItem(); }}>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Enter item name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Button type="submit" variant="dark">Add CRUD Example Item</Button>
          </InputGroup>
        </Form>
        <ListGroup>
          {items.map((item) => (
            <ListGroup.Item key={item.id}>
              {editItemId === item.id ? (
                <Form.Group className="mb-0">
                  <FormControl
                    type="text"
                    value={editItemName}
                    onChange={(e) => setEditItemName(e.target.value)}
                  />
                </Form.Group>
              ) : (
                item.name
              )}
              <div className="float-right">
                {editItemId === item.id ? (
                  <React.Fragment>
                    <Button variant="success" onClick={updateItem}>Save</Button>
                    <Button variant="secondary" onClick={() => setEditItemId(null)}>Cancel</Button>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Button variant="info" onClick={() => editItem(item.id, item.name)}>Edit</Button>
                    <Button variant="danger" onClick={() => deleteItem(item.id)}>Delete</Button>
                  </React.Fragment>
                )}
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  );
}

export default Crud;
