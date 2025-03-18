import React from "react";
import DatasetUploader from "./components/pages/DatasetUploaderPage";


function App() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Upload Dataset</h1>
      <DatasetUploader />
    </div>
  );
}

export default App;
