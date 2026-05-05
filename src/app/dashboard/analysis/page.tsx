'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { BarChart3, TrendingUp, Users, PlayCircle } from 'lucide-react';
import styles from '../dashboard.module.css';

export default function AnalysisPage() {
  const stats = [
    { label: 'Subscribers', value: '12.4K', change: '+12%', icon: <Users size={20} /> },
    { label: 'Total Views', value: '1.2M', change: '+8%', icon: <PlayCircle size={20} /> },
    { label: 'Avg. Retention', value: '42%', change: '+3%', icon: <TrendingUp size={20} /> },
  ];

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

      <section className={styles.section} style={{ marginTop: '2rem' }}>
        <h2 className={styles.sectionTitle}>Channel Performance</h2>
        <Card style={{ padding: '2rem', minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
            <BarChart3 size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
            <p>Connect your YouTube channel to see detailed analytics and AI insights.</p>
          </div>
        </Card>
      </section>
    </div>
  );
}
