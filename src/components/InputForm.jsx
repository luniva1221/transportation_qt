import React, { useState } from 'react';

/**
 * Component to accept the dimensions of the transportation matrix.
 * @param {function} onDimensionsSubmit - Callback to pass rows and cols to parent.
 */
const InputForm = ({ onDimensionsSubmit }) => {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rows > 0 && cols > 0) {
      onDimensionsSubmit(parseInt(rows), parseInt(cols));
    } else {
      alert("Rows and Columns must be greater than 0");
    }
  };

  return (
    <div className="section">
      <h2>Step 1: Set Dimensions</h2>
      <form onSubmit={handleSubmit} className="input-group">
        <div>
          <label htmlFor="rows">Rows (Sources): </label>
          <input
            type="number"
            id="rows"
            min="1"
            value={rows}
            onChange={(e) => setRows(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="cols">Columns (Destinations): </label>
          <input
            type="number"
            id="cols"
            min="1"
            value={cols}
            onChange={(e) => setCols(e.target.value)}
          />
        </div>
        <button type="submit">Generate Matrix</button>
      </form>
    </div>
  );
};

export default InputForm;
