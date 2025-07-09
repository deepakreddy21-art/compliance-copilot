import React from 'react';

export function ResultsPage({ codeResult, dbResult, error }: { codeResult: any, dbResult: any, error?: string }) {
  return (
    <div className="max-w-xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-4">PII Detection Results</h2>
      {error && (
        <div className="mb-4 text-red-600 bg-red-100 p-2 rounded">{error}</div>
      )}
      <h3 className="text-lg font-semibold mt-4">Code Scan</h3>
      {codeResult ? (
        <pre className="bg-gray-100 p-2 rounded mb-4 overflow-x-auto text-sm">{JSON.stringify(codeResult, null, 2)}</pre>
      ) : (
        <div className="text-gray-500 mb-4">No code scan results yet.</div>
      )}
      <h3 className="text-lg font-semibold mt-4">DB Scan</h3>
      {dbResult ? (
        <pre className="bg-gray-100 p-2 rounded overflow-x-auto text-sm">{JSON.stringify(dbResult, null, 2)}</pre>
      ) : (
        <div className="text-gray-500">No DB scan results yet.</div>
      )}
    </div>
  );
} 