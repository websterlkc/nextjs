"use client";

import { useState } from 'react';
import { showNotification } from "../notification";
import { type ApiKey } from '../types';

interface ApiKeysTableProps {
  apiKeys: ApiKey[];
  onEdit: (id: number, values: Partial<ApiKey>) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export function ApiKeysTable({ apiKeys, onEdit, onDelete }: ApiKeysTableProps) {
  const [editingKey, setEditingKey] = useState<number | null>(null);
  const [viewingKey, setViewingKey] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<Partial<ApiKey>>({
    name: '',
    usage: 0,
  });

  const handleEdit = (id: number) => {
    setEditingKey(id);
    const keyToEdit = apiKeys.find(k => k.id === id);
    if (keyToEdit) {
      setEditValues({ name: keyToEdit.name, usage: keyToEdit.usage });
    }
  };

  const handleUpdate = async () => {
    if (!editingKey) return;
    
    try {
      await onEdit(editingKey, editValues);
      setEditingKey(null);
      setEditValues({ name: '', usage: 0 });
    } catch {
      showNotification({
        message: 'Failed to update API key',
        type: 'error'
      });
    }
  };

  const handleCopyToClipboard = async (key: string) => {
    try {
      await navigator.clipboard.writeText(key);
      showNotification({
        message: 'API key copied to clipboard',
        type: 'success'
      });
    } catch {
      showNotification({
        message: 'Failed to copy API key',
        type: 'error'
      });
    }
  };

  return (
    <table className="w-full text-left">
      <thead>
        <tr>
          <th className="pb-2 w-1/4">NAME</th>
          <th className="pb-2 w-1/4">USAGE</th>
          <th className="pb-2 w-1/4">KEY</th>
          <th className="pb-2 w-1/4">OPTIONS</th>
        </tr>
      </thead>
      <tbody>
        {apiKeys.map((keyObj) => (
          <tr key={keyObj.id} className="border-t">
            <td className="py-2 w-1/4">
              {editingKey === keyObj.id ? (
                <input
                  type="text"
                  value={editValues.name}
                  onChange={(e) => setEditValues({ ...editValues, name: e.target.value })}
                  className="bg-transparent border-none w-full"
                />
              ) : (
                keyObj.name
              )}
            </td>
            <td className="py-2 w-1/4">
              {editingKey === keyObj.id ? (
                <input
                  type="number"
                  value={editValues.usage}
                  onChange={(e) => setEditValues({ ...editValues, usage: Number(e.target.value) })}
                  className="bg-transparent border-none w-full"
                />
              ) : (
                keyObj.usage
              )}
            </td>
            <td className="py-2 w-1/4">
              {viewingKey === keyObj.id ? keyObj.key : '****************'}
            </td>
            <td className="py-2 w-1/4 flex space-x-2">
              {editingKey === keyObj.id ? (
                <button className="text-green-500" onClick={handleUpdate}>✔️</button>
              ) : (
                <>
                  <button className="text-yellow-500" onClick={() => handleEdit(keyObj.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                  </button>
                  <button 
                    className="text-blue-500" 
                    onClick={() => setViewingKey(viewingKey === keyObj.id ? null : keyObj.id)}
                  >
                    {viewingKey === keyObj.id ? '🙈' : '👁️'}
                  </button>
                  <button 
                    className="text-gray-500" 
                    onClick={() => handleCopyToClipboard(keyObj.key)}
                    title="Copy to clipboard"
                  >
                    📋
                  </button>
                </>
              )}
              <button 
                className="text-red-500" 
                onClick={() => onDelete(keyObj.id)}
              >
                🗑️
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
} 