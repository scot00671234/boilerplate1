import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/navigation";
import { Package, Zap, Palette, Cloud, Check, X } from "lucide-react";

export default function Landing() {
  const handleGetStarted = () => {
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <div className="relative overflow-hidden hero-gradient">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{ backgroundImage: 'url(/hero-bg.png)' }}
        />
        {/* Modern Pattern Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-muted/40 to-primary/5" />
        
        <div className="relative container-professional section-padding-large animate-fade-in">
          <div className="text-center space-y-generous">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-foreground leading-tight">
              Professional
              <span className="text-gradient"> SaaS</span>
            </h1>
            <p className="max-w-3xl mx-auto text-xl text-muted-foreground leading-relaxed">
              Enterprise-grade SaaS platform designed for modern businesses. Scale your operations with comprehensive tools and professional infrastructure.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                onClick={handleGetStarted}
                size="lg"
                className="btn-professional px-10 py-4 text-lg font-semibold"
              >
                Start Building
              </Button>
              <Button 
                variant="outline"
                onClick={handleGetStarted}
                size="lg"
                className="px-10 py-4 text-lg font-semibold border-2 hover:bg-muted/50 transition-all"
              >
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-muted/30 section-padding-large">
        <div className="container-professional">
          <div className="text-center space-y-comfortable animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">Enterprise-Grade Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Production-ready infrastructure built by professionals for professionals
            </p>
          </div>
          
          <div className="grid-features">
            <Card className="card-modern p-10 text-center">
              <CardContent className="p-0 space-y-professional">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                  <Zap className="text-primary text-2xl" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground">Rapid Development</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Pre-built authentication, payments, and UI components to get your SaaS running in hours, not weeks.
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-modern p-10 text-center">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-8 mx-auto">
                  <Palette className="text-accent text-2xl" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-6">Modern UI Design</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Beautiful, accessible components built with Radix UI and Tailwind CSS for a professional finish.
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-modern p-10 text-center">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-chart-4/10 rounded-2xl flex items-center justify-center mb-8 mx-auto">
                  <Cloud className="text-chart-4 text-2xl" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-6">Production Ready</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Deploy anywhere with PostgreSQL, authentication, and payment processing already configured.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="bg-background py-32">
        <div className="container-modern">
          <div className="text-center mb-20 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">Simple, Transparent Pricing</h2>
            <p className="mt-6 text-xl text-muted-foreground">
              Start free, upgrade when you need more power
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="card-modern p-10 relative">
              <CardContent className="p-0">
                <div className="mb-8">
                  <h3 className="text-3xl font-bold text-foreground mb-4">Free</h3>
                  <div className="text-5xl font-bold text-foreground mb-2">
                    $0<span className="text-xl text-muted-foreground">/month</span>
                  </div>
                  <p className="text-muted-foreground">Perfect for getting started</p>
                </div>
                <ul className="space-y-4 mb-10">
                  <li className="flex items-center">
                    <Check className="text-chart-1 mr-4 h-6 w-6" />
                    <span className="text-lg">1 Item</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-chart-1 mr-4 h-6 w-6" />
                    <span className="text-lg">Basic Features</span>
                  </li>
                  <li className="flex items-center">
                    <X className="text-muted-foreground mr-4 h-6 w-6" />
                    <span className="text-lg text-muted-foreground">Premium Features</span>
                  </li>
                  <li className="flex items-center">
                    <X className="text-muted-foreground mr-4 h-6 w-6" />
                    <span className="text-lg text-muted-foreground">Priority Support</span>
                  </li>
                </ul>
                <Button 
                  onClick={handleGetStarted}
                  variant="outline"
                  className="w-full text-lg py-4 border-2"
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
            
            <Card className="card-modern p-10 relative gradient-border">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="status-success px-4 py-1 text-sm font-semibold">Most Popular</Badge>
              </div>
              <CardContent className="p-0">
                <div className="mb-8">
                  <h3 className="text-3xl font-bold text-foreground mb-4">Pro</h3>
                  <div className="text-5xl font-bold text-foreground mb-2">
                    $15<span className="text-xl text-muted-foreground">/month</span>
                  </div>
                  <p className="text-muted-foreground">For growing businesses</p>
                </div>
                <ul className="space-y-4 mb-10">
                  <li className="flex items-center">
                    <Check className="text-chart-1 mr-4 h-6 w-6" />
                    <span className="text-lg">Unlimited Items</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-chart-1 mr-4 h-6 w-6" />
                    <span className="text-lg">Premium Features</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-chart-1 mr-4 h-6 w-6" />
                    <span className="text-lg">Advanced Analytics</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-chart-1 mr-4 h-6 w-6" />
                    <span className="text-lg">Priority Support</span>
                  </li>
                </ul>
                <Button 
                  onClick={handleGetStarted}
                  className="btn-gradient w-full text-lg py-4"
                >
                  Upgrade to Pro
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
