'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { BarChart3, TrendingUp, Users, PlayCircle, Search, Target, Zap } from 'lucide-react';
import styles from './analysis.module.css';

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
            <span className={styles.statChange}>{stat.change}</span>
          </Card>
        ))}
      </div>

      <div className={styles.mainGrid}>
        {/* Competitor Intelligence */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}><Search size={20} /> Competitor Intelligence</h2>
          <Card className={styles.inputCard}>
            <p className={styles.cardDesc}>
              Enter a competitor's channel URL to find untapped content gaps.
            </p>
            <div className={styles.analysisInputGroup}>
              <input 
                placeholder="youtube.com/@competitor" 
                className={styles.competitorInput}
                value={competitorUrl}
                onChange={(e) => setCompetitorUrl(e.target.value)}
              />
              <Button isLoading={loading} onClick={handleAnalyze}>Analyze</Button>
            </div>

            {result && (
              <div className={styles.resultsArea}>
                <div>
                  <h4 className={styles.resultTitle}>Winning Strategy</h4>
                  <p className={styles.strategyText}>{result.winningStrategy}</p>
                </div>
                
                <div>
                  <h4 className={styles.resultTitle}>Content Gaps Identified</h4>
                  <div className={styles.gapsList}>
                    {result.contentGaps.map((gap, i) => (
                      <div key={i} className={styles.gapCard}>
                        <div className={styles.gapHeader}>
                          <span className={styles.gapTopic}>{gap.topic}</span>
                          <span className={styles.gapPotential}>{gap.potentialViews} POTENTIAL</span>
                        </div>
                        <p className={styles.gapReason}>{gap.reason}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </Card>
        </section>
        
        {/* Channel Insights */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}><Target size={20} /> AI Channel Audit</h2>
          <Card className={styles.auditCard}>
            <div className={styles.auditEmptyState}>
              <Zap size={48} className={styles.auditIcon} />
              <p>Connect your YouTube channel to unlock AI-powered audience growth strategies.</p>
              <Button variant="outline" className={styles.connectButton}>Connect YouTube</Button>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}
