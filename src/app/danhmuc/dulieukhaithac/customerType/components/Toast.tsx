'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, AlertTriangle, Info } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onClose: (id: string) => void;
}

export default function Toast({ toasts, onClose }: ToastProps) {
  return (
    <div className="fixed top-24 right-6 z-[2000] flex flex-col gap-3 max-w-sm w-full">
      <AnimatePresence>
        {toasts.map((toast) => {
          let bgColor = 'bg-slate-900 text-white';
          let borderColor = 'border-slate-800';
          let Icon = Info;

          if (toast.type === 'success') {
            bgColor = 'bg-emerald-50 text-emerald-900 border-emerald-200';
            borderColor = 'border-emerald-200';
            Icon = CheckCircle;
          } else if (toast.type === 'error') {
            bgColor = 'bg-rose-50 text-rose-900 border-rose-200';
            borderColor = 'border-rose-200';
            Icon = AlertTriangle;
          } else if (toast.type === 'warning') {
            bgColor = 'bg-amber-50 text-amber-900 border-amber-200';
            borderColor = 'border-amber-200';
            Icon = AlertTriangle;
          }

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
              className={`flex items-start gap-3 border ${bgColor} shadow-lg pointer-events-auto smooth-all`}
              style={{
                borderRadius: '4px', // STRICT RULE
                padding: '14px',    // STRICT RULE
              }}
            >
              <div className="shrink-0 mt-0.5">
                {toast.type === 'success' && <Icon className="w-5 h-5 text-emerald-600" />}
                {toast.type === 'error' && <Icon className="w-5 h-5 text-rose-600" />}
                {toast.type === 'warning' && <Icon className="w-5 h-5 text-amber-600" />}
                {toast.type === 'info' && <Icon className="w-5 h-5 text-blue-600" />}
              </div>
              <div className="flex-1 text-sm font-medium leading-relaxed">
                {toast.message}
              </div>
              <button
                id={`btn-close-toast-${toast.id}`}
                onClick={() => onClose(toast.id)}
                className="shrink-0 text-slate-400 hover:text-slate-600 smooth-all self-start"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
