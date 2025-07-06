import React, { useState, useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { exportToExcel } from '../utils/exportToExcel';
import { FaSortUp, FaSortDown } from 'react-icons/fa';

const Table = () => {
  const contacts = useSelector((state) => state.contacts.data);

  const [search, setSearch] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;

  // 🔍 Search Filter
  const filteredData = useMemo(() => {
    return contacts.filter((item) =>
      Object.values(item)
        .join(' ')
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [contacts, search]);

  // ⬆⬇ Sorting Logic
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key] || '';
      const bValue = b[sortConfig.key] || '';
      const order = aValue.localeCompare
        ? aValue.localeCompare(bValue)
        : aValue > bValue
        ? 1
        : -1;
      return sortConfig.direction === 'asc' ? order : -order;
    });
  }, [filteredData, sortConfig]);

  // Pagination Slice
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * entriesPerPage;
    return sortedData.slice(start, start + entriesPerPage);
  }, [sortedData, currentPage]);

  const totalPages = Math.ceil(sortedData.length / entriesPerPage);

  // ⬆⬇ Toggle Sorting
  const handleSort = useCallback((key) => {
    setSortConfig((prev) => {
      const isAsc = prev.key === key && prev.direction === 'asc';
      return { key, direction: isAsc ? 'desc' : 'asc' };
    });
  }, []);

  return (
    <div className="bg-white shadow-md p-4 rounded overflow-x-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <input
          type="text"
          placeholder="Search contacts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full md:w-1/3"
        />
        <button
          onClick={() => exportToExcel(filteredData)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Download Excel
        </button>
      </div>

      <table className="table-auto w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            {[
              { label: 'Email', key: 'email' },
              { label: 'Phone No 1', key: 'phone1' },
              { label: 'Mobile No 1', key: 'mobile1' },
              { label: 'LinkedIn', key: 'linkedin' },
              { label: 'Country', key: 'country' },
              { label: 'City', key: 'city' },
              { label: 'Appointment', key: 'appointmentStatus' },
              { label: 'Created', key: 'createdAt' },
            ].map((col) => (
              <th
                key={col.key}
                onClick={() => handleSort(col.key)}
                className="p-2 cursor-pointer select-none"
              >
                <div className="flex items-center gap-1">
                  {col.label}
                  {sortConfig.key === col.key && (
                    <>
                      {sortConfig.direction === 'asc' ? (
                        <FaSortUp />
                      ) : (
                        <FaSortDown />
                      )}
                    </>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((item, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="p-2">{item.email}</td>
                <td className="p-2">{item.phone1}</td>
                <td className="p-2">{item.mobile1}</td>
                <td className="p-2">{item.linkedin}</td>
                <td className="p-2">{item.country}</td>
                <td className="p-2">{item.city}</td>
                <td className="p-2">{item.appointmentStatus}</td>
                <td className="p-2">{new Date(item.createdAt).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="p-4 text-center">
                No matching records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span>
          Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
