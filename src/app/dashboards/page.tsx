"use client";

import { useState, useEffect } from 'react';
import { showNotification } from "../shared/notification";
import { ApiKeysTable } from "../shared/components/api-keys-table";
import { type ApiKey } from "../shared/types";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { KeyController } from "../controllers/keyController";

export default function Dashboard() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newKeyValues, setNewKeyValues] = useState({
    name: '',
    usage: 0,
  });
  
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/');
    },
  });

  useEffect(() => {
    fetchApiKeys();
  }, []);

  async function fetchApiKeys() {
    try {
      const data = await KeyController.getAllKeys();
      setApiKeys(data);
    } catch (_error) {
      showNotification({
        message: 'Failed to fetch API keys',
        type: 'error'
      });
    }
  }

  const handleCreate = async () => {
    try {
      const request = new Request('/api/keys', {
        method: 'POST',
        body: JSON.stringify(newKeyValues)
      });
      
      await KeyController.createKey(request);
      await fetchApiKeys();
      setIsModalOpen(false);
      setNewKeyValues({ name: '', usage: 0 });
      showNotification({
        message: 'API key created successfully',
        type: 'success'
      });
    } catch {
      showNotification({
        message: 'Failed to create API key',
        type: 'error'
      });
    }
  };

  const handleEdit = async (id: number, values: Partial<ApiKey>) => {
    try {
      await KeyController.updateKey(id.toString(), values);
      setApiKeys(apiKeys.map(k => (k.id === id ? { ...k, ...values } : k)));
      showNotification({
        message: 'API key updated successfully',
        type: 'success'
      });
    } catch (_error) {
      showNotification({
        message: 'Failed to update API key',
        type: 'error'
      });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await KeyController.deleteKey(id.toString());
      setApiKeys(apiKeys.filter(k => k.id !== id));
      showNotification({
        message: 'API key deleted successfully',
        type: 'info'
      });
    } catch {
      showNotification({
        message: 'Failed to delete API key',
        type: 'error'
      });
    }
  };
  
  if (status === "loading") {
    return <div>Loading...</div>;
  }

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
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => setIsModalOpen(true)}
          >
            + Create Key
          </button>
        </div>
        
        <p className="mb-4">
          The key is used to authenticate your requests to the Research API. 
          To learn more, see the documentation page.
        </p>

        <ApiKeysTable 
          apiKeys={apiKeys}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Create Key Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Create New API Key</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Key Name</label>
              <input
                type="text"
                value={newKeyValues.name}
                onChange={(e) => setNewKeyValues({ ...newKeyValues, name: e.target.value })}
                className="w-full p-2 border rounded"
                placeholder="Enter key name"
              />
            </div>
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={newKeyValues.usage > 0}
                  onChange={() => setNewKeyValues({ 
                    ...newKeyValues, 
                    usage: newKeyValues.usage > 0 ? 0 : 1000 
                  })}
                  className="mr-2"
                />
                <span>Limit Usage</span>
              </label>
              {newKeyValues.usage > 0 && (
                <input
                  type="number"
                  value={newKeyValues.usage}
                  onChange={(e) => setNewKeyValues({ 
                    ...newKeyValues, 
                    usage: Number(e.target.value) 
                  })}
                  className="w-full p-2 border rounded mt-2"
                />
              )}
            </div>
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => {
                  setIsModalOpen(false);
                  setNewKeyValues({ name: '', usage: 0 });
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
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