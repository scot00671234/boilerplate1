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
      
      <div className="container-vercel animate-fade-in">
        {/* Dashboard Header */}
        <div className="py-12 border-b border-border/50">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-foreground tracking-tight">Dashboard</h1>
              <p className="text-lg text-muted-foreground mt-2">Manage your items and account</p>
            </div>
            <div className="flex items-center mt-6 lg:mt-0">
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
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="py-12">
          {/* Upgrade Banner (Free Users) */}
          {!isPro && (
            <div className="card-minimal border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10 p-6 mb-12">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Crown className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">Upgrade to Pro</h3>
                    <p className="text-muted-foreground">Unlock unlimited items and advanced features</p>
                  </div>
                </div>
                <Link href="/subscribe">
                  <button className="btn-minimal whitespace-nowrap">
                    Upgrade Now
                  </button>
                </Link>
              </div>
            </div>
          )}

          {/* Overview Stats */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-8">Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card-minimal p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground mb-2">Items Created</p>
                    <p className="text-3xl font-bold text-foreground">
                      {itemCount}
                    </p>
                    {!isPro && (
                      <p className="text-sm text-muted-foreground mt-1">of 1 available</p>
                    )}
                  </div>
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Package className="text-blue-600 h-6 w-6" />
                  </div>
                </div>
              </div>
              
              <div className="card-minimal p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground mb-2">Plan Status</p>
                    <p className="text-3xl font-bold text-foreground">
                      {isPro ? "Pro" : "Free"}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {isPro ? "Unlimited access" : "Limited access"}
                    </p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    isPro ? 'bg-green-50' : 'bg-gray-50'
                  }`}>
                    <User className={`h-6 w-6 ${
                      isPro ? 'text-green-600' : 'text-gray-600'
                    }`} />
                  </div>
                </div>
              </div>
              
              <div className="card-minimal p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground mb-2">Account Since</p>
                    <p className="text-3xl font-bold text-foreground">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      }) : "Today"}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {user.createdAt ? new Date(user.createdAt).getFullYear() : new Date().getFullYear()}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                    <Calendar className="text-purple-600 h-6 w-6" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Items Section */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-semibold text-foreground">Items</h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">
                  {itemCount} {itemCount === 1 ? 'item' : 'items'}
                </span>
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
      </div>
    </div>
  );
}
