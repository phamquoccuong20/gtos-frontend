'use client';

import React from 'react';
import { motion } from 'motion/react';
import { History, Clock, Trash2 } from 'lucide-react';
import { ActivityLog } from '../types';

interface HistoryLogProps {
  logs: ActivityLog[];
  onClearLogs: () => void;
}

export default function HistoryLog({ logs, onClearLogs }: HistoryLogProps) {
  return (
    <div 
      className="bg-white border border-slate-200 shadow-xs flex flex-col gap-3"
      style={{
        borderRadius: '4px', // STRICT RULE
        padding: '14px',    // STRICT RULE
      }}
    >
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-blue-600" />
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Lịch sử Thao tác (Realtime)</h3>
        </div>
        
        {logs.length > 0 && (
          <button
            id="btn-clear-logs"
            onClick={onClearLogs}
            className="text-[10px] text-slate-400 hover:text-rose-600 font-semibold uppercase tracking-wider flex items-center gap-1 cursor-pointer smooth-all"
          >
            <Trash2 className="w-3 h-3" />
            Xóa lịch sử
          </button>
        )}
      </div>

      <div className="max-h-[140px] overflow-y-auto flex flex-col gap-2 pr-1">
        {logs.length === 0 ? (
          <div className="text-center py-6 text-slate-400 text-xs italic flex items-center justify-center gap-1.5 select-none">
            <Clock className="w-3.5 h-3.5 text-slate-300" />
            Hệ thống trống, chưa ghi nhận thao tác của bạn trong phiên này.
          </div>
        ) : (
          [...logs].reverse().map((log) => {
            let badgeColor = 'bg-slate-100 text-slate-700';
            if (log.action === 'ADD') badgeColor = 'bg-emerald-100 text-emerald-800';
            if (log.action === 'DELETE') badgeColor = 'bg-rose-100 text-rose-800';
            if (log.action === 'SAVE') badgeColor = 'bg-blue-100 text-blue-800';
            if (log.action === 'RESET') badgeColor = 'bg-amber-100 text-amber-800';

            return (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between gap-3 text-xs bg-slate-50 border border-slate-100/60 transition-colors hover:bg-slate-100/40"
                style={{
                  borderRadius: '4px', // STRICT RULE
                  padding: '14px', // STRICT RULE - Using exactly 14px as standard item padding
                }}
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 uppercase tracking-wide rounded-[4px] shrink-0 ${badgeColor}`}>
                    {log.action}
                  </span>
                  <span className="text-slate-600 truncate font-medium">
                    {log.details}
                  </span>
                </div>
                
                <div className="shrink-0 text-[10px] text-slate-400 font-mono flex items-center gap-1 select-none">
                  <Clock className="w-3 h-3 text-slate-300" />
                  {log.timestamp}
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
