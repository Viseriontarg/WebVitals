import React, { useState, useEffect, useMemo } from 'react';
import { mockPageData } from './mockData';
import './App.css';

// --- Helper Functions ---

// Define Web Vitals thresholds
const VITAL_THRESHOLDS = {
  lcp: { good: 2500, poor: 4000 },
  fid: { good: 100, poor: 300 },
  cls: { good: 0.1, poor: 0.25 },
};

// Function to get the rating class (good, needs-improvement, poor)
const getVitalClass = (vitalName, value) => {
  const { good, poor } = VITAL_THRESHOLDS[vitalName];
  if (value < good) return 'good';
  if (value < poor) return 'needs-improvement';
  return 'poor';
};

// Function to get bar width for the details view chart
const getBarWidthPercentage = (vitalName, value) => {
  // Use 1.5x the 'poor' threshold as a reasonable max for the bar
  const max = VITAL_THRESHOLDS[vitalName].poor * 1.5;
  const percentage = (value / max) * 100;
  return Math.min(percentage, 100); // Cap at 100%
};


// --- React Components ---

const VitalsTable = ({ pages, onRowClick, sortConfig }) => (
  <table className="vitals-table">
    <thead>
      <tr>
        <th>Page Path</th>
        <th>LCP</th>
        <th>FID</th>
        <th>CLS</th>
      </tr>
    </thead>
    <tbody>
      {pages.map((page) => (
        <tr key={page.id} onClick={() => onRowClick(page)}>
          <td>{page.path}</td>
          <td className={getVitalClass('lcp', page.vitals.lcp)}>
            {page.vitals.lcp.toFixed(0)} ms
          </td>
          <td className={getVitalClass('fid', page.vitals.fid)}>
            {page.vitals.fid.toFixed(0)} ms
          </td>
          <td className={getVitalClass('cls', page.vitals.cls)}>
            {page.vitals.cls.toFixed(3)}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

const PageDetails = ({ page }) => (
  <div className="details-view">
    <h2>Details for {page.path}</h2>
    
    {Object.entries(page.vitals).map(([vitalName, value]) => {
      const ratingClass = getVitalClass(vitalName, value);
      const barWidth = getBarWidthPercentage(vitalName, value);
      const unit = vitalName === 'cls' ? '' : ' ms';
      const displayValue = vitalName === 'cls' ? value.toFixed(3) : value.toFixed(0);

      return (
        <div key={vitalName} className="vital-chart-container">
          <div className="vital-label">
            <span>{vitalName.toUpperCase()}</span>
            <span className={`value ${ratingClass}`}>{displayValue}{unit}</span>
          </div>
          <div className="bar-background">
            <div
              className={`bar-value ${ratingClass}`}
              style={{ width: `${barWidth}%` }}
            ></div>
          </div>
        </div>
      );
    })}
  </div>
);

function App() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPage, setSelectedPage] = useState(null);
  const [sortConfig, setSortConfig] = useState(null);

  // Simulate an API call to fetch data
  useEffect(() => {
    setTimeout(() => {
      setPages(mockPageData);
      setLoading(false);
    }, 1500); // 1.5 second delay
  }, []);

  // Memoized sorting logic
  const sortedPages = useMemo(() => {
    let sortablePages = [...pages];
    if (sortConfig !== null) {
      sortablePages.sort((a, b) => {
        const aValue = a.vitals[sortConfig.key];
        const bValue = b.vitals[sortConfig.key];
        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortablePages;
  }, [pages, sortConfig]);

  // Handler for sort button clicks
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleRowClick = (page) => {
    setSelectedPage(page);
  };

  return (
    <div className="dashboard">
      <h1>Web Vitals Dashboard</h1>

      {loading ? (
        <p className="loading">Loading dashboard data...</p>
      ) : (
        <>
          <div className="controls">
            <button 
              onClick={() => requestSort('lcp')}
              className={sortConfig?.key === 'lcp' ? 'active' : ''}
            >
              Sort by LCP
            </button>
            <button 
              onClick={() => requestSort('fid')}
              className={sortConfig?.key === 'fid' ? 'active' : ''}
            >
              Sort by FID
            </button>
            <button 
              onClick={() => requestSort('cls')}
              className={sortConfig?.key === 'cls' ? 'active' : ''}
            >
              Sort by CLS
            </button>
          </div>

          <VitalsTable pages={sortedPages} onRowClick={handleRowClick} sortConfig={sortConfig} />

          {selectedPage && <PageDetails page={selectedPage} />}
        </>
      )}
    </div>
  );
}

export default App;