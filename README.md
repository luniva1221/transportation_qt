# Transportation Problem Solver (North-West Corner Method)

This is a React-only web application that solves the Transportation Problem using the North-West Corner Method (NWCM). It allows users to input the number of sources and destinations, define costs, supply, and demand, and views the calculated allocation and total transportation cost.

## Features

- **No Backend**: Runs entirely in the browser using React.
- **Dynamic Matrix**: Generate cost matrices of any size (Rows x Columns).
- **Interactive UI**: Step-by-step process for entering data.
- **Immediate Results**: Instantly calculates the initial feasible solution and total cost.

## Project Structure

```
src/
├── components/
│   ├── InputForm.jsx      # Step 1: Input for Rows and Columns
│   ├── MatrixInput.jsx    # Step 2: Grid input for Costs, Supply, and Demand
│   └── ResultTable.jsx    # Step 3: Displays the Solution and Total Cost
├── northWestCorner.js     # Logic: Implementation of the NWCM algorithm
├── App.jsx                # Main Component: Manages state and step navigation
├── main.jsx               # Entry point
└── index.css              # Styles
```

## Component Explanation

1.  **InputForm.jsx**:
    -   Collects the dimensions of the transportation problem (Number of Sources/Rows and Destinations/Columns).
    -   Validates that inputs are positive integers.

2.  **MatrixInput.jsx**:
    -   Renders a dynamic table based on the specified dimensions.
    -   Allows the user to input the Unit Cost for each route.
    -   Includes inputs for Supply (Capacity) for each source and Demand (Requirement) for each destination.
    -   Validates data before solving.

3.  **ResultTable.jsx**:
    -   Displays the computed Allocation Matrix.
    -   Highlights allocated cells for better visibility.
    -   Shows the Total Transportation Cost.
    -   Provides a button to reset and start over.

4.  **northWestCorner.js**:
    -   Contains the core algorithm.
    -   `solveNorthWestCorner(costs, supply, demand)`: Iterates through the matrix from the top-left (North-West) corner, allocating the maximum possible quantity based on available supply and demand, moving right or down until all requirements are met.

## How to Run

1.  **Prerequisites**: Ensure you have Node.js installed on your machine.
2.  **Install Dependencies**:
    Open a terminal in the project folder and run:
    ```bash
    npm install
    ```
3.  **Start the Development Server**:
    Run the following command to start the app:
    ```bash
    npm run dev
    ```
4.  **Open in Browser**:
    Click the link provided in the terminal (usually `http://localhost:5173`) to view the application.

## Algorithm Details

The **North-West Corner Method** is a heuristic for finding an initial basic feasible solution to the transportation problem.
1.  Select the top-left cell (North-West corner) of the matrix.
2.  Allocate the maximum feasible quantity (`min(supply, demand)`).
3.  Subtract the allocated quantity from the respective supply and demand.
4.  If the supply for the row is exhausted, move down to the next row.
5.  If the demand for the column is exhausted, move right to the next column.
6.  Repeat until all supply and demand are met.
