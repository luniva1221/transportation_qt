/**
 * Solves the Transportation Problem using the North-West Corner Method.
 * 
 * @param {number[][]} costs - The cost matrix where costs[i][j] is the cost from source i to destination j.
 * @param {number[]} supply - Array containing supply for each source.
 * @param {number[]} demand - Array containing demand for each destination.
 * @returns {Object} Result object containing allocation matrix and total cost.
 */
export function solveNorthWestCorner(costs, supply, demand) {
  // Create deep copies to avoid modifying original arrays
  let currentSupply = [...supply];
  let currentDemand = [...demand];
  const rows = currentSupply.length;
  const cols = currentDemand.length;
  
  // Initialize allocation matrix with zeros
  let allocation = Array(rows).fill().map(() => Array(cols).fill(0));
  
  let i = 0; // Row index
  let j = 0; // Column index
  
  // Loop until we reach the end of rows or columns
  while (i < rows && j < cols) {
    // Determine the amount to allocate (minimum of available supply and required demand)
    const amount = Math.min(currentSupply[i], currentDemand[j]);
    
    // Allocate the amount
    allocation[i][j] = amount;
    
    // Update supply and demand
    currentSupply[i] -= amount;
    currentDemand[j] -= amount;
    
    // If supply for current row is exhausted, move to next row
    // If demand for current column is exhausted, move to next column
    // Note: If both are exhausted simultaneously, we technically move diagonally,
    // but in implementation we can check supply first.
    
    if (currentSupply[i] === 0 && currentDemand[j] === 0) {
        // Degeneracy case, but for NWCM path traversal:
        // We exhaust both. Move diagonally to avoid double stepping?
        // Actually, in NWCM, we just need to proceed.
        // Usually we cross out both.
        i++;
        j++;
    } else if (currentSupply[i] === 0) {
      i++;
    } else {
      j++;
    }
  }
  
  // Calculate total transportation cost
  let totalCost = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (allocation[r][c] > 0) {
        totalCost += allocation[r][c] * costs[r][c];
      }
    }
  }
  
  return {
    allocation,
    totalCost
  };
}

/**
 * Checks if the problem is balanced (Total Supply = Total Demand).
 */
export function isBalanced(supply, demand) {
    const totalSupply = supply.reduce((a, b) => a + b, 0);
    const totalDemand = demand.reduce((a, b) => a + b, 0);
    return totalSupply === totalDemand;
}
