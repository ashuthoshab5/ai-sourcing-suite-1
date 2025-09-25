import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserPersona = 'cpo' | 'procurement-manager' | 'operations-manager' | 'finance-manager';

interface UserContextType {
  persona: UserPersona;
  setPersona: (persona: UserPersona) => void;
  userName: string;
  userRole: string;
  permissions: string[];
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const personaConfig = {
  'cpo': {
    userName: 'Sarah Chen',
    userRole: 'Chief Procurement Officer',
    permissions: ['strategic-sourcing', 'supplier-management', 'analytics', 'budget-oversight']
  },
  'procurement-manager': {
    userName: 'Mike Rodriguez',
    userRole: 'Senior Procurement Manager',
    permissions: ['sourcing', 'supplier-evaluation', 'contract-management', 'team-management']
  },
  'operations-manager': {
    userName: 'Lisa Wang',
    userRole: 'Operations Manager',
    permissions: ['purchase-orders', 'invoice-processing', 'receipt-verification', 'vendor-communication']
  },
  'finance-manager': {
    userName: 'David Kumar',
    userRole: 'Finance Manager',
    permissions: ['spend-analysis', 'budget-monitoring', 'financial-reporting', 'compliance']
  }
};

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [persona, setPersona] = useState<UserPersona>('procurement-manager');
  
  const config = personaConfig[persona];

  const value = {
    persona,
    setPersona,
    userName: config.userName,
    userRole: config.userRole,
    permissions: config.permissions
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}