import React, { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  Search,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  Bot,
  Compass,
  TrendingUp,
  Layers,
  HelpCircle,
  ShieldCheck,
  LogIn,
  LogOut,
  User as UserIcon,
  Phone,
  Mail,
  Globe,
  Workflow,
  BarChart3,
  Zap,
  GraduationCap,
  Home,
} from "lucide-react";
import { PageId } from "../types";
import { EIGHT_SERVICES } from "../data/companyData";
import { useAuth } from "../context/AuthContext";
import { ThemeSelector } from "./ThemeSelector";

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId, anchorId?: string) => void;
  onOpenSearch: () => void;
  onOpenAiAssistant: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenSearch,
  onOpenAiAssistant,
}) => {
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const navLinks: {
    label: string;
    page: PageId;
    anchorId?: string;
    hasDropdown?: boolean;
    badge?: string;
  }[] = [
    { label: "Home", page: "home" },
    { label: "Data Studio", page: "data-studio", badge: "Real-Time" },
    { label: "Services", page: "services" },
    { label: "AI Advantage", page: "ai-advantage", badge: "Interactive" },
    { label: "Growth Journey", page: "journey" },
    { label: "Case Studies", page: "case-studies" },
    { label: "Pricing", page: "pricing" },
    { label: "About", page: "about" },
    { label: "Contact", page: "contact" },
  ];

  const getServiceIcon = (name: string) => {
    switch (name) {
      case "Globe":
        return Globe;
      case "TrendingUp":
        return TrendingUp;
      case "Bot":
        return Bot;
      case "Workflow":
        return Workflow;
      case "BarChart3":
        return BarChart3;
      case "Compass":
        return Compass;
      case "Sparkles":
        return Sparkles;
      case "GraduationCap":
        return GraduationCap;
      default:
        return Sparkles;
    }
  };

  return (
    <header
      id="site-header"
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    >
      {/* Top Announcement Bar */}
      <div
        id="top-announcement-bar"
        className="bg-neutral-900 dark:bg-white text-neutral-200 /90 border-b border-neutral-800 py-1.5 px-3 sm:px-4 text-center text-[11px] font-mono flex items-center justify-between sm:justify-center gap-2 sm:gap-4 overflow-hidden"
      >
        <div className="flex items-center gap-2 truncate">
          <span className="inline-flex items-center gap-1.5 font-semibold text-white dark:text-neutral-900">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="hidden xs:inline">Next-Gen Growth Engine:</span> AI
            + Tech + Marketing + Automation
          </span>
          <span className="hidden md:inline text-neutral-600 dark:text-neutral-300">|</span>
          <span className="hidden lg:inline text-neutral-400">
            Unified Systems Scaling Revenue 24/7
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            id="btn-announcement-diagnostic"
            onClick={() => onNavigate("diagnostic")}
            className="text-cyan-400 hover:text-cyan-300 font-semibold underline underline-offset-2 flex items-center gap-1 cursor-pointer"
          >
            <span>Free 30-Min Growth Blueprint</span>
            <span className="hidden sm:inline">&rarr;</span>
          </button>
        </div>
      </div>

      {/* Main Glass Navigation Bar */}
      <nav
        id="main-navigation"
        aria-label="Main Navigation"
        className={`px-3 sm:px-6 lg:px-8 transition-all duration-200 ${
          isScrolled
            ? "bg-white dark:bg-neutral-900 dark:bg-white/95 dark:bg-[#07090e]/95 backdrop-blur-xl border-b border-neutral-200 dark:border-neutral-800 shadow-md py-2.5 sm:py-3"
            : "bg-white dark:bg-neutral-900 dark:bg-white/90 dark:bg-[#07090e]/85 backdrop-blur-md border-b border-neutral-200/60 dark:border-neutral-800/60 py-3 sm:py-3.5"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Brand Logo */}
          <button
            id="nav-brand-logo"
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2.5 group text-left cursor-pointer select-none shrink-0"
            aria-label="Maha Growth Homepage"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-neutral-900 via-black to-neutral-800 border border-neutral-300 dark:border-neutral-800 p-[1px] shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all">
              <div className="w-full h-full bg-neutral-900 dark:bg-white rounded-[10px] flex items-center justify-center">
                <div className="relative w-4 h-4 flex items-center justify-center">
                  <div className="absolute inset-0 border border-cyan-400/80 rotate-45 rounded-xs" />
                  <div className="w-1.5 h-1.5 bg-white dark:bg-neutral-900 rounded-full animate-ping opacity-75" />
                  <div className="w-1.5 h-1.5 bg-white dark:bg-neutral-900 rounded-full" />
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black tracking-wider text-neutral-900 dark:text-white font-mono leading-none">
                  MAHA
                </span>
                <span className="text-[10px] uppercase font-mono font-bold px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white border border-neutral-300 dark:border-neutral-800">
                  GROWTH
                </span>
              </div>
              <span className="text-[9px] font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-widest hidden sm:block">
                Intelligent Enterprise
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <div
            id="nav-desktop-links"
            className="hidden xl:flex items-center gap-1"
          >
            {navLinks.map((link) => {
              const isActive = currentPage === link.page && !link.anchorId;

              if (link.hasDropdown) {
                return (
                  <div
                    key={link.page}
                    ref={dropdownRef}
                    className="relative"
                    onMouseEnter={() => setServicesDropdownOpen(true)}
                    onMouseLeave={() => setServicesDropdownOpen(false)}
                  >
                    <button
                      id={`nav-link-${link.page}`}
                      onClick={() => onNavigate("services")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1 transition-all cursor-pointer ${
                        isActive
                          ? "text-neutral-900 dark:text-white dark:text-neutral-900 dark:text-white dark:text-neutral-900 dark:text-cyan-300 font-bold bg-neutral-100 dark:bg-neutral-800/80 shadow-xs"
                          : "text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white dark:hover:text-neutral-900 dark:text-white dark:text-neutral-900 dark:text-white dark:text-neutral-900 hover:bg-neutral-100/70 dark:hover:bg-neutral-800/50"
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdownOpen ? "rotate-180 text-cyan-500" : ""}`}
                      />
                    </button>

                    {/* Services Dropdown Mega Menu */}
                    {servicesDropdownOpen && (
                      <div
                        id="nav-services-dropdown"
                        className="absolute top-full left-0 mt-1.5 w-[380px] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl p-3 grid gap-1.5 z-50 animate-in fade-in slide-in-from-top-2"
                      >
                        <div className="px-2.5 py-1.5 flex items-center justify-between border-b border-neutral-100">
                          <span className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 font-bold uppercase tracking-wider">
                            8 Core Growth Capabilities
                          </span>
                          <span className="text-[10px] font-mono text-neutral-400">
                            Unified Strategy
                          </span>
                        </div>

                        <div className="grid grid-cols-1 gap-1 max-h-[380px] overflow-y-auto pr-1">
                          {EIGHT_SERVICES.map((svc) => {
                            const IconComp = getServiceIcon(svc.iconName);
                            return (
                              <button
                                key={svc.id}
                                id={`nav-dropdown-svc-${svc.id}`}
                                onClick={() => {
                                  onNavigate("services");
                                  setServicesDropdownOpen(false);
                                }}
                                className="text-left px-2.5 py-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors flex items-start gap-2.5 group cursor-pointer"
                              >
                                <div className="p-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 group-hover:bg-cyan-500/10 group-hover:text-cyan-400 transition-colors shrink-0 mt-0.5">
                                  <IconComp className="w-3.5 h-3.5" />
                                </div>
                                <div className="min-w-0">
                                  <div className="text-xs font-semibold text-neutral-900 dark:text-white group-hover:text-cyan-500 transition-colors flex items-center gap-1.5">
                                    <span>{svc.title}</span>
                                    <span className="text-[9px] font-mono text-neutral-400 group-hover:text-cyan-400">
                                      {svc.number}
                                    </span>
                                  </div>
                                  <div className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate">
                                    {svc.shortDesc}
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>

                        <div className="pt-2 border-t border-neutral-100 flex items-center justify-between px-2">
                          <button
                            onClick={() => {
                              onNavigate("services");
                              setServicesDropdownOpen(false);
                            }}
                            className="text-xs font-mono font-semibold text-neutral-900 dark:text-white hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <span>Explore all capabilities in detail</span>
                            <span>&rarr;</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={link.label}
                  id={`nav-link-${link.page}`}
                  onClick={() => onNavigate(link.page, link.anchorId)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? "text-neutral-900 dark:text-white dark:text-neutral-900 dark:text-white dark:text-neutral-900 dark:text-cyan-300 font-bold bg-neutral-100 dark:bg-neutral-800/80 shadow-xs"
                      : "text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white dark:hover:text-neutral-900 dark:text-white dark:text-neutral-900 dark:text-white dark:text-neutral-900 hover:bg-neutral-100/70 dark:hover:bg-neutral-800/50"
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-700 border border-cyan-500/20 font-semibold">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Desktop Right CTAs & Tools */}
          <div
            id="nav-desktop-actions"
            className="hidden lg:flex items-center gap-2"
          >
            {/* Theme Selector Dropdown */}
            <ThemeSelector />

            {/* Quick Search */}
            <button
              id="btn-nav-search"
              onClick={onOpenSearch}
              className="p-2 rounded-xl text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 transition-all flex items-center gap-1.5 text-xs font-mono cursor-pointer"
              title="Global Search (Cmd+K)"
              aria-label="Open Search"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="text-[10px] text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded border border-neutral-200 dark:border-neutral-800 font-mono">
                ⌘K
              </span>
            </button>

            {/* AI Advisor Button */}
            <button
              id="btn-nav-ai-assistant"
              onClick={onOpenAiAssistant}
              className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-300 dark:border-neutral-800 text-neutral-800 dark:text-neutral-300 text-xs font-mono flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              title="Chat with Maha AI Assistant (Cmd+J)"
            >
              <Bot className="w-3.5 h-3.5 text-cyan-500" />
              <span className="font-semibold">Ask AI</span>
            </button>

            {/* Login / Client Portal */}
            {user ? (
              <div className="flex items-center gap-1.5 pl-1">
                <button
                  id="btn-nav-user-profile"
                  onClick={() => onNavigate("portal")}
                  className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-300 dark:border-neutral-800 text-xs font-mono text-neutral-900 dark:text-white flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
                  title={`Signed in as ${user.name} (${user.role.toUpperCase()})`}
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-4 h-4 rounded-full object-cover"
                    />
                  ) : (
                    <UserIcon className="w-3.5 h-3.5 text-cyan-400" />
                  )}
                  <span className="font-semibold">
                    {user.name.split(" ")[0]}
                  </span>
                  <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-800 font-bold">
                    {user.role}
                  </span>
                </button>
                <button
                  id="btn-nav-logout"
                  onClick={() => logout()}
                  className="p-1.5 rounded-xl text-neutral-400 hover:text-red-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-transparent hover:border-neutral-200 transition-all cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                id="btn-nav-login"
                onClick={() => onNavigate("login")}
                className={`px-3 py-1.5 rounded-xl border text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                  currentPage === "login"
                    ? "bg-neutral-900 dark:bg-white dark:bg-white text-white dark:text-neutral-900 dark:bg-cyan-500 border-transparent shadow-xs font-bold"
                    : "bg-white dark:bg-neutral-900 dark:bg-white hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border-neutral-300 dark:border-neutral-700"
                }`}
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
            )}

            {/* Primary Diagnostic Action Button */}
            <button
              id="btn-nav-growth-blueprint"
              onClick={() => onNavigate("diagnostic")}
              className="px-3.5 py-1.5 rounded-xl bg-neutral-900 dark:bg-white hover:bg-neutral-900 dark:hover:bg-white text-white dark:text-neutral-900 font-mono text-xs font-bold shadow-sm hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer ml-1"
            >
              <span>Get Blueprint</span>
              <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div
            id="nav-mobile-controls"
            className="flex lg:hidden items-center gap-2"
          >
            <ThemeSelector compact />

            <button
              id="btn-mobile-search"
              onClick={onOpenSearch}
              className="p-2 rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 cursor-pointer"
              aria-label="Open Search"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              id="btn-mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 focus:outline-none cursor-pointer"
              aria-label={
                mobileMenuOpen
                  ? "Close Navigation Menu"
                  : "Open Navigation Menu"
              }
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation-drawer"
            className="lg:hidden bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-4 space-y-3 mt-3 rounded-2xl shadow-2xl animate-in fade-in slide-in-from-top-3 max-h-[85vh] overflow-y-auto"
          >
            {/* User status card in mobile drawer */}
            {user ? (
              <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                <button
                  onClick={() => {
                    onNavigate("portal");
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2.5 text-left cursor-pointer"
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center font-bold text-xs">
                      {user.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <div className="text-xs font-bold text-neutral-900 dark:text-white flex items-center gap-1">
                      <span>{user.name}</span>
                      <ArrowRight className="w-3 h-3 text-cyan-400" />
                    </div>
                    <div className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 uppercase">
                      {user.role} &bull; {user.company}
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-red-500"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                id="btn-mobile-portal"
                onClick={() => {
                  onNavigate("login");
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-800 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white font-mono text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogIn className="w-4 h-4 text-cyan-500" />
                <span>Sign In / Register</span>
              </button>
            )}

            {/* Navigation Routes */}
            <div className="space-y-1">
              {navLinks.map((link) => {
                const isActive = currentPage === link.page && !link.anchorId;

                if (link.hasDropdown) {
                  return (
                    <div key={link.label} className="space-y-1">
                      <button
                        onClick={() =>
                          setMobileServicesOpen(!mobileServicesOpen)
                        }
                        className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-mono flex items-center justify-between cursor-pointer ${
                          isActive
                            ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white dark:text-neutral-900 dark:text-cyan-300 font-bold"
                            : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800/40"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span>{link.label}</span>
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300">
                            8 Capabilities
                          </span>
                        </div>
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`}
                        />
                      </button>

                      {mobileServicesOpen && (
                        <div className="pl-4 pr-1 py-1 space-y-1 bg-neutral-50 dark:bg-neutral-800 /60 rounded-xl border border-neutral-100">
                          {EIGHT_SERVICES.map((svc) => (
                            <button
                              key={svc.id}
                              onClick={() => {
                                onNavigate("services");
                                setMobileMenuOpen(false);
                              }}
                              className="w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] font-mono text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white flex items-center justify-between cursor-pointer"
                            >
                              <span className="truncate">{svc.title}</span>
                              <span className="text-[10px] text-neutral-400 font-bold">
                                {svc.number}
                              </span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <button
                    key={link.label}
                    onClick={() => {
                      onNavigate(link.page, link.anchorId);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-mono flex items-center justify-between cursor-pointer ${
                      isActive
                        ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white dark:text-neutral-900 dark:text-cyan-300 font-bold"
                        : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800/40"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{link.label}</span>
                      {link.badge && (
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-700 border border-cyan-500/20 font-semibold">
                          {link.badge}
                        </span>
                      )}
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
                  </button>
                );
              })}
            </div>

            {/* Quick Action Drawer CTAs */}
            <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 space-y-2">
              <button
                id="btn-mobile-growth-blueprint"
                onClick={() => {
                  onNavigate("diagnostic");
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 rounded-xl bg-neutral-900 dark:bg-white hover:bg-neutral-900 dark:hover:bg-white text-white dark:text-neutral-900 font-mono text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Free 30-Min Growth Blueprint</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="btn-mobile-ask-ai"
                onClick={() => {
                  onOpenAiAssistant();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-neutral-800 dark:text-neutral-300 font-mono text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Bot className="w-4 h-4 text-cyan-500" />
                <span>Ask Maha Growth AI Advisor (⌘J)</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
