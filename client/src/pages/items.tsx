import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Navigation } from "@/components/navigation";
import { ItemManager } from "@/components/item-manager";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Package, Plus, Info, Crown } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Items() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();

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

  const { data: items = [], isLoading: itemsLoading } = useQuery({
    queryKey: ["/api/items"],
    enabled: isAuthenticated,
    retry: false,
  });

  const itemCount = items?.length || 0;
  const isPro = user?.subscriptionStatus === 'active';

  if (isLoading) return <div className="loading-skeleton h-screen" />;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center hero-gradient">
        <Card className="card-modern w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Login Required</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Please log in to access your items.
            </p>
            <Link href="/login" className="btn-gradient w-full">
              Login
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container-modern py-12 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-3">My Items</h1>
            <p className="text-xl text-muted-foreground">
              Manage your {isPro ? "unlimited" : "free"} items
            </p>
          </div>
          <div className="mt-6 lg:mt-0 flex items-center space-x-4">
            <Badge className={isPro ? "status-success" : "status-warning"}>
              {isPro ? (
                <>
                  <Crown className="w-4 h-4 mr-2" />
                  Pro Plan
                </>
              ) : (
                `${itemCount}/1 Free`
              )}
            </Badge>
          </div>
        </div>

        {/* Upgrade Banner for Free Users */}
        {!isPro && (
          <Alert className="mb-12 gradient-border animate-slide-up">
            <Info className="h-5 w-5" />
            <AlertDescription className="flex items-center justify-between p-6">
              <div>
                <strong className="text-lg">Upgrade to Pro for Unlimited Items</strong>
                <p className="text-muted-foreground mt-1">
                  Create unlimited items and access advanced features
                </p>
              </div>
              <Link href="/subscribe">
                <Button className="btn-gradient ml-6">
                  Upgrade Now
                </Button>
              </Link>
            </AlertDescription>
          </Alert>
        )}

        {/* Items Section */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Item Manager */}
          <Card className="card-modern">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Plus className="w-6 h-6 mr-3 text-primary" />
                Create New Item
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ItemManager
                isPro={isPro}
                itemCount={itemCount}
                onItemCreated={() => {
                  toast({
                    title: "Item Created",
                    description: "Your new item has been created successfully!",
                  });
                }}
              />
            </CardContent>
          </Card>

          {/* Items List */}
          <Card className="card-modern">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Package className="w-6 h-6 mr-3 text-primary" />
                Your Items ({itemCount})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {itemsLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="loading-skeleton h-16 rounded-lg" />
                  ))}
                </div>
              ) : items.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    No items yet
                  </h3>
                  <p className="text-muted-foreground">
                    Create your first item to get started
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item: any) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Package className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {item.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {item.description || "No description"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}