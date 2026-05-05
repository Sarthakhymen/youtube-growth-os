'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Sparkles, TrendingUp, Copy } from 'lucide-react';
import styles from './ideas.module.css';

interface Idea {
  title: string;
  hook: string;
  viralScore: number;
  trendAnalysis: string;
  targetAudience: string;
}

export default function IdeasPage() {
  const [niche, setNiche] = useState('');
  const [loading, setLoading] = useState(false);
  const [ideas, setIdeas] = useState<Idea[]>([]);

  const handleGenerate = async () => {
    if (!niche) return;
    setIdeas([]);
    setLoading(true);
    try {
      const response = await fetch('/api/generate/ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ niche }),
      });
      
      const data = await response.json();
      if (data.ideas) {
        setIdeas(data.ideas);
      }
    } catch (error) {
      console.error('Failed to generate ideas:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.inputCard}>
        <h3>Viral Idea Generator</h3>
        <p>Enter your niche to discover high-potential video ideas with viral scores.</p>
        <div className={styles.inputRow}>
          <input 
            placeholder="e.g. Personal Finance, Gaming, Tech Reviews" 
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
          />
          <Button isLoading={loading} onClick={handleGenerate}>
            <Sparkles size={18} /> Generate Ideas
          </Button>
        </div>
      </Card>

      <div className={styles.resultsGrid}>
        {ideas.map((idea, i) => (
          <Card key={i} className={styles.ideaCard}>
            <div className={styles.ideaHeader}>
              <div className={styles.ideaIcon}><TrendingUp size={16} /></div>
              <span className={styles.viralPotential}>{idea.viralScore}% Viral Score</span>
            </div>
            <h4>{idea.title}</h4>
            <div className={styles.hookBox}>
              <strong>The Hook:</strong> {idea.hook}
            </div>
            <div className={styles.metaRow}>
              <div className={styles.metaItem}>
                <strong>Audience:</strong> {idea.targetAudience}
              </div>
            </div>
            <p className={styles.reason}><strong>Trend Analysis:</strong> {idea.trendAnalysis}</p>
            <div className={styles.cardActions}>
              <Button variant="outline" size="sm" className={styles.copyBtn}><Copy size={14} /> Copy Idea</Button>
              <Button variant="ghost" size="sm">Save</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
