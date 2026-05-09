'use client';

import { useState, useEffect } from 'react';
import DocumentEditor from '@/components/DocumentEditor';
import LetterheadSetup from '@/components/LetterheadSetup';

export default function Home() {
  const [letterhead, setLetterhead] = useState<{
    company: string;
    address: string;
    phone: string;
    email: string;
  } | null>(null);
  const [showSetup, setShowSetup] = useState(false);

  useEffect(() => {
    // Load letterhead from localStorage
    const saved = localStorage.getItem('letterhead');
    if (saved) {
      setLetterhead(JSON.parse(saved));
    } else {
      setShowSetup(true);
    }
  }, []);

  const handleLetterheadSubmit = (data: {
    company: string;
    address: string;
    phone: string;
    email: string;
  }) => {
    setLetterhead(data);
    localStorage.setItem('letterhead', JSON.stringify(data));
    setShowSetup(false);
  };

  if (showSetup || !letterhead) {
    return <LetterheadSetup onSubmit={handleLetterheadSubmit} />;
  }

  return (
    <div>
      <DocumentEditor
        letterhead={letterhead}
        onEditLetterhead={() => setShowSetup(true)}
      />
    </div>
  );
}
