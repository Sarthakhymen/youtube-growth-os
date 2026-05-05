import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import styles from './layout.module.css';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <h1>Dashboard</h1>
            <div className={styles.headerActions}>
              {/* Optional header items like notifications or search */}
            </div>
          </div>
        </header>
        <div className={styles.content}>
          {children}
        </div>
      </main>
    </div>
  );
}
