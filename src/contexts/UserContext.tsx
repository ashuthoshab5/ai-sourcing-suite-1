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
    permissions: ['decision-oversight', 'automation-strategy', 'performance-analytics', 'system-optimization']
  },
  'procurement-manager': {
    userName: 'Mike Rodriguez',
    userRole: 'Senior Procurement Manager',
    permissions: ['decision-review', 'confidence-monitoring', 'exception-handling', 'agent-oversight']
  },
  'operations-manager': {
    userName: 'Lisa Wang',
    userRole: 'Operations Manager',
    permissions: ['automation-operations', 'decision-pipeline', 'performance-monitoring', 'workflow-optimization']
  },
  'finance-manager': {
    userName: 'David Kumar',
    userRole: 'Finance Manager',
    permissions: ['cost-optimization', 'roi-analysis', 'financial-impact', 'decision-validation']
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