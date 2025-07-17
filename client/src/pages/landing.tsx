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
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-48 h-48 bg-gradient-to-l from-green-500/10 to-blue-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-32 left-1/4 w-56 h-56 bg-gradient-to-r from-purple-500/8 to-pink-500/8 rounded-full blur-3xl"
          animate={{
            x: [0, 60, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-foreground/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 8,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <ScrollNavigation />

      {/* Hero Section */}
      <div className="pt-32 pb-20 lg:pt-40 lg:pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
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
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-gradient-animated leading-tight text-balance mb-6 sm:mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Build your SaaS
              <br />
              <span className="text-foreground">faster</span>
            </motion.h1>
            
            <motion.p 
              className="text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed text-balance mb-8 sm:mb-10 max-w-3xl mx-auto px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Ship your product with authentication, payments, and everything you need. 
              <br className="hidden sm:block" />
              Focus on what makes your product unique.
            </motion.p>
            
            <motion.div 
              className="flex justify-center px-4"
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
                Get started
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </AnimatedButton>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="mt-12 sm:mt-16 grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto px-4"
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
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <AnimatedSection className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
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
      <AnimatedSection className="py-20 lg:py-32 bg-gradient-soft px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
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
            className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto px-4"
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
                      <X className="text-red-400 mr-3 h-5 w-5 flex-shrink-0" />
                    )}
                    <span className={`text-sm sm:text-base font-medium ${feature.included ? "text-foreground" : "text-muted-foreground/60 line-through"}`}>
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
              className="group relative p-8 rounded-3xl bg-gradient-to-br from-blue-600 to-purple-700 text-white text-center hover-lift shadow-strong h-full"
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
                <h3 className="text-2xl font-bold mb-2 text-white">Pro</h3>
                <div className="text-5xl font-bold mb-3 text-white">
                  $15<span className="text-xl font-normal text-blue-100">/month</span>
                </div>
                <p className="text-blue-100">For growing businesses</p>
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
                    <Check className="text-green-300 mr-3 h-5 w-5 flex-shrink-0" />
                    <span className="text-sm sm:text-base font-medium text-white">{feature}</span>
                  </motion.li>
                ))}
              </ul>
              
              <AnimatedButton
                onClick={handleGetStarted}
                variant="secondary"
                size="lg"
                className="w-full bg-white text-blue-600 hover:bg-blue-50 font-semibold"
                pulse={true}
              >
                Upgrade to Pro
              </AnimatedButton>
            </motion.div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
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
                Get started
                <ArrowRight className="ml-2 w-5 h-5" />
              </AnimatedButton>
            </motion.div>
          </motion.div>
        </div>
      </AnimatedSection>
    </div>
  );
}
