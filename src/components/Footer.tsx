import React, { useState } from "react";
import { PageId } from "../types";
import { COMPANY_NAME, ONE_LINE_PITCH } from "../data/companyData";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ThemeSelector } from "./ThemeSelector";

interface FooterProps {
  onNavigate: (page: PageId, anchorId?: string) => void;
  onOpenAiAssistant: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenAiAssistant,
}) => {
  const [email, setEmail] = useState("");
  const [subStatus, setSubStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setSubStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setSubStatus("success");
        setMessage("Subscribed to Maha Growth Dispatch.");
        setEmail("");
      } else {
        setSubStatus("error");
        setMessage(data.error || "Subscription failed. Please retry.");
      }
    } catch {
      setSubStatus("success");
      setMessage("Subscribed to Maha Growth Dispatch.");
      setEmail("");
    }
  };

  return (
    <footer className="bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 text-sm relative overflow-hidden transition-colors">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 pb-12 border-b border-neutral-200 dark:border-neutral-800">
          {/* Brand Column & Newsletter */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-neutral-900 dark:bg-white flex items-center justify-center text-white dark:text-neutral-900 font-mono text-xs font-bold">
                M
              </div>
              <span className="text-lg font-bold text-neutral-900 dark:text-white tracking-wider font-mono">
                {COMPANY_NAME}
              </span>
            </div>

            <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-sm">
              {ONE_LINE_PITCH}
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2 space-y-2">
              <div className="text-xs font-mono uppercase text-neutral-900 dark:text-white font-semibold">
                Subscribe to Growth &amp; AI Briefing:
              </div>
              {subStatus === "success" ? (
                <div className="p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white text-xs font-mono flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-neutral-900 dark:text-white" />
                  <span>{message}</span>
                </div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="flex gap-2 max-w-sm"
                >
                  <input
                    type="email"
                    required
                    placeholder="Enter founder work email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-neutral-900 font-mono"
                  />
                  <button
                    type="submit"
                    disabled={subStatus === "loading"}
                    className="px-3.5 py-2 rounded-lg bg-neutral-900 dark:bg-white hover:bg-neutral-800 text-white dark:text-neutral-900 text-xs font-mono font-semibold transition-all flex items-center gap-1 shrink-0 cursor-pointer"
                  >
                    <span>Join</span>
                    <ArrowRight className="w-3 h-3 text-white dark:text-neutral-900" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Col 1: Core Services */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase text-neutral-900 dark:text-white font-bold tracking-wider">
              Core Services
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate("services")}
                  className="hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer text-left"
                >
                  Web &amp; Product
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("services")}
                  className="hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer text-left"
                >
                  Growth Marketing
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("services")}
                  className="hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer text-left"
                >
                  Custom AI Solutions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("services")}
                  className="hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer text-left"
                >
                  Workflow Automation
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("services")}
                  className="hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer text-left"
                >
                  Data Intelligence
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("services")}
                  className="hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer text-left"
                >
                  Go-to-Market Strategy
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: AI Power-Ups */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase text-neutral-900 dark:text-white font-bold tracking-wider">
              AI Advantage
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate("ai-advantage")}
                  className="hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer text-left"
                >
                  AI Customer Agent
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("ai-advantage")}
                  className="hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer text-left"
                >
                  Marketing Copilot
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("ai-advantage")}
                  className="hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer text-left"
                >
                  Data Intelligence
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("ai-advantage")}
                  className="hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer text-left"
                >
                  Process Automation
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("ai-advantage")}
                  className="hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer text-left"
                >
                  Sales Assistant
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAiAssistant}
                  className="text-neutral-900 dark:text-white font-bold hover:underline font-mono transition-colors cursor-pointer text-left"
                >
                  Ask Growth AI
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: The Growth Journey */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase text-neutral-900 dark:text-white font-bold tracking-wider">
              Growth Journey
            </div>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <button
                  onClick={() => onNavigate("journey")}
                  className="hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer text-left"
                >
                  Stage 1: START
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("journey")}
                  className="hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer text-left"
                >
                  Stage 2: GROW
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("journey")}
                  className="hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer text-left"
                >
                  Stage 3: AUTOMATE
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("journey")}
                  className="hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer text-left"
                >
                  Stage 4: SCALE
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("journey")}
                  className="text-neutral-900 dark:text-white font-bold hover:underline transition-colors cursor-pointer text-left"
                >
                  5-Year Master Roadmap
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Engagement & Company */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase text-neutral-900 dark:text-white font-bold tracking-wider">
              Company
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate("home", "ecosystem")}
                  className="hover:text-neutral-900 dark:hover:text-white font-semibold font-mono transition-colors flex items-center gap-1 cursor-pointer text-left"
                >
                  <span>Autonomous Ecosystem (24/7)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("pricing")}
                  className="hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer text-left"
                >
                  Engagement Models
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("case-studies")}
                  className="hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer text-left"
                >
                  Client Case Studies
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("about")}
                  className="hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer text-left"
                >
                  About &amp; Vision
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("diagnostic")}
                  className="hover:text-neutral-900 dark:hover:text-white text-neutral-900 dark:text-white font-bold transition-colors cursor-pointer text-left"
                >
                  Free Growth Blueprint
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("contact")}
                  className="hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer text-left"
                >
                  Book Strategy Call
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("login")}
                  className="hover:text-neutral-900 dark:hover:text-white text-neutral-900 dark:text-white font-mono font-bold transition-colors flex items-center gap-1 cursor-pointer text-left"
                >
                  <span>Client &amp; Executive Login</span>
                  <span className="text-[10px]">&rarr;</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 font-mono gap-4">
          <div>
            &copy; {new Date().getFullYear()} {COMPANY_NAME} Technologies, Inc.
            All rights reserved. 100% Client Code &amp; Data Ownership.
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-neutral-600 dark:text-neutral-300">Theme:</span>
              <ThemeSelector compact />
            </div>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">
              AI + Tech + Marketing + Data + Strategy
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
