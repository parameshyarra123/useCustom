import { useState } from 'react';
import { useCustom } from '../hooks/useCustom';

export function DataCards() {
  const [displayCount, setDisplayCount] = useState(0);
  const { apiDataPool } = useCustom('cardData.json', displayCount, 2);

  const handleIncrement = () => setDisplayCount((prev) => prev + 2);
  const handleDecrement = () => setDisplayCount((prev) => (prev > 0 ? prev - 1 : 0));

  // For even counts (2, 4, 6...) the fetch is needed — if pool hasn't caught up yet, show loading
  const isFetchPending = displayCount > 0 && displayCount % 2 === 0 && apiDataPool.length < displayCount;

  const blocksToRender = apiDataPool.slice(0, displayCount);

  return (
    <div className="view-card layout-panel-cards">
      <h2>🗂️ 2-Column Cards Counter: {displayCount}</h2>

      <div className="cards-grid">
        {isFetchPending ? (
          <p className="loading-card">Loading...</p>
        ) : (
          blocksToRender.map((block) => (
            <div key={block.id} className="metric-block-card">
              <div className="card-header">
                <span className="card-id">ID #{block.id}</span>
                <span className={`status-dot ${block.status.toLowerCase()}`}></span>
              </div>
              <h3>{block.title}</h3>
              <p className="card-metric">{block.metrics}</p>
            </div>
          ))
        )}
      </div>

      <div className="bottom-left-controls">
        <button className="control-btn minus" onClick={handleDecrement}>−</button>
        <button className="control-btn plus-orange" onClick={handleIncrement}>+</button>
      </div>
    </div>
  );
}
