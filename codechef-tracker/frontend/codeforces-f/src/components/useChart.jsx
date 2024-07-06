import { useEffect } from 'react';
import { Chart } from 'chart.js';

export function useChart(ref, config) {
  useEffect(() => {
    if (!ref.current) return;
    const chartInstance = new Chart(ref.current, config);
    return () => chartInstance.destroy();
  }, [ref, config]);
}
