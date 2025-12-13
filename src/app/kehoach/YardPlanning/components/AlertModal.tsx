import React from 'react';
import { X, AlertTriangle, XCircle, CheckCircle } from 'lucide-react';

interface AlertModalProps {
    isOpen: boolean;
    type: 'error' | 'warning' | 'success';
    title: string;
    message: string;
    onClose: () => void;
}

const AlertModal: React.FC<AlertModalProps> = ({
    isOpen,
    type,
    title,
    message,
    onClose
}) => {
    if (!isOpen) return null;

    const config = {
        error: {
            bgColor: 'bg-red-50',
            borderColor: 'border-red-200',
            iconBg: 'bg-red-100',
            iconColor: 'text-red-600',
            Icon: XCircle,
            buttonBg: 'bg-red-600 hover:bg-red-700',
        },
        warning: {
            bgColor: 'bg-amber-50',
            borderColor: 'border-amber-200',
            iconBg: 'bg-amber-100',
            iconColor: 'text-amber-600',
            Icon: AlertTriangle,
            buttonBg: 'bg-amber-600 hover:bg-amber-700',
        },
        success: {
            bgColor: 'bg-green-50',
            borderColor: 'border-green-200',
            iconBg: 'bg-green-100',
            iconColor: 'text-green-600',
            Icon: CheckCircle,
            buttonBg: 'bg-green-600 hover:bg-green-700',
        },
    };

    const currentConfig = config[type];
    const IconComponent = currentConfig.Icon;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-md mx-4 overflow-hidden transform transition-all animate-in fade-in zoom-in duration-200">
                {/* Header */}
                <div className={`${currentConfig.bgColor} ${currentConfig.borderColor} border-b p-[16px] flex justify-between items-center`}>
                    <div className="flex items-center gap-3">
                        <div className={`${currentConfig.iconBg} ${currentConfig.iconColor} p-2.5 rounded-full`}>
                            <IconComponent size={22} />
                        </div>
                        <h3 className="text-[16px] font-bold text-slate-800">{title}</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-600 hover:bg-white/50 p-1.5 rounded-lg transition-all"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-[20px]">
                    <p className="text-[14px] text-slate-600 leading-relaxed">
                        {message}
                    </p>
                </div>

                {/* Footer */}
                <div className="px-[20px] py-[16px] bg-slate-50 border-t border-slate-200 flex justify-end">
                    <button
                        onClick={onClose}
                        className={`px-[24px] h-[40px] text-[14px] font-medium text-white rounded-lg transition-all shadow-lg ${currentConfig.buttonBg}`}
                    >
                        Đã hiểu
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AlertModal;
