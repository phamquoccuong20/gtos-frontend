"use client";

import React, { useState, useEffect } from "react";
import { X, Lock, Eye, EyeOff, KeyRound, CheckCircle2 } from "lucide-react";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Closing animation state
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setShowCurrent(false);
      setShowNew(false);
      setShowConfirm(false);
      setError(null);
      setSuccess(false);
      setIsClosing(false);
    }
  }, [isOpen]);

  if (!isOpen && !isClosing) return null;

  const handleClose = () => {
    setIsClosing(true);
    onClose(); // Call parent to trigger close in state
    
    // Keep component rendered for 250ms to play transition
    setTimeout(() => {
      setIsClosing(false);
    }, 250);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!currentPassword) {
      setError("Vui lòng nhập mật khẩu hiện tại.");
      return;
    }
    if (newPassword.length < 6) {
      setError("Mật khẩu mới phải có ít nhất 6 ký tự.");
      return;
    }
    if (newPassword === currentPassword) {
      setError("Mật khẩu mới không được trùng với mật khẩu hiện tại.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Xác nhận mật khẩu mới không khớp.");
      return;
    }

    // Mock successful change
    setSuccess(true);
    setTimeout(() => {
      handleClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] ${
          isClosing ? "animate-out fade-out duration-250" : "animate-in fade-in duration-200"
        }`}
        onClick={handleClose}
      />

      {/* Modal Content */}
      <div
        className={`relative bg-white rounded-xl shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)] w-full max-w-[400px] overflow-hidden ${
          isClosing
            ? "animate-out fade-out slide-out-to-top-10 duration-250"
            : "animate-in fade-in zoom-in-95 duration-200"
        }`}
      >
        
        {success ? (
          <div>
            {/* Header Success */}
            <div className="bg-emerald-600 px-6 py-5 text-white relative">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <CheckCircle2 size={22} className="text-white" />
                </div>
                <div>
                  <h3 className="text-[18px] font-bold leading-none mb-1 font-accent">Thành công</h3>
                </div>
              </div>
            </div>
            
            <div className="p-8 flex flex-col items-center text-center space-y-3 bg-white">
              <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-2">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center animate-bounce">
                  <CheckCircle2 size={24} className="text-emerald-600" />
                </div>
              </div>
              <h4 className="text-[18px] font-bold text-slate-800">
                Đổi mật khẩu thành công!
              </h4>
              <p className="text-[14px] text-slate-600 leading-relaxed">
                Mật khẩu của bạn đã được cập nhật thành công.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Header with Blue Background */}
            <div className="bg-[#2f54eb] px-6 py-5 text-white relative">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <KeyRound size={22} className="text-white" />
                </div>
                <div>
                  <h3 className="text-[18px] font-bold leading-none mb-1 font-accent">Đổi mật khẩu</h3>
                  <p className="text-[11px] text-white/80 leading-none">Cập nhật mật khẩu để bảo mật tài khoản</p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="absolute top-5 right-5 text-white/60 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form Fields */}
            <div className="p-6 space-y-4 bg-white">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-[13px] font-medium text-red-600 animate-in fade-in duration-200">
                  {error}
                </div>
              )}

              {/* Current Password */}
              <div className="space-y-1.5">
                <label className="text-[14px] font-medium text-slate-700">
                  Mật khẩu hiện tại
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock size={16} />
                  </div>
                  <input
                    type={showCurrent ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-[40px] pl-9 pr-9 bg-white border border-[#d9d9d9] rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-[#2f54eb] text-[14px] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrent(!showCurrent)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                  >
                    {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div className="space-y-1.5">
                <label className="text-[14px] font-medium text-slate-700">
                  Mật khẩu mới
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock size={16} />
                  </div>
                  <input
                    type={showNew ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Tối thiểu 6 ký tự"
                    className="w-full h-[40px] pl-9 pr-9 bg-white border border-[#d9d9d9] rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-[#2f54eb] text-[14px] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                  >
                    {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Confirm New Password */}
              <div className="space-y-1.5">
                <label className="text-[14px] font-medium text-slate-700">
                  Xác nhận mật khẩu mới
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock size={16} />
                  </div>
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Nhập lại mật khẩu mới"
                    className="w-full h-[40px] pl-9 pr-9 bg-white border border-[#d9d9d9] rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-[#2f54eb] text-[14px] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                  >
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="px-6 py-4 flex items-center justify-end gap-3 border-t border-slate-100 bg-white">
              <button
                type="button"
                onClick={handleClose}
                className="min-w-[100px] h-[38px] px-4 text-[14px] font-medium text-slate-600 hover:text-slate-900 bg-white border border-[#d9d9d9] rounded-lg transition-all"
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                className="min-w-[120px] h-[38px] px-5 text-[14px] font-bold text-white bg-[#2f54eb] hover:bg-[#1d39c4] rounded-lg shadow-lg shadow-blue-100 transition-all"
              >
                Cập nhật
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ChangePasswordModal;
