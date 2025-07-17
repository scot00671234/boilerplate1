import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest } from "@/lib/queryClient";
import { Navigation } from "@/components/navigation";
import { ItemManager } from "@/components/item-manager";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Package, User, Calendar, Settings, Crown } from "lucide-react";
import { Link } from "wouter";

export default function Dashboard() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  // Handle subscription success from Stripe checkout
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');
    
    if (sessionId && isAuthenticated) {
      apiRequest("POST", "/api/subscription-success", { session_id: sessionId })
        .then(() => {
          toast({
            title: "Subscription Successful!",
            description: "Welcome to Pro! You now have access to unlimited items.",
          });
          // Clear the session_id from URL
          window.history.replaceState({}, '', '/dashboard');
          // Refresh user data to get updated subscription status
          queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
        })
        .catch((error) => {
          console.error('Error processing subscription success:', error);
          toast({
            title: "Subscription Processing",
            description: "Your payment was successful, but there was an issue activating your subscription. Please contact support.",
            variant: "destructive",
          });
        });
    }
  }, [isAuthenticated, toast, queryClient]);

  const { data: items = [], isLoading: itemsLoading } = useQuery({
    queryKey: ["/api/items"],
    enabled: isAuthenticated,
    retry: false,
  });

  if (isLoading || !isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  const isPro = user.subscriptionStatus === 'active';
  const itemCount = items?.length || 0;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container-vercel section-spacing animate-fade-in">
        {/* Dashboard Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-lg text-muted-foreground">Manage your items and account</p>
          </div>
          <div className="flex items-center space-x-3 mt-4 lg:mt-0">
            <div className={`status-badge ${isPro ? "active" : "inactive"}`}>
              {isPro ? (
                <>
                  <Crown className="w-3 h-3" />
                  Pro Plan
                </>
              ) : (
                "Free Plan"
              )}
            </div>
            <Link href="/settings">
              <button className="btn-outline-minimal">
                <Settings className="h-4 w-4 mr-1" />
                Settings
              </button>
            </Link>
          </div>
        </div>

        {/* Upgrade Banner (Free Users) */}
        {!isPro && (
          <div className="card-minimal border-primary/20 bg-primary/5 p-4 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-foreground">Upgrade to Pro</h3>
                <p className="text-sm text-muted-foreground">Unlock unlimited items and advanced features</p>
              </div>
              <Link href="/subscribe">
                <button className="btn-minimal">
                  Upgrade Now
                </button>
              </Link>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid-3 mb-8">
          <div className="card-minimal">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Items Created</p>
                <p className="text-2xl font-bold text-foreground">
                  {itemCount} {!isPro ? "/ 1" : ""}
                </p>
              </div>
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                <Package className="text-foreground h-5 w-5" />
              </div>
            </div>
          </div>
          
          <div className="card-minimal">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Plan Status</p>
                <p className="text-2xl font-bold text-foreground">
                  {isPro ? "Pro" : "Free"}
                </p>
              </div>
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                <User className="text-foreground h-5 w-5" />
              </div>
            </div>
          </div>
          
          <div className="card-minimal">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Account Since</p>
                <p className="text-2xl font-bold text-foreground">
                  {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Today"}
                </p>
              </div>
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                <Calendar className="text-foreground h-5 w-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Item Manager */}
        <ItemManager 
          isPro={isPro} 
          itemCount={itemCount}
          onItemCreated={() => {
            queryClient.invalidateQueries({ queryKey: ["/api/items"] });
          }}
        />
      </div>
    </div>
  );
}
