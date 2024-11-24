'use client';

import { useState } from 'react';
import { KeyController } from '../controllers/keyController';
import { useRouter } from 'next/navigation';
import { Sidebar } from '../shared/sidebar';

export default function ValidateKey() {
  const [apiKey, setApiKey] = useState('');
  const [validationResult, setValidationResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleValidate = async () => {
    try {
      setError(null);
      const result = await KeyController.validateKey(apiKey);
      setValidationResult(result);
      
      // If key is valid, navigate to protected page after a short delay
      if (result.valid) {
        setTimeout(() => {
          router.push('/protected');
        }, 1500); // 1.5 second delay to show success message
      }
    } catch (err) {
      setError('Failed to validate API key');
      setValidationResult(null);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6">Validate API Key</h1>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Enter your API key
            </label>
            <input
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter API key"
            />
          </div>

          <button
            onClick={handleValidate}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Validate Key
          </button>

          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          {validationResult && (
            <div className={`mt-4 p-3 rounded ${
              validationResult.valid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              <p>{validationResult.message}</p>
              {validationResult.valid && (
                <>
                  {validationResult.limit && (
                    <p className="mt-2">
                      Usage: {validationResult.usage} / {validationResult.limit}
                    </p>
                  )}
                  <p className="mt-2 text-sm">
                    Redirecting to protected page...
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 