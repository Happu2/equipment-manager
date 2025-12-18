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
      // Fallback to static data for demo on GitHub Pages
      setEquipment([
        {
          id: 1,
          name: 'Laptop',
          type: 'Computer',
          status: 'Available',
          last_cleaned_date: '2024-12-01'
        },
        {
          id: 2,
          name: 'Projector',
          type: 'Display',
          status: 'In Use',
          last_cleaned_date: '2024-11-15'
        },
        {
          id: 3,
          name: 'Whiteboard',
          type: 'Stationery',
          status: 'Available',
          last_cleaned_date: '2024-12-10'
        }
      ])
      setError(null) // Clear error since we have fallback data
      setLoading(false)
      console.error('Using demo data:', err.message)
    }
  }

  const handleCreate = async (formData) => {
    try {
      await axios.post('http://localhost:3000/api/equipment', formData)
      fetchEquipment()
    } catch (err) {
      alert('Demo mode: Cannot add equipment. This feature requires a backend server.')
      console.error('Error adding equipment', err)
    }
  }

  const handleUpdate = async (formData) => {
      try {
          await axios.put(`http://localhost:3000/api/equipment/${editingItem.id}`, formData);
          setEditingItem(null);
          fetchEquipment();
      } catch (err) {
          alert('Demo mode: Cannot update equipment. This feature requires a backend server.')
          console.error('Error updating equipment', err);
      }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this equipment?')) return;
    try {
      await axios.delete(`http://localhost:3000/api/equipment/${id}`)
      fetchEquipment()
    } catch (err) {
      alert('Demo mode: Cannot delete equipment. This feature requires a backend server.')
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
