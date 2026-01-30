import React, { useState, useEffect } from 'react';

/**
 * Component to input costs, supply, and demand values.
 * @param {number} rows - Number of sources.
 * @param {number} cols - Number of destinations.
 * @param {function} onSolve - Callback to trigger the solution with data.
 */
const MatrixInput = ({ rows, cols, onSolve }) => {
  // State for the cost matrix
  const [costs, setCosts] = useState([]);
  // State for supply (one per row)
  const [supply, setSupply] = useState([]);
  // State for demand (one per column)
  const [demand, setDemand] = useState([]);

  // Initialize/Reset state when rows or cols change
  useEffect(() => {
    // Create a rows x cols matrix filled with 0
    const newCosts = Array(rows).fill().map(() => Array(cols).fill(0));
    setCosts(newCosts);
    
    // Create supply array filled with 0
    setSupply(Array(rows).fill(0));
    
    // Create demand array filled with 0
    setDemand(Array(cols).fill(0));
  }, [rows, cols]);

  const handleCostChange = (r, c, value) => {
    const newCosts = [...costs];
    newCosts[r] = [...newCosts[r]]; // Copy the row
    newCosts[r][c] = parseInt(value) || 0;
    setCosts(newCosts);
  };

  const handleSupplyChange = (r, value) => {
    const newSupply = [...supply];
    newSupply[r] = parseInt(value) || 0;
    setSupply(newSupply);
  };

  const handleDemandChange = (c, value) => {
    const newDemand = [...demand];
    newDemand[c] = parseInt(value) || 0;
    setDemand(newDemand);
  };

  const handleSolve = () => {
    // Validate inputs if needed (e.g., negative numbers)
    // Check if total supply equals total demand (optional but good for UX)
    const totalSupply = supply.reduce((a, b) => a + b, 0);
    const totalDemand = demand.reduce((a, b) => a + b, 0);

    if (totalSupply !== totalDemand) {
        alert(`Warning: Total Supply (${totalSupply}) does not equal Total Demand (${totalDemand}). The problem is unbalanced.`);
        // We still proceed as per requirements, or we could stop.
        // The NWCM implementation I wrote handles it (stops when either is exhausted).
    }

    onSolve(costs, supply, demand);
  };

  if (costs.length === 0) return null;

  return (
    <div className="section">
      <h2>Step 2: Enter Data</h2>
      <p>Enter transportation costs in the grid, Supply on the right, and Demand at the bottom.</p>
      
      <div className="matrix-container">
        <table>
          <thead>
            <tr>
              <th>Source / Dest</th>
              {Array.from({ length: cols }).map((_, c) => (
                <th key={c}>D{c + 1}</th>
              ))}
              <th>Supply</th>
            </tr>
          </thead>
          <tbody>
            {costs.map((row, r) => (
              <tr key={r}>
                <th>S{r + 1}</th>
                {row.map((cost, c) => (
                  <td key={c}>
                    <input
                      type="number"
                      className="cell-input"
                      value={cost}
                      onChange={(e) => handleCostChange(r, c, e.target.value)}
                      min="0"
                    />
                  </td>
                ))}
                <td>
                  <input
                    type="number"
                    className="cell-input"
                    value={supply[r]}
                    onChange={(e) => handleSupplyChange(r, e.target.value)}
                    min="0"
                  />
                </td>
              </tr>
            ))}
            <tr>
              <th>Demand</th>
              {demand.map((d, c) => (
                <td key={c}>
                  <input
                    type="number"
                    className="cell-input"
                    value={d}
                    onChange={(e) => handleDemandChange(c, e.target.value)}
                    min="0"
                  />
                </td>
              ))}
              <td>
                 Total: {supply.reduce((a, b) => a + b, 0)} / {demand.reduce((a, b) => a + b, 0)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div style={{ marginTop: '1rem', textAlign: 'center' }}>
        <button onClick={handleSolve}>Solve Problem</button>
      </div>
    </div>
  );
};

export default MatrixInput;
