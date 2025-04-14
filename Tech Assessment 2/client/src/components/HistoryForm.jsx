import React, { useState, useEffect } from 'react';
import axios from 'axios';

function HistoryForm({ selectedHistory = null, setSelectedHistory, fetchHistory }) {
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (selectedHistory) {
      setLocation(selectedHistory.location);
      setStartDate(new Date(selectedHistory.dateRange.startDate).toISOString().split('T')[0]);
      setEndDate(new Date(selectedHistory.dateRange.endDate).toISOString().split('T')[0]);
    } else {
      setLocation('');
      setStartDate('');
      setEndDate('');
    }
  }, [selectedHistory]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!location || !startDate || !endDate) {
      setError('All fields are required');
      return;
    }

    try {
      const payload = { location, startDate, endDate };
      if (selectedHistory) {
        await axios.put(`http://localhost:5000/api/history/${selectedHistory._id}`, payload);
      } else {
        await axios.post('http://localhost:5000/api/history', payload);
      }
      fetchHistory();
      setSelectedHistory(null);
      setLocation('');
      setStartDate('');
      setEndDate('');
    } catch (err) {
      console.error('Submit error:', err);
      setError(err.response?.data?.error || 'Failed to save history');
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg mb-6 w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">
        {selectedHistory ? 'Update Weather History' : 'Add Weather History'}
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter city or zip"
          style={{
            paddingLeft: '24px',
            paddingRight: '24px',
            paddingTop: '12px',
            paddingBottom: '12px',
            marginTop: '8px',
            marginBottom: '8px',
            border: '1px solid #d1d5db',
            borderRadius: '0.75rem',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            width: '100%',
            maxWidth: '28rem',
            transition: 'all 0.3s ease',
          }}
          className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="date"
          
          style={{
            paddingLeft: '24px',
            paddingRight: '24px',
            paddingTop: '12px',
            paddingBottom: '12px',
            marginTop: '8px',
            marginBottom: '8px',
            border: '1px solid #d1d5db',
            borderRadius: '0.75rem',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            width: '100%',
            maxWidth: '28rem',
            transition: 'all 0.3s ease',
          }}
          value={startDate}
          placeholder="Select start date"
          onChange={(e) => setStartDate(e.target.value)}
          max={new Date().toISOString().split('T')[0]}
          className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
            type="date"
            style={{
              paddingLeft: '24px',
              paddingRight: '24px',
              paddingTop: '12px',
              paddingBottom: '12px',
              marginTop: '8px',
              marginBottom: '8px',
              border: '1px solid #d1d5db',
              borderRadius: '0.75rem',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              width: '100%',
              maxWidth: '28rem',
              transition: 'all 0.3s ease',
            }}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
            placeholder="Select end date"
            className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <div className="flex gap-4">
          <button
            type="submit"
            style={{
              backgroundColor: '#2563eb', // bg-blue-600
              color: '#ffffff', // text-white
              padding: '12px 24px', // px-6 py-3
              margin: '4px 4px', // mx-1 my-1
              borderRadius: '0.75rem', // rounded-xl
              fontWeight: '500', // font-medium
              transition: 'all 0.3s ease', // transition
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl"
          >
            {selectedHistory ? 'Update' : 'Save'}
          </button>
          {selectedHistory && (
            <button
              type="button"
              style={{
                backgroundColor: '#2563eb', // bg-blue-600
                color: '#ffffff', // text-white
                padding: '12px 24px', // px-6 py-3
                margin: '4px 4px', // mx-1 my-1
                borderRadius: '0.75rem', // rounded-xl
                fontWeight: '500', // font-medium
                transition: 'all 0.3s ease', // transition
              }}
              onClick={() => setSelectedHistory(null)}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-xl"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default HistoryForm;