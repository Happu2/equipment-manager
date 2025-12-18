import { useState, useMemo } from 'react';

function EquipmentList({ equipment, onDelete, onEdit, loading, error }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  const filteredAndSortedEquipment = useMemo(() => {
    let filtered = equipment.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      let aValue = a[sortColumn];
      let bValue = b[sortColumn];

      if (sortColumn === 'last_cleaned_date') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [equipment, searchTerm, sortColumn, sortDirection]);

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const getSortArrow = (column) => {
    if (sortColumn !== column) return '';
    return sortDirection === 'asc' ? ' ↑' : ' ↓';
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="list-container">
      <h2>Equipment List</h2>
      <input
        type="text"
        placeholder="Search by name, type, or status..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <table className="equipment-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>Name{getSortArrow('name')}</th>
            <th onClick={() => handleSort('type')} style={{ cursor: 'pointer' }}>Type{getSortArrow('type')}</th>
            <th onClick={() => handleSort('status')} style={{ cursor: 'pointer' }}>Status{getSortArrow('status')}</th>
            <th onClick={() => handleSort('last_cleaned_date')} style={{ cursor: 'pointer' }}>Last Cleaned{getSortArrow('last_cleaned_date')}</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedEquipment.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.type}</td>
              <td>{item.status}</td>
              <td>{new Date(item.last_cleaned_date).toLocaleDateString()}</td>
              <td>
                <button className="edit-btn" onClick={() => onEdit(item)}>Edit</button>
                <button className="delete-btn" onClick={() => onDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EquipmentList;
