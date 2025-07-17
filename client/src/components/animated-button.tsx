import { motion } from "framer-motion";
import { forwardRef } from "react";

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  loading?: boolean;
  pulse?: boolean;
}

export const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ 
    children, 
    className = "", 
    variant = "primary", 
    size = "md", 
    loading = false,
    pulse = false,
    ...props 
  }, ref) => {
    const baseClasses = "btn-interactive focus-visible-ring tap-highlight-transparent touch-action-manipulation";
    
    const variants = {
      primary: "btn-minimal btn-glow",
      secondary: "btn-outline-minimal hover-glow",
      ghost: "hover:bg-muted/50"
    };
    
    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg"
    };

    const pulseVariants = {
      idle: { scale: 1 },
      pulse: { 
        scale: [1, 1.05, 1],
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }
    };

    return (
      <motion.button
        ref={ref}
        className={`
          ${baseClasses} 
          ${variants[variant]} 
          ${sizes[size]} 
          ${className}
          ${loading ? "opacity-75 cursor-not-allowed" : ""}
        `}
        variants={pulse ? pulseVariants : undefined}
        animate={pulse ? "pulse" : "idle"}
        whileHover={{ 
          scale: loading ? 1 : 1.02,
          transition: { duration: 0.2 }
        }}
        whileTap={{ 
          scale: loading ? 1 : 0.98,
          transition: { duration: 0.1 }
        }}
        disabled={loading}
        {...props}
      >
        {loading ? (
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            Loading...
          </motion.div>
        ) : (
          children
        )}
      </motion.button>
    );
  }
);

AnimatedButton.displayName = "AnimatedButton";