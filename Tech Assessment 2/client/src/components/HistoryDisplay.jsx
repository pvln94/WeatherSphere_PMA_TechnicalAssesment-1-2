import React, { useState } from 'react';
import axios from 'axios';

function HistoryDisplay({ histories = [], setSelectedHistory, fetchHistory }) {
  const [error, setError] = useState('');

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/history/${id}`);
      fetchHistory();
      setError('');
    } catch (err) {
      console.error('Delete error:', err);
      setError('Failed to delete history');
    }
  };

  const handleExport = async (format) => {
    try {
      window.location.href = `http://localhost:5000/api/history/export?format=${format}`;
      setError('');
    } catch (err) {
      console.error('Export error:', err);
      setError('Failed to export history');
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-3xl">
      <h2 className="text-2xl font-bold mb-4">Weather History</h2>
      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
      <div className="mb-4 flex gap-4">
        <button
          onClick={() => handleExport('json')}
          style={{
            backgroundColor: '#2563eb', // bg-blue-600
            color: '#ffffff', // text-white
            padding: '12px 24px', // px-6 py-3
            margin: '4px 4px', // mx-1 my-1
            borderRadius: '0.75rem', // rounded-xl
            fontWeight: '500', // font-medium
            transition: 'all 0.3s ease', // transition
          }}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl"
        >
          Export JSON
        </button>
        <button
          onClick={() => handleExport('csv')}
          style={{
            backgroundColor: '#2563eb', // bg-blue-600
            color: '#ffffff', // text-white
            padding: '12px 24px', // px-6 py-3
            margin: '4px 4px', // mx-1 my-1
            borderRadius: '0.75rem', // rounded-xl
            fontWeight: '500', // font-medium
            transition: 'all 0.3s ease', // transition
          }}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl"
        >
          Export CSV
        </button>
      </div>
      {histories.length === 0 ? (
        <p>No history found.</p>
      ) : (
        <div className="space-y-4">
          {histories.map((history) => (
            <div
              key={history._id}
              className="p-4 border rounded-xl flex justify-between items-center"
            >
              <div>
                <p>
                  <strong>Location:</strong> {history.location}
                </p>
                <p>
                  <strong>Date Range:</strong>{' '}
                  {new Date(history.dateRange.startDate).toLocaleDateString()} -{' '}
                  {new Date(history.dateRange.endDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Temperatures:</strong>{' '}
                  {history.temperatures
                    .map((t) => `${t.temp}°C on ${new Date(t.date).toLocaleDateString()}`)
                    .join(', ')}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedHistory(history)}
                  style={{
                    backgroundColor: '#2563eb', // bg-blue-600
                    color: '#ffffff', // text-white
                    padding: '12px 24px', // px-6 py-3
                    margin: '4px 4px', // mx-1 my-1
                    borderRadius: '0.75rem', // rounded-xl
                    fontWeight: '500', // font-medium
                    transition: 'all 0.3s ease', // transition
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-xl"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(history._id)}
                  style={{
                    backgroundColor: '#2563eb', // bg-blue-600
                    color: '#ffffff', // text-white
                    padding: '12px 24px', // px-6 py-3
                    margin: '4px 4px', // mx-1 my-1
                    borderRadius: '0.75rem', // rounded-xl
                    fontWeight: '500', // font-medium
                    transition: 'all 0.3s ease', // transition
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-xl"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HistoryDisplay;