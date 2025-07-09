import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Auth } from './components/Auth';
import { ScanPage } from './pages/ScanPage';
import { ResultsPage } from './pages/ResultsPage';
import { ChecklistPage } from './pages/ChecklistPage';
import { ExportPage } from './pages/ExportPage';

function App() {
  const [codeResult, setCodeResult] = useState<any>(null);
  const [dbResult, setDbResult] = useState<any>(null);
  const [report, setReport] = useState<any>(null);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-sm p-4">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">Compliance Copilot</h1>
            <div className="flex space-x-4">
              <Link to="/" className="text-blue-600 hover:text-blue-800">Scan</Link>
              <Link to="/results" className="text-blue-600 hover:text-blue-800">Results</Link>
              <Link to="/checklist" className="text-blue-600 hover:text-blue-800">Checklist</Link>
              <Link to="/export" className="text-blue-600 hover:text-blue-800">Export</Link>
              <Auth />
            </div>
          </div>
        </nav>

        <main className="max-w-6xl mx-auto py-8">
          <Routes>
            <Route path="/" element={<ScanPage onScanComplete={(result) => setCodeResult(result)} />} />
            <Route path="/results" element={<ResultsPage codeResult={codeResult} dbResult={dbResult} />} />
            <Route path="/checklist" element={<ChecklistPage onChecklistUpdate={(checklist) => setReport({ checklist })} />} />
            <Route path="/export" element={<ExportPage report={report} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App; 