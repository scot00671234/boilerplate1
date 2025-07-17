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
    <nav className="nav-modern sticky top-0 z-50 shadow-soft">
      <div className="container-modern">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <Package className="text-primary text-2xl mr-3 transition-transform group-hover:scale-110" />
              <span className="text-xl font-bold text-gradient">SaaS Boilerplate</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {isLoading ? (
              <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
            ) : isAuthenticated && user ? (
              <>
                <div className="hidden md:flex items-center space-x-6">
                  <Link href="/dashboard">
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground transition-colors">
                      Dashboard
                    </Button>
                  </Link>
                  <Link href="/items">
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground transition-colors">
                      My Items
                    </Button>
                  </Link>
                  {!isPro && (
                    <Link href="/subscribe">
                      <Button size="sm" className="btn-gradient">
                        <Crown className="w-4 h-4 mr-1" />
                        Upgrade
                      </Button>
                    </Link>
                  )}
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.profileImageUrl || ""} alt="Profile" />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        {user.firstName && user.lastName && (
                          <p className="font-medium">{user.firstName} {user.lastName}</p>
                        )}
                        <p className="w-[200px] truncate text-sm text-muted-foreground">
                          {user.email}
                        </p>
                        {isPro && (
                          <div className="flex items-center text-xs">
                            <Badge className="status-success text-xs px-2 py-1">
                              <Crown className="w-3 h-3 mr-1" />
                              Pro Member
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <Link href="/dashboard">
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        Dashboard
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/items">
                      <DropdownMenuItem>
                        <Package className="mr-2 h-4 w-4" />
                        My Items
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/settings">
                      <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </DropdownMenuItem>
                    </Link>
                    {!isPro && (
                      <>
                        <DropdownMenuSeparator />
                        <Link href="/subscribe">
                          <DropdownMenuItem>
                            <Crown className="mr-2 h-4 w-4" />
                            Upgrade to Pro
                          </DropdownMenuItem>
                        </Link>
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button onClick={handleLogin} className="btn-gradient">
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
