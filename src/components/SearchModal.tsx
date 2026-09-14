import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  X,
  ArrowRight,
  Layers,
  FileText,
  Briefcase,
  Shield,
  Cpu,
  Bot,
  Sparkles,
  Workflow,
  BarChart3,
  TrendingUp,
} from "lucide-react";
import { PageId } from "../types";
import {
  EIGHT_SERVICES,
  AI_ADVANTAGE_TOOLS,
  JOURNEY_STAGES,
  REVENUE_MODELS,
  CASE_STUDIES,
} from "../data/companyData";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: PageId, anchorId?: string) => void;
}

interface SearchItem {
  id: string;
  title: string;
  category: string;
  snippet: string;
  page: PageId;
  anchor?: string;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Search items index
  const allItems: SearchItem[] = useMemo(() => {
    const items: SearchItem[] = [
      {
        id: "page-home",
        title: "Platform Overview",
        category: "Overview",
        snippet:
          "The all-in-one AI-powered business growth platform combining AI, tech, marketing, data, and strategy",
        page: "home",
      },
      {
        id: "page-services",
        title: "All 8 Growth Services",
        category: "Services",
        snippet:
          "Web & Product, Growth Marketing, AI Solutions, Automation, Analytics, Strategy, Brand, Training",
        page: "services",
      },
      {
        id: "page-ai",
        title: "AI Advantage Simulator",
        category: "AI Tools",
        snippet:
          "Test-drive AI Customer Agent, Marketing Copilot, Data Intelligence, and Automation",
        page: "ai-advantage",
      },
      {
        id: "page-journey",
        title: "Growth Journey (START to SCALE)",
        category: "Roadmap",
        snippet:
          "Our 4-stage client transformation and 5-year service-to-SaaS master roadmap",
        page: "journey",
      },
      {
        id: "page-pricing",
        title: "Engagement & Partnership Models",
        category: "Partnerships",
        snippet:
          "Targeted Growth Sprints, Strategic Retainers, Executive Advisory, Managed Systems, and SaaS platform",
        page: "pricing",
      },
      {
        id: "page-cases",
        title: "Enterprise Case Studies & Architecture",
        category: "Outcomes",
        snippet:
          "Engineering specifications and quantifiable transformations across B2B, healthcare, and e-commerce",
        page: "case-studies",
      },
      {
        id: "page-diag",
        title: "Growth Diagnostic Calculator",
        category: "Tools",
        snippet:
          "Calculate your custom 90-day AI growth blueprint and ROI projection",
        page: "diagnostic",
      },
      {
        id: "page-login",
        title: "Client & Executive Login",
        category: "Authentication",
        snippet:
          "Secure 256-bit encrypted sign-in and client account registration with role-based access",
        page: "login",
      },
      {
        id: "page-about",
        title: "About & Leadership Vision",
        category: "Company",
        snippet:
          "Why one strategic growth partner beats hiring five separate agencies",
        page: "about",
      },
      {
        id: "page-contact",
        title: "Schedule 30-Min Strategy Walkthrough",
        category: "Contact",
        snippet:
          "Request a complimentary growth audit and preliminary strategy dossier",
        page: "contact",
      },
    ];

    // Add 8 Services
    EIGHT_SERVICES.forEach((s) => {
      items.push({
        id: `svc-${s.id}`,
        title: s.title,
        category: "Service",
        snippet: `${s.shortDesc} — Impact: ${s.businessImpact}`,
        page: "services",
      });
    });

    // Add AI Advantage Tools
    AI_ADVANTAGE_TOOLS.forEach((t) => {
      items.push({
        id: `tool-${t.id}`,
        title: t.title,
        category: "AI Power-Up",
        snippet: `${t.subtitle}: ${t.description.slice(0, 90)}...`,
        page: "ai-advantage",
      });
    });

    // Add Journey Stages
    JOURNEY_STAGES.forEach((st) => {
      items.push({
        id: `stage-${st.id}`,
        title: `Stage: ${st.title} (${st.tagline})`,
        category: "Journey Stage",
        snippet: st.description,
        page: "journey",
      });
    });

    // Add Engagement Models
    REVENUE_MODELS.forEach((m) => {
      items.push({
        id: `model-${m.stream}`,
        title: `${m.stream} (${m.cadence})`,
        category: "Partnership Model",
        snippet: m.description,
        page: "pricing",
      });
    });

    // Add Case Studies
    CASE_STUDIES.forEach((cs) => {
      items.push({
        id: `cs-${cs.id}`,
        title: `${cs.client} — Case Study`,
        category: "Case Study",
        snippet: `${cs.industry}: ${cs.metrics[0].label} (${cs.metrics[0].value})`,
        page: "case-studies",
      });
    });

    return items;
  }, []);

  const filteredItems = useMemo(() => {
    if (!query.trim()) return allItems.slice(0, 8);
    const q = query.toLowerCase();
    return allItems
      .filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.snippet.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q),
      )
      .slice(0, 8);
  }, [query, allItems]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex(
          (prev) => (prev + 1) % Math.max(1, filteredItems.length),
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(
          (prev) =>
            (prev - 1 + filteredItems.length) %
            Math.max(1, filteredItems.length),
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          const target = filteredItems[selectedIndex];
          onNavigate(target.page, target.anchor);
          onClose();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onNavigate, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-neutral-900 dark:bg-white backdrop-blur-md"
      style={{ perspective: "1200px" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.93, y: -20, rotateX: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
        exit={{ opacity: 0, scale: 0.93, y: -20, rotateX: 8 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformStyle: "preserve-3d" }}
        className="w-full max-w-2xl bg-[#0B0E17] border border-white dark:border-neutral-900 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="flex items-center px-4 py-3.5 border-b border-white dark:border-neutral-900 bg-[#0E1220]">
          <Search className="w-5 h-5 text-cyan-400 mr-3 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search services, AI tools, growth stages, partnership models, or case studies..."
            className="w-full bg-transparent text-sm text-white dark:text-neutral-900 placeholder-slate-400 focus:outline-none font-mono"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-slate-400 hover:text-white dark:hover:text-neutral-900 mr-2 text-xs font-mono"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-white dark:hover:text-neutral-900 hover:bg-white dark:hover:bg-neutral-900"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-white/5">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs font-mono space-y-1">
              <p>No results found for &ldquo;{query}&rdquo;</p>
              <p className="text-slate-500">
                Try searching &ldquo;automation&rdquo;, &ldquo;models&rdquo;,
                &ldquo;customer agent&rdquo;, or &ldquo;services&rdquo;
              </p>
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.page, item.anchor);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full text-left p-3 rounded-xl transition-all flex items-start justify-between gap-4 ${
                    isSelected
                      ? "bg-cyan-500/15 border border-cyan-500/30 text-white dark:text-neutral-900"
                      : "hover:bg-white dark:hover:bg-neutral-900 dark:bg-neutral-900 dark:bg-white/5 text-slate-300"
                  }`}
                >
                  <div className="space-y-1 overflow-hidden">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white dark:bg-neutral-900 border border-white dark:border-neutral-900 text-cyan-400 font-semibold uppercase">
                        {item.category}
                      </span>
                      <span className="text-xs font-bold text-white dark:text-neutral-900 truncate">
                        {item.title}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 truncate">
                      {item.snippet}
                    </p>
                  </div>
                  <ArrowRight
                    className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? "translate-x-1 text-cyan-400" : "text-slate-600"}`}
                  />
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-[#080A12] border-t border-white dark:border-neutral-900 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-3">
            <span>&uarr;&darr; Navigate</span>
            <span>&crarr; Select</span>
            <span>ESC Close</span>
          </div>
          <span className="text-cyan-400">Maha Growth Index</span>
        </div>
      </motion.div>
    </div>
  );
};
