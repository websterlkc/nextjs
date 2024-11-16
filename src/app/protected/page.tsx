'use client';

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Sidebar } from "../shared/sidebar";

export default function ProtectedPage() {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/not-authorized');
    },
  });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Protected Page</h1>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-700">
              Welcome to the protected area! You have successfully validated your API key.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 