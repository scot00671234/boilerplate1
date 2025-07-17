import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Package, Settings, LogOut, User, Crown } from "lucide-react";
import { Link, useLocation } from "wouter";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { AnimatedButton } from "./animated-button";

export function ScrollNavigation() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  const navBackground = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.95)"]
  );
  
  const navBorder = useTransform(
    scrollY,
    [0, 100],
    ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.1)"]
  );

  useEffect(() => {
    const updateScrolled = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", updateScrolled);
    return () => window.removeEventListener("scroll", updateScrolled);
  }, []);

  const handleLogin = () => {
    window.location.href = "/login";
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
      window.location.href = "/";
    }
  };

  const isPro = user?.subscriptionStatus === 'active';

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: navBackground,
        borderBottom: `1px solid ${navBorder}`,
        backdropFilter: isScrolled ? "blur(12px)" : "blur(0px)",
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.21, 1.11, 0.81, 0.99] }}
    >
      <div className="container-vercel">
        <div className="flex justify-between items-center h-16">
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="flex items-center tap-highlight-transparent">
              <motion.div
                whileHover={{ rotate: 10 }}
                transition={{ duration: 0.2 }}
              >
                <Package className="text-foreground w-6 h-6 mr-2" />
              </motion.div>
              <span className="text-xl font-semibold text-gradient-animated">SaaS</span>
            </Link>
          </motion.div>

          <div className="flex items-center space-x-4">
            {isLoading ? (
              <div className="w-8 h-8 rounded-full loading-skeleton" />
            ) : isAuthenticated && user ? (
              <motion.div 
                className="flex items-center space-x-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="hidden md:flex items-center space-x-1">
                  {[
                    { href: "/dashboard", label: "Dashboard" },
                    { href: "/items", label: "Items" },
                    ...(isPro ? [] : [{ href: "/subscribe", label: "Upgrade" }])
                  ].map((item, index) => (
                    <Link key={item.href} href={item.href}>
                      <motion.div
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          location === item.href 
                            ? "bg-primary text-primary-foreground" 
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                      >
                        {item.label}
                      </motion.div>
                    </Link>
                  ))}
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <motion.button 
                      className="flex items-center space-x-2 hover-glow p-2 rounded-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="text-xs">
                          {user.firstName?.charAt(0) || user.email?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="hidden sm:block text-sm font-medium">
                        {user.firstName || "User"}
                      </span>
                    </motion.button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    className="w-64 glass-strong shadow-strong animate-scale-in" 
                    align="end" 
                    forceMount
                  >
                    <div className="p-4 border-b border-border/50">
                      <div className="flex flex-col space-y-2">
                        <p className="text-sm font-semibold text-foreground">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {user.email}
                        </p>
                        <motion.div 
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                            isPro 
                              ? "bg-primary/10 text-primary" 
                              : "bg-muted text-muted-foreground"
                          }`}
                          whileHover={{ scale: 1.05 }}
                        >
                          {isPro && <Crown className="w-3 h-3" />}
                          {isPro ? "Pro Plan" : "Free Plan"}
                        </motion.div>
                      </div>
                    </div>
                    <div className="p-1">
                      {[
                        { href: "/dashboard", icon: User, label: "Dashboard" },
                        { href: "/items", icon: Package, label: "Items" },
                        { href: "/settings", icon: Settings, label: "Settings" },
                        ...(isPro ? [] : [{ href: "/subscribe", icon: Crown, label: "Upgrade" }])
                      ].map((item) => (
                        <Link key={item.href} href={item.href}>
                          <DropdownMenuItem className="p-3 cursor-pointer hover-glow">
                            <item.icon className="mr-3 h-4 w-4" />
                            {item.label}
                          </DropdownMenuItem>
                        </Link>
                      ))}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="p-3 cursor-pointer text-destructive hover:bg-destructive/10"
                        onClick={handleLogout}
                      >
                        <LogOut className="mr-3 h-4 w-4" />
                        Logout
                      </DropdownMenuItem>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <AnimatedButton
                  onClick={handleLogin}
                  variant="primary"
                  size="sm"
                >
                  Sign in
                </AnimatedButton>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}