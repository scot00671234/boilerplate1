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
      <div className="section-spacing-lg">
        <div className="container-vercel">
          <div className="text-center max-w-3xl mx-auto animate-fade-in">
            <h1 className="text-5xl sm:text-6xl font-bold text-foreground leading-tight text-balance">
              Build your SaaS faster
            </h1>
            <p className="mt-6 text-xl text-muted-foreground leading-relaxed text-balance">
              Ship your product with authentication, payments, and everything you need. Focus on what makes your product unique.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
              <button 
                onClick={handleGetStarted}
                className="btn-minimal px-6 py-3 text-base font-medium"
              >
                Get started
              </button>
              <button 
                onClick={handleGetStarted}
                className="btn-outline-minimal px-6 py-3 text-base font-medium"
              >
                View demo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="section-spacing">
        <div className="container-vercel">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">Everything you need</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Built for developers who want to ship fast
            </p>
          </div>
          
          <div className="grid-3">
            <div className="card-minimal text-center">
              <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="text-foreground w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Authentication</h3>
              <p className="text-muted-foreground">
                Secure user authentication with email/password and social logins.
              </p>
            </div>
            
            <div className="card-minimal text-center">
              <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mx-auto mb-4">
                <Palette className="text-foreground w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Payments</h3>
              <p className="text-muted-foreground">
                Built-in Stripe integration for subscriptions and one-time payments.
              </p>
            </div>
            
            <div className="card-minimal text-center">
              <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mx-auto mb-4">
                <Cloud className="text-foreground w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Database</h3>
              <p className="text-muted-foreground">
                PostgreSQL with Drizzle ORM for type-safe database operations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="section-spacing">
        <div className="container-vercel">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">Simple pricing</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Start free, upgrade when you need more
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="pricing-card">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-foreground mb-1">Free</h3>
                <div className="text-4xl font-bold text-foreground mb-2">
                  $0<span className="text-lg text-muted-foreground font-normal">/month</span>
                </div>
                <p className="text-muted-foreground">Perfect for getting started</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <Check className="text-foreground mr-3 h-5 w-5" />
                  <span>1 Item</span>
                </li>
                <li className="flex items-center">
                  <Check className="text-foreground mr-3 h-5 w-5" />
                  <span>Basic Features</span>
                </li>
                <li className="flex items-center">
                  <X className="text-muted-foreground mr-3 h-5 w-5" />
                  <span className="text-muted-foreground">Premium Features</span>
                </li>
                <li className="flex items-center">
                  <X className="text-muted-foreground mr-3 h-5 w-5" />
                  <span className="text-muted-foreground">Priority Support</span>
                </li>
              </ul>
              <button 
                onClick={handleGetStarted}
                className="btn-outline-minimal w-full py-3"
              >
                Get Started
              </button>
            </div>
            
            <div className="pricing-card featured">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="status-badge active">Popular</div>
              </div>
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-foreground mb-1">Pro</h3>
                <div className="text-4xl font-bold text-foreground mb-2">
                  $15<span className="text-lg text-muted-foreground font-normal">/month</span>
                </div>
                <p className="text-muted-foreground">For growing businesses</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <Check className="text-foreground mr-3 h-5 w-5" />
                  <span>Unlimited Items</span>
                </li>
                <li className="flex items-center">
                  <Check className="text-foreground mr-3 h-5 w-5" />
                  <span>Premium Features</span>
                </li>
                <li className="flex items-center">
                  <Check className="text-foreground mr-3 h-5 w-5" />
                  <span>Advanced Analytics</span>
                </li>
                <li className="flex items-center">
                  <Check className="text-foreground mr-3 h-5 w-5" />
                  <span>Priority Support</span>
                </li>
              </ul>
              <button 
                onClick={handleGetStarted}
                className="btn-minimal w-full py-3"
              >
                Upgrade to Pro
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
