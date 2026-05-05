'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Lightbulb, 
  Clapperboard, 
  BarChart3, 
  Settings,
  Video,
  LogOut
} from 'lucide-react';
import styles from './Sidebar.module.css';
import { clsx } from 'clsx';

const menuItems = [
  { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
  { name: 'Script Generator', icon: <FileText size={20} />, path: '/dashboard/scripts' },
  { name: 'Idea Generator', icon: <Lightbulb size={20} />, path: '/dashboard/ideas' },
  { name: 'Shorts Generator', icon: <Clapperboard size={20} />, path: '/dashboard/shorts' },
  { name: 'Channel Analysis', icon: <BarChart3 size={20} />, path: '/dashboard/analysis' },
  { name: 'Settings', icon: <Settings size={20} />, path: '/dashboard/settings' },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <div className={styles.logoIcon}>
          <Video size={20} color="white" />
        </div>
        <span>YT Growth OS</span>
      </div>
      
      <nav className={styles.nav}>
        {menuItems.map((item) => (
          <Link 
            key={item.path} 
            href={item.path}
            className={clsx(
              styles.navItem, 
              mounted && pathname === item.path && styles.active
            )}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </nav>
      
      <div className={styles.footer}>
        <div className={styles.userProfile}>
          <div className={styles.avatar}>JD</div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>John Doe</span>
            <span className={styles.userPlan}>Pro Plan</span>
          </div>
        </div>
        <button className={styles.logoutBtn}>
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
};
