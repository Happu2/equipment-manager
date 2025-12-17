function EquipmentList({ equipment, onDelete, onEdit, loading, error }) {
  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="list-container">
      <h2>Equipment List</h2>
      <table className="equipment-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Status</th>
            <th>Last Cleaned</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {equipment.map((item) => (
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
