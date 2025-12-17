import { useState, useEffect } from 'react';

function EquipmentForm({ onSubmit, initialData = null, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    status: '',
    last_cleaned_date: ''
  });

  useEffect(() => {
    if (initialData) {
      // Format date for input if it exists
      const dateStr = initialData.last_cleaned_date 
        ? new Date(initialData.last_cleaned_date).toISOString().split('T')[0] 
        : '';
        
      setFormData({
        name: initialData.name,
        type: initialData.type,
        status: initialData.status,
        last_cleaned_date: dateStr
      });
    } else {
      setFormData({
        name: '',
        type: '',
        status: '',
        last_cleaned_date: ''
      });
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    if (!initialData) {
        setFormData({ name: '', type: '', status: '', last_cleaned_date: '' });
    }
  };

  return (
    <div className="card">
      <h2>{initialData ? 'Edit Equipment' : 'Add New Equipment'}</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        
        <select
          name="type"
          value={formData.type}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Type</option>
          <option value="Machine">Machine</option>
          <option value="Vessel">Vessel</option>
          <option value="Tank">Tank</option>
          <option value="Mixer">Mixer</option>
        </select>

        <select
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Under Maintenance">Under Maintenance</option>
        </select>

        <input
          type="date"
          name="last_cleaned_date"
          placeholder="Last Cleaned Date"
          value={formData.last_cleaned_date}
          onChange={handleInputChange}
          required
        />
        <div className="button-group">
            <button type="submit">{initialData ? 'Update Equipment' : 'Add Equipment'}</button>
            {initialData && <button type="button" onClick={onCancel} className="cancel-btn">Cancel</button>}
        </div>
      </form>
    </div>
  );
}

export default EquipmentForm;
