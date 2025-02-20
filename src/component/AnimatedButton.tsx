// AnimatedButton.tsx
import { useState, useEffect } from 'react';

interface AnimatedButtonProps {
  onClick: () => void;
  disabled: boolean;
  isSubmitting: boolean;
  selectedCandidate: string | null;
  candidateColor?: string;
}

export const AnimatedButton = ({ 
  onClick, 
  disabled, 
  isSubmitting,
  selectedCandidate,
  candidateColor = '#0f766e' // default teal-700
}: AnimatedButtonProps) => {
  const [prevCandidate, setPrevCandidate] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  useEffect(() => {
    if (selectedCandidate !== prevCandidate) {
      setIsAnimating(true);
      setPrevCandidate(selectedCandidate);
      const timer = setTimeout(() => setIsAnimating(false), 500);
      return () => clearTimeout(timer);
    }
  }, [selectedCandidate, prevCandidate]);

  return (
    <div className="w-full max-w-sm relative h-12 rounded-lg overflow-hidden">
      <button
        onClick={onClick}
        disabled={disabled}
        className={`
          absolute inset-0 w-full h-full
          text-white font-semibold
          transition-all duration-300
          ${isAnimating ? 'animate-sweep' : ''}
          hover:animate-pulse
          disabled:opacity-50 disabled:cursor-not-allowed
          disabled:hover:animate-none
          ${!isAnimating ? `bg-[${candidateColor}]` : ''}
        `}
        style={{
            //@ts-expect-error
          '--prev-color': prevCandidate ? candidateColor : '#0f766e',
          '--next-color': candidateColor,
          backgroundColor: !isAnimating ? candidateColor : undefined,
        }}
      >
        {isSubmitting ? "Submitting Vote..." : "Submit Vote"}
      </button>

      <style jsx>{`
        @keyframes sweep {
          0% {
            background: var(--prev-color);
            clip-path: polygon(0 0, 0 0, 0 100%, 0% 100%);
          }
          100% {
            background: var(--next-color);
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
          }
        }
        .animate-sweep {
          animation: sweep 0.5s ease-in-out forwards;
        }
        
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(var(--ring-color, 15 118 110), 0.7);
            transform: scale(1);
          }
          70% {
            box-shadow: 0 0 0 15px rgba(var(--ring-color, 15 118 110), 0);
            transform: scale(1.02);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(var(--ring-color, 15 118 110), 0);
            transform: scale(1);
          }
        }
        .animate-pulse {
          animation: pulse 1.5s infinite cubic-bezier(0.4, 0, 0.6, 1);
          --ring-color: ${selectedCandidate ? getRGBValues(candidateColor) : '15 118 110'};
        }

        @keyframes pulse-ring {
          0% {
            box-shadow: 0 0 0 0 rgba(var(--ring-color, 15 118 110), 0.7);
          }
          70% {
            box-shadow: 0 0 0 15px rgba(var(--ring-color, 15 118 110), 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(var(--ring-color, 15 118 110), 0);
          }
        }
      `}</style>
    </div>
  );
};

// Helper function to convert hex color to RGB values
function getRGBValues(hex: string): string {
  // Remove the hash if present
  hex = hex.replace('#', '');
  
  // Convert to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return `${r} ${g} ${b}`;
}