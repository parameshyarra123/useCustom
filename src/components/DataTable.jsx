import { useState } from 'react';
import { useCustom } from '../hooks/useCustom';

export function DataTable() {
  const [displayCount, setDisplayCount] = useState(0);
  const { apiDataPool } = useCustom('tableData.json', displayCount, 10);

  const handleIncrement = () => setDisplayCount((prev) => prev + 10);
  const handleDecrement = () => setDisplayCount((prev) => (prev > 0 ? prev - 1 : 0));

  // Only show loading when we hit exactly a multiple of 10 and fetch hasn't come back yet
  const isFetchPending = displayCount > 0 && displayCount % 10 === 0 && apiDataPool.length < displayCount;

  const rowsToRender = apiDataPool.slice(0, displayCount);

  return (
    <div className="view-card layout-panel-table">
      <h2>📊 Table Rows Counter: {displayCount}</h2>

      <table className="custom-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Resource Title</th>
            <th>Metrics</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {isFetchPending ? (
            <tr>
              <td colSpan={4} className="loading-cell">Loading...</td>
            </tr>
          ) : (
            rowsToRender.map((row) => (
              <tr key={row.id} className="table-row">
                <td><strong>#{row.id}</strong></td>
                <td>{row.title}</td>
                <td><span className="metric-tag">{row.metrics}</span></td>
                <td className={row.status === 'Active' ? 'success-text' : 'danger-text'}>
                  {row.status}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="bottom-left-controls">
        <button className="control-btn minus" onClick={handleDecrement}>−</button>
        <button className="control-btn plus" onClick={handleIncrement}>+</button>
      </div>
    </div>
  );
}
