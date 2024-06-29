import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DataTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('/api/data', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(data);
    };

    fetchData();
  }, []);

  const handleEdit = (id, field, value) => {
    setData(data.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const handleSave = async (id) => {
    const token = localStorage.getItem('token');
    const item = data.find((item) => item.id === id);

    await axios.put('/api/data', {
      id: item.id,
      actionType: item.actionType,
      actionName: item.actionName,
    }, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Action Type</th>
          <th>Action Name</th>
          <th>Edited By</th>
          <th>Edited When</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td><input value={item.actionType} onChange={(e) => handleEdit(item.id, 'actionType', e.target.value)} /></td>
            <td><input value={item.actionName} onChange={(e) => handleEdit(item.id, 'actionName', e.target.value)} /></td>
            <td>{item.editedBy}</td>
            <td>{item.editedWhen}</td>
            <td><button onClick={() => handleSave(item.id)}>Save</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;
