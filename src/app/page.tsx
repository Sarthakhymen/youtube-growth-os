'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { 
  Rocket, 
  Target, 
  BarChart3, 
  Video, 
  Sparkles, 
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function LandingPage() {
  const router = useRouter();

  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleRazorpay = async (amount: number, planName: string) => {
    try {
      const response = await fetch('/api/checkout/razorpay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, currency: 'INR' }),
      });
      
      const order = await response.json();
      
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Enter your Key ID here
        amount: order.amount,
        currency: order.currency,
        name: 'YouTube Growth OS',
        description: `Upgrade to ${planName} Plan`,
        order_id: order.id,
        handler: function (response: any) {
          alert('Payment Successful! Payment ID: ' + response.razorpay_payment_id);
          router.push('/dashboard');
        },
        prefill: {
          name: 'Creator Name',
          email: 'creator@example.com',
        },
        theme: {
          color: '#4f46e5',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Payment Error:', error);
      alert('Payment failed to initialize. Check console for details.');
    }
  };
  return (
    <div className={styles.main}>
      <Navbar />
      
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={`${styles.badge} ${styles.animateIn}`} style={{ animationDelay: '0.1s' }}>
            <Sparkles size={14} className={styles.sparkle} />
            Powered by Next-Gen AI
          </div>
          
          <h1 className={styles.animateIn} style={{ animationDelay: '0.2s' }}>
            Your AI YouTube <br />
            <span className={styles.gradientText}>Content Factory</span>
          </h1>
          
          <p className={`${styles.subtitle} ${styles.animateIn}`} style={{ animationDelay: '0.3s' }}>
            Stop staring at a blank screen. Generate viral ideas, retention-optimized 
            scripts, and high-growth strategies in seconds.
          </p>
          
          <div className={`${styles.heroActions} ${styles.animateIn}`} style={{ animationDelay: '0.4s' }}>
            <Button size="lg" className={styles.primaryBtn} onClick={() => router.push('/dashboard')}>
              Start Creating Free <ArrowRight size={20} />
            </Button>
            <Button variant="outline" size="lg" onClick={scrollToPricing}>
              View Pricing
            </Button>
          </div>

          <div className={`${styles.heroStats} ${styles.animateIn}`} style={{ animationDelay: '0.5s' }}>
            <div className={styles.stat}>
              <strong>10k+</strong>
              <span>Creators</span>
            </div>
            <div className={styles.divider} />
            <div className={styles.stat}>
              <strong>500k+</strong>
              <span>Scripts Generated</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={styles.features}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Engineered for Viral Growth</h2>
            <p>Everything you need to scale your channel from 0 to 1M+ subscribers.</p>
          </div>
          
          <div className={styles.featureGrid}>
            {[
              { 
                icon: <Rocket />, 
                title: 'Viral Idea Generator', 
                desc: 'Get 10+ data-driven video ideas for any niche that are optimized for the YouTube algorithm.' 
              },
              { 
                icon: <Target />, 
                title: 'Retention Scripts', 
                desc: 'Generate full-length scripts with built-in hooks and pattern interrupts to keep viewers watching.' 
              },
              { 
                icon: <Video />, 
                title: 'Shorts Factory', 
                desc: 'Turn long-form concepts into high-impact 60-second vertical video scripts.' 
              },
              { 
                icon: <BarChart3 />, 
                title: 'Channel Analytics AI', 
                desc: 'Audit your channel performance and get actionable growth steps to improve your CTR.' 
              }
            ].map((feature, i) => (
              <Card key={i} className={styles.featureCard}>
                <div className={styles.featureIcon}>{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className={styles.pricing}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Simple, Transparent Pricing</h2>
            <p>Choose the plan that fits your creation workflow.</p>
          </div>
          
          <div className={styles.pricingGrid}>
            <Card className={styles.priceCard}>
              <h3>Free</h3>
              <div className={styles.price}>$0<span>/mo</span></div>
              <ul className={styles.priceFeatures}>
                <li><CheckCircle2 size={18} /> 5 AI Generations / day</li>
                <li><CheckCircle2 size={18} /> Basic Idea Generator</li>
                <li><CheckCircle2 size={18} /> Community Access</li>
              </ul>
              <Button variant="outline" className={styles.priceBtn} onClick={() => router.push('/dashboard')}>Get Started</Button>
            </Card>
            
            <Card className={`${styles.priceCard} ${styles.featuredPrice}`}>
              <div className={styles.popularBadge}>Most Popular</div>
              <h3>Pro</h3>
              <div className={styles.price}>$29<span>/mo</span></div>
              <ul className={styles.priceFeatures}>
                <li><CheckCircle2 size={18} /> Unlimited AI Generations</li>
                <li><CheckCircle2 size={18} /> Advanced Viral Scripts</li>
                <li><CheckCircle2 size={18} /> Channel Growth Audit</li>
                <li><CheckCircle2 size={18} /> Priority AI Support</li>
              </ul>
              <Button className={styles.priceBtn} onClick={() => handleRazorpay(2499, 'Pro')}>Go Pro</Button>
            </Card>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className="container">
          <p>© 2026 YouTube Growth OS. Built for the next generation of creators.</p>
        </div>
      </footer>
    </div>
  );
}
