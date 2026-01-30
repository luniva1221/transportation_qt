import React from 'react';

/**
 * Component to display the results.
 * @param {number[][]} allocation - The resulting allocation matrix.
 * @param {number[][]} costs - The original cost matrix.
 * @param {number} totalCost - The calculated total transportation cost.
 * @param {function} onReset - Callback to reset the application.
 */
const ResultTable = ({ allocation, costs, totalCost, onReset }) => {
  if (!allocation || !costs) return null;

  const cols = allocation[0].length;

  return (
    <div className="section">
      <h2>Step 3: Solution</h2>
      
      <div className="result-box">
        Total Transportation Cost: {totalCost}
      </div>

      <h3>Allocation Table</h3>
      <p>Cells highlighted in green indicate allocated quantities.</p>
      
      <div className="matrix-container">
        <table>
          <thead>
            <tr>
              <th>Source / Dest</th>
              {Array.from({ length: cols }).map((_, c) => (
                <th key={c}>D{c + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allocation.map((row, r) => (
              <tr key={r}>
                <th>S{r + 1}</th>
                {row.map((qty, c) => (
                  <td key={c} className={qty > 0 ? "allocated" : ""}>
                    {qty > 0 ? (
                      <div>
                        <div className="allocation-value">{qty}</div>
                        <div className="cost-value">(@ {costs[r][c]})</div>
                      </div>
                    ) : (
                      "-"
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <button className="secondary" onClick={onReset}>Start Over</button>
      </div>
    </div>
  );
};

export default ResultTable;
