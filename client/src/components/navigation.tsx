import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Package, Settings, LogOut, User, Crown } from "lucide-react";
import { Link } from "wouter";

export function Navigation() {
  const { user, isAuthenticated, isLoading } = useAuth();

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

  const getUserInitials = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return "U";
  };

  const isPro = user?.subscriptionStatus === 'active';

  return (
    <nav className="nav-minimal">
      <div className="container-vercel">
        <div className="flex justify-between items-center h-14">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Package className="text-foreground w-5 h-5 mr-2" />
              <span className="text-lg font-medium text-foreground">SaaS</span>
            </Link>
          </div>

          <div className="flex items-center space-x-3">
            {isLoading ? (
              <div className="w-6 h-6 rounded-full bg-muted animate-pulse" />
            ) : isAuthenticated && user ? (
              <>
                <div className="hidden md:flex items-center space-x-1">
                  <Link href="/dashboard">
                    <button className="btn-outline-minimal">
                      Dashboard
                    </button>
                  </Link>
                  <Link href="/items">
                    <button className="btn-outline-minimal">
                      Items
                    </button>
                  </Link>
                  {!isPro && (
                    <Link href="/subscribe">
                      <button className="btn-minimal">
                        Upgrade
                      </button>
                    </Link>
                  )}
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="btn-outline-minimal">
                      <User className="w-4 h-4 mr-1" />
                      {user.firstName || "User"}
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64 bg-background/95 backdrop-blur-md border border-border/50 shadow-lg" align="end" forceMount>
                    <div className="p-4 border-b border-border/50">
                      <div className="flex flex-col space-y-2">
                        <p className="text-sm font-semibold text-foreground">{user.firstName} {user.lastName}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {user.email}
                        </p>
                        <div className={`status-badge ${isPro ? "active" : "inactive"} mt-2`}>
                          {isPro ? (
                            <>
                              <Crown className="w-3 h-3" />
                              Pro Plan
                            </>
                          ) : (
                            "Free Plan"
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="p-1">
                      <Link href="/dashboard">
                        <DropdownMenuItem className="p-3 cursor-pointer">
                          <User className="mr-3 h-4 w-4" />
                          Dashboard
                        </DropdownMenuItem>
                      </Link>
                      <Link href="/items">
                        <DropdownMenuItem className="p-3 cursor-pointer">
                          <Package className="mr-3 h-4 w-4" />
                          Items
                        </DropdownMenuItem>
                      </Link>
                      <Link href="/settings">
                        <DropdownMenuItem className="p-3 cursor-pointer">
                          <Settings className="mr-3 h-4 w-4" />
                          Settings
                        </DropdownMenuItem>
                      </Link>
                      {!isPro && (
                        <Link href="/subscribe">
                          <DropdownMenuItem className="p-3 cursor-pointer">
                            <Crown className="mr-3 h-4 w-4" />
                            Upgrade
                          </DropdownMenuItem>
                        </Link>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="p-3 cursor-pointer" onClick={handleLogout}>
                        <LogOut className="mr-3 h-4 w-4" />
                        Log out
                      </DropdownMenuItem>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <button onClick={handleLogin} className="btn-minimal">
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
