import React, { useState } from "react";
import { PageId } from "../types";
import { useAuth } from "../context/AuthContext";
import { AuthWorkspaceView } from "../components/AuthWorkspaceView";
import {
  Lock,
  Mail,
  User,
  Building,
  ArrowRight,
  ShieldCheck,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Layers,
  ArrowLeft,
  RefreshCw,
} from "lucide-react";

interface LoginPageProps {
  onNavigate: (page: PageId, anchorId?: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const {
    user,
    logout,
    login,
    register,
    isLoading,
    error,
    clearError,
    getAuthHeaders,
  } = useAuth();

  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);

  // Login fields
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  // Register fields
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regCompany, setRegCompany] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regStage, setRegStage] = useState("GROW ($15k - $60k/mo)");

  // Feedback messages
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [forgotPasswordNotice, setForgotPasswordNotice] = useState(false);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setSuccessMessage(null);

    if (!loginEmail || !loginPassword) {
      return;
    }

    const res = await login(loginEmail, loginPassword);
    if (res.success) {
      setSuccessMessage(
        `Authenticated successfully! Welcome back to Maha Growth.`,
      );
      setTimeout(() => {
        onNavigate("portal");
      }, 800);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setSuccessMessage(null);

    if (!regName || !regEmail || !regPassword) {
      return;
    }

    const res = await register({
      name: regName,
      email: regEmail,
      password: regPassword,
      company: regCompany || undefined,
      role: "client",
    });

    if (res.success) {
      if (res.message) {
        // Email confirmation required
        setSuccessMessage(res.message);
        setTimeout(() => {
          setActiveTab("login");
          setLoginEmail(regEmail);
          setLoginPassword("");
          setSuccessMessage(null);
        }, 5000);
      } else {
        // Logged in directly
        setSuccessMessage(`Account created! Welcome to Maha Growth.`);
        setTimeout(() => {
          onNavigate("portal");
        }, 800);
      }
    }
  };

  // Password strength helper
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: "", color: "bg-transparent" };
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 10) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass) || /[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 1)
      return { score: 25, label: "Weak", color: "bg-neutral-400" };
    if (score === 2 || score === 3)
      return { score: 70, label: "Good", color: "bg-neutral-600" };
    return {
      score: 100,
      label: "Strong",
      color: "bg-neutral-900 dark:bg-white dark:bg-white",
    };
  };

  const passStrength = getPasswordStrength(regPassword);

  // If user is already logged in, show their executive workspace & portal
  if (user) {
    return (
      <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-[85vh] text-neutral-900 dark:text-white">
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => onNavigate("home")}
            className="inline-flex items-center gap-2 text-xs font-mono text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>
          <div className="text-xs font-mono text-neutral-900 dark:text-white flex items-center gap-1.5 font-bold">
            <span className="w-2 h-2 rounded-full bg-neutral-900 dark:bg-white" />
            <span>Maha Growth Secure Workspace &bull; Active Session</span>
          </div>
        </div>
        <AuthWorkspaceView
          user={user}
          onNavigate={onNavigate}
          onLogout={logout}
          getAuthHeaders={getAuthHeaders}
        />
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-[85vh] flex flex-col justify-center text-neutral-900 dark:text-white">
      {/* Back button */}
      <div className="max-w-xl mx-auto w-full mb-6">
        <button
          onClick={() => onNavigate("home")}
          className="inline-flex items-center gap-2 text-xs font-mono text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </button>
      </div>

      <div className="max-w-xl mx-auto w-full">
        {/* Main Login / Register Card */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-2xl shadow-xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
          {/* Header */}
          <div className="space-y-2 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white border border-neutral-300 dark:border-neutral-800 text-xs font-mono font-semibold">
              <KeyRound className="w-3.5 h-3.5" />
              <span>MAHA GROWTH SECURE ACCESS GATEWAY</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
              {activeTab === "login"
                ? "Sign In to Your Account"
                : "Register New Real Account"}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300">
              {activeTab === "login"
                ? "Sign in with your registered credentials to access your growth blueprints, CRM, and systems."
                : "Create your real verified account with direct database persistence and complete code & data ownership."}
            </p>
          </div>

          {/* Auth Tab Switcher */}
          <div className="flex rounded-xl bg-neutral-100 dark:bg-neutral-800 p-1 border border-neutral-300 dark:border-neutral-800 relative z-10">
            <button
              onClick={() => {
                setActiveTab("login");
                clearError();
                setSuccessMessage(null);
              }}
              className={`flex-1 py-2.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                activeTab === "login"
                  ? "bg-neutral-900 dark:bg-white dark:bg-white text-white dark:text-neutral-900 shadow-xs"
                  : "text-neutral-600 hover:text-neutral-900 dark:hover:text-white dark:hover:text-neutral-900 dark:text-white dark:text-neutral-900 dark:text-white dark:text-neutral-900"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setActiveTab("register");
                clearError();
                setSuccessMessage(null);
              }}
              className={`flex-1 py-2.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                activeTab === "register"
                  ? "bg-neutral-900 dark:bg-white dark:bg-white text-white dark:text-neutral-900 shadow-xs"
                  : "text-neutral-600 hover:text-neutral-900 dark:hover:text-white dark:hover:text-neutral-900 dark:text-white dark:text-neutral-900 dark:text-white dark:text-neutral-900"
              }`}
            >
              Register New Account
            </button>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="p-3.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-400 text-neutral-900 dark:text-white text-xs font-mono flex items-start gap-2.5 animate-fade-in relative z-10">
              <AlertCircle className="w-4 h-4 text-neutral-900 dark:text-white shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Authentication Error: </span>
                {error}
              </div>
            </div>
          )}

          {/* Success Alert */}
          {successMessage && (
            <div className="p-3.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white text-xs font-mono flex items-start gap-2.5 animate-fade-in relative z-10">
              <CheckCircle2 className="w-4 h-4 text-neutral-900 dark:text-white shrink-0 mt-0.5" />
              <div className="font-semibold">{successMessage}</div>
            </div>
          )}

          {/* Forgot Password Modal / Banner */}
          {forgotPasswordNotice && (
            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-800 text-xs space-y-2 relative z-10">
              <div className="flex items-center justify-between text-neutral-900 dark:text-white font-mono font-semibold">
                <span className="flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5" /> Password Reset
                  Verification
                </span>
                <button
                  onClick={() => setForgotPasswordNotice(false)}
                  className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white cursor-pointer"
                >
                  ✕
                </button>
              </div>
              <p className="text-neutral-600 dark:text-neutral-300 text-[11px] leading-relaxed">
                For security compliance, password resets require enterprise
                domain verification. Please contact your organization
                administrator or reach out to security@mahagrowth.com to reset
                your credentials.
              </p>
            </div>
          )}

          {/* 1. SIGN IN FORM */}
          {activeTab === "login" && (
            <form
              onSubmit={handleLoginSubmit}
              className="space-y-4 relative z-10"
            >
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
                  <span>Work Email Address</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 focus:border-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-400 text-sm font-sans transition-all focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
                    <span>Password</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setForgotPasswordNotice(true)}
                    className="text-[11px] font-mono text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter your registered password"
                    className="w-full px-4 py-3 pr-11 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 focus:border-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-400 text-sm font-sans transition-all focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white focus:ring-0 focus:ring-offset-0"
                  />
                  <span className="font-mono text-[11px]">
                    Remember my device (30 days)
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl bg-neutral-900 dark:bg-white hover:bg-neutral-800 text-white dark:text-neutral-900 font-mono font-semibold text-xs shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white dark:text-neutral-900" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Platform</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("register");
                    clearError();
                    setSuccessMessage(null);
                  }}
                  className="text-xs font-mono text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  Don&apos;t have an account yet? Register a real account &rarr;
                </button>
              </div>
            </form>
          )}

          {/* 2. REGISTER FORM */}
          {activeTab === "register" && (
            <form
              onSubmit={handleRegisterSubmit}
              className="space-y-4 relative z-10"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
                    <span>Full Name</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="e.g. Jonnada Mahesh"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 focus:border-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-400 text-xs font-sans transition-all focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
                    <span>Company Name</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={regCompany}
                    onChange={(e) => setRegCompany(e.target.value)}
                    placeholder="e.g. Acme Technologies"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 focus:border-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-400 text-xs font-sans transition-all focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
                  <span>Work Email Address</span>
                </label>
                <input
                  type="email"
                  required
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 focus:border-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-400 text-xs font-sans transition-all focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
                  <span>Current Business Stage</span>
                </label>
                <select
                  value={regStage}
                  onChange={(e) => setRegStage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 focus:border-neutral-900 text-neutral-900 dark:text-white text-xs font-mono transition-all focus:outline-none"
                >
                  <option value="START (<$15k/mo)">
                    START (&lt;$15k/mo) - Pre-Revenue &amp; Early Launch
                  </option>
                  <option value="GROW ($15k - $60k/mo)">
                    GROW ($15k - $60k/mo) - Product-Market Fit &amp; Scale
                  </option>
                  <option value="AUTOMATE ($60k - $200k/mo)">
                    AUTOMATE ($60k - $200k/mo) - Bottlenecks &amp; Systems
                  </option>
                  <option value="SCALE ($200k+/mo)">
                    SCALE ($200k+/mo) - Enterprise Growth Engine
                  </option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
                  <span>Create Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="w-full px-3.5 py-2.5 pr-10 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 focus:border-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-400 text-xs font-sans transition-all focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff className="w-3.5 h-3.5" />
                    ) : (
                      <Eye className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                {regPassword && (
                  <div className="space-y-1 pt-1">
                    <div className="w-full h-1 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${passStrength.color} transition-all duration-300`}
                        style={{ width: `${passStrength.score}%` }}
                      />
                    </div>
                    <div className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 flex justify-between">
                      <span>Strength: {passStrength.label}</span>
                      <span>Requires 6+ characters</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 space-y-1 text-[11px] text-neutral-600 dark:text-neutral-300 font-mono">
                <div className="flex items-center gap-1.5 text-neutral-900 dark:text-white font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" /> Complete Client
                  Ownership Guarantee
                </div>
                <div>
                  All diagnostic blueprints, CRM records, and source code belong
                  100% to your company.
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl bg-neutral-900 dark:bg-white hover:bg-neutral-800 text-white dark:text-neutral-900 font-mono font-semibold text-xs shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white dark:text-neutral-900" />
                    <span>Creating Real Account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Real Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("login");
                    clearError();
                    setSuccessMessage(null);
                  }}
                  className="text-xs font-mono text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  Already registered? Sign in to your account &rarr;
                </button>
              </div>
            </form>
          )}

          {/* Footer note */}
          <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-neutral-600 dark:text-neutral-300 font-mono">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
              <span>Real Production Database &bull; Encrypted Sessions</span>
            </span>
            <span className="text-neutral-500 dark:text-neutral-400">
              Zero Demo / Simulated Accounts
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
