import React, { useState } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { ChatInterface } from './components/ChatInterface';
import { WorkflowScreens } from './components/WorkflowScreens';
import { SupplierRisk } from './components/SupplierRisk';
import { AIVisualization } from './components/AIVisualization';
import { Analytics } from './components/Analytics';
import { UserProvider } from './contexts/UserContext';
import './App.css';

export type UserPersona = 'cpo' | 'procurement-manager' | 'operations-manager' | 'finance-manager';

function App() {
  const [activeView, setActiveView] = useState<string>('dashboard');
  const [currentPersona, setCurrentPersona] = useState<UserPersona>('procurement-manager');

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

export default App;