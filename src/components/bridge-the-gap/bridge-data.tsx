
import React from 'react';
import { Heart, MessageCircle, DollarSign, Home, Users, HandMetal, Shield, User } from 'lucide-react';

// Custom icon for Parenting
const ParentChildIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
    <circle cx="17" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
    <path d="M3 20C3 16.6863 5.68629 14 9 14C12.3137 14 15 16.6863 15 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M14 19C14 16.7909 15.7909 15 18 15C19.1916 15 20.2574 15.5336 21 16.3579" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// Category data for the grid
export const categoryData = [
  {
    id: 'parenting',
    label: 'Parenting',
    icon: <ParentChildIcon />
  },
  {
    id: 'intimacy',
    label: 'Intimacy',
    icon: <Heart className="w-8 h-8" />
  },
  {
    id: 'communication',
    label: 'Communication',
    icon: <MessageCircle className="w-8 h-8" />
  },
  {
    id: 'household',
    label: 'Household Duties',
    icon: <Home className="w-8 h-8" />
  },
  {
    id: 'money',
    label: 'Money',
    icon: <DollarSign className="w-8 h-8" />
  },
  {
    id: 'dismissed',
    label: 'Feeling Dismissed',
    icon: <HandMetal className="w-8 h-8" />
  },
  {
    id: 'in-laws',
    label: 'In-Laws',
    icon: <Users className="w-8 h-8" />
  },
  {
    id: 'boundaries',
    label: 'Boundaries',
    icon: <Shield className="w-8 h-8" />
  },
  {
    id: 'unseen',
    label: 'Feeling Unseen',
    icon: <User className="w-8 h-8" />
  }
];

// This will be expanded in future with subcategories and prompts
export const subcategoriesData: Record<string, { id: string, label: string }[]> = {
  'parenting': [
    { id: 'discipline', label: 'Discipline Approaches' },
    { id: 'schedules', label: 'Schedules & Routines' },
    { id: 'values', label: 'Parenting Values' }
  ],
  'intimacy': [
    { id: 'frequency', label: 'Frequency' },
    { id: 'connection', label: 'Emotional Connection' },
    { id: 'preferences', label: 'Preferences & Desires' }
  ],
  // Additional subcategories would be added for other categories
};

// Placeholder for prompt data structure
export type Prompt = {
  id: string;
  text: string;
  categoryId: string;
  subcategoryId: string;
};

// This will be populated with actual prompts in the future
export const promptsData: Prompt[] = [];
