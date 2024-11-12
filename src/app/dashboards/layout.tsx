"use client";

import { Sidebar } from "../shared/sidebar";
import { useState } from "react";

export default function DashboardsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100">
      <div className={`transition-all duration-300 overflow-hidden ${isSidebarOpen ? 'w-64' : 'w-0'}`}>
        <Sidebar />
      </div>
      <main className="flex-1 overflow-y-auto">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="m-4 p-2 rounded-md bg-gray-200 hover:bg-gray-300"
        >
          {isSidebarOpen ? '←' : '→'}
        </button>
        {children}
      </main>
    </div>
  );
} 