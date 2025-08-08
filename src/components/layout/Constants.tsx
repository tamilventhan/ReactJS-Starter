import {
  Calendar,
  Users,
  PlusCircle,
  Stethoscope,
  Pill,
  FileText,
  Shield,
  Settings,
  HelpCircle,
} from 'lucide-react';

// Types
export type NavItem = {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  submenus?: { label: string; path: string }[];
};

export type Notification = {
  timestamp: string | number | Date;
  id: number;
  message: string;
  time: string;
};

// Navigation Items
export const navItems: NavItem[] = [
  {
    label: 'Appointments',
    icon: Calendar,
    path: '#',
    submenus: [
      { label: 'Book New', path: '#book-new' },
      { label: 'Upcoming', path: '#upcoming' },
      { label: 'Past', path: '#past' },
    ],
  },
  {
    label: 'My Family',
    icon: Users,
    path: '#',
    submenus: [
      { label: 'Add Member', path: '#add-member' },
      { label: 'View Members', path: '#view-members' },
    ],
  },
  { label: 'Ask AI', icon: PlusCircle, path: '#ask-ai' },
  { label: 'My Doctors', icon: Stethoscope, path: '#my-doctors' },
  { label: 'Medications', icon: Pill, path: '#medications' },
  { label: 'Documents', icon: FileText, path: '#documents' },
  { label: 'ABHA', icon: Shield, path: '#abha' },
  { label: 'Settings', icon: Settings, path: '#settings' },
  { label: 'Security and Privacy', icon: Shield, path: '#security-privacy' },
  { label: 'Support and Feedback', icon: HelpCircle, path: '#support-feedback' },
  { label: 'Terms of Services', icon: FileText, path: '#terms-of-services' },
];

// Notifications
export const mockNotifications: Notification[] = [
  {
    id: 1,
    message: 'Your appointment with Dr. Smith is confirmed for tomorrow.',
    time: '2 hours ago',
    timestamp: ''
  },
  {
    id: 2,
    message: 'New medication "PainRelief" has been added to your prescription.',
    time: '5 hours ago',
    timestamp: ''
  },
  {
    id: 3,
    message: 'Your recent lab results are available for review.',
    time: '1 day ago',
    timestamp: ''
  },
  {
    id: 4,
    message: 'Reminder: Flu shot due next month.',
    time: '3 days ago',
    timestamp: ''
  },
];