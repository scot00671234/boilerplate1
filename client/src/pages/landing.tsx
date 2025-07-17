import { ScrollNavigation } from "@/components/scroll-navigation";
import { AnimatedSection, AnimatedChild } from "@/components/animated-section";
import { AnimatedButton } from "@/components/animated-button";
import { Package, Zap, Palette, Cloud, Check, X, ArrowRight, Sparkles, Rocket, Shield } from "lucide-react";
import { motion } from "framer-motion";

export default function Landing() {
  const handleGetStarted = () => {
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-l from-secondary/10 to-muted/10 rounded-full blur-3xl"
          animate={{
            x: [0, -120, 0],
            y: [0, 80, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <ScrollNavigation />

      {/* Hero Section */}
      <div className="pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="container-vercel">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.21, 1.11, 0.81, 0.99] }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 text-sm text-muted-foreground mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Sparkles className="w-4 h-4" />
              Production-ready SaaS boilerplate
            </motion.div>
            
            <motion.h1 
              className="text-6xl sm:text-7xl lg:text-8xl font-bold text-gradient-animated leading-tight text-balance mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Build your SaaS
              <br />
              <span className="text-foreground">faster</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl lg:text-2xl text-muted-foreground leading-relaxed text-balance mb-10 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Ship your product with authentication, payments, and everything you need. 
              <br className="hidden sm:block" />
              Focus on what makes your product unique.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <AnimatedButton
                onClick={handleGetStarted}
                variant="primary"
                size="lg"
                pulse={true}
                className="group"
              >
                Get started for free
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </AnimatedButton>
              
              <AnimatedButton
                onClick={handleGetStarted}
                variant="secondary"
                size="lg"
              >
                View demo
              </AnimatedButton>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              {[
                { label: "Components", value: "50+" },
                { label: "Ready to deploy", value: "1 min" },
                { label: "Time saved", value: "100hrs" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + index * 0.1, duration: 0.4 }}
                >
                  <div className="text-2xl lg:text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <AnimatedSection className="py-20 lg:py-32">
        <div className="container-vercel">
          <AnimatedSection className="text-center mb-16" delay={0.2}>
            <motion.h2 
              className="text-4xl lg:text-5xl font-bold text-foreground mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Everything you need
            </motion.h2>
            <motion.p 
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Built for developers who want to ship fast without compromising on quality
            </motion.p>
          </AnimatedSection>
          
          <AnimatedSection className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" stagger={true}>
            {[
              {
                icon: Shield,
                title: "Authentication",
                description: "Secure user authentication with email/password and social logins ready out of the box.",
                color: "text-blue-500"
              },
              {
                icon: Palette,
                title: "Payments",
                description: "Built-in Stripe integration for subscriptions and one-time payments with webhooks.",
                color: "text-purple-500"
              },
              {
                icon: Cloud,
                title: "Database",
                description: "PostgreSQL with Drizzle ORM for type-safe database operations and migrations.",
                color: "text-green-500"
              },
              {
                icon: Rocket,
                title: "Deployment",
                description: "One-click deployment to production with environment management and CI/CD.",
                color: "text-orange-500"
              },
              {
                icon: Zap,
                title: "Performance",
                description: "Optimized for speed with caching, lazy loading, and production-ready configurations.",
                color: "text-yellow-500"
              },
              {
                icon: Package,
                title: "Components",
                description: "50+ pre-built components with shadcn/ui, dark mode, and responsive design.",
                color: "text-pink-500"
              }
            ].map((feature, index) => (
              <AnimatedChild key={feature.title}>
                <motion.div 
                  className="group hover-lift hover-glow p-8 rounded-2xl bg-card border border-border/50 text-center h-full"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                    transition: { duration: 0.3 }
                  }}
                >
                  <motion.div 
                    className={`w-16 h-16 ${feature.color} bg-muted/50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: 10 }}
                  >
                    <feature.icon className="w-8 h-8" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-foreground mb-4 group-hover:text-gradient-animated transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              </AnimatedChild>
            ))}
          </AnimatedSection>
        </div>
      </AnimatedSection>

      {/* Pricing Section */}
      <AnimatedSection className="py-20 lg:py-32 bg-gradient-soft">
        <div className="container-vercel">
          <AnimatedSection className="text-center mb-16" delay={0.2}>
            <motion.h2 
              className="text-4xl lg:text-5xl font-bold text-foreground mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Simple pricing
            </motion.h2>
            <motion.p 
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Start free, upgrade when you need more power
            </motion.p>
          </AnimatedSection>
          
          <motion.div 
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {/* Free Plan */}
            <motion.div 
              className="group relative p-8 rounded-3xl bg-card border border-border/50 text-center hover-lift hover-glow h-full"
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-2">Free</h3>
                <div className="text-5xl font-bold text-foreground mb-3">
                  $0<span className="text-xl text-muted-foreground font-normal">/month</span>
                </div>
                <p className="text-muted-foreground">Perfect for getting started</p>
              </div>
              
              <ul className="space-y-4 mb-10 text-left">
                {[
                  { text: "1 Item", included: true },
                  { text: "Basic Features", included: true },
                  { text: "Premium Features", included: false },
                  { text: "Priority Support", included: false }
                ].map((feature, index) => (
                  <motion.li 
                    key={feature.text}
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
                  >
                    {feature.included ? (
                      <Check className="text-green-500 mr-3 h-5 w-5 flex-shrink-0" />
                    ) : (
                      <X className="text-muted-foreground mr-3 h-5 w-5 flex-shrink-0" />
                    )}
                    <span className={feature.included ? "text-foreground" : "text-muted-foreground"}>
                      {feature.text}
                    </span>
                  </motion.li>
                ))}
              </ul>
              
              <AnimatedButton
                onClick={handleGetStarted}
                variant="secondary"
                size="lg"
                className="w-full"
              >
                Get Started
              </AnimatedButton>
            </motion.div>
            
            {/* Pro Plan */}
            <motion.div 
              className="group relative p-8 rounded-3xl bg-gradient-primary text-primary-foreground text-center hover-lift shadow-strong h-full"
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 25px 50px rgba(0,0,0,0.2)",
                transition: { duration: 0.3 }
              }}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <motion.div 
                className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1, duration: 0.4 }}
              >
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-full text-sm font-semibold">
                  ⭐ Most Popular
                </div>
              </motion.div>
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">Pro</h3>
                <div className="text-5xl font-bold mb-3">
                  $15<span className="text-xl font-normal opacity-80">/month</span>
                </div>
                <p className="opacity-90">For growing businesses</p>
              </div>
              
              <ul className="space-y-4 mb-10 text-left">
                {[
                  "Unlimited Items",
                  "Premium Features", 
                  "Advanced Analytics",
                  "Priority Support"
                ].map((feature, index) => (
                  <motion.li 
                    key={feature}
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.2 + index * 0.1, duration: 0.4 }}
                  >
                    <Check className="text-green-400 mr-3 h-5 w-5 flex-shrink-0" />
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
              
              <AnimatedButton
                onClick={handleGetStarted}
                variant="secondary"
                size="lg"
                className="w-full bg-white text-black hover:bg-gray-100"
                pulse={true}
              >
                Upgrade to Pro
              </AnimatedButton>
            </motion.div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection className="py-20 lg:py-32">
        <div className="container-vercel">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-4xl lg:text-5xl font-bold text-foreground mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Ready to build?
            </motion.h2>
            <motion.p 
              className="text-xl text-muted-foreground mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Join thousands of developers who trust our platform to ship faster.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <AnimatedButton
                onClick={handleGetStarted}
                variant="primary"
                size="lg"
                pulse={true}
                className="text-lg px-10 py-4"
              >
                Start building today
                <Rocket className="ml-2 w-5 h-5" />
              </AnimatedButton>
            </motion.div>
          </motion.div>
        </div>
      </AnimatedSection>
    </div>
  );
}
