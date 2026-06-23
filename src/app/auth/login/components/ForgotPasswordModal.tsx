"use client";

import React, { useState, useEffect } from "react";
import { X, User, Lock, Eye, EyeOff, KeyRound, CheckCircle2 } from "lucide-react";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [username, setUsername] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Closing animation state
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setUsername("");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setShowOld(false);
      setShowNew(false);
      setShowConfirm(false);
      setError(null);
      setSuccess(false);
      setIsClosing(false);
      setIsLoading(false);
    }
  }, [isOpen]);

  if (!isOpen && !isClosing) return null;

  const handleClose = () => {
    setIsClosing(true);
    onClose();
    setTimeout(() => {
      setIsClosing(false);
    }, 250);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Form Validations
    if (!username.trim()) {
      setError("Vui lòng nhập tên đăng nhập.");
      return;
    }
    if (!oldPassword) {
      setError("Vui lòng nhập mật khẩu cũ.");
      return;
    }
    if (newPassword.length < 6) {
      setError("Mật khẩu mới phải có ít nhất 6 ký tự.");
      return;
    }
    if (newPassword === oldPassword) {
      setError("Mật khẩu mới không được trùng với mật khẩu cũ.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Xác nhận mật khẩu mới không khớp.");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSuccess(true);
    } catch (err) {
      setError("Đã xảy ra lỗi trong quá trình xử lý. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] transition-opacity duration-200 ${
          isClosing ? "opacity-0" : "opacity-100 animate-in fade-in"
        }`}
        onClick={isLoading ? undefined : handleClose}
      />

      {/* Modal Card */}
      <div
        className={`relative bg-white rounded-xl shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)] w-full max-w-[420px] overflow-hidden transition-all duration-200 ${
          isClosing
            ? "scale-95 opacity-0 duration-200"
            : "scale-100 opacity-100 animate-in fade-in zoom-in-95"
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
                  <h3 className="text-[18px] font-bold leading-none mb-1 font-sans">Thành công</h3>
                  <p className="text-[11px] text-white/80 leading-none">Mật khẩu mới đã được cập nhật</p>
                </div>
              </div>
            </div>

            <div className="p-8 flex flex-col items-center text-center space-y-4 bg-white">
              <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-2">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center animate-bounce">
                  <CheckCircle2 size={24} className="text-emerald-600" />
                </div>
              </div>
              <h4 className="text-[18px] font-bold text-slate-800">
                Khôi phục mật khẩu thành công!
              </h4>
              <p className="text-[13px] text-slate-500 leading-relaxed max-w-sm">
                Bạn đã cập nhật mật khẩu của tài khoản <span className="font-semibold text-slate-700">{username}</span> thành công. Vui lòng sử dụng mật khẩu mới để đăng nhập.
              </p>
              
              <button
                type="button"
                onClick={handleClose}
                className="mt-4 min-w-[120px] h-[38px] px-5 text-[13px] font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow transition-all cursor-pointer"
              >
                Đồng ý
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Header with Blue Background */}
            <div className="bg-[#0054a6] px-6 py-5 text-white relative">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <KeyRound size={22} className="text-white" />
                </div>
                <div>
                  <h3 className="text-[17px] font-bold leading-none mb-1 font-sans">Khôi phục mật khẩu</h3>
                  <p className="text-[11px] text-white/80 leading-none">Nhập thông tin bên dưới để khôi phục tài khoản</p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="absolute top-5 right-5 text-white/70 hover:text-white transition-colors cursor-pointer"
                disabled={isLoading}
              >
                <X size={20} />
              </button>
            </div>

            {/* Form Fields */}
            <div className="p-6 space-y-4 bg-white">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs font-semibold text-red-600 animate-in fade-in duration-200">
                  {error}
                </div>
              )}

              {/* Username Field */}
              <div className="space-y-1.5">
                <label className="text-[13px] font-bold text-slate-600 uppercase tracking-wider">
                  Tên đăng nhập
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#0054a6] transition-colors">
                    <User size={16} />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Nhập tên đăng nhập của bạn"
                    className="w-full h-[40px] pl-9 pr-4 bg-white border border-[#d9d9d9] rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-[#0054a6] text-[13px] transition-all"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Old Password Field */}
              <div className="space-y-1.5">
                <label className="text-[13px] font-bold text-slate-600 uppercase tracking-wider">
                  Mật khẩu cũ
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#0054a6] transition-colors">
                    <Lock size={16} />
                  </div>
                  <input
                    type={showOld ? "text" : "password"}
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-[40px] pl-9 pr-9 bg-white border border-[#d9d9d9] rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-[#0054a6] text-[13px] transition-all"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowOld(!showOld)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                    disabled={isLoading}
                  >
                    {showOld ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* New Password Field */}
              <div className="space-y-1.5">
                <label className="text-[13px] font-bold text-slate-600 uppercase tracking-wider">
                  Mật khẩu mới
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#0054a6] transition-colors">
                    <Lock size={16} />
                  </div>
                  <input
                    type={showNew ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Tối thiểu 6 ký tự"
                    className="w-full h-[40px] pl-9 pr-9 bg-white border border-[#d9d9d9] rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-[#0054a6] text-[13px] transition-all"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                    disabled={isLoading}
                  >
                    {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Confirm New Password Field */}
              <div className="space-y-1.5">
                <label className="text-[13px] font-bold text-slate-600 uppercase tracking-wider">
                  Xác nhận mật khẩu mới
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#0054a6] transition-colors">
                    <Lock size={16} />
                  </div>
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Nhập lại mật khẩu mới"
                    className="w-full h-[40px] pl-9 pr-9 bg-white border border-[#d9d9d9] rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-[#0054a6] text-[13px] transition-all"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                    disabled={isLoading}
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
                className="min-w-[90px] h-[38px] px-4 text-[13px] font-bold text-slate-600 hover:text-slate-900 bg-white border border-[#d9d9d9] rounded-lg transition-all cursor-pointer"
                disabled={isLoading}
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                className="min-w-[120px] h-[38px] px-5 text-[13px] font-bold text-white bg-gradient-to-r from-[#0054a6] to-[#0076e4] hover:from-[#004b93] hover:to-[#006bd1] rounded-lg shadow shadow-blue-100 transition-all flex items-center justify-center gap-2 cursor-pointer"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-1.5">
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Đang cập nhật...</span>
                  </div>
                ) : (
                  <span>Khôi phục</span>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
