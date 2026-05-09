'use client';

import { useState } from 'react';
import './LetterheadSetup.css';

interface LetterheadSetupProps {
  onSubmit: (data: {
    company: string;
    address: string;
    phone: string;
    email: string;
    logo: string;
  }) => void;
}

export default function LetterheadSetup({ onSubmit }: LetterheadSetupProps) {
  const [company, setCompany] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [logo, setLogo] = useState('');

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogo(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ company, address, phone, email, logo });
  };

  return (
    <div className="setup-container">
      <div className="setup-card">
        <h1>Welcome to Letterhead Editor</h1>
        <p>Let&apos;s set up your letterhead information</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="company">Company Name</label>
            <input
              id="company"
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Your company name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="123 Main St, City, State 12345"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(555) 123-4567"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@company.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="logo">Logo (Optional)</label>
            <input
              id="logo"
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
            />
            {logo && (
              <div className="logo-preview">
                <img src={logo} alt="Logo preview" />
              </div>
            )}
          </div>

          <button type="submit" className="submit-btn">
            Start Writing
          </button>
        </form>
      </div>
    </div>
  );
}
