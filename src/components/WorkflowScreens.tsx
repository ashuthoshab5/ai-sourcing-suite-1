import React, { useState } from 'react';
import { 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  User,
  FileText,
  DollarSign,
  ShoppingCart,
  Truck,
  Receipt,
  CreditCard,
  Search,
  Filter,
  Plus,
  Eye,
  MessageSquare
} from 'lucide-react';

type WorkflowTab = 'intake' | 'sourcing' | 'purchase';

const workflowData = {
  intake: {
    title: 'Autonomous Decision Pipeline',
    subtitle: 'End-to-end automated decision making from requirement to supplier selection',
    steps: [
      { id: 'analysis', label: 'Requirement Analysis', icon: MessageSquare, status: 'completed' },
      { id: 'discovery', label: 'Supplier Discovery', icon: Search, status: 'completed' },
      { id: 'evaluation', label: 'Multi-Criteria Evaluation', icon: TrendingUp, status: 'active' },
      { id: 'optimization', label: 'Combinatorial Optimization', icon: Target, status: 'pending' },
      { id: 'decision', label: 'Automated Decision', icon: CheckCircle, status: 'pending' }
    ],
    activeRequests: [
      {
        id: 'DEC-2024-156',
        title: 'Office Furniture Optimization',
        requester: 'Sarah Chen',
        department: 'Operations',
        value: '$85,000',
        status: 'multi-criteria-evaluation',
        progress: 75,
        urgency: 'high',
        description: '8 suppliers evaluated for desk/chair combination',
        nextAction: 'Optimization engine processing combinations'
      },
      {
        id: 'DEC-2024-157',
        title: 'Software License Bundle',
        requester: 'Mike Rodriguez',
        department: 'IT',
        value: '$45,000',
        status: 'automated-negotiation',
        progress: 85,
        urgency: 'medium',
        description: 'AI negotiating with 3 SaaS providers',
        nextAction: 'Counter-offer evaluation in progress'
      },
      {
        id: 'DEC-2024-158',
        title: 'Marketing Services Package',
        requester: 'Lisa Wang',
        department: 'Marketing',
        value: '$125,000',
        status: 'confidence-review',
        progress: 65,
        urgency: 'low',
        description: 'Complex service requirements, 78% confidence',
        nextAction: 'Manual review triggered - low confidence'
      }
    ]
  },
  sourcing: {
    title: 'Multi-Criteria Decision Analysis',
    subtitle: 'Advanced MCDA algorithms for complex supplier evaluation and optimization',
    steps: [
      { id: 'criteria', label: 'Criteria Definition', icon: Target, status: 'completed' },
      { id: 'weighting', label: 'Preference Weighting', icon: TrendingUp, status: 'completed' },
      { id: 'scoring', label: 'Multi-Dimensional Scoring', icon: Activity, status: 'active' },
      { id: 'ranking', label: 'Utility Ranking', icon: BarChart3, status: 'pending' },
      { id: 'optimization', label: 'Combinatorial Optimization', icon: CheckCircle, status: 'pending' }
    ],
    activeProjects: [
      {
        id: 'MCDA-2024-089',
        title: 'IT Equipment Multi-Supplier Analysis',
        category: 'Technology Hardware',
        value: '$240,000',
        suppliers: 12,
        bidsReceived: 9,
        status: 'combinatorial-optimization',
        deadline: '2024-12-20',
        savings: '18.7%',
        leadSupplier: 'Optimal 3-supplier combination',
        description: 'Complex optimization across laptops, monitors, and accessories'
      },
      {
        id: 'MCDA-2024-090',
        title: 'Professional Services Evaluation',
        category: 'Professional Services',
        value: '$180,000',
        suppliers: 15,
        bidsReceived: 12,
        status: 'preference-learning',
        deadline: '2024-12-25',
        savings: '12.3%',
        leadSupplier: 'AI learning requester preferences',
        description: 'Complex service requirements with subjective quality factors'
      }
    ]
  },
  purchase: {
    title: 'Decision Execution & Learning',
    subtitle: 'Automated decision implementation with continuous learning and performance tracking',
    steps: [
      { id: 'execution', label: 'Decision Execution', icon: Zap, status: 'completed' },
      { id: 'monitoring', label: 'Performance Monitoring', icon: Activity, status: 'completed' },
      { id: 'feedback', label: 'Outcome Collection', icon: MessageSquare, status: 'active' },
      { id: 'learning', label: 'Model Learning', icon: Brain, status: 'pending' },
      { id: 'optimization', label: 'Algorithm Optimization', icon: TrendingUp, status: 'pending' }
    ],
    activeOrders: [
      {
        id: 'DEC-45789',
        supplier: 'Multi-supplier combination',
        items: 'Laptops: Apple + Dell + Lenovo',
        value: '$156,000',
        status: 'performance-tracking',
        progress: 85,
        orderDate: '2024-11-15',
        deliveryDate: '2024-12-05',
        nextAction: 'Collecting delivery performance data'
      },
      {
        id: 'DEC-45790',
        supplier: 'AI-optimized selection',
        items: 'Cloud Services: AWS + Azure hybrid',
        value: '$89,000',
        status: 'learning-feedback',
        progress: 95,
        orderDate: '2024-11-20',
        deliveryDate: '2024-11-30',
        nextAction: 'Collecting user satisfaction feedback'
      }
    ]
  }
};

export function WorkflowScreens() {
  const [activeTab, setActiveTab] = useState<WorkflowTab>('intake');
  const data = workflowData[activeTab];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'active': return 'info';
      case 'pending': return 'warning';
      default: return 'info';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'info';
    }
  };

  return (
    <div className="workflow-screens animate-fade-in">
      <div className="workflow-header">
        <div>
          <h1>Autonomous Decision Workflows</h1>
          <p>Multi-agent AI system for automated procurement decision making</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={18} />
          New Decision Request
        </button>
      </div>

      <div className="workflow-tabs">
        <button
          className={`workflow-tab ${activeTab === 'intake' ? 'active' : ''}`}
          onClick={() => setActiveTab('intake')}
        >
          <MessageSquare size={20} />
          <div>
            <span>Decision Pipeline</span>
            <small>Automated Analysis</small>
          </div>
        </button>
        <button
          className={`workflow-tab ${activeTab === 'sourcing' ? 'active' : ''}`}
          onClick={() => setActiveTab('sourcing')}
        >
          <Search size={20} />
          <div>
            <span>MCDA Engine</span>
            <small>Multi-Criteria Analysis</small>
          </div>
        </button>
        <button
          className={`workflow-tab ${activeTab === 'purchase' ? 'active' : ''}`}
          onClick={() => setActiveTab('purchase')}
        >
          <ShoppingCart size={20} />
          <div>
            <span>Learning & Execution</span>
            <small>Continuous Improvement</small>
          </div>
        </button>
      </div>

      <div className="workflow-content">
        <div className="workflow-overview card">
          <div className="card-header">
            <h2>{data.title}</h2>
            <p>{data.subtitle}</p>
          </div>
          
          <div className="workflow-steps">
            {data.steps.map((step, index) => (
              <div key={step.id} className={`workflow-step ${step.status}`}>
                <div className="step-connector">
                  {index < data.steps.length - 1 && <ArrowRight size={16} />}
                </div>
                <div className="step-content">
                  <div className="step-icon">
                    <step.icon size={20} />
                  </div>
                  <span className="step-label">{step.label}</span>
                  <div className={`step-status status-${getStatusColor(step.status)}`}>
                    {step.status === 'completed' && <CheckCircle size={16} />}
                    {step.status === 'active' && <Clock size={16} />}
                    {step.status === 'pending' && <AlertTriangle size={16} />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="workflow-details">
          {activeTab === 'intake' && (
            <div className="intake-details">
              <div className="section-header">
                <h3>Active Decision Requests</h3>
                <div className="section-actions">
                  <button className="btn btn-ghost btn-sm">
                    <Filter size={16} />
                    Filter
                  </button>
                </div>
              </div>
              
              <div className="requests-grid">
                {data.activeRequests.map((request) => (
                  <div key={request.id} className="request-card card">
                    <div className="card-body">
                      <div className="request-header">
                        <div>
                          <h4>{request.title}</h4>
                          <p className="request-id">{request.id}</p>
                        </div>
                        <div className={`urgency-badge status-${getUrgencyColor(request.urgency)}`}>
                          {request.urgency.toUpperCase()}
                        </div>
                      </div>
                      
                      <div className="request-details">
                        <div className="detail-item">
                          <User size={16} />
                          <span>{request.requester} • {request.department}</span>
                        </div>
                        <div className="detail-item">
                          <DollarSign size={16} />
                          <span>{request.value}</span>
                        </div>
                      </div>
                      
                      <p className="request-description">{request.description}</p>
                      
                      <div className="request-progress">
                        <div className="progress-bar">
                          <div 
                            className="progress-fill" 
                            style={{ width: `${request.progress}%` }}
                          ></div>
                        </div>
                        <span className="progress-text">{request.progress}%</span>
                      </div>
                      
                      <div className="request-next-action">
                        <AlertTriangle size={14} />
                        <span>{request.nextAction}</span>
                      </div>
                      
                      <div className="request-actions">
                        <button className="btn btn-ghost btn-sm">
                          <Eye size={14} />
                          View
                        </button>
                        <button className="btn btn-primary btn-sm">
                          Take Action
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'sourcing' && (
            <div className="sourcing-details">
              <div className="section-header">
                <h3>Multi-Criteria Decision Analysis</h3>
                <div className="section-actions">
                  <button className="btn btn-ghost btn-sm">
                    <Filter size={16} />
                    Filter
                  </button>
                </div>
              </div>
              
              <div className="sourcing-grid">
                {data.activeProjects.map((project) => (
                  <div key={project.id} className="sourcing-card card">
                    <div className="card-body">
                      <div className="sourcing-header">
                        <div>
                          <h4>{project.title}</h4>
                          <p className="project-id">{project.id}</p>
                        </div>
                        <div className="savings-badge">
                          {project.savings} savings
                        </div>
                      </div>
                      
                      <div className="sourcing-metrics">
                        <div className="metric">
                          <span className="metric-value">{project.value}</span>
                          <span className="metric-label">Project Value</span>
                        </div>
                        <div className="metric">
                          <span className="metric-value">{project.bidsReceived}/{project.suppliers}</span>
                          <span className="metric-label">Bids Received</span>
                        </div>
                        <div className="metric">
                          <span className="metric-value">{project.deadline.split('-')[2]}/{project.deadline.split('-')[1]}</span>
                          <span className="metric-label">Deadline</span>
                        </div>
                      </div>
                      
                      <div className="lead-supplier">
                        <strong>Lead Supplier:</strong> {project.leadSupplier}
                      </div>
                      
                      <p className="project-description">{project.description}</p>
                      
                      <div className="sourcing-actions">
                        <button className="btn btn-ghost btn-sm">
                          <Eye size={14} />
                          View Details
                        </button>
                        <button className="btn btn-primary btn-sm">
                          Manage Bids
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'purchase' && (
            <div className="purchase-details">
              <div className="section-header">
                <h3>Decision Execution & Learning</h3>
                <div className="section-actions">
                  <button className="btn btn-ghost btn-sm">
                    <Filter size={16} />
                    Filter
                  </button>
                </div>
              </div>
              
              <div className="purchase-grid">
                {data.activeOrders.map((order) => (
                  <div key={order.id} className="purchase-card card">
                    <div className="card-body">
                      <div className="purchase-header">
                        <div>
                          <h4>{order.id}</h4>
                          <p className="supplier-name">{order.supplier}</p>
                        </div>
                        <div className={`status-badge status-${order.status === 'delivered' ? 'success' : 'info'}`}>
                          {order.status.replace('-', ' ').toUpperCase()}
                        </div>
                      </div>
                      
                      <div className="purchase-details">
                        <div className="detail-item">
                          <ShoppingCart size={16} />
                          <span>{order.items}</span>
                        </div>
                        <div className="detail-item">
                          <DollarSign size={16} />
                          <span>{order.value}</span>
                        </div>
                      </div>
                      
                      <div className="order-dates">
                        <div className="date-item">
                          <span className="date-label">Ordered:</span>
                          <span>{new Date(order.orderDate).toLocaleDateString()}</span>
                        </div>
                        <div className="date-item">
                          <span className="date-label">Expected:</span>
                          <span>{new Date(order.deliveryDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      <div className="order-progress">
                        <div className="progress-bar">
                          <div 
                            className="progress-fill" 
                            style={{ width: `${order.progress}%` }}
                          ></div>
                        </div>
                        <span className="progress-text">{order.progress}%</span>
                      </div>
                      
                      <div className="next-action">
                        <Clock size={14} />
                        <span>{order.nextAction}</span>
                      </div>
                      
                      <div className="purchase-actions">
                        <button className="btn btn-ghost btn-sm">
                          <Truck size={14} />
                          Track
                        </button>
                        <button className="btn btn-primary btn-sm">
                          Process
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .workflow-screens {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-6);
        }

        .workflow-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .workflow-header h1 {
          font-size: var(--font-size-4xl);
          font-weight: 700;
          margin-bottom: var(--spacing-2);
        }

        .workflow-header p {
          color: var(--color-gray-600);
          font-size: var(--font-size-lg);
          margin: 0;
        }

        .workflow-tabs {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--spacing-4);
        }

        .workflow-tab {
          display: flex;
          align-items: center;
          gap: var(--spacing-3);
          padding: var(--spacing-4);
          background: white;
          border: 2px solid var(--color-gray-200);
          border-radius: var(--radius-lg);
          cursor: pointer;
          transition: all var(--transition-base);
          text-align: left;
        }

        .workflow-tab:hover {
          border-color: var(--color-primary-300);
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .workflow-tab.active {
          border-color: var(--color-primary-500);
          background: var(--color-primary-50);
          color: var(--color-primary-700);
        }

        .workflow-tab div {
          display: flex;
          flex-direction: column;
        }

        .workflow-tab span {
          font-weight: 600;
          font-size: var(--font-size-base);
        }

        .workflow-tab small {
          color: var(--color-gray-500);
          font-size: var(--font-size-sm);
        }

        .workflow-tab.active small {
          color: var(--color-primary-600);
        }

        .workflow-content {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-6);
        }

        .workflow-overview {
          background: linear-gradient(135deg, var(--color-primary-50) 0%, var(--color-secondary-50) 100%);
        }

        .workflow-overview h2 {
          font-size: var(--font-size-2xl);
          font-weight: 700;
          margin-bottom: var(--spacing-2);
        }

        .workflow-overview p {
          color: var(--color-gray-600);
          margin: 0;
        }

        .workflow-steps {
          display: flex;
          align-items: center;
          gap: var(--spacing-4);
          margin-top: var(--spacing-6);
          padding: var(--spacing-4);
          background: white;
          border-radius: var(--radius-lg);
          overflow-x: auto;
        }

        .workflow-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--spacing-2);
          min-width: 120px;
          position: relative;
        }

        .step-connector {
          position: absolute;
          right: -28px;
          top: 20px;
          color: var(--color-gray-400);
        }

        .step-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--spacing-2);
        }

        .step-icon {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-base);
        }

        .workflow-step.completed .step-icon {
          background: var(--color-success-100);
          color: var(--color-success-600);
        }

        .workflow-step.active .step-icon {
          background: var(--color-primary-100);
          color: var(--color-primary-600);
          animation: pulse 2s infinite;
        }

        .workflow-step.pending .step-icon {
          background: var(--color-gray-100);
          color: var(--color-gray-500);
        }

        .step-label {
          font-size: var(--font-size-sm);
          font-weight: 500;
          text-align: center;
          color: var(--color-gray-700);
        }

        .step-status {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: var(--font-size-xs);
        }

        .status-success { color: var(--color-success-600); }
        .status-info { color: var(--color-primary-600); }
        .status-warning { color: var(--color-warning-600); }
        .status-error { color: var(--color-error-600); }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-4);
        }

        .section-header h3 {
          font-size: var(--font-size-xl);
          font-weight: 600;
          margin: 0;
        }

        .section-actions {
          display: flex;
          gap: var(--spacing-2);
        }

        .requests-grid,
        .sourcing-grid,
        .purchase-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
          gap: var(--spacing-4);
        }

        .request-card,
        .sourcing-card,
        .purchase-card {
          transition: all var(--transition-base);
        }

        .request-card:hover,
        .sourcing-card:hover,
        .purchase-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }

        .request-header,
        .sourcing-header,
        .purchase-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: var(--spacing-4);
        }

        .request-header h4,
        .sourcing-header h4,
        .purchase-header h4 {
          font-size: var(--font-size-lg);
          font-weight: 600;
          margin-bottom: var(--spacing-1);
        }

        .request-id,
        .project-id,
        .supplier-name {
          font-size: var(--font-size-sm);
          color: var(--color-gray-500);
          margin: 0;
        }

        .urgency-badge,
        .savings-badge,
        .status-badge {
          padding: var(--spacing-1) var(--spacing-2);
          border-radius: var(--radius-base);
          font-size: var(--font-size-xs);
          font-weight: 600;
        }

        .savings-badge {
          background: var(--color-success-50);
          color: var(--color-success-600);
        }

        .request-details,
        .purchase-details {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-2);
          margin-bottom: var(--spacing-3);
        }

        .detail-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-2);
          font-size: var(--font-size-sm);
          color: var(--color-gray-600);
        }

        .request-description,
        .project-description {
          font-size: var(--font-size-sm);
          color: var(--color-gray-600);
          margin-bottom: var(--spacing-3);
        }

        .request-progress,
        .order-progress {
          display: flex;
          align-items: center;
          gap: var(--spacing-3);
          margin-bottom: var(--spacing-3);
        }

        .progress-bar {
          flex: 1;
          height: 6px;
          background: var(--color-gray-200);
          border-radius: 3px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: var(--color-primary-500);
          transition: width var(--transition-base);
        }

        .progress-text {
          font-size: var(--font-size-xs);
          color: var(--color-gray-600);
          font-weight: 500;
          min-width: 40px;
        }

        .request-next-action,
        .next-action {
          display: flex;
          align-items: center;
          gap: var(--spacing-2);
          font-size: var(--font-size-sm);
          color: var(--color-warning-600);
          background: var(--color-warning-50);
          padding: var(--spacing-2);
          border-radius: var(--radius-base);
          margin-bottom: var(--spacing-4);
        }

        .request-actions,
        .sourcing-actions,
        .purchase-actions {
          display: flex;
          gap: var(--spacing-2);
        }

        .sourcing-metrics {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--spacing-4);
          margin-bottom: var(--spacing-4);
          padding: var(--spacing-3);
          background: var(--color-gray-50);
          border-radius: var(--radius-base);
        }

        .metric {
          text-align: center;
        }

        .metric-value {
          display: block;
          font-size: var(--font-size-lg);
          font-weight: 700;
          color: var(--color-gray-900);
        }

        .metric-label {
          font-size: var(--font-size-xs);
          color: var(--color-gray-600);
        }

        .lead-supplier {
          font-size: var(--font-size-sm);
          margin-bottom: var(--spacing-3);
        }

        .order-dates {
          display: flex;
          justify-content: space-between;
          margin-bottom: var(--spacing-3);
          padding: var(--spacing-2);
          background: var(--color-gray-50);
          border-radius: var(--radius-base);
        }

        .date-item {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .date-label {
          font-size: var(--font-size-xs);
          color: var(--color-gray-600);
        }

        @media (max-width: 1024px) {
          .workflow-tabs {
            grid-template-columns: 1fr;
          }

          .requests-grid,
          .sourcing-grid,
          .purchase-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .workflow-header {
            flex-direction: column;
            gap: var(--spacing-4);
            align-items: stretch;
          }

          .workflow-steps {
            flex-direction: column;
            align-items: stretch;
          }

          .workflow-step {
            flex-direction: row;
            min-width: auto;
          }

          .step-connector {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}