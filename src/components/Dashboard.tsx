import React from 'react';
import { 
  TrendingUp, 
  Clock, 
  DollarSign, 
  Users,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Target,
  Zap
} from 'lucide-react';
import { UserPersona } from '../contexts/UserContext';

interface DashboardProps {
  persona: UserPersona;
}

const personaData = {
  'cpo': {
    title: 'Decision Intelligence Center',
    subtitle: 'Autonomous decision performance and strategic optimization oversight',
    metrics: [
      { label: 'Decision Accuracy', value: '94.8%', change: '+2.3%', trend: 'up', icon: Target },
      { label: 'Automation Rate', value: '87.2%', change: '+15%', trend: 'up', icon: Zap },
      { label: 'Cost Optimization', value: '18.5%', change: '+3.2%', trend: 'up', icon: TrendingUp },
      { label: 'Cycle Time Reduction', value: '78%', change: '+8%', trend: 'up', icon: Clock },
    ],
    widgets: ['decision-performance', 'automation-metrics', 'learning-insights']
  },
  'procurement-manager': {
    title: 'Decision Oversight Dashboard',
    subtitle: 'AI decision monitoring, exception handling, and manual intervention management',
    metrics: [
      { label: 'Pending Decisions', value: '12', change: '-8', trend: 'down', icon: Activity },
      { label: 'Confidence Score', value: '92.1%', change: '+4.2%', trend: 'up', icon: Target },
      { label: 'Manual Reviews', value: '8.3%', change: '-12%', trend: 'down', icon: Users },
      { label: 'Avg Decision Time', value: '2.4 min', change: '-78%', trend: 'down', icon: Clock },
    ],
    widgets: ['decision-queue', 'confidence-monitoring', 'exception-handling']
  },
  'operations-manager': {
    title: 'Automation Operations',
    subtitle: 'Real-time decision processing, supplier engagement, and workflow automation',
    metrics: [
      { label: 'Active Evaluations', value: '47', change: '+12', trend: 'up', icon: Activity },
      { label: 'Processing Speed', value: '18 sec', change: '-65%', trend: 'down', icon: Clock },
      { label: 'Auto-Approval Rate', value: '91.7%', change: '+8.5%', trend: 'up', icon: CheckCircle },
      { label: 'Exception Rate', value: '4.1%', change: '-2.3%', trend: 'down', icon: AlertTriangle },
    ],
    widgets: ['decision-pipeline', 'agent-performance', 'automation-health']
  },
  'finance-manager': {
    title: 'Cost Optimization Analytics',
    subtitle: 'Financial impact analysis, ROI tracking, and budget optimization insights',
    metrics: [
      { label: 'Cost Savings', value: '$2.8M', change: '+18.5%', trend: 'up', icon: DollarSign },
      { label: 'TCO Optimization', value: '15.2%', change: '+3.8%', trend: 'up', icon: TrendingUp },
      { label: 'Budget Accuracy', value: '96.4%', change: '+2.1%', trend: 'up', icon: Target },
      { label: 'ROI on APDE', value: '340%', change: '+45%', trend: 'up', icon: CheckCircle },
    ],
    widgets: ['cost-optimization', 'roi-tracking', 'financial-impact']
  }
};

const recentActivities = [
  { type: 'success', title: 'Decision AUTO-001 completed', time: '12 minutes ago', description: 'Laptop procurement optimized across 3 suppliers, 15% savings achieved' },
  { type: 'info', title: 'Learning model updated', time: '1 hour ago', description: 'Preference model retrained with 847 new decision outcomes' },
  { type: 'warning', title: 'Low confidence decision', time: '2 hours ago', description: 'REQ-2024-189 flagged for manual review - 78% confidence' },
  { type: 'success', title: 'Negotiation completed', time: '3 hours ago', description: 'AI agent secured 8% price reduction from CloudTech Solutions' },
];

export function Dashboard({ persona }: DashboardProps) {
  const data = personaData[persona];

  return (
    <div className="dashboard animate-fade-in">
      <div className="dashboard-header">
        <div>
          <h1>{data.title}</h1>
          <p className="dashboard-subtitle">{data.subtitle}</p>
        </div>
        <div className="dashboard-actions">
          <button className="btn btn-secondary">
            <Activity size={18} />
            Generate Report
          </button>
          <button className="btn btn-primary">
            <Zap size={18} />
            Quick Action
          </button>
        </div>
      </div>

      <div className="metrics-grid">
        {data.metrics.map((metric, index) => (
          <div key={index} className="metric-card card">
            <div className="metric-header">
              <div className="metric-icon">
                <metric.icon size={20} />
              </div>
              <div className={`metric-trend ${metric.trend === 'up' ? 'positive' : 'negative'}`}>
                {metric.trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                {metric.change}
              </div>
            </div>
            <div className="metric-value">{metric.value}</div>
            <div className="metric-label">{metric.label}</div>
          </div>
        ))}
      </div>

      <div className="dashboard-content">
        <div className="main-widgets">
          <div className="card widget-card">
            <div className="card-header">
              <h3>AI-Powered Insights</h3>
              <button className="btn btn-ghost btn-sm">View All</button>
            </div>
            <div className="card-body">
              <div className="insights-list">
                <div className="insight-item">
                  <div className="insight-icon success">
                    <CheckCircle size={20} />
                  </div>
                  <div className="insight-content">
                    <h4>Multi-Supplier Optimization Success</h4>
                    <p>AI identified optimal 3-supplier combination for IT equipment request</p>
                    <span className="insight-impact">Achieved: 22% cost reduction vs single supplier</span>
                  </div>
                </div>
                <div className="insight-item">
                  <div className="insight-icon warning">
                    <AlertTriangle size={20} />
                  </div>
                  <div className="insight-content">
                    <h4>Decision Confidence Alert</h4>
                    <p>3 high-value requests below 85% confidence threshold</p>
                    <span className="insight-impact">Manual review recommended</span>
                  </div>
                </div>
                <div className="insight-item">
                  <div className="insight-icon info">
                    <TrendingUp size={20} />
                  </div>
                  <div className="insight-content">
                    <h4>Learning Model Improvement</h4>
                    <p>Decision accuracy improved 4.2% after latest model update</p>
                    <span className="insight-impact">Now at 94.8% accuracy rate</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card widget-card">
            <div className="card-header">
              <h3>Decision Queue</h3>
              <div className="workflow-stats">
                <span className="stat">12 Pending</span>
                <span className="stat">47 Processing</span>
              </div>
            </div>
            <div className="card-body">
              <div className="workflow-list">
                <div className="workflow-item">
                  <div className="workflow-status processing"></div>
                  <div className="workflow-info">
                    <h4>Office Furniture Multi-Supplier Optimization</h4>
                    <p>Evaluating 8 suppliers • Confidence: 89%</p>
                    <div className="workflow-progress">
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: '75%' }}></div>
                      </div>
                      <span className="progress-text">Processing</span>
                    </div>
                  </div>
                </div>
                <div className="workflow-item">
                  <div className="workflow-status approved"></div>
                  <div className="workflow-info">
                    <h4>Software Licenses Decision</h4>
                    <p>Auto-approved • Confidence: 96% • Value: $45,000</p>
                    <div className="workflow-progress">
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: '100%' }}></div>
                      </div>
                      <span className="progress-text">Automated</span>
                    </div>
                  </div>
                </div>
                <div className="workflow-item">
                  <div className="workflow-status pending"></div>
                  <div className="workflow-info">
                    <h4>Cloud Infrastructure Services</h4>
                    <p>Manual review required • Confidence: 78%</p>
                    <div className="workflow-progress">
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: '45%' }}></div>
                      </div>
                      <span className="progress-text">Review</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sidebar-widgets">
          <div className="card widget-card">
            <div className="card-header">
              <h3>Recent Activity</h3>
            </div>
            <div className="card-body">
              <div className="activity-list">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="activity-item">
                    <div className={`activity-icon ${activity.type}`}>
                      {activity.type === 'success' && <CheckCircle size={16} />}
                      {activity.type === 'warning' && <AlertTriangle size={16} />}
                      {activity.type === 'info' && <Activity size={16} />}
                      {activity.type === 'error' && <XCircle size={16} />}
                    </div>
                    <div className="activity-content">
                      <h4>{activity.title}</h4>
                      <p>{activity.description}</p>
                      <span className="activity-time">{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card widget-card">
            <div className="card-header">
              <h3>Quick Actions</h3>
            </div>
            <div className="card-body">
              <div className="quick-actions">
                <button className="quick-action-btn">
                  <Zap size={20} />
                  <span>New Decision</span>
                </button>
                <button className="quick-action-btn">
                  <Users size={20} />
                  <span>Review Queue</span>
                </button>
                <button className="quick-action-btn">
                  <Activity size={20} />
                  <span>Agent Status</span>
                </button>
                <button className="quick-action-btn">
                  <DollarSign size={20} />
                  <span>Optimization</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .dashboard {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-6);
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: var(--spacing-2);
        }

        .dashboard-subtitle {
          color: var(--color-gray-600);
          margin-bottom: 0;
          font-size: var(--font-size-lg);
        }

        .dashboard-actions {
          display: flex;
          gap: var(--spacing-3);
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: var(--spacing-4);
        }

        .metric-card {
          padding: var(--spacing-6);
        }

        .metric-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-4);
        }

        .metric-icon {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-lg);
          background-color: var(--color-primary-50);
          color: var(--color-primary-600);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .metric-trend {
          display: flex;
          align-items: center;
          gap: var(--spacing-1);
          font-size: var(--font-size-sm);
          font-weight: 600;
          padding: var(--spacing-1) var(--spacing-2);
          border-radius: var(--radius-base);
        }

        .metric-trend.positive {
          color: var(--color-success-600);
          background-color: var(--color-success-50);
        }

        .metric-trend.negative {
          color: var(--color-error-600);
          background-color: var(--color-error-50);
        }

        .metric-value {
          font-size: var(--font-size-3xl);
          font-weight: 700;
          color: var(--color-gray-900);
          margin-bottom: var(--spacing-1);
        }

        .metric-label {
          font-size: var(--font-size-sm);
          color: var(--color-gray-600);
          font-weight: 500;
        }

        .dashboard-content {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: var(--spacing-6);
        }

        .main-widgets {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-6);
        }

        .sidebar-widgets {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-6);
        }

        .widget-card {
          display: flex;
          flex-direction: column;
        }

        .insights-list {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-4);
        }

        .insight-item {
          display: flex;
          gap: var(--spacing-3);
          padding: var(--spacing-4);
          border-radius: var(--radius-base);
          border: 1px solid var(--color-gray-200);
          transition: all var(--transition-fast);
        }

        .insight-item:hover {
          border-color: var(--color-gray-300);
          box-shadow: var(--shadow-sm);
        }

        .insight-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .insight-icon.success {
          background-color: var(--color-success-50);
          color: var(--color-success-600);
        }

        .insight-icon.warning {
          background-color: var(--color-warning-50);
          color: var(--color-warning-600);
        }

        .insight-icon.info {
          background-color: var(--color-primary-50);
          color: var(--color-primary-600);
        }

        .insight-content h4 {
          font-size: var(--font-size-base);
          font-weight: 600;
          margin-bottom: var(--spacing-1);
        }

        .insight-content p {
          font-size: var(--font-size-sm);
          color: var(--color-gray-600);
          margin-bottom: var(--spacing-2);
        }

        .insight-impact {
          font-size: var(--font-size-xs);
          color: var(--color-primary-600);
          font-weight: 500;
        }

        .workflow-stats {
          display: flex;
          gap: var(--spacing-4);
        }

        .stat {
          font-size: var(--font-size-sm);
          color: var(--color-gray-600);
        }

        .workflow-list {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-4);
        }

        .workflow-item {
          display: flex;
          gap: var(--spacing-3);
          align-items: flex-start;
        }

        .workflow-status {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          margin-top: var(--spacing-1);
          flex-shrink: 0;
        }

        .workflow-status.processing {
          background-color: var(--color-warning-500);
        }

        .workflow-status.approved {
          background-color: var(--color-success-500);
        }

        .workflow-status.pending {
          background-color: var(--color-gray-400);
        }

        .workflow-info {
          flex: 1;
        }

        .workflow-info h4 {
          font-size: var(--font-size-base);
          font-weight: 600;
          margin-bottom: var(--spacing-1);
        }

        .workflow-info p {
          font-size: var(--font-size-sm);
          color: var(--color-gray-600);
          margin-bottom: var(--spacing-2);
        }

        .workflow-progress {
          display: flex;
          align-items: center;
          gap: var(--spacing-3);
        }

        .progress-bar {
          flex: 1;
          height: 6px;
          background-color: var(--color-gray-200);
          border-radius: 3px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background-color: var(--color-primary-500);
          transition: width var(--transition-base);
        }

        .progress-text {
          font-size: var(--font-size-xs);
          color: var(--color-gray-600);
          font-weight: 500;
          min-width: 60px;
        }

        .activity-list {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-3);
        }

        .activity-item {
          display: flex;
          gap: var(--spacing-3);
        }

        .activity-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .activity-icon.success {
          background-color: var(--color-success-50);
          color: var(--color-success-600);
        }

        .activity-icon.warning {
          background-color: var(--color-warning-50);
          color: var(--color-warning-600);
        }

        .activity-icon.info {
          background-color: var(--color-primary-50);
          color: var(--color-primary-600);
        }

        .activity-icon.error {
          background-color: var(--color-error-50);
          color: var(--color-error-600);
        }

        .activity-content {
          flex: 1;
        }

        .activity-content h4 {
          font-size: var(--font-size-sm);
          font-weight: 600;
          margin-bottom: var(--spacing-1);
        }

        .activity-content p {
          font-size: var(--font-size-xs);
          color: var(--color-gray-600);
          margin-bottom: var(--spacing-1);
        }

        .activity-time {
          font-size: var(--font-size-xs);
          color: var(--color-gray-500);
        }

        .quick-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-3);
        }

        .quick-action-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--spacing-2);
          padding: var(--spacing-4);
          border: 1px solid var(--color-gray-200);
          border-radius: var(--radius-base);
          background: white;
          cursor: pointer;
          transition: all var(--transition-fast);
          font-size: var(--font-size-sm);
          font-weight: 500;
          color: var(--color-gray-700);
        }

        .quick-action-btn:hover {
          border-color: var(--color-primary-300);
          background-color: var(--color-primary-50);
          color: var(--color-primary-700);
          transform: translateY(-1px);
        }

        @media (max-width: 1024px) {
          .dashboard-content {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .dashboard-header {
            flex-direction: column;
            gap: var(--spacing-4);
            align-items: stretch;
          }

          .dashboard-actions {
            justify-content: center;
          }

          .metrics-grid {
            grid-template-columns: 1fr;
          }

          .quick-actions {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}