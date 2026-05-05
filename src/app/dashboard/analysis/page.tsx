'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { BarChart3, TrendingUp, Users, PlayCircle, Search, Target, Zap } from 'lucide-react';
import styles from '../dashboard.module.css';

interface ContentGap {
  topic: string;
  potentialViews: string;
  reason: string;
}

interface AnalysisResult {
  competitorStrengths: string[];
  contentGaps: ContentGap[];
  winningStrategy: string;
}

export default function AnalysisPage() {
  const [competitorUrl, setCompetitorUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const stats = [
    { label: 'Subscribers', value: '12.4K', change: '+12%', icon: <Users size={20} /> },
    { label: 'Total Views', value: '1.2M', change: '+8%', icon: <PlayCircle size={20} /> },
    { label: 'Avg. Retention', value: '42%', change: '+3%', icon: <TrendingUp size={20} /> },
  ];

  const handleAnalyze = async () => {
    if (!competitorUrl) return;
    setLoading(true);
    try {
      const response = await fetch('/api/generate/competitor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ competitorUrl, niche: 'General' }),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.statsGrid}>
        {stats.map((stat, i) => (
          <Card key={i} className={styles.statCard}>
            <div className={styles.statIcon}>{stat.icon}</div>
            <div className={styles.statInfo}>
              <span className={styles.statLabel}>{stat.label}</span>
              <span className={styles.statValue}>{stat.value}</span>
            </div>
            <span style={{ color: '#10b981', fontWeight: '600', fontSize: '0.875rem' }}>{stat.change}</span>
          </Card>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '1rem' }}>
        {/* Competitor Intelligence */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}><Search size={20} /> Competitor Intelligence</h2>
          <Card style={{ padding: '2rem' }}>
            <p style={{ marginBottom: '1.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Enter a competitor's channel URL to find untapped content gaps.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <input 
                placeholder="youtube.com/@competitor" 
                value={competitorUrl}
                onChange={(e) => setCompetitorUrl(e.target.value)}
                style={{ 
                  flex: 1, 
                  padding: '0.75rem 1rem', 
                  borderRadius: 'var(--radius-md)', 
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--bg-subtle)'
                }}
              />
              <Button isLoading={loading} onClick={handleAnalyze}>Analyze</Button>
            </div>

            {result && (
              <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>Winning Strategy</h4>
                  <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: 'var(--text-main)' }}>{result.winningStrategy}</p>
                </div>
                
                <div>
                  <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>Content Gaps Identified</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {result.contentGaps.map((gap, i) => (
                      <div key={i} style={{ padding: '1rem', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)', borderLeft: '3px solid #f59e0b' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                          <span style={{ fontWeight: '700', fontSize: '0.9rem' }}>{gap.topic}</span>
                          <span style={{ fontSize: '0.7rem', fontWeight: '800', color: '#b45309' }}>{gap.potentialViews} POTENTIAL</span>
                        </div>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{gap.reason}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </section>
        </section>

        {/* Channel Insights */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}><Target size={20} /> AI Channel Audit</h2>
          <Card style={{ padding: '2rem', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
              <Zap size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
              <p>Connect your YouTube channel to unlock AI-powered audience growth strategies.</p>
              <Button variant="outline" style={{ marginTop: '1.5rem' }}>Connect YouTube</Button>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}
