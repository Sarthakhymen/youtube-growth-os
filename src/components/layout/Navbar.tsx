'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/Button';
import { Video, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import styles from './Navbar.module.css';

export const Navbar = () => {
  const router = useRouter();
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <div className={styles.logoIcon}>
            <Video size={24} color="white" />
          </div>
          <span>YouTube Growth OS</span>
        </Link>
        
        <div className={styles.links}>
          <Link href="#features">Features</Link>
          <Link href="#pricing">Pricing</Link>
          <Link href="/dashboard">Dashboard</Link>
        </div>
        
        <div className={styles.actions}>
          <Button variant="ghost" size="sm" onClick={() => router.push('/dashboard')}>Login</Button>
          <Button size="sm" onClick={() => router.push('/dashboard')}>
            Start Creating <Zap size={16} fill="white" />
          </Button>
        </div>
      </div>
    </nav>
  );
};
