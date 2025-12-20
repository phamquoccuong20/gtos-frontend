'use client';

import React from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { ToastMessage } from '../types';

interface ToastNotificationProps {
  isVisible: boolean;
  message: ToastMessage;
  onClose: () => void;
}

/**
 * Toast Notification Component
 * Displays success/info notifications at the top right of the screen
 */
const ToastNotification: React.FC<ToastNotificationProps> = ({
  isVisible,
  message,
  onClose,
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed top-6 right-6 z-[120] animate-in fade-in slide-in-from-top-10 duration-300">
      <div className="bg-white p-[14px] rounded shadow-2xl flex items-center gap-4 border border-gray-100">
        <CheckCircle2 className="text-green-500" size={24} />
        <div>
          <p className="font-bold text-sm text-gray-900">{message.title}</p>
          <p className="text-xs text-gray-500 font-medium">{message.detail}</p>
        </div>
        <button 
          onClick={onClose}
          className="ml-4 text-gray-300 hover:text-gray-500 transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default ToastNotification;
