import React from 'react';
import { 
  Building2, 
  MessageSquare, 
  Workflow, 
  ShieldAlert, 
  Brain, 
  BarChart3, 
  User,
  Bell,
  Settings
} from 'lucide-react';
import { useUser, UserPersona } from '../contexts/UserContext';

interface HeaderProps {
  activeView: string;
  setActiveView: (view: string) => void;
  currentPersona: UserPersona;
  setCurrentPersona: (persona: UserPersona) => void;
}

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Building2 },
  { id: 'chat', label: 'AI Assistant', icon: MessageSquare },
  { id: 'workflows', label: 'Workflows', icon: Workflow },
  { id: 'supplier-risk', label: 'Supplier Risk', icon: ShieldAlert },
  { id: 'ai-agents', label: 'AI Agents', icon: Brain },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
];

const personaLabels = {
  'cpo': 'CPO',
  'procurement-manager': 'Procurement',
  'operations-manager': 'Operations',
  'finance-manager': 'Finance'
};

export function Header({ activeView, setActiveView, currentPersona, setCurrentPersona }: HeaderProps) {
  const { userName, userRole } = useUser();

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <div className="logo">
            <Building2 className="logo-icon" />
            <span className="logo-text">APDE</span>
          </div>
          
          <nav className="nav">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`nav-item ${activeView === item.id ? 'nav-item-active' : ''}`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="header-right">
          <div className="persona-selector">
            <label className="persona-label">View as:</label>
            <select
              value={currentPersona}
              onChange={(e) => setCurrentPersona(e.target.value as UserPersona)}
              className="persona-select"
            >
              {Object.entries(personaLabels).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>

          <div className="header-actions">
            <button className="header-action">
              <Bell size={20} />
            </button>
            <button className="header-action">
              <Settings size={20} />
            </button>
            <div className="user-info">
              <div className="user-avatar">
                <User size={18} />
              </div>
              <div className="user-details">
                <div className="user-name">{userName}</div>
                <div className="user-role">{userRole}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .header {
          background: white;
          border-bottom: 1px solid var(--color-gray-200);
          box-shadow: var(--shadow-sm);
          position: sticky;
          top: 0;
          z-index: 50;
        }

        .header-container {
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 var(--spacing-6);
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: 64px;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: var(--spacing-8);
        }

        .logo {
          display: flex;
          align-items: center;
          gap: var(--spacing-2);
          font-weight: 700;
          font-size: var(--font-size-xl);
          color: var(--color-primary-600);
        }

        .logo-icon {
          color: var(--color-primary-600);
        }

        .nav {
          display: flex;
          align-items: center;
          gap: var(--spacing-1);
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-2);
          padding: var(--spacing-2) var(--spacing-3);
          border-radius: var(--radius-base);
          background: none;
          border: none;
          cursor: pointer;
          font-size: var(--font-size-sm);
          font-weight: 500;
          color: var(--color-gray-600);
          transition: all var(--transition-fast);
        }

        .nav-item:hover {
          background-color: var(--color-gray-100);
          color: var(--color-gray-900);
        }

        .nav-item-active {
          background-color: var(--color-primary-50);
          color: var(--color-primary-600);
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: var(--spacing-4);
        }

        .persona-selector {
          display: flex;
          align-items: center;
          gap: var(--spacing-2);
        }

        .persona-label {
          font-size: var(--font-size-sm);
          color: var(--color-gray-600);
          font-weight: 500;
        }

        .persona-select {
          padding: var(--spacing-2) var(--spacing-3);
          border: 1px solid var(--color-gray-300);
          border-radius: var(--radius-base);
          background: white;
          font-size: var(--font-size-sm);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .persona-select:hover {
          border-color: var(--color-gray-400);
        }

        .persona-select:focus {
          outline: none;
          border-color: var(--color-primary-500);
          box-shadow: 0 0 0 3px rgb(59 130 246 / 0.1);
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: var(--spacing-3);
        }

        .header-action {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: var(--radius-base);
          background: none;
          border: none;
          cursor: pointer;
          color: var(--color-gray-600);
          transition: all var(--transition-fast);
        }

        .header-action:hover {
          background-color: var(--color-gray-100);
          color: var(--color-gray-900);
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: var(--spacing-3);
          padding: var(--spacing-2);
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          background-color: var(--color-primary-100);
          color: var(--color-primary-600);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .user-details {
          display: flex;
          flex-direction: column;
        }

        .user-name {
          font-size: var(--font-size-sm);
          font-weight: 600;
          color: var(--color-gray-900);
        }

        .user-role {
          font-size: var(--font-size-xs);
          color: var(--color-gray-600);
        }

        @media (max-width: 768px) {
          .nav {
            display: none;
          }
          
          .header-container {
            padding: 0 var(--spacing-4);
          }
          
          .user-details {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}