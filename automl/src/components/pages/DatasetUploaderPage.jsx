import React, { useState, useEffect } from "react";
import "../styles/DatasetUploadePage.css";

const DatasetUploaderPage = () => {
  const [columns, setColumns] = useState([]);
  const [dependentVariables, setDependentVariables] = useState([]);
  const [independentVariables, setIndependentVariables] = useState([]);
  const [irrelevantColumns, setIrrelevantColumns] = useState([]);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

  useEffect(() => {
    // Enable submit button when all columns have been moved
    const totalMoved = dependentVariables.length + independentVariables.length + irrelevantColumns.length;
    setIsSubmitEnabled(columns.length === 0 && totalMoved > 0);
  }, [columns, dependentVariables, independentVariables, irrelevantColumns]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = ({ target }) => {
      const text = target.result;
      const rows = text.split("\n");
      const headers = rows[0].split(",").map((col) => col.trim());
      setColumns(headers.sort());
      setDependentVariables([]);
      setIndependentVariables([]);
      setIrrelevantColumns([]);
      setFileUploaded(true);
    };
    reader.readAsText(file);
  };

  const handleDragStart = (event, column, source) => {
    event.dataTransfer.setData("column", column);
    event.dataTransfer.setData("source", source);
  };

  const handleDrop = (event, setTargetCategory, targetCategory) => {
    event.preventDefault();
    const column = event.dataTransfer.getData("column");
    const source = event.dataTransfer.getData("source");

    if (source === targetCategory) return;

    const removeColumn = (setStateFunction, stateArray) => {
      setStateFunction(stateArray.filter((col) => col !== column));
    };

    if (source === "columns") removeColumn(setColumns, columns);
    if (source === "dependent") removeColumn(setDependentVariables, dependentVariables);
    if (source === "independent") removeColumn(setIndependentVariables, independentVariables);
    if (source === "irrelevant") removeColumn(setIrrelevantColumns, irrelevantColumns);

    const addColumnSorted = (setStateFunction, stateArray) => {
      setStateFunction([...stateArray, column].sort());
    };

    if (targetCategory === "columns") addColumnSorted(setColumns, columns);
    if (targetCategory === "dependent") addColumnSorted(setDependentVariables, dependentVariables);
    if (targetCategory === "independent") addColumnSorted(setIndependentVariables, independentVariables);
    if (targetCategory === "irrelevant") addColumnSorted(setIrrelevantColumns, irrelevantColumns);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleReset = () => {
    setColumns((prev) =>
      [...prev, ...dependentVariables, ...independentVariables, ...irrelevantColumns].sort()
    );
    setDependentVariables([]);
    setIndependentVariables([]);
    setIrrelevantColumns([]);
  };

  const handleSubmit = () => {
    alert("Submission Successful!");
  };

  return (
    <div className="container">
      <div className="file-upload-box">
      <label htmlFor="fileInput" className="upload-btn">Upload CSV File</label>
      <input type="file" id="fileInput" onChange={handleFileUpload} />
      </div>

      {fileUploaded && (
        <>
          <div className="parallel-boxes">
            <div
              className="column-list"
              onDrop={(e) => handleDrop(e, setColumns, "columns")}
              onDragOver={handleDragOver}
            >
              <h3>Columns</h3>
              <ul>
                {columns.map((col, index) => (
                  <li
                    key={index}
                    draggable
                    onDragStart={(e) => handleDragStart(e, col, "columns")}
                  >
                    {col}
                  </li>
                ))}
              </ul>
            </div>

            <div className="drop-boxes">
              <div
                className="drop-box"
                onDrop={(e) => handleDrop(e, setDependentVariables, "dependent")}
                onDragOver={handleDragOver}
              >
                <h3>Dependent Variables</h3>
                <ul>
                  {dependentVariables.map((col, index) => (
                    <li
                      key={index}
                      draggable
                      onDragStart={(e) => handleDragStart(e, col, "dependent")}
                    >
                      {col}
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="drop-box"
                onDrop={(e) => handleDrop(e, setIndependentVariables, "independent")}
                onDragOver={handleDragOver}
              >
                <h3>Independent Variables</h3>
                <ul>
                  {independentVariables.map((col, index) => (
                    <li
                      key={index}
                      draggable
                      onDragStart={(e) => handleDragStart(e, col, "independent")}
                    >
                      {col}
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="drop-box"
                onDrop={(e) => handleDrop(e, setIrrelevantColumns, "irrelevant")}
                onDragOver={handleDragOver}
              >
                <h3>Irrelevant Columns</h3>
                <ul>
                  {irrelevantColumns.map((col, index) => (
                    <li
                      key={index}
                      draggable
                      onDragStart={(e) => handleDragStart(e, col, "irrelevant")}
                    >
                      {col}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="button-container">
            <button className="reset-button" onClick={handleReset}>Reset</button>
            <button className="submit-button" onClick={handleSubmit} disabled={!isSubmitEnabled}>
              Submit
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default DatasetUploaderPage;
