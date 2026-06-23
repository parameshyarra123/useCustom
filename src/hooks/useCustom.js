import { useState, useEffect, useRef } from 'react';

export function useCustom(jsonFileName, currentCount, stepSize) {
  const [apiDataPool, setApiDataPool] = useState([]);
  const fetchedUpTo = useRef(0);

  useEffect(() => {
    if (currentCount === 0) {
      setApiDataPool([]);
      fetchedUpTo.current = 0;
      return;
    }

    // Only fetch on exact multiples: 10, 20, 30 / 2, 4, 6
    if (currentCount % stepSize !== 0) return;

    // Already fetched this batch
    if (currentCount <= fetchedUpTo.current) return;

    const from = fetchedUpTo.current;   // e.g. 10
    const to = currentCount;            // e.g. 20
    fetchedUpTo.current = to;

    fetch(`/${jsonFileName}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Could not load ${jsonFileName}`);
        return res.json();
      })
      .then((fullArray) => {
        const newBatch = fullArray.slice(from, to); // only the new items
        setApiDataPool((prev) => [...prev, ...newBatch]);
      })
      .catch((err) => {
        fetchedUpTo.current = from; // rollback
        console.error('Fetch error:', err);
      });
  }, [currentCount, jsonFileName, stepSize]);

  return { apiDataPool };
}
