import React from 'react';
import {
  Home,
  Users,
  FileText,
  Database,
  CreditCard,
  Settings,
  Award,
  Layers,
  Shield,
  UserCheck,
  Briefcase,
  Activity,
  Globe
} from 'lucide-react';

export const getIconComponent = (iconName, size = 20) => {
  const icons = {
    Home,
    Users,
    FileText,
    Database,
    CreditCard,
    Settings,
    Award,
    Layers,
    Shield,
    UserCheck,
    Briefcase,
    Activity,
    Globe
  };
  
  const IconComponent = icons[iconName];
  
  if (IconComponent) {
    return <IconComponent size={size} />;
  }
  
  // Return default icon if not found
  return <Database size={size} />;
};