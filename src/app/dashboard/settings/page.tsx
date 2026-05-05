'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { User, Settings as SettingsIcon, CreditCard, Bell } from 'lucide-react';

export default function SettingsPage() {
  const sections = [
    { title: 'Profile Settings', icon: <User size={20} />, desc: 'Manage your personal information and account security.' },
    { title: 'API Configuration', icon: <SettingsIcon size={20} />, desc: 'Configure your NVIDIA NIM and AI model preferences.' },
    { title: 'Subscription & Billing', icon: <CreditCard size={20} />, desc: 'View your current plan and manage your payment methods.' },
    { title: 'Notifications', icon: <Bell size={20} />, desc: 'Customize how and when you receive updates.' },
  ];

  return (
    <div style={{ padding: '2rem', maxWidth: '800px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {sections.map((section, i) => (
          <Card key={i} style={{ padding: '1.5rem', display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
            <div style={{ 
              background: 'rgba(99, 102, 241, 0.1)', 
              color: 'var(--primary)', 
              padding: '0.75rem', 
              borderRadius: '12px' 
            }}>
              {section.icon}
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.25rem', color: 'var(--text-main)' }}>{section.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>{section.desc}</p>
              <Button variant="outline" size="sm">Manage</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
