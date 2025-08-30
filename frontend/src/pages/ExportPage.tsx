import React from 'react';

export function ExportPage({ report, error }: { report: any, error?: string }) {
  const handleExportMarkdown = () => {
    const md = `# Compliance Report\n\n${report?.checklist?.map((item: any) => `- [${item.status === 'pass' ? 'x' : ' '}] ${item.item}`).join('\n')}`;
    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'compliance-report.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-4">Export Compliance Report</h2>
      {error && (
        <div className="mb-4 text-red-600 bg-red-100 p-2 rounded">{error}</div>
      )}
      <button
        className="bg-purple-600 text-white px-4 py-2 rounded"
        onClick={handleExportMarkdown}
        disabled={!report}
      >
        Export as Markdown
      </button>
      <pre className="bg-gray-100 p-4 rounded mt-4 overflow-x-auto text-sm">{JSON.stringify(report, null, 2)}</pre>
    </div>
  );
} 