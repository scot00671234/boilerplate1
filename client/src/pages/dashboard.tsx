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
      
      <div className="container-modern py-12 animate-fade-in">
        {/* Dashboard Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-3">Dashboard</h1>
            <p className="text-xl text-muted-foreground">Manage your items and account</p>
          </div>
          <div className="mt-6 lg:mt-0 flex items-center space-x-6">
            <Badge 
              className={isPro ? "status-success" : "status-warning"}
            >
              {isPro ? (
                <>
                  <Crown className="w-4 h-4 mr-2" />
                  Pro Plan
                </>
              ) : (
                "Free Plan"
              )}
            </Badge>
            <Link href="/settings">
              <Button variant="ghost" size="sm" className="p-3">
                <Settings className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Upgrade Banner (Free Users) */}
        {!isPro && (
          <Alert className="mb-12 gradient-border animate-slide-up">
            <Crown className="h-5 w-5" />
            <AlertDescription className="flex items-center justify-between p-6">
              <div>
                <strong className="text-lg">Upgrade to Pro</strong>
                <p className="text-muted-foreground mt-1">Unlock unlimited items and advanced features</p>
              </div>
              <Link href="/subscribe">
                <Button className="btn-gradient ml-6">
                  Upgrade Now
                </Button>
              </Link>
            </AlertDescription>
          </Alert>
        )}

        {/* Quick Stats */}
        <div className="grid-modern mb-16">
          <Card className="card-modern">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium mb-2">Items Created</p>
                  <p className="text-3xl font-bold text-foreground">
                    {itemCount} {!isPro ? "/ 1" : ""}
                  </p>
                </div>
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <Package className="text-primary h-7 w-7" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-modern">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium mb-2">Plan Status</p>
                  <p className="text-3xl font-bold text-foreground">
                    {isPro ? "Pro" : "Free"}
                  </p>
                </div>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                  isPro ? "bg-chart-1/10" : "bg-chart-4/10"
                }`}>
                  <User className={`h-7 w-7 ${
                    isPro ? "text-chart-1" : "text-chart-4"
                  }`} />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-modern">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium mb-2">Account Since</p>
                  <p className="text-3xl font-bold text-foreground">
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Today"}
                  </p>
                </div>
                <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center">
                  <Calendar className="text-accent h-7 w-7" />
                </div>
              </div>
            </CardContent>
          </Card>
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
