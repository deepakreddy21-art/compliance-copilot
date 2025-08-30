import React, { useState, useEffect } from 'react';

const mockChecklist = [
  { item: 'Data encrypted at rest', status: 'pass' },
  { item: 'Access logs enabled', status: 'fail' },
  { item: 'User consent for PII', status: 'pass' }
];

interface ChecklistPageProps {
  checklist?: any[];
  onChecklistUpdate?: (checklist: any[]) => void;
  error?: string;
}

export function ChecklistPage({ checklist = mockChecklist, onChecklistUpdate, error }: ChecklistPageProps) {
  const [items, setItems] = useState(checklist);

  const toggleStatus = (idx: number) => {
    setItems(items => items.map((item, i) => i === idx ? { ...item, status: item.status === 'pass' ? 'fail' : 'pass' } : item));
  };

  useEffect(() => {
    if (onChecklistUpdate) {
      onChecklistUpdate(items);
    }
  }, [items, onChecklistUpdate]);

  return (
    <div className="max-w-xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-4">Compliance Checklist</h2>
      {error && (
        <div className="mb-4 text-red-600 bg-red-100 p-2 rounded">{error}</div>
      )}
      <ul>
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center mb-2">
            <span className="flex-1">{item.item}</span>
            <button
              className={`px-3 py-1 rounded ${item.status === 'pass' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
              onClick={() => toggleStatus(idx)}
            >
              {item.status}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
} 