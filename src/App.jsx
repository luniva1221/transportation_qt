import React, { useState } from 'react';
import InputForm from './components/InputForm';
import MatrixInput from './components/MatrixInput';
import ResultTable from './components/ResultTable';
import { solveNorthWestCorner } from './northWestCorner';
import './index.css';

function App() {
  const [step, setStep] = useState(1);
  const [dimensions, setDimensions] = useState({ rows: 0, cols: 0 });
  const [data, setData] = useState({ costs: [], supply: [], demand: [] });
  const [result, setResult] = useState(null);

  // Step 1: Handle dimension submission
  const handleDimensionsSubmit = (r, c) => {
    setDimensions({ rows: r, cols: c });
    setStep(2);
    setResult(null); // Clear previous results
  };

  // Step 2: Handle solve request
  const handleSolve = (costs, supply, demand) => {
    // Save data so we can display it or re-use it
    setData({ costs, supply, demand });
    
    // Call the logic function
    const solution = solveNorthWestCorner(costs, supply, demand);
    setResult(solution);
    setStep(3);
  };

  // Reset to start
  const handleReset = () => {
    setStep(1);
    setDimensions({ rows: 0, cols: 0 });
    setData({ costs: [], supply: [], demand: [] });
    setResult(null);
  };

  return (
    <div className="container">
      <h1>Transportation Problem Solver</h1>
      <p style={{ textAlign: 'center', color: '#666' }}>
        North-West Corner Method
      </p>

      {step === 1 && (
        <InputForm onDimensionsSubmit={handleDimensionsSubmit} />
      )}

      {step === 2 && (
        <MatrixInput 
          rows={dimensions.rows} 
          cols={dimensions.cols} 
          onSolve={handleSolve} 
        />
      )}

      {step === 3 && result && (
        <ResultTable 
          allocation={result.allocation} 
          costs={data.costs} 
          totalCost={result.totalCost} 
          onReset={handleReset} 
        />
      )}
      
      {/* Back button for Step 2 */}
      {step === 2 && (
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <button className="secondary" onClick={() => setStep(1)}>
            Back to Dimensions
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
