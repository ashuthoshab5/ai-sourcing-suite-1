import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  MessageSquare, 
  Search, 
  DollarSign, 
  Shield, 
  FileText,
  Zap,
  Activity,
  ArrowRight,
  CheckCircle,
  Clock,
  Users,
  TrendingUp,
  AlertTriangle,
  Target
} from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  icon: React.ElementType;
  status: 'active' | 'idle' | 'processing';
  specialty: string;
  tasks: string[];
  currentTask?: string;
  performance: number;
  collaborations: string[];
}

const agents: Agent[] = [
  {
    id: 'requirement',
    name: 'Requirement Analysis',
    icon: MessageSquare,
    status: 'active',
    specialty: 'Multi-dimensional requirement parsing and structuring',
    tasks: ['NLP processing', 'Specification extraction', 'Preference elicitation'],
    currentTask: 'Analyzing office furniture specifications',
    performance: 94,
    collaborations: ['discovery', 'evaluation']
  },
  {
    id: 'discovery',
    name: 'Supplier Discovery',
    icon: Search,
    status: 'processing',
    specialty: 'Intelligent supplier identification and capability matching',
    tasks: ['Supplier matching', 'Capability assessment', 'Market intelligence'],
    currentTask: 'Discovering suppliers for cloud infrastructure',
    performance: 89,
    collaborations: ['evaluation', 'negotiation']
  },
  {
    id: 'evaluation',
    name: 'Bid Evaluation',
    icon: TrendingUp,
    status: 'active',
    specialty: 'Multi-criteria decision analysis and bid scoring',
    tasks: ['MCDA analysis', 'TCO calculation', 'Risk assessment'],
    currentTask: 'Evaluating 8 furniture supplier bids',
    performance: 91,
    collaborations: ['optimization', 'verification']
  },
  {
    id: 'optimization',
    name: 'Optimization Engine',
    icon: Target,
    status: 'processing',
    specialty: 'Combinatorial optimization and supplier combination analysis',
    tasks: ['Mathematical optimization', 'Constraint solving', 'Trade-off analysis'],
    currentTask: 'Optimizing 3-supplier combination for IT equipment',
    performance: 96,
    collaborations: ['evaluation', 'negotiation']
  },
  {
    id: 'negotiation',
    name: 'Negotiation Agent',
    icon: DollarSign,
    status: 'active',
    specialty: 'Automated negotiation and counter-offer management',
    tasks: ['Price negotiation', 'Terms optimization', 'Counter-offer analysis'],
    currentTask: 'Negotiating volume discounts with TechFlow',
    performance: 92,
    collaborations: ['discovery', 'verification']
  },
  {
    id: 'learning',
    name: 'Learning Agent',
    icon: Brain,
    status: 'idle',
    specialty: 'Continuous improvement and preference learning',
    tasks: ['Model retraining', 'Preference learning', 'Performance optimization'],
    performance: 97,
    collaborations: ['requirement', 'evaluation']
  },
  {
    id: 'verification',
    name: 'Verification Agent',
    icon: Shield,
    status: 'active',
    specialty: 'Decision validation and compliance checking',
    tasks: ['Decision validation', 'Compliance checking', 'Risk assessment'],
    currentTask: 'Validating automated furniture decision',
    performance: 93,
    collaborations: ['evaluation', 'optimization']
  }
];

const collaborationScenarios = [
  {
    id: 'multi-supplier-optimization',
    title: 'Office Furniture Multi-Supplier Decision',
    description: 'Complex optimization across 8 suppliers with varying capabilities',
    participants: ['requirement', 'discovery', 'evaluation', 'optimization'],
    currentStep: 2,
    steps: [
      { agent: 'requirement', action: 'Parse furniture specifications and preferences', status: 'completed' },
      { agent: 'discovery', action: 'Identify 8 qualified furniture suppliers', status: 'completed' },
      { agent: 'evaluation', action: 'Multi-criteria analysis of all bids', status: 'active' },
      { agent: 'optimization', action: 'Determine optimal supplier combination', status: 'pending' }
    ]
  },
  {
    id: 'automated-negotiation',
    title: 'Software License Negotiation',
    description: 'Autonomous negotiation with multiple SaaS providers',
    participants: ['discovery', 'evaluation', 'negotiation', 'verification'],
    currentStep: 1,
    steps: [
      { agent: 'discovery', action: 'Identify SaaS license providers', status: 'completed' },
      { agent: 'evaluation', action: 'Analyze initial pricing proposals', status: 'completed' },
      { agent: 'negotiation', action: 'Execute automated price negotiations', status: 'active' },
      { agent: 'verification', action: 'Validate final terms and compliance', status: 'pending' }
    ]
  }
];

export function AIVisualization() {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [activeScenario, setActiveScenario] = useState(0);
  const [animationActive, setAnimationActive] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (animationActive) {
        // Simulate agent activity changes
        agents.forEach(agent => {
          if (Math.random() > 0.7) {
            agent.status = agent.status === 'active' ? 'processing' : 'active';
          }
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [animationActive]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'processing': return 'warning';
      case 'idle': return 'info';
      default: return 'info';
    }
  };

  const getStepStatus = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'active': return 'warning';
      case 'pending': return 'info';
      default: return 'info';
    }
  };

  return (
    <div className="ai-visualization animate-fade-in">
      <div className="visualization-header">
        <div>
          <h1>Autonomous Decision Engine</h1>
          <p>Real-time multi-agent AI system for procurement decision automation</p>
        </div>
        <div className="header-actions">
          <button 
            className={`btn ${animationActive ? 'btn-secondary' : 'btn-primary'}`}
            onClick={() => setAnimationActive(!animationActive)}
          >
            {animationActive ? 'Pause' : 'Resume'} Animation
          </button>
          <button className="btn btn-primary">
            <Activity size={18} />
            System Status
          </button>
        </div>
      </div>

      <div className="visualization-content">
        <div className="agents-network">
          <div className="network-container">
            <svg className="network-svg" viewBox="0 0 800 600">
              {/* Agent nodes */}
              {agents.map((agent, index) => {
                const angle = (index * 2 * Math.PI) / agents.length;
                const radius = 180;
                const x = 400 + radius * Math.cos(angle);
                const y = 300 + radius * Math.sin(angle);

                return (
                  <g key={agent.id}>
                    {/* Collaboration connections */}
                    {agent.collaborations.map(collaboratorId => {
                      const collaborator = agents.find(a => a.id === collaboratorId);
                      if (!collaborator) return null;
                      
                      const collabIndex = agents.findIndex(a => a.id === collaboratorId);
                      const collabAngle = (collabIndex * 2 * Math.PI) / agents.length;
                      const collabX = 400 + radius * Math.cos(collabAngle);
                      const collabY = 300 + radius * Math.sin(collabAngle);

                      return (
                        <line
                          key={collaboratorId}
                          x1={x}
                          y1={y}
                          x2={collabX}
                          y2={collabY}
                          stroke="#e5e7eb"
                          strokeWidth="2"
                          strokeDasharray={agent.status === 'active' && collaborator.status === 'active' ? "none" : "5,5"}
                          className={agent.status === 'active' && collaborator.status === 'active' ? "active-connection" : ""}
                        />
                      );
                    })}
                    
                    {/* Agent node */}
                    <circle
                      cx={x}
                      cy={y}
                      r="40"
                      fill={agent.status === 'active' ? '#22c55e' : agent.status === 'processing' ? '#f59e0b' : '#6b7280'}
                      className={`agent-node ${agent.status}`}
                      onClick={() => setSelectedAgent(agent)}
                      style={{ cursor: 'pointer' }}
                    />
                    
                    {/* Agent icon */}
                    <foreignObject x={x-12} y={y-12} width="24" height="24">
                      <agent.icon size={24} color="white" />
                    </foreignObject>
                    
                    {/* Agent label */}
                    <text
                      x={x}
                      y={y + 60}
                      textAnchor="middle"
                      className="agent-label"
                      onClick={() => setSelectedAgent(agent)}
                      style={{ cursor: 'pointer' }}
                    >
                      {agent.name}
                    </text>

                    {/* Status indicator */}
                    <circle
                      cx={x + 25}
                      cy={y - 25}
                      r="8"
                      fill={agent.status === 'active' ? '#22c55e' : agent.status === 'processing' ? '#f59e0b' : '#6b7280'}
                      className="status-indicator"
                    />
                  </g>
                );
              })}

              {/* Central hub */}
              <circle cx="400" cy="300" r="60" fill="#3b82f6" className="central-hub" />
              <foreignObject x="388" y="288" width="24" height="24">
                <Brain size={24} color="white" />
              </foreignObject>
              <text x="400" y="340" textAnchor="middle" className="hub-label">
                Decision Core
              </text>
            </svg>
          </div>

          <div className="network-legend">
            <h3>Agent Status</h3>
            <div className="legend-items">
              <div className="legend-item">
                <div className="status-dot active"></div>
                <span>Active</span>
              </div>
              <div className="legend-item">
                <div className="status-dot processing"></div>
                <span>Processing</span>
              </div>
              <div className="legend-item">
                <div className="status-dot idle"></div>
                <span>Idle</span>
              </div>
            </div>
          </div>
        </div>

        <div className="visualization-sidebar">
          {selectedAgent ? (
            <div className="agent-details card">
              <div className="card-header">
                <div className="agent-info">
                  <selectedAgent.icon size={32} className="agent-icon" />
                  <div>
                    <h3>{selectedAgent.name}</h3>
                    <div className={`status-badge status-${getStatusColor(selectedAgent.status)}`}>
                      {selectedAgent.status.toUpperCase()}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="card-body">
                <div className="specialty">
                  <h4>Specialty</h4>
                  <p>{selectedAgent.specialty}</p>
                </div>

                <div className="performance">
                  <h4>Performance Score</h4>
                  <div className="performance-bar">
                    <div 
                      className="performance-fill"
                      style={{ width: `${selectedAgent.performance}%` }}
                    ></div>
                  </div>
                  <span className="performance-value">{selectedAgent.performance}%</span>
                </div>

                {selectedAgent.currentTask && (
                  <div className="current-task">
                    <h4>Current Task</h4>
                    <div className="task-item">
                      <Clock size={16} />
                      <span>{selectedAgent.currentTask}</span>
                    </div>
                  </div>
                )}

                <div className="capabilities">
                  <h4>Capabilities</h4>
                  <div className="capability-list">
                    {selectedAgent.tasks.map((task, index) => (
                      <div key={index} className="capability-item">
                        <CheckCircle size={16} />
                        <span>{task}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="collaborations">
                  <h4>Active Collaborations</h4>
                  <div className="collaboration-list">
                    {selectedAgent.collaborations.map(collabId => {
                      const collaborator = agents.find(a => a.id === collabId);
                      return collaborator ? (
                        <div key={collabId} className="collaboration-item">
                          <collaborator.icon size={16} />
                          <span>{collaborator.name}</span>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="system-overview card">
              <div className="card-header">
                <h3>System Overview</h3>
              </div>
              <div className="card-body">
                <div className="system-stats">
                  <div className="stat-item">
                    <div className="stat-value">7</div>
                    <div className="stat-label">AI Agents</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">5</div>
                    <div className="stat-label">Active</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">23</div>
                    <div className="stat-label">Tasks Today</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">93%</div>
                    <div className="stat-label">Avg Performance</div>
                  </div>
                </div>
                
                <p>Click on any agent to view detailed information about its capabilities, current tasks, and collaboration patterns.</p>
              </div>
            </div>
          )}

          <div className="collaboration-scenarios card">
            <div className="card-header">
              <h3>Active Scenarios</h3>
              <div className="scenario-tabs">
                {collaborationScenarios.map((scenario, index) => (
                  <button
                    key={scenario.id}
                    className={`scenario-tab ${activeScenario === index ? 'active' : ''}`}
                    onClick={() => setActiveScenario(index)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="card-body">
              {(() => {
                const scenario = collaborationScenarios[activeScenario];
                return (
                  <div className="scenario-content">
                    <h4>{scenario.title}</h4>
                    <p>{scenario.description}</p>
                    
                    <div className="scenario-progress">
                      <h5>Progress</h5>
                      <div className="steps-list">
                        {scenario.steps.map((step, index) => (
                          <div key={index} className={`step-item ${step.status}`}>
                            <div className="step-number">{index + 1}</div>
                            <div className="step-content">
                              <div className="step-agent">
                                {(() => {
                                  const agent = agents.find(a => a.id === step.agent);
                                  return agent ? (
                                    <>
                                      <agent.icon size={16} />
                                      <span>{agent.name}</span>
                                    </>
                                  ) : null;
                                })()}
                              </div>
                              <div className="step-action">{step.action}</div>
                            </div>
                            <div className={`step-status status-${getStepStatus(step.status)}`}>
                              {step.status === 'completed' && <CheckCircle size={16} />}
                              {step.status === 'active' && <Clock size={16} />}
                              {step.status === 'pending' && <AlertTriangle size={16} />}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .ai-visualization {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-6);
        }

        .visualization-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .visualization-header h1 {
          font-size: var(--font-size-4xl);
          font-weight: 700;
          margin-bottom: var(--spacing-2);
        }

        .visualization-header p {
          color: var(--color-gray-600);
          font-size: var(--font-size-lg);
          margin: 0;
        }

        .header-actions {
          display: flex;
          gap: var(--spacing-3);
        }

        .visualization-content {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: var(--spacing-6);
        }

        .agents-network {
          background: white;
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-lg);
          overflow: hidden;
          position: relative;
        }

        .network-container {
          width: 100%;
          height: 600px;
          position: relative;
        }

        .network-svg {
          width: 100%;
          height: 100%;
        }

        .agent-node {
          transition: all var(--transition-base);
          cursor: pointer;
        }

        .agent-node:hover {
          filter: brightness(1.1);
          transform: scale(1.1);
        }

        .agent-node.active {
          filter: drop-shadow(0 0 10px #22c55e);
          animation: pulse-green 2s infinite;
        }

        .agent-node.processing {
          filter: drop-shadow(0 0 10px #f59e0b);
          animation: pulse-orange 2s infinite;
        }

        .agent-label {
          font-size: 14px;
          font-weight: 600;
          fill: #374151;
          cursor: pointer;
        }

        .hub-label {
          font-size: 14px;
          font-weight: 700;
          fill: #374151;
        }

        .central-hub {
          filter: drop-shadow(0 0 15px #3b82f6);
          animation: pulse-blue 3s infinite;
        }

        .status-indicator {
          animation: blink 1s infinite;
        }

        .active-connection {
          stroke: #22c55e;
          stroke-width: 3;
          animation: data-flow 2s linear infinite;
        }

        @keyframes pulse-green {
          0%, 100% { filter: drop-shadow(0 0 10px #22c55e); }
          50% { filter: drop-shadow(0 0 20px #22c55e); }
        }

        @keyframes pulse-orange {
          0%, 100% { filter: drop-shadow(0 0 10px #f59e0b); }
          50% { filter: drop-shadow(0 0 20px #f59e0b); }
        }

        @keyframes pulse-blue {
          0%, 100% { filter: drop-shadow(0 0 15px #3b82f6); }
          50% { filter: drop-shadow(0 0 25px #3b82f6); }
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0.3; }
        }

        @keyframes data-flow {
          0% { stroke-dasharray: 0 20; }
          100% { stroke-dasharray: 20 0; }
        }

        .network-legend {
          position: absolute;
          top: var(--spacing-4);
          left: var(--spacing-4);
          background: rgba(255, 255, 255, 0.95);
          padding: var(--spacing-4);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-base);
        }

        .network-legend h3 {
          font-size: var(--font-size-base);
          font-weight: 600;
          margin-bottom: var(--spacing-3);
        }

        .legend-items {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-2);
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-2);
          font-size: var(--font-size-sm);
        }

        .status-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .status-dot.active { background: #22c55e; }
        .status-dot.processing { background: #f59e0b; }
        .status-dot.idle { background: #6b7280; }

        .visualization-sidebar {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-4);
        }

        .agent-details .card-header {
          padding: var(--spacing-4);
        }

        .agent-info {
          display: flex;
          align-items: center;
          gap: var(--spacing-3);
        }

        .agent-icon {
          color: var(--color-primary-600);
        }

        .agent-info h3 {
          font-size: var(--font-size-lg);
          font-weight: 600;
          margin-bottom: var(--spacing-1);
        }

        .agent-details .card-body {
          padding: var(--spacing-4);
          display: flex;
          flex-direction: column;
          gap: var(--spacing-4);
        }

        .specialty h4,
        .performance h4,
        .current-task h4,
        .capabilities h4,
        .collaborations h4 {
          font-size: var(--font-size-sm);
          font-weight: 600;
          margin-bottom: var(--spacing-2);
          color: var(--color-gray-700);
        }

        .specialty p {
          font-size: var(--font-size-sm);
          color: var(--color-gray-600);
          margin: 0;
        }

        .performance-bar {
          height: 8px;
          background: var(--color-gray-200);
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: var(--spacing-1);
        }

        .performance-fill {
          height: 100%;
          background: var(--color-success-500);
          transition: width var(--transition-base);
        }

        .performance-value {
          font-size: var(--font-size-sm);
          font-weight: 600;
          color: var(--color-gray-700);
        }

        .task-item,
        .capability-item,
        .collaboration-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-2);
          font-size: var(--font-size-sm);
          color: var(--color-gray-600);
          padding: var(--spacing-2) 0;
        }

        .capability-list,
        .collaboration-list {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-1);
        }

        .system-overview .card-body {
          padding: var(--spacing-4);
        }

        .system-stats {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--spacing-4);
          margin-bottom: var(--spacing-4);
        }

        .stat-item {
          text-align: center;
        }

        .stat-value {
          font-size: var(--font-size-2xl);
          font-weight: 700;
          color: var(--color-primary-600);
        }

        .stat-label {
          font-size: var(--font-size-sm);
          color: var(--color-gray-600);
        }

        .collaboration-scenarios .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--spacing-4);
        }

        .scenario-tabs {
          display: flex;
          gap: var(--spacing-1);
        }

        .scenario-tab {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 2px solid var(--color-gray-300);
          background: white;
          color: var(--color-gray-600);
          font-size: var(--font-size-sm);
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .scenario-tab.active {
          border-color: var(--color-primary-500);
          background: var(--color-primary-500);
          color: white;
        }

        .scenario-content {
          padding: var(--spacing-4);
        }

        .scenario-content h4 {
          font-size: var(--font-size-base);
          font-weight: 600;
          margin-bottom: var(--spacing-2);
        }

        .scenario-content p {
          font-size: var(--font-size-sm);
          color: var(--color-gray-600);
          margin-bottom: var(--spacing-4);
        }

        .scenario-progress h5 {
          font-size: var(--font-size-sm);
          font-weight: 600;
          margin-bottom: var(--spacing-3);
        }

        .steps-list {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-3);
        }

        .step-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-3);
          padding: var(--spacing-2);
          border-radius: var(--radius-base);
          transition: all var(--transition-fast);
        }

        .step-item.completed {
          background: var(--color-success-50);
        }

        .step-item.active {
          background: var(--color-warning-50);
        }

        .step-item.pending {
          background: var(--color-gray-50);
        }

        .step-number {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: var(--color-primary-100);
          color: var(--color-primary-600);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: var(--font-size-sm);
          font-weight: 600;
          flex-shrink: 0;
        }

        .step-content {
          flex: 1;
        }

        .step-agent {
          display: flex;
          align-items: center;
          gap: var(--spacing-2);
          font-size: var(--font-size-sm);
          font-weight: 600;
          color: var(--color-gray-700);
          margin-bottom: var(--spacing-1);
        }

        .step-action {
          font-size: var(--font-size-sm);
          color: var(--color-gray-600);
        }

        .step-status {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @media (max-width: 1024px) {
          .visualization-content {
            grid-template-columns: 1fr;
          }

          .agents-network {
            height: 400px;
          }

          .network-container {
            height: 400px;
          }
        }

        @media (max-width: 768px) {
          .visualization-header {
            flex-direction: column;
            gap: var(--spacing-4);
            align-items: stretch;
          }

          .system-stats {
            grid-template-columns: repeat(4, 1fr);
          }
        }
      `}</style>
    </div>
  );
}