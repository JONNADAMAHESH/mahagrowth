import React, { useState } from "react";
import { FOUNDER_DATA } from "../data/companyData";
import {
  Award,
  CheckCircle2,
  Sparkles,
  Cpu,
  Layers,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { PageId } from "../types";

interface FounderProfileCardProps {
  onNavigate?: (page: PageId, anchorId?: string) => void;
  compact?: boolean;
}

export const FounderProfileCard: React.FC<FounderProfileCardProps> = ({
  onNavigate,
  compact = false,
}) => {
  const [photoSrc, setPhotoSrc] = useState<string>(
    FOUNDER_DATA.image || "/jonnada-mahesh.png",
  );

  const handleImageError = () => {
    // If primary PNG fails, fallback to JPG
    if (photoSrc !== "/jonnada-mahesh.jpg") {
      setPhotoSrc("/jonnada-mahesh.jpg");
    }
  };

  return (
    <div
      id="executive-leadership-card"
      className="relative rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 p-6 sm:p-8 lg:p-10 shadow-xl overflow-hidden text-neutral-900 dark:text-white"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Official CEO Portrait */}
        <div className="lg:col-span-5 flex flex-col items-center text-center space-y-4">
          <div className="relative group">
            {/* Clean Monochrome Frame */}
            <div className="relative w-64 h-76 sm:w-72 sm:h-84 rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 border-2 border-neutral-300 dark:border-neutral-800 shadow-lg flex flex-col items-center justify-center">
              <img
                src={photoSrc}
                alt={`${FOUNDER_DATA.name} - ${FOUNDER_DATA.role}`}
                referrerPolicy="no-referrer"
                onError={handleImageError}
                className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                loading="eager"
              />
            </div>
          </div>

          {/* Verification Badges */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-center gap-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white text-xs font-mono font-bold uppercase tracking-wider">
                <Award className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
                Executive Leadership
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-800 text-neutral-800 dark:text-neutral-300 text-xs font-mono font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
                Verified
              </span>
            </div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
              Maha Growth HQ • Direct Strategic Oversight
            </div>
          </div>
        </div>

        {/* Right Column: Executive Profile, Vision & Bio */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
              <span>Founder &amp; Chief Executive Officer</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
              {FOUNDER_DATA.name}
            </h3>
            <p className="text-base sm:text-lg text-neutral-700 dark:text-neutral-300 font-mono font-semibold">
              Founder &amp; CEO, Maha Growth
            </p>
          </div>

          {/* Executive Vision Quote */}
          <div className="p-4 sm:p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border-l-4 border-neutral-900 dark:border-white border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-300 italic text-sm sm:text-base leading-relaxed">
            "{FOUNDER_DATA.quote}"
          </div>

          {/* Bio paragraphs */}
          <div className="space-y-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
            <p>{FOUNDER_DATA.bio[0]}</p>
            {!compact && (
              <>
                <p>{FOUNDER_DATA.bio[1]}</p>
                <p>{FOUNDER_DATA.bio[2]}</p>
              </>
            )}
          </div>

          {/* Strategic Focus Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {FOUNDER_DATA.focusAreas.map((area, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 transition-colors space-y-1"
              >
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-900 dark:text-white font-bold">
                  {idx === 0 && (
                    <Cpu className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
                  )}
                  {idx === 1 && (
                    <Layers className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
                  )}
                  {idx === 2 && (
                    <Sparkles className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
                  )}
                  {idx === 3 && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
                  )}
                  <span>{area.title}</span>
                </div>
                <div className="text-xs text-neutral-600 dark:text-neutral-300">{area.desc}</div>
              </div>
            ))}
          </div>

          {/* Actions & Navigation */}
          {onNavigate && (
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="btn-leadership-read-story"
                type="button"
                onClick={() => onNavigate("about")}
                className="px-5 py-2.5 rounded-xl bg-neutral-900 dark:bg-white hover:bg-neutral-800 text-white dark:text-neutral-900 font-bold text-xs sm:text-sm transition shadow-md flex items-center gap-2 cursor-pointer"
              >
                <span>Read Full Leadership Story</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                id="btn-leadership-contact"
                type="button"
                onClick={() => onNavigate("contact")}
                className="px-5 py-2.5 rounded-xl bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-900 dark:text-white font-medium text-xs sm:text-sm border border-neutral-300 dark:border-neutral-800 transition flex items-center gap-2 cursor-pointer"
              >
                <span>Schedule Executive Consultation</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
