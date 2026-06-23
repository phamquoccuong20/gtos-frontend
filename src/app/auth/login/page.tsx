"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  Anchor, 
  Ship, 
  Users, 
  Layers, 
  CheckCircle2, 
  ChevronRight,
  TrendingUp
} from "lucide-react";
import ForgotPasswordModal from "./components/ForgotPasswordModal";

export default function LoginPage() {
  const router = useRouter();
  
  // State variables for form inputs and UI transitions
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Login success and Forgot password modal states
  const [isSuccess, setIsSuccess] = useState(false);
  const [isForgotOpen, setIsForgotOpen] = useState(false);

  // Form submission handler for login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Simple validation
    if (!username.trim() || !password.trim()) {
      setError("Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Transition to success screen
      setIsSuccess(true);
      
      // Redirect to the main dashboard after success animation
      setTimeout(() => {
        router.push("/");
      }, 1200);
    } catch (err) {
      setError("Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans overflow-hidden">
      
      {/* LEFT PANEL: Branding & Visuals (Visible on desktop) */}
      <div className="hidden lg:flex lg:w-[60%] relative flex-col justify-between p-16 text-white">
        
        {/* Immersive background image with gradients overlay */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-10000 hover:scale-105"
          style={{
            backgroundImage: "url('/img/page_bg.png')",
          }}
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-br from-[#002f60]/95 via-[#0054a6]/85 to-[#051121]/95" />
        
        {/* Content Container (Layered above backgrounds) */}
        <div className="relative z-20 flex flex-col h-full justify-between">
          
          {/* Header/Brand Section */}
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/10 backdrop-blur-md rounded-xl border border-white/15 shadow-inner">
              <Anchor size={28} className="text-blue-300 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-blue-200">
                GTOS
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-blue-200 font-bold opacity-80">
                Port Management System
              </span>
            </div>
          </div>

          {/* Hero Content Section */}
          <div className="max-w-xl my-auto py-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-200 border border-blue-400/20 mb-6 backdrop-blur-sm">
              <TrendingUp size={12} />
              Hệ thống điều hành thông minh
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight leading-tight text-white mb-6">
              HỆ THỐNG QUẢN TRỊ CẢNG BIỂN THẾ HỆ MỚI
            </h1>
            <p className="text-slate-200 text-[15px] leading-relaxed mb-8 font-medium">
              Giải pháp toàn diện tối ưu hóa mọi quy trình vận hành bãi container, lập kế hoạch khai thác cầu cảng, quản lý phương tiện và tối đa hóa năng suất bốc dỡ cảng biển.
            </p>

            {/* Feature Badges list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-3.5 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 transition-all duration-300 hover:-translate-y-0.5">
                <div className="p-2 bg-blue-500/20 rounded-lg text-blue-300">
                  <Ship size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-white">Khai thác Tàu & Sà lan</h3>
                  <p className="text-xs text-slate-300 mt-0.5">Lập kế hoạch cầu bến, sơ đồ xếp hàng tối ưu.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 transition-all duration-300 hover:-translate-y-0.5">
                <div className="p-2 bg-blue-500/20 rounded-lg text-blue-300">
                  <Layers size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-white">Quản lý Kho bãi (Yard)</h3>
                  <p className="text-xs text-slate-300 mt-0.5">Tối ưu vị trí container, xếp dỡ thông minh.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 transition-all duration-300 hover:-translate-y-0.5">
                <div className="p-2 bg-blue-500/20 rounded-lg text-blue-300">
                  <Users size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-white">Cổng & Dịch vụ Khách hàng</h3>
                  <p className="text-xs text-slate-300 mt-0.5">Thủ tục thông hải quan, billing trực tuyến nhanh chóng.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 transition-all duration-300 hover:-translate-y-0.5">
                <div className="p-2 bg-blue-500/20 rounded-lg text-blue-300">
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-white">Báo cáo & Giám sát</h3>
                  <p className="text-xs text-slate-300 mt-0.5">Thống kê trực quan, cập nhật dữ liệu thời gian thực.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Left Footer metadata */}
          <div className="flex justify-between items-center text-xs text-slate-300 border-t border-white/10 pt-6">
            <span>Phiên bản Enterprise v2.6.4</span>
            <span className="flex items-center gap-1">
              Hỗ trợ 24/7 <ChevronRight size={14} />
            </span>
          </div>

        </div>
      </div>

      {/* RIGHT PANEL: Credentials & Login Form */}
      <div className="flex-1 flex flex-col justify-between p-8 sm:p-12 lg:p-20 bg-white shadow-[-8px_0_24px_-10px_rgba(0,0,0,0.05)] z-20">
        
        {/* Top Spacer / Language selector */}
        <div className="flex justify-end text-xs font-semibold text-slate-500">
          <span className="hover:text-blue-600 cursor-pointer transition-colors px-2 border-r border-slate-200">TIẾNG VIỆT</span>
          <span className="hover:text-blue-600 cursor-pointer transition-colors px-2">ENGLISH</span>
        </div>

        {/* Center Section: Credentials Card */}
        <div className="max-w-[420px] w-full mx-auto my-auto py-8">
          
          {/* Card Inner wrapper */}
          <div className="relative">
            
            {/* VIEW: Login Success Screen */}
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center text-center py-12 animate-in fade-in zoom-in-95 duration-500">
                <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-inner border border-emerald-100 relative">
                  <CheckCircle2 size={44} className="stroke-[2.5]" />
                  <span className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping duration-1000 opacity-60" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Đăng nhập thành công!</h2>
                <p className="text-slate-500 text-sm">Đang chuyển hướng bạn đến bảng điều khiển...</p>
                <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden mt-6">
                  <div className="h-full bg-emerald-500 rounded-full animate-[loading_1.2s_ease-in-out_infinite]" style={{ width: '40%' }} />
                </div>
              </div>
            ) : (
              // VIEW: Standard Credentials Form
              <div className="animate-in fade-in duration-300">
                
                {/* Logo & Headline */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-3 lg:hidden">
                    <Anchor size={24} className="text-[#0054a6]" />
                    <span className="text-xl font-bold tracking-tight text-slate-800">GTOS</span>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-800 tracking-tight">
                    Đăng nhập hệ thống
                  </h2>
                  <p className="text-slate-400 text-sm font-medium mt-2">
                    Vui lòng nhập tên đăng nhập và mật khẩu của bạn
                  </p>
                </div>

                {/* Error Banner */}
                {error && (
                  <div className="mb-6 p-4 bg-rose-50 border-l-4 border-rose-500 rounded-r-lg text-rose-700 text-xs font-semibold flex items-center gap-2 animate-shake">
                    <span>{error}</span>
                  </div>
                )}

                {/* Form Elements */}
                <form onSubmit={handleLogin} className="space-y-5">
                  
                  {/* Username Input Field */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Tên đăng nhập
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#0054a6] transition-colors">
                        <User size={18} />
                      </div>
                      <input
                        type="text"
                        placeholder="Nhập tên đăng nhập của bạn"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="block w-full h-[46px] pl-11 pr-4 border border-slate-200 rounded-xl leading-5 bg-slate-50/50 text-slate-800 text-sm font-medium focus:outline-none focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-[#0054a6] transition duration-200 outline-none"
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  {/* Password Input Field */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Mật khẩu
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#0054a6] transition-colors">
                        <Lock size={18} />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Nhập mật khẩu của bạn"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block w-full h-[46px] pl-11 pr-12 border border-slate-200 rounded-xl leading-5 bg-slate-50/50 text-slate-800 text-sm font-medium focus:outline-none focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-[#0054a6] transition duration-200 outline-none"
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                        disabled={isLoading}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me & Forgot Password Row */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 text-[#0054a6] border-slate-300 rounded focus:ring-[#0054a6] cursor-pointer"
                        disabled={isLoading}
                      />
                      <span className="text-xs font-semibold text-slate-500">
                        Ghi nhớ mật khẩu
                      </span>
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setIsForgotOpen(true);
                        setError("");
                      }}
                      className="text-xs font-bold text-[#0054a6] hover:text-[#0076e4] hover:underline transition-colors cursor-pointer"
                    >
                      Quên mật khẩu?
                    </button>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="relative w-full h-[46px] bg-gradient-to-r from-[#0054a6] to-[#0076e4] hover:from-[#004b93] hover:to-[#006bd1] text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/35 active:scale-[0.98] transition-all duration-150 overflow-hidden cursor-pointer"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Đang đăng nhập...</span>
                      </div>
                    ) : (
                      <>
                        <span>Đăng nhập</span>
                        <ChevronRight size={16} className="mt-0.5" />
                      </>
                    )}
                  </button>
                </form>

              </div>
            )}

          </div>

        </div>

        {/* Footer block */}
        <div className="text-center py-2 text-[11px] text-slate-400 font-normal select-none">
          © 2026 GTOS - Hệ thống Quản trị Cảng hiện đại. Được phát triển bởi <span className="text-[#1890ff] hover:underline cursor-pointer font-semibold">CEH Software.</span>
        </div>

      </div>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal 
        isOpen={isForgotOpen} 
        onClose={() => setIsForgotOpen(false)} 
      />

    </div>
  );
}