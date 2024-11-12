"use client";

import { toast, Toaster } from "sonner";

interface NotificationProps {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

export function showNotification({ message, type }: NotificationProps) {
  const styles = {
    success: {
      background: '#22c55e', // green-500
      color: 'white',
      border: 'none',
    },
    error: {
      background: '#ef4444', // red-500
      color: 'white',
      border: 'none',
    },
    warning: {
      background: '#f59e0b', // yellow-500
      color: 'white',
      border: 'none',
    },
    info: {
      background: '#3b82f6', // blue-500
      color: 'white',
      border: 'none',
    },
  };

  toast[type](message, {
    style: styles[type],
    duration: 3000,
  });
}

export function NotificationToaster() {
  return <Toaster position="top-right" />;
}