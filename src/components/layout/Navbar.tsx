'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/Button';
import { Video, Zap, Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './Navbar.module.css';

export const Navbar = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <div className={styles.logoIcon}>
            <Video size={24} color="white" />
          </div>
          <span>YouTube Growth OS</span>
        </Link>
        
        <div className={`${styles.links} ${isMenuOpen ? styles.mobileOpen : ''}`}>
          <Link href="#features" onClick={() => setIsMenuOpen(false)}>Features</Link>
          <Link href="#pricing" onClick={() => setIsMenuOpen(false)}>Pricing</Link>
          <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
          <div className={styles.mobileActions}>
             <Button variant="ghost" fullWidth onClick={() => { setIsMenuOpen(false); router.push('/dashboard'); }}>Login</Button>
             <Button fullWidth onClick={() => { setIsMenuOpen(false); router.push('/dashboard'); }}>
               Start Creating <Zap size={16} fill="white" />
             </Button>
          </div>
        </div>
        
        <div className={styles.actions}>
          <Button variant="ghost" size="sm" onClick={() => router.push('/dashboard')}>Login</Button>
          <Button size="sm" onClick={() => router.push('/dashboard')}>
            Start Creating <Zap size={16} fill="white" />
          </Button>
        </div>

        <button className={styles.hamburger} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </nav>
  );
};
