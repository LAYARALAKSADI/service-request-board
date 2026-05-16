'use client';
import { useEffect } from 'react';

export default function AlertMessage({ message, type, onClose }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);
  
  if (!message) return null;
  
  const colors = {
    success: 'bg-green-100 border-green-400 text-green-700',
    error: 'bg-red-100 border-red-400 text-red-700',
    warning: 'bg-yellow-100 border-yellow-400 text-yellow-700',
    info: 'bg-blue-100 border-blue-400 text-blue-700'
  };
  
  return (
    <div className={`${colors[type] || colors.info} border-l-4 p-4 mb-4 rounded`} role="alert">
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          ×
        </button>
      </div>
    </div>
  );
}