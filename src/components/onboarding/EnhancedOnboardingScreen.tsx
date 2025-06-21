import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import OptimizedImage from "@/components/common/OptimizedImage";

// Simplified orb config: 2 orbs, less intense effects
const ORB_CONFIG = [
  { top: "20%", left: "12%", size: "48", delay: "0s", color: "rgba(198,180,255,0.16)" },
  { top: "70%", left: "80%", size: "64", delay: "0.5s", color: "rgba(246,208,222,0.18)" },
];

const EnhancedOnboardingScreen = () => {
  const [showContent, setShowContent] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const t1 = setTimeout(() => setShowContent(true), 300);
    const t2 = setTimeout(() => setShowButton(true), 600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const handleGetStarted = () => {
    navigate("/signup-choice");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#e1d4f5] via-[#f6ebe3] to-[#fce8ef]">
      <div
        className="absolute inset-0 z-0 enhanced-splash-bg will-change-transform"
        style={{ animationDuration: "6s" }}
      />

      {ORB_CONFIG.map((orb, i) => (
        <div
          key={i}
          className="pointer-events-none absolute rounded-full opacity-70 splash-orb"
          style={{
            top: orb.top,
            left: orb.left,
            width: orb.size + "px",
            height: orb.size + "px",
            background: orb.color,
            filter: "blur(2.5px)",
            animationDelay: orb.delay,
            zIndex: 1,
            willChange: "transform",
          }}
        />
      ))}

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 w-full text-center">
        {/* Top text */}
        <div
          className={`mb-2 font-inter text-base md:text-lg tracking-wide text-[#2e4059]/60 transition-all duration-300 ${
            showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Welcome to
        </div>

        {/* LOGO */}
        <div className="mb-8 flex flex-col items-center">
          <div
            className={`transition-all duration-500 ease-cubic
              opacity-100 scale-100 splash-logo-glow
            `}
            style={{ transitionProperty: "opacity, transform" }}
            aria-label="Bridge For Couples Logo"
          >
            <div className="relative">
              <OptimizedImage
                src="/lovable-uploads/a76cbc57-66f5-47a4-9713-382f8a512e91.png"
                alt="Bridge For Couples"
                className="w-64 md:w-72 h-auto rounded-[28px] shadow-glow"
                priority={true}
              />
            </div>
          </div>
        </div>

        {/* HEADLINE & SUBTITLE */}
        <div className="max-w-2xl space-y-4">
          <div
            className={`font-cormorant 
              text-2xl md:text-3xl lg:text-4xl font-semibold 
              text-[#2e4059] leading-tight mb-2
              transition-all duration-350
              ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}
            `}
            style={{ transitionDelay: showContent ? "0ms" : "0ms" }}>
            A fresh start for couples.<br />
            Tools. Clarity. Hope.
          </div>

          <div
            className={`transition-all duration-350
              text-base md:text-lg text-[#2e4059]/85 font-inter leading-relaxed mx-auto
              ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
            `}
            style={{ transitionDelay: "70ms" }}>
            Bridge for Couples helps you talk through conflict with clarity, respect, and emotional intelligence.
          </div>
        </div>

        {/* CTA BUTTON */}
        <div
          className={`pt-8 md:pt-10 transition-all duration-250
            ${showButton ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-2"}
          `}
          style={{ transitionDelay: "130ms" }}>
          <Button
            onClick={handleGetStarted}
            size="lg"
            className={`
              relative overflow-hidden font-semibold text-lg px-10 py-4 rounded-2xl
              bg-white/40 border border-white/30 text-[#2e4059] shadow-xl
              shadow-[#e6d6f6]/50 backdrop-blur-md
              glassmorphic-button hover:bg-white/60 hover:shadow-2xl
              transition-all duration-200
              focus-visible:ring-2 focus-visible:ring-[#cac2ec]
            `}
            style={{ minWidth: 200 }}
            tabIndex={0}
          >
            <span className="relative z-10 flex items-center gap-2">
              Let&apos;s Get Started
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-150" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            {/* Button glass shimmer */}
            <span className="absolute left-[-80%] top-0 w-[180%] h-full pointer-events-none glass-shimmer"
              aria-hidden="true"
            ></span>
          </Button>
        </div>

        {/* Legal links with smaller text */}
        <div className="mt-10 text-center text-[10px] text-[#2e4059]/60 font-inter">
          By continuing, you agree to our{" "}
          <Link to="/terms" className="underline hover:text-[#D36B4B] transition-colors duration-150">Terms of Service</Link>
          {" "}and{" "}
          <Link to="/privacy" className="underline hover:text-[#D36B4B] transition-colors duration-150">Privacy Policy</Link>
          .
        </div>
      </div>
    </div>
  );
};

export default EnhancedOnboardingScreen;
