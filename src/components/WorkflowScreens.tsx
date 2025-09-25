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
    title: 'Intake-to-Procurement (I2P)',
    subtitle: 'Natural language request processing with AI-powered workflow automation',
    steps: [
      { id: 'capture', label: 'Requirement Capture', icon: MessageSquare, status: 'completed' },
      { id: 'validation', label: 'Budget Validation', icon: DollarSign, status: 'completed' },
      { id: 'approval', label: 'Approval Routing', icon: User, status: 'active' },
      { id: 'sourcing', label: 'Sourcing Decision', icon: Search, status: 'pending' },
      { id: 'execution', label: 'Execution', icon: CheckCircle, status: 'pending' }
    ],
    activeRequests: [
      {
        id: 'REQ-2024-156',
        title: 'Marketing Team Laptops',
        requester: 'Sarah Chen',
        department: 'Marketing',
        value: '$30,000',
        status: 'pending-approval',
        progress: 60,
        urgency: 'high',
        description: '15 MacBook Pros for design work',
        nextAction: 'Department head approval required'
      },
      {
        id: 'REQ-2024-157',
        title: 'Office Furniture Upgrade',
        requester: 'Mike Rodriguez',
        department: 'Operations',
        value: '$12,500',
        status: 'budget-review',
        progress: 40,
        urgency: 'medium',
        description: '10 ergonomic desk chairs and standing desks',
        nextAction: 'Budget validation in progress'
      },
      {
        id: 'REQ-2024-158',
        title: 'Software Licenses',
        requester: 'Lisa Wang',
        department: 'IT',
        value: '$8,400',
        status: 'sourcing',
        progress: 80,
        urgency: 'low',
        description: 'Adobe Creative Suite annual licenses',
        nextAction: 'Supplier quotes being evaluated'
      }
    ]
  },
  sourcing: {
    title: 'Autonomous Sourcing Engine',
    subtitle: 'AI-powered supplier discovery, evaluation, and negotiation assistance',
    steps: [
      { id: 'discovery', label: 'Supplier Discovery', icon: Search, status: 'completed' },
      { id: 'evaluation', label: 'Bid Evaluation', icon: FileText, status: 'completed' },
      { id: 'negotiation', label: 'Negotiation', icon: MessageSquare, status: 'active' },
      { id: 'award', label: 'Award Decision', icon: CheckCircle, status: 'pending' },
      { id: 'contract', label: 'Contract Setup', icon: FileText, status: 'pending' }
    ],
    activeProjects: [
      {
        id: 'RFQ-2024-089',
        title: 'Cloud Infrastructure Services',
        category: 'IT Services',
        value: '$180,000',
        suppliers: 5,
        bidsReceived: 4,
        status: 'negotiation',
        deadline: '2024-12-20',
        savings: '15.2%',
        leadSupplier: 'CloudTech Solutions',
        description: 'Multi-year cloud hosting and managed services'
      },
      {
        id: 'RFQ-2024-090',
        title: 'Marketing Agency Services',
        category: 'Professional Services',
        value: '$95,000',
        suppliers: 8,
        bidsReceived: 6,
        status: 'evaluation',
        deadline: '2024-12-25',
        savings: '8.7%',
        leadSupplier: 'CreativeFlow Agency',
        description: 'Digital marketing and brand management'
      }
    ]
  },
  purchase: {
    title: 'Purchase-to-Pay (P2P)',
    subtitle: 'Streamlined PO management with automated 3-way matching and exception handling',
    steps: [
      { id: 'po-creation', label: 'PO Creation', icon: FileText, status: 'completed' },
      { id: 'delivery', label: 'Delivery Tracking', icon: Truck, status: 'completed' },
      { id: 'receipt', label: 'Receipt Verification', icon: Receipt, status: 'active' },
      { id: 'matching', label: '3-Way Matching', icon: CheckCircle, status: 'pending' },
      { id: 'payment', label: 'Payment Processing', icon: CreditCard, status: 'pending' }
    ],
    activeOrders: [
      {
        id: 'PO-45789',
        supplier: 'TechPro Distributors',
        items: 'Dell Monitors x24',
        value: '$28,800',
        status: 'delivered',
        progress: 75,
        orderDate: '2024-11-15',
        deliveryDate: '2024-11-28',
        nextAction: 'Receipt confirmation needed'
      },
      {
        id: 'PO-45790',
        supplier: 'Office Express',
        items: 'Stationery Supplies',
        value: '$3,450',
        status: 'in-transit',
        progress: 50,
        orderDate: '2024-11-20',
        deliveryDate: '2024-12-05',
        nextAction: 'Shipment tracking active'
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
          <h1>Procurement Workflows</h1>
          <p>AI-powered end-to-end procurement process management</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={18} />
          New Workflow
        </button>
      </div>

      <div className="workflow-tabs">
        <button
          className={`workflow-tab ${activeTab === 'intake' ? 'active' : ''}`}
          onClick={() => setActiveTab('intake')}
        >
          <MessageSquare size={20} />
          <div>
            <span>Intake to Procurement</span>
            <small>I2P Process</small>
          </div>
        </button>
        <button
          className={`workflow-tab ${activeTab === 'sourcing' ? 'active' : ''}`}
          onClick={() => setActiveTab('sourcing')}
        >
          <Search size={20} />
          <div>
            <span>Autonomous Sourcing</span>
            <small>S2P Process</small>
          </div>
        </button>
        <button
          className={`workflow-tab ${activeTab === 'purchase' ? 'active' : ''}`}
          onClick={() => setActiveTab('purchase')}
        >
          <ShoppingCart size={20} />
          <div>
            <span>Purchase to Pay</span>
            <small>P2P Process</small>
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
                <h3>Active Requests</h3>
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
                <h3>Active Sourcing Projects</h3>
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
                <h3>Active Purchase Orders</h3>
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