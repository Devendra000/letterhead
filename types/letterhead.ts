export type Theme = 'classic' | 'modern' | 'corporate' | 'creative' | 'minimal';

export interface LetterheadField {
  id: string;
  label: string;
  value: string;
  x: number;
  y: number;
}

export interface Letterhead {
  company: string;
  logo: string;
  logoX: number;
  logoY: number;
  theme: Theme;
  fields: LetterheadField[];
}

export const THEMES = {
  classic: {
    name: 'Classic',
    backgroundColor: '#ffffff',
    accentColor: '#333333',
    borderColor: '#000000',
    fontFamily: 'Georgia, serif',
  },
  modern: {
    name: 'Modern',
    backgroundColor: '#f8f9fa',
    accentColor: '#667eea',
    borderColor: '#667eea',
    fontFamily: 'Arial, sans-serif',
  },
  corporate: {
    name: 'Corporate',
    backgroundColor: '#ffffff',
    accentColor: '#1a365d',
    borderColor: '#1a365d',
    fontFamily: 'Helvetica, sans-serif',
  },
  creative: {
    name: 'Creative',
    backgroundColor: '#fef5f5',
    accentColor: '#d946ef',
    borderColor: '#d946ef',
    fontFamily: 'Verdana, sans-serif',
  },
  minimal: {
    name: 'Minimal',
    backgroundColor: '#ffffff',
    accentColor: '#666666',
    borderColor: '#e0e0e0',
    fontFamily: 'Arial, sans-serif',
  },
};

export const DEFAULT_FIELDS: { label: string }[] = [
  { label: 'Address' },
  { label: 'Phone' },
  { label: 'Email' },
  { label: 'Pan No' },
  { label: 'Tax ID' },
  { label: 'Registration No' },
  { label: 'Website' },
];
