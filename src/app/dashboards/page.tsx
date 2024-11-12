"use client";

import { useState, useEffect } from 'react';
import { supabase } from '../connection/supabaseClient';

export default function Dashboard() {
  const [apiKeys, setApiKeys] = useState<{ id: number; name: string; usage: number; key: string }[]>([]);
  const [editingKey, setEditingKey] = useState<number | null>(null);
  const [viewingKey, setViewingKey] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<{ name: string; usage: number; key: string }>({
    name: '',
    usage: 0,
    key: '',
  });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchApiKeys();
  }, []);

  async function fetchApiKeys() {
    try {
      const { data, error } = await supabase.from('api_keys').select('*');
      // if (error) {
      //   console.error('Error Fetching API key:', error);
      // } else {
        console.log('Fetched API keys:', data);
        setApiKeys(data || []);
      // }
    } catch (error) {
      console.error('Error fetching API keys:', error);
    }
  };

  const generateRandomKey = () => {
    return Array.from({ length: 16 }, () => Math.random().toString(36).charAt(2)).join('');
  };

  const handleCreate = async () => {
    const newKey = generateRandomKey();
    const { data, error } = await supabase.from('api_keys').insert([{ name: editValues.name, usage: editValues.usage, key: newKey }]);

    if (!error) {
      fetchApiKeys();
      setIsModalOpen(false);
      setEditValues({ name: '', usage: 0, key: '' });
    }
  };

  const handleDelete = async (id: number) => {
    const { error } = await supabase.from('api_keys').delete().eq('id', id);
    if (error) console.error('Error deleting API key:', error);
    else setApiKeys(apiKeys.filter(k => k.id !== id));
  };

  const handleEdit = (id: number) => {
    setEditingKey(id);
    const keyToEdit = apiKeys.find(k => k.id === id);
    if (keyToEdit) {
      setEditValues({ name: keyToEdit.name, usage: keyToEdit.usage, key: keyToEdit.key });
    }
  };

  const handleUpdate = async () => {
    const { error } = await supabase.from('api_keys').update(editValues).eq('id', editingKey);
    if (error) console.error('Error updating API key:', error);
    else {
      setApiKeys(apiKeys.map(k => (k.id === editingKey ? { ...k, ...editValues } : k)));
      setEditingKey(null);
      setEditValues({ name: '', usage: 0, key: '' });
    }
  };

  const handleView = (id: number) => {
    setViewingKey(viewingKey === id ? null : id);
  };

  return (
    <div className="p-8">
      <div className="bg-gradient-to-r from-purple-400 to-blue-500 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-white text-lg font-bold">CURRENT PLAN</h2>
        <h1 className="text-white text-3xl font-bold">Researcher</h1>
        <p className="text-white mt-2">API Limit</p>
        <div className="bg-white h-2 rounded-full mt-1">
          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '0%' }}></div>
        </div>
        <p className="text-white mt-2">0 / 1,000 Requests</p>
        <button className="mt-4 px-4 py-2 bg-white text-blue-500 rounded">Manage Plan</button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">API Keys</h2>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => setIsModalOpen(true)}
          >
            + Create Key
          </button>
        </div>
        <p className="mb-4">The key is used to authenticate your requests to the Research API. To learn more, see the documentation page.</p>
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
                      <button className="text-yellow-500" onClick={() => handleEdit(keyObj.id)}>✏️</button>
                      <button className="text-blue-500" onClick={() => handleView(keyObj.id)}>
                        {viewingKey === keyObj.id ? '🙈' : '👁️'}
                      </button>
                    </>
                  )}
                  <button className="text-red-500" onClick={() => handleDelete(keyObj.id)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Create New API Key</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Key Name</label>
              <input
                type="text"
                value={editValues.name}
                onChange={(e) => setEditValues({ ...editValues, name: e.target.value })}
                className="w-full p-2 border rounded"
                placeholder="Enter key name"
              />
            </div>
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={editValues.usage > 0}
                  onChange={(e) => setEditValues({ ...editValues, usage: editValues.usage > 0 ? 0 : 1000 })}
                  className="mr-2"
                />
                <span>Limit Usage</span>
              </label>
              {editValues.usage > 0 && (
                <input
                  type="number"
                  value={editValues.usage}
                  onChange={(e) => setEditValues({ ...editValues, usage: Number(e.target.value) })}
                  className="w-full p-2 border rounded mt-2"
                />
              )}
            </div>
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-200 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={handleCreate}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}