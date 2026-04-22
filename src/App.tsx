import React, { useState } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { ChatInterface } from './components/ChatInterface';
import { WorkflowScreens } from './components/WorkflowScreens';
import { SupplierRisk } from './components/SupplierRisk';
import { AIVisualization } from './components/AIVisualization';
import { Analytics } from './components/Analytics';
import { Auth } from './components/Auth';
import { UserProvider } from './contexts/UserContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import './App.css';

export type UserPersona = 'cpo' | 'procurement-manager' | 'operations-manager' | 'finance-manager';

function AppContent() {
  const [activeView, setActiveView] = useState<string>('dashboard');
  const [currentPersona, setCurrentPersona] = useState<UserPersona>('procurement-manager');
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading APDE...</p>
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  return (
    <UserProvider>
      <div className="app">
        <Header
          activeView={activeView}
          setActiveView={setActiveView}
          currentPersona={currentPersona}
          setCurrentPersona={setCurrentPersona}
        />

        <main className="main-content">
          {activeView === 'dashboard' && <Dashboard persona={currentPersona} />}
          {activeView === 'chat' && <ChatInterface />}
          {activeView === 'workflows' && <WorkflowScreens />}
          {activeView === 'supplier-risk' && <SupplierRisk />}
          {activeView === 'ai-agents' && <AIVisualization />}
          {activeView === 'analytics' && <Analytics />}
        </main>
      </div>
    </UserProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;