import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PageId } from "./types";
import { SidebarNavigation } from "./components/SidebarNavigation";
import { Footer } from "./components/Footer";
import { SearchModal } from "./components/SearchModal";
import { AiAssistantModal } from "./components/AiAssistantModal";
import { HomePage } from "./pages/HomePage";
import { ServicesPage } from "./pages/ServicesPage";
import { PricingPage } from "./pages/PricingPage";
import { CaseStudiesPage } from "./pages/CaseStudiesPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { LoginPage } from "./pages/LoginPage";
import { ClientPortalPage } from "./pages/ClientPortalPage";
import { DataStudioPage } from "./pages/DataStudioPage";
import { PerformanceMarketingPage } from "./pages/PerformanceMarketingPage";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { GrowthDiagnosticTool } from "./components/GrowthDiagnosticTool";
import { AiAdvantageSandbox } from "./components/AiAdvantageSandbox";
import { JourneyTimeline } from "./components/JourneyTimeline";
import { Bot, Sparkles, ArrowRight } from "lucide-react";

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>("home");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
  const [aiAssistantInitialPrompt, setAiAssistantInitialPrompt] = useState<
    string | undefined
  >();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Global Keyboard shortcuts: Cmd+K / Ctrl+K for Search, Cmd+J for AI Assistant
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "j") {
        e.preventDefault();
        setIsAiAssistantOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleNavigate = (page: PageId, anchorId?: string) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false); // Close mobile menu on navigate
    if (anchorId) {
      setTimeout(() => {
        const element = document.getElementById(anchorId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleOpenAiAssistant = (prompt?: string) => {
    setAiAssistantInitialPrompt(prompt);
    setIsAiAssistantOpen(true);
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen bg-[var(--bg-canvas)] text-[var(--text-heading)] flex transition-colors duration-300 selection:bg-cyan-400 selection:text-black">
          {/* Sidebar Navigation */}
          <SidebarNavigation
            currentPage={currentPage}
            onNavigate={handleNavigate}
            onOpenAiAssistant={() => handleOpenAiAssistant()}
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />

          {/* Main Content Area (Offset by Sidebar on Desktop) */}
          <div className="flex-1 flex flex-col min-h-screen min-w-0 lg:pl-64 pt-16 lg:pt-0 transition-all duration-300 relative">
            <main
              className="flex-1 overflow-x-hidden"
              style={{ perspective: "1200px" }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0, y: 20, scale: 0.985, rotateX: 2 }}
                  animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                  exit={{ opacity: 0, y: -16, scale: 0.985, rotateX: -2 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformStyle: "preserve-3d" }}
                  className="w-full h-full flex flex-col"
                >
                  {currentPage === "home" && (
                    <HomePage
                      onNavigate={handleNavigate}
                      onOpenAiAssistant={() => handleOpenAiAssistant()}
                    />
                  )}

                  {currentPage === "data-studio" && (
                    <DataStudioPage onNavigate={handleNavigate} />
                  )}

                  {currentPage === "performance" && (
                    <PerformanceMarketingPage onNavigate={handleNavigate} />
                  )}

                  {currentPage === "services" && (
                    <ServicesPage onNavigate={handleNavigate} />
                  )}

                  {currentPage === "pricing" && (
                    <PricingPage onNavigate={handleNavigate} />
                  )}

                  {currentPage === "case-studies" && (
                    <CaseStudiesPage onNavigate={handleNavigate} />
                  )}

                  {currentPage === "about" && (
                    <AboutPage onNavigate={handleNavigate} />
                  )}

                  {currentPage === "contact" && (
                    <ContactPage onNavigate={handleNavigate} />
                  )}

                  {/* User Login Gateway */}
                  {currentPage === "login" && (
                    <LoginPage onNavigate={handleNavigate} />
                  )}
                  {currentPage === "portal" && (
                    <ClientPortalPage onNavigate={handleNavigate} />
                  )}

                  {/* Dedicated AI Advantage Page */}
                  {currentPage === "ai-advantage" && (
                    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
                      <div className="text-center max-w-3xl mx-auto space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono font-semibold">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>AI POWER-UPS SIMULATOR</span>
                        </div>
                        <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
                          Where AI Becomes Your Biggest Business Advantage
                        </h1>
                        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
                          Test our 5 core AI capabilities: 24/7 Customer Agents,
                          Marketing Copilots, Natural Language Data
                          Intelligence, Workflow Automation, and Sales Research.
                        </p>
                      </div>
                      <AiAdvantageSandbox />
                    </div>
                  )}

                  {/* Dedicated Growth Journey Page */}
                  {currentPage === "journey" && (
                    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
                      <div className="text-center max-w-3xl mx-auto space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono font-semibold">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>PROGRESSION ARCHITECTURE</span>
                        </div>
                        <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
                          The Journey: START &rarr; GROW &rarr; AUTOMATE &rarr;
                          SCALE
                        </h1>
                        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
                          Explore how we take businesses from foundational
                          launch to autonomous high-margin scale, plus our
                          5-year master roadmap from service to SaaS platform.
                        </p>
                      </div>
                      <JourneyTimeline />
                    </div>
                  )}

                  {/* Dedicated Growth Diagnostic Calculator Page */}
                  {currentPage === "diagnostic" && (
                    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
                      <div className="text-center max-w-3xl mx-auto space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono font-semibold">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>COMPLIMENTARY AUDIT</span>
                        </div>
                        <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
                          Interactive Growth Diagnostic Engine
                        </h1>
                        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
                          Select your business stage and current operational
                          bottlenecks to generate a custom 90-day growth
                          blueprint with projected ROI and timeline.
                        </p>
                      </div>
                      <GrowthDiagnosticTool
                        onScheduleCall={() => handleNavigate("contact")}
                      />
                    </div>
                  )}

                  {/* Fallback for legacy pages (redirect gracefully to services or about) */}
                  {[
                    "technology",
                    "products",
                    "solutions",
                    "industries",
                    "research",
                    "developers",
                    "security",
                    "careers",
                    "blog",
                  ].includes(currentPage) && (
                    <ServicesPage onNavigate={handleNavigate} />
                  )}
                </motion.div>
              </AnimatePresence>
            </main>

            {/* Persistent Enterprise Footer */}
            <Footer
              onNavigate={handleNavigate}
              onOpenAiAssistant={() => handleOpenAiAssistant()}
            />

            {/* Global Search Modal */}
            <SearchModal
              isOpen={isSearchOpen}
              onClose={() => setIsSearchOpen(false)}
              onNavigate={handleNavigate}
            />

            {/* AI Assistant Modal (Gemini Powered) */}
            <AiAssistantModal
              isOpen={isAiAssistantOpen}
              onClose={() => setIsAiAssistantOpen(false)}
              initialPrompt={aiAssistantInitialPrompt}
            />

            {/* Floating Bottom-Right AI Assistant Bubble */}
            {!isAiAssistantOpen && (
              <button
                onClick={() => handleOpenAiAssistant()}
                className="fixed bottom-6 right-6 z-40 px-4 py-3 rounded-full bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-900 dark:text-white font-mono text-xs font-semibold shadow-xl border border-neutral-300 dark:border-neutral-800 flex items-center gap-2.5 transition-all hover:scale-105 group"
                title="Open Maha Growth AI Assistant (Cmd+J)"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </span>
                <Bot className="w-4 h-4 text-neutral-900 dark:text-white" />
                <span className="hidden sm:inline">Ask Growth AI</span>
                <span className="text-[10px] opacity-70 bg-neutral-200 dark:bg-neutral-700 px-1.5 py-0.5 rounded font-mono hidden md:inline text-neutral-900 dark:text-white">
                  ⌘J
                </span>
              </button>
            )}
          </div>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}
