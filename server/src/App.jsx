import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import EquipmentForm from './components/EquipmentForm'
import EquipmentList from './components/EquipmentList'

function App() {
  const [equipment, setEquipment] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingItem, setEditingItem] = useState(null)

  useEffect(() => {
    fetchEquipment()
  }, [])

  const fetchEquipment = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/equipment')
      setEquipment(response.data)
      setLoading(false)
    } catch (err) {
      setError('Error fetching data')
      setLoading(false)
      console.error(err)
    }
  }

  const handleCreate = async (formData) => {
    try {
      await axios.post('http://localhost:3000/api/equipment', formData)
      fetchEquipment()
    } catch (err) {
      console.error('Error adding equipment', err)
    }
  }

  const handleUpdate = async (formData) => {
      try {
          await axios.put(`http://localhost:3000/api/equipment/${editingItem.id}`, formData);
          setEditingItem(null);
          fetchEquipment();
      } catch (err) {
          console.error('Error updating equipment', err);
      }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this equipment?')) return;
    try {
      await axios.delete(`http://localhost:3000/api/equipment/${id}`)
      fetchEquipment()
    } catch (err) {
      console.error('Error deleting equipment', err)
    }
  }

  return (
    <div className="container">
      <h1>Equipment Manager</h1>
      
      <EquipmentForm 
        onSubmit={editingItem ? handleUpdate : handleCreate} 
        initialData={editingItem}
        onCancel={() => setEditingItem(null)}
      />

      <EquipmentList 
        equipment={equipment} 
        onDelete={handleDelete} 
        onEdit={setEditingItem}
        loading={loading}
        error={error}
      />
    </div>
  )
}

export default App
