
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import OptimizedImage from "@/components/common/OptimizedImage";

// Animated orb positions for floating effect
const ORB_CONFIG = [
  { top: "18%", left: "10%", size: "56", delay: "0s", color: "rgba(198,180,255,0.20)" },
  { top: "65%", left: "85%", size: "80", delay: "1.1s", color: "rgba(246,208,222,0.20)" },
  { top: "75%", left: "17%", size: "34", delay: "2s", color: "rgba(255,233,180,0.14)" },
];

const EnhancedOnboardingScreen = () => {
  const [showLogo, setShowLogo] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setShowLogo(true);
    const t1 = setTimeout(() => setShowContent(true), 600);
    const t2 = setTimeout(() => setShowButton(true), 1300);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const handleGetStarted = () => {
    navigate("/signup-choice");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#e1d4f5] via-[#f6ebe3] to-[#fce8ef]">
      {/* Animated dynamic gradient background */}
      <div className="absolute inset-0 z-0 animate-moving-gradient enhanced-splash-bg" />

      {/* Floating orbs */}
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
            filter: "blur(3px)",
            animationDelay: orb.delay,
            zIndex: 1,
          }}
        />
      ))}

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 w-full text-center">
        {/* Top text */}
        <div
          className={`mb-2 font-inter text-base md:text-lg tracking-wide text-[#2e4059]/60 transition-all duration-500 ${showLogo ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          Welcome to
        </div>

        {/* LOGO: pop-in + glow animation */}
        <div className="mb-8 flex flex-col items-center">
          <div
            className={`transition-all 
              duration-900 ease-cubic 
              ${showLogo ? "opacity-100 scale-100 splash-logo-glow" : "opacity-0 scale-90"}
            `}
            style={{ transitionProperty: "opacity, transform" }}
          >
            <div className="relative">
              <OptimizedImage
                src="/lovable-uploads/a76cbc57-66f5-47a4-9713-382f8a512e91.png"
                alt="Bridge For Couples"
                className="w-72 md:w-80 h-auto rounded-[30px] shadow-glow"
                priority={true}
              />
            </div>
          </div>
        </div>

        {/* HEADLINE & SUBTITLE */}
        <div className="max-w-2xl space-y-5">
          {/* Headline */}
          <div
            className={`font-cormorant 
              text-3xl md:text-4xl lg:text-5xl font-semibold 
              text-[#2e4059] leading-tight mb-3
              transition-all duration-800 
              ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
            `}
            style={{ transitionDelay: showContent ? "0ms" : "0ms" }}>
            Every couple hits a rough patch.<br />
            Not every couple has a tool for it.
          </div>

          {/* Subtitle */}
          <div
            className={`transition-all duration-700
              text-lg md:text-xl text-[#2e4059]/85 font-inter leading-relaxed mx-auto
              ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
            `}
            style={{ transitionDelay: "120ms" }}>
            Bridge for Couples helps you talk through conflict with clarity, respect, and emotional intelligence.
          </div>
        </div>

        {/* CTA BUTTON */}
        <div
          className={`pt-8 md:pt-12 transition-all duration-600
            ${showButton ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"}
          `}
          style={{ transitionDelay: "200ms" }}>
          <Button
            onClick={handleGetStarted}
            size="lg"
            className={`
              relative overflow-hidden font-semibold text-lg px-10 py-4 rounded-2xl
              bg-white/40 border border-white/30 text-[#2e4059] shadow-xl
              shadow-[#e6d6f6]/50 backdrop-blur-md
              glassmorphic-button hover:bg-white/60 hover:shadow-2xl
              transition-all duration-300
            `}
            style={{ minWidth: 200 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Let's Get Started
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
      </div>
    </div>
  );
};

export default EnhancedOnboardingScreen;
