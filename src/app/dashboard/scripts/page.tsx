'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Sparkles, Copy, Download, Send } from 'lucide-react';
import styles from './scripts.module.css';

interface ScriptResult {
  viralScore: number;
  title: string;
  hook: string;
  script: string;
  cta: string;
}

export default function ScriptsPage() {
  const [topic, setTopic] = useState('');
  const [niche, setNiche] = useState('');
  const [tone, setTone] = useState('educational');
  const [length, setLength] = useState('10');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScriptResult | null>(null);

  const handleGenerate = async () => {
    if (!topic) return;
    setLoading(true);
    try {
      const response = await fetch('/api/generate/script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, niche, tone, length }),
      });
      
      const data = await response.json();
      if (data.viralScore) {
        setResult(data);
      }
    } catch (error) {
      console.error('Failed to generate script:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {/* Input Form */}
        <div className={styles.formSection}>
          <Card className={styles.card}>
            <h3>Script Configuration</h3>
            <p className={styles.cardDesc}>Fill in the details to generate a high-retention script.</p>
            
            <div className={styles.formGroup}>
              <label>Video Topic</label>
              <input 
                placeholder="e.g. How to grow a YouTube channel in 2026" 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Niche</label>
              <input 
                placeholder="e.g. Tech, Finance, Lifestyle" 
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
              />
            </div>

            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label>Tone</label>
                <select value={tone} onChange={(e) => setTone(e.target.value)}>
                  <option value="educational">Educational</option>
                  <option value="viral">Viral / Hype</option>
                  <option value="storytelling">Storytelling</option>
                  <option value="documentary">Documentary</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Length (Mins)</label>
                <input 
                  type="number" 
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                />
              </div>
            </div>

            <Button 
              className={styles.generateBtn} 
              isLoading={loading}
              onClick={handleGenerate}
            >
              <Sparkles size={18} /> Generate Script
            </Button>
          </Card>
        </div>

        {/* Output Area */}
        <div className={styles.outputSection}>
          {result ? (
            <div className={styles.resultWrapper}>
              <Card className={styles.resultCard}>
                <div className={styles.resultHeader}>
                  <div>
                    <span className={styles.viralScoreLabel}>Viral Score</span>
                    <div className={styles.viralScoreValue}>{result.viralScore}/100</div>
                  </div>
                  <div className={styles.resultActions}>
                    <Button variant="outline" size="sm"><Copy size={14} /> Copy</Button>
                    <Button variant="outline" size="sm"><Download size={14} /> Export</Button>
                  </div>
                </div>

                <div className={styles.resultContent}>
                  <div className={styles.resultBlock}>
                    <h4>Title Suggestion</h4>
                    <p className={styles.titleText}>{result.title}</p>
                  </div>

                  <div className={styles.resultBlock}>
                    <h4>The Hook (First 5 Seconds)</h4>
                    <div className={styles.hookBox}>{result.hook}</div>
                  </div>

                  <div className={styles.resultBlock}>
                    <h4>Full Script</h4>
                    <pre className={styles.scriptPre}>{result.script}</pre>
                  </div>

                  <div className={styles.resultBlock}>
                    <h4>Call to Action</h4>
                    <p className={styles.ctaText}>{result.cta}</p>
                  </div>
                </div>
              </Card>
            </div>
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}><Send size={40} /></div>
              <h3>Ready to generate?</h3>
              <p>Fill out the form on the left and our AI will craft a masterpiece for you.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
