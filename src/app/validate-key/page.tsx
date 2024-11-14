'use client';

import { useState } from 'react';
import { showNotification } from "../shared/notification";

import { useRouter } from 'next/navigation';

export default function ValidateKey() {
  const router = useRouter();
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [validationResult, setValidationResult] = useState<{
    valid?: boolean;
    usage?: number;
    limit?: number;
  } | null>(null);

  const handleValidate = async () => {
    if (!apiKey.trim()) {
      showNotification({
        message: 'Please enter an API key',
        type: 'error'
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/api-keys/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Validation failed');
      }

      setValidationResult(data);
      showNotification({
        message: data.message,
        type: data.valid ? 'success' : 'error'
      });
      
      if (data.valid) {
        router.push('/protected');
      }
    } catch {
      showNotification({
        message: 'Failed to validate API key',
        type: 'error'
      });
      setValidationResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Validate API Key</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Enter your API key
            </label>
            <input
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your API key here..."
            />
          </div>
          
          <button
            onClick={handleValidate}
            disabled={isLoading}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {isLoading ? 'Validating...' : 'Validate Key'}
          </button>

          {validationResult && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">Validation Result</h2>
              <div className="bg-gray-50 p-4 rounded">
                <p className="mb-2">
                  Status: {' '}
                  <span className={validationResult.valid ? 'text-green-500' : 'text-red-500'}>
                    {validationResult.valid ? 'Valid' : 'Invalid'}
                  </span>
                </p>
                {validationResult.valid && (
                  <>
                    <p className="mb-2">
                      Usage: {validationResult.usage} / {validationResult.limit}
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ 
                          width: `${(validationResult.usage! / validationResult.limit!) * 100}%`
                        }}
                      ></div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 