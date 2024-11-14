'use client';

export default function ProtectedPage() {
  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Protected Page</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-700">
            Welcome to the protected area! You have successfully validated your API key.
          </p>
        </div>
      </div>
    </div>
  );
} 