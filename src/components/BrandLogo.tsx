import React from "react";

interface BrandLogoProps {
  variant?: "horizontal" | "stacked" | "badge" | "iconOnly" | "footer";
  className?: string;
  theme?: "light" | "dark" | "color"; // light = for red/dark backgrounds, dark = for cream/white backgrounds
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = "horizontal",
  className = "",
  theme = "light",
}) => {
  const isLight = theme === "light";

  if (variant === "iconOnly") {
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10 drop-shadow-md transition-transform hover:scale-105"
        >
          {/* Yellow brush/circle base */}
          <ellipse
            cx="32"
            cy="32"
            rx="30"
            ry="28"
            fill="#FFC62B"
            stroke="#4A2A17"
            strokeWidth="2.5"
          />
          {/* Red inner circle ring */}
          <circle cx="32" cy="32" r="23" fill="#B3121B" />
          {/* Chef Hat with Crown / Dimsum Steam */}
          <path
            d="M24 38H40C41.1 38 42 37.1 42 36V34C42 33.2 41.5 32.5 40.8 32.2C42.8 30.8 44 28.5 44 26C44 22.7 41.3 20 38 20C37.5 20 37 20.1 36.6 20.2C35.5 17.7 33 16 30 16C26.5 16 23.6 18.3 22.8 21.5C22.2 21.2 21.6 21 21 21C18.2 21 16 23.2 16 26C16 28.3 17.3 30.3 19.2 31.4C18.5 31.9 18 32.7 18 33.7V36C18 37.1 18.9 38 20 38H24Z"
            fill="#FAF3E3"
            stroke="#4A2A17"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Chef Hat pleats */}
          <line x1="26" y1="26" x2="26" y2="34" stroke="#4A2A17" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="32" y1="24" x2="32" y2="34" stroke="#4A2A17" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="38" y1="26" x2="38" y2="34" stroke="#4A2A17" strokeWidth="1.2" strokeLinecap="round" />
          {/* Golden mini crown */}
          <path
            d="M28 42L30 40L32 42L34 40L36 42V44H28V42Z"
            fill="#FFC62B"
            stroke="#4A2A17"
            strokeWidth="0.8"
          />
        </svg>
      </div>
    );
  }

  if (variant === "badge") {
    return (
      <div className={`inline-flex items-center gap-3 p-2 rounded-2xl bg-white/95 backdrop-blur-sm shadow-xl border border-amber-200/80 ${className}`}>
        <BrandLogo variant="iconOnly" className="w-12 h-12" />
        <div className="flex flex-col text-left">
          <span className="text-xs uppercase tracking-wider font-extrabold text-[#B3121B]">
            Authentic Taste
          </span>
          <span className="text-base font-extrabold text-[#4A2A17] font-display leading-tight">
            Jajanan Puanmuda
          </span>
          <span className="text-[11px] font-medium text-amber-900/70 font-sans">
            Suela · Lombok Timur
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-3 group select-none ${className}`}>
      {/* Icon emblem */}
      <div className="relative shrink-0">
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-11 h-11 transition-transform duration-300 group-hover:scale-110 drop-shadow-md"
        >
          {/* Yellow brush circle */}
          <ellipse
            cx="32"
            cy="32"
            rx="30"
            ry="28"
            fill="#FFC62B"
            stroke="#4A2A17"
            strokeWidth="2.5"
          />
          {/* Red inner disc */}
          <circle cx="32" cy="32" r="23" fill="#B3121B" />
          {/* Chef Hat */}
          <path
            d="M24 38H40C41.1 38 42 37.1 42 36V34C42 33.2 41.5 32.5 40.8 32.2C42.8 30.8 44 28.5 44 26C44 22.7 41.3 20 38 20C37.5 20 37 20.1 36.6 20.2C35.5 17.7 33 16 30 16C26.5 16 23.6 18.3 22.8 21.5C22.2 21.2 21.6 21 21 21C18.2 21 16 23.2 16 26C16 28.3 17.3 30.3 19.2 31.4C18.5 31.9 18 32.7 18 33.7V36C18 37.1 18.9 38 20 38H24Z"
            fill="#FAF3E3"
            stroke="#4A2A17"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Hat Pleats */}
          <line x1="26" y1="26" x2="26" y2="34" stroke="#4A2A17" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="32" y1="24" x2="32" y2="34" stroke="#4A2A17" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="38" y1="26" x2="38" y2="34" stroke="#4A2A17" strokeWidth="1.2" strokeLinecap="round" />
          {/* Crown */}
          <path
            d="M28 42L30 40L32 42L34 40L36 42V44H28V42Z"
            fill="#FFC62B"
            stroke="#4A2A17"
            strokeWidth="0.8"
          />
        </svg>
      </div>

      {/* Typography */}
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1.5 leading-none">
          <span
            className={`font-display text-xl sm:text-2xl font-black tracking-tight ${
              isLight ? "text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" : "text-[#4A2A17]"
            }`}
          >
            Jajanan <span className="text-[#FFC62B]">Puanmuda</span>
          </span>
        </div>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span
            className={`text-[10px] sm:text-[11px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full ${
              isLight
                ? "bg-[#FFC62B] text-[#4A2A17]"
                : "bg-[#B3121B] text-white"
            }`}
          >
            Cemilan Kekinian
          </span>
          <span
            className={`text-xs font-script font-bold hidden sm:inline ${
              isLight ? "text-amber-200" : "text-[#B3121B]"
            }`}
          >
            Bikin Nagih!
          </span>
        </div>
      </div>
    </div>
  );
};
