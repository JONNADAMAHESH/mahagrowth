import React from "react";
import { PageId } from "../types";
import {
  Home,
  Database,
  Activity,
  Layers,
  Bot,
  Compass,
  BookOpen,
  CreditCard,
  Users,
  Mail,
  Moon,
  Sun,
  Menu,
  X,
  MessageSquare,
  UserCircle,
  Target,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

interface SidebarNavigationProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenAiAssistant: () => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

export const SidebarNavigation: React.FC<SidebarNavigationProps> = ({
  currentPage,
  onNavigate,
  onOpenAiAssistant,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {
  const { isDark, toggleDarkLight } = useTheme();

  const navItems: Array<{
    id: PageId;
    label: string;
    icon: React.ElementType;
  }> = [
    { id: "home", label: "Home", icon: Home },
    { id: "data-studio", label: "Data Studio", icon: Database },
    { id: "performance", label: "Performance", icon: Target },
    { id: "diagnostic", label: "Real-Time", icon: Activity },
    { id: "services", label: "Services", icon: Layers },
    { id: "ai-advantage", label: "AI Advantage", icon: Bot },
    { id: "journey", label: "Growth Journey", icon: Compass },
    { id: "case-studies", label: "Case Studies", icon: BookOpen },
    { id: "pricing", label: "Pricing", icon: CreditCard },
    { id: "about", label: "About", icon: Users },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  const handleNavClick = (id: PageId) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Header & Hamburger */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 z-50 flex items-center justify-between px-4">
        <div className="font-mono font-bold text-neutral-900 dark:text-white flex items-center gap-2">
          <div className="w-8 h-8 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center rounded-lg">
            M
          </div>
          <span>MAHA GROWTH</span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Sidebar Container */}
      <aside
        className={`
 fixed top-0 left-0 h-full w-64 bg-white dark:bg-neutral-950 border-r border-neutral-200 dark:border-neutral-800 
 flex flex-col z-40 transition-transform duration-300 ease-in-out
 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
 lg:translate-x-0
 `}
      >
        {/* Logo Area */}
        <div className="h-20 flex items-center px-6 border-b border-neutral-100 shrink-0">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => handleNavClick("home")}
          >
            <div className="w-9 h-9 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center rounded-xl font-bold font-mono shadow-sm">
              M
            </div>
            <span className="font-mono font-bold text-sm tracking-wide text-neutral-900 dark:text-white">
              MAHA GROWTH
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1 custom-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-mono text-sm transition-all group ${
                  isActive
                    ? "bg-neutral-100 dark:bg-cyan-500/10 text-neutral-900 dark:text-cyan-400 font-bold"
                    : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 hover:text-neutral-900 dark:hover:text-white dark:text-white "
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${isActive ? "text-blue-600 dark:text-cyan-400" : "text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white"}`}
                />
                <span>{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-1 h-4 rounded-full bg-blue-600" />
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom Controls Area */}
        <div className="p-4 border-t border-neutral-100 space-y-2 shrink-0">
          <button
            onClick={onOpenAiAssistant}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-mono text-sm text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white transition-all group"
          >
            <MessageSquare className="w-4 h-4 text-cyan-500 group-hover:text-cyan-600" />
            <span>Ask AI</span>
          </button>

          <button
            onClick={() => handleNavClick("login")}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-mono text-sm text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white transition-all"
          >
            <UserCircle className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
            <span>Client Portal</span>
          </button>

          <button
            onClick={toggleDarkLight}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-mono text-sm text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white transition-all"
          >
            {isDark ? (
              <>
                <Sun className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
                <span>Dark Mode</span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};
