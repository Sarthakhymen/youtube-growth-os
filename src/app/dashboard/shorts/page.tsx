'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Clapperboard, Sparkles, Video } from 'lucide-react';
import styles from '../ideas/ideas.module.css'; // Reusing similar layout

export default function ShortsPage() {
  return (
    <div style={{ padding: '2rem' }}>
      <Card style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <div style={{ 
          background: 'rgba(244, 63, 94, 0.1)', 
          color: '#f43f5e', 
          width: '64px', 
          height: '64px', 
          borderRadius: '16px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          margin: '0 auto 1.5rem'
        }}>
          <Clapperboard size={32} />
        </div>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--text-main)' }}>Shorts Generator</h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto 2rem' }}>
          Our AI is being trained on the latest viral TikTok and YouTube Shorts trends. 
          This feature will be available soon to help you dominate short-form content.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Button disabled>
            <Sparkles size={18} /> Join Waitlist
          </Button>
          <Button variant="outline">
            <Video size={18} /> View Examples
          </Button>
        </div>
      </Card>
    </div>
  );
}
