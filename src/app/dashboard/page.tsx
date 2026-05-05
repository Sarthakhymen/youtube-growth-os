'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { 
  Plus, 
  FileText, 
  Lightbulb, 
  Clapperboard, 
  Zap,
  TrendingUp,
  Clock
} from 'lucide-react';
import styles from './dashboard.module.css';

export default function DashboardPage() {
  const router = useRouter();
  return (
    <div className={styles.container}>
      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        <Card className={styles.statCard}>
          <div className={styles.statIcon}><Zap size={20} /></div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Monthly Credits</span>
            <span className={styles.statValue}>125 / 500</span>
          </div>
          <div className={styles.progressBar}><div className={styles.progress} style={{width: '25%'}} /></div>
        </Card>
        <Card className={styles.statCard}>
          <div className={styles.statIcon} style={{backgroundColor: '#e0e7ff', color: '#4f46e5'}}><FileText size={20} /></div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Scripts Generated</span>
            <span className={styles.statValue}>42</span>
          </div>
        </Card>
        <Card className={styles.statCard}>
          <div className={styles.statIcon} style={{backgroundColor: '#fef3c7', color: '#d97706'}}><TrendingUp size={20} /></div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Avg. Viral Score</span>
            <span className={styles.statValue}>84/100</span>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Quick Actions</h2>
        <div className={styles.actionGrid}>
          <Button className={styles.actionBtn} onClick={() => router.push('/dashboard/scripts')}>
            <Plus size={18} /> New Script
          </Button>
          <Button variant="outline" className={styles.actionBtn} onClick={() => router.push('/dashboard/ideas')}>
            <Lightbulb size={18} /> Get Ideas
          </Button>
          <Button variant="outline" className={styles.actionBtn} onClick={() => router.push('/dashboard/shorts')}>
            <Clapperboard size={18} /> Create Shorts
          </Button>
        </div>
      </section>

      {/* Recent Generations */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Recent Generations</h2>
        <Card className={styles.recentCard}>
          <div className={styles.tableHeader}>
            <span>Title</span>
            <span>Type</span>
            <span>Date</span>
            <span>Viral Score</span>
          </div>
          <div className={styles.tableBody}>
            {[
              { title: '10 Minimalist Habits for 2026', type: 'Script', date: '2 hours ago', score: 92 },
              { title: 'The Future of AI Coding', type: 'Idea', date: '5 hours ago', score: 78 },
              { title: 'How to Scale on YouTube Shorts', type: 'Shorts', date: 'Yesterday', score: 85 },
              { title: 'Productivity Tech Stack', type: 'Script', date: '2 days ago', score: 81 },
            ].map((item, i) => (
              <div key={i} className={styles.tableRow}>
                <span className={styles.rowTitle}>{item.title}</span>
                <span className={styles.rowType}><span className={styles.typeBadge}>{item.type}</span></span>
                <span className={styles.rowDate}><Clock size={14} /> {item.date}</span>
                <span className={styles.rowScore}>
                  <div className={styles.scoreBadge} style={{backgroundColor: item.score > 80 ? '#dcfce7' : '#fef9c3', color: item.score > 80 ? '#166534' : '#854d0e'}}>
                    {item.score}
                  </div>
                </span>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
