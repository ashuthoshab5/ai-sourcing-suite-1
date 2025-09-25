import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Shield, 
  TrendingDown, 
  TrendingUp,
  MapPin,
  Building2,
  DollarSign,
  Calendar,
  Star,
  Activity,
  Filter,
  Search,
  Eye,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  Zap
} from 'lucide-react';

interface Supplier {
  id: string;
  name: string;
  category: string;
  location: string;
  riskScore: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  contractValue: string;
  performance: number;
  lastAssessment: string;
  activeAlerts: number;
  issues: Array<{
    type: string;
    severity: string;
    description: string;
    impact: string;
  }>;
}

const supplierData: Supplier[] = [
  {
    id: 'SUP-001',
    name: 'TechFlow Solutions',
    category: 'IT Services',
    location: 'Austin, TX',
    riskScore: 75,
    riskLevel: 'medium',
    contractValue: '$1.2M',
    performance: 92,
    lastAssessment: '2024-11-15',
    activeAlerts: 2,
    issues: [
      { type: 'Financial', severity: 'medium', description: 'Delayed payment to subcontractors', impact: 'Service delivery risk' },
      { type: 'Compliance', severity: 'low', description: 'Missing SOC 2 certification renewal', impact: 'Compliance gap' }
    ]
  },
  {
    id: 'SUP-002',
    name: 'Global Manufacturing Co.',
    category: 'Manufacturing',
    location: 'Shanghai, China',
    riskScore: 45,
    riskLevel: 'low',
    contractValue: '$2.8M',
    performance: 88,
    lastAssessment: '2024-11-20',
    activeAlerts: 0,
    issues: []
  },
  {
    id: 'SUP-003',
    name: 'QuickPrint Services',
    category: 'Printing',
    location: 'Chicago, IL',
    riskScore: 90,
    riskLevel: 'high',
    contractValue: '$450K',
    performance: 76,
    lastAssessment: '2024-11-10',
    activeAlerts: 4,
    issues: [
      { type: 'Financial', severity: 'high', description: 'Credit rating downgraded', impact: 'Business continuity risk' },
      { type: 'Operational', severity: 'medium', description: 'Key personnel departures', impact: 'Quality degradation' },
      { type: 'Legal', severity: 'high', description: 'Pending lawsuit', impact: 'Reputational risk' }
    ]
  },
  {
    id: 'SUP-004',
    name: 'CloudServ Infrastructure',
    category: 'Cloud Services',
    location: 'Seattle, WA',
    riskScore: 25,
    riskLevel: 'low',
    contractValue: '$890K',
    performance: 96,
    lastAssessment: '2024-11-25',
    activeAlerts: 0,
    issues: []
  },
  {
    id: 'SUP-005',
    name: 'Logistics Express',
    category: 'Logistics',
    location: 'Memphis, TN',
    riskScore: 85,
    riskLevel: 'high',
    contractValue: '$1.5M',
    performance: 82,
    lastAssessment: '2024-11-18',
    activeAlerts: 3,
    issues: [
      { type: 'Operational', severity: 'high', description: 'Capacity constraints during peak season', impact: 'Delivery delays' },
      { type: 'Environmental', severity: 'medium', description: 'Carbon footprint concerns', impact: 'Sustainability goals' }
    ]
  },
  {
    id: 'SUP-006',
    name: 'DataSecure Corp',
    category: 'Security Services',
    location: 'New York, NY',
    riskScore: 95,
    riskLevel: 'critical',
    contractValue: '$750K',
    performance: 68,
    lastAssessment: '2024-11-22',
    activeAlerts: 6,
    issues: [
      { type: 'Security', severity: 'critical', description: 'Recent data breach incident', impact: 'Client data exposure' },
      { type: 'Financial', severity: 'high', description: 'Liquidity concerns', impact: 'Service interruption' },
      { type: 'Compliance', severity: 'high', description: 'Failed regulatory audit', impact: 'Legal liability' }
    ]
  }
];

const riskMetrics = [
  { label: 'Total Suppliers', value: '127', change: '+3', trend: 'up', icon: Building2 },
  { label: 'High Risk', value: '8', change: '-2', trend: 'down', icon: AlertTriangle },
  { label: 'Active Alerts', value: '23', change: '+5', trend: 'up', icon: AlertCircle },
  { label: 'Avg Risk Score', value: '42', change: '-8', trend: 'down', icon: Shield },
];

export function SupplierRisk() {
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [filterRisk, setFilterRisk] = useState<string>('all');

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'success';
      case 'medium': return 'warning';
      case 'high': return 'error';
      case 'critical': return 'error';
      default: return 'info';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'info';
      case 'medium': return 'warning';
      case 'high': return 'error';
      case 'critical': return 'error';
      default: return 'info';
    }
  };

  const filteredSuppliers = filterRisk === 'all' 
    ? supplierData 
    : supplierData.filter(s => s.riskLevel === filterRisk);

  return (
    <div className="supplier-risk animate-fade-in">
      <div className="risk-header">
        <div>
          <h1>Decision Confidence & Risk Analysis</h1>
          <p>Real-time confidence monitoring and automated decision risk assessment</p>
        </div>
        <div className="risk-actions">
          <button className="btn btn-secondary">
            <Activity size={18} />
            Confidence Report
          </button>
          <button className="btn btn-primary">
            <Zap size={18} />
            Decision Analysis
          </button>
        </div>
      </div>

      <div className="risk-metrics">
        {riskMetrics.map((metric, index) => (
          <div key={index} className="metric-card card">
            <div className="metric-content">
              <div className="metric-icon">
                <metric.icon size={24} />
              </div>
              <div className="metric-data">
                <div className="metric-value">{metric.value}</div>
                <div className="metric-label">{metric.label}</div>
                <div className={`metric-change ${metric.trend}`}>
                  {metric.trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  {metric.change}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="risk-content">
        <div className="suppliers-section">
          <div className="section-header">
            <h2>Decision Confidence Portfolio</h2>
            <div className="section-controls">
              <div className="search-box">
                <Search size={16} />
                <input type="text" placeholder="Search decisions..." />
              </div>
              <select 
                value={filterRisk} 
                onChange={(e) => setFilterRisk(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Confidence Levels</option>
                <option value="critical">Critical Decisions</option>
                <option value="high">High Value</option>
                <option value="medium">Medium Confidence</option>
                <option value="low">High Confidence</option>
              </select>
            </div>
          </div>

          <div className="suppliers-grid">
            {filteredSuppliers.map((supplier) => (
              <div key={supplier.id} className="supplier-card card">
                <div className="card-body">
                  <div className="supplier-header">
                    <div className="supplier-info">
                      <h3>{supplier.name}</h3>
                      <p>{supplier.category}</p>
                    </div>
                    <div className={`risk-badge status-${getRiskColor(supplier.riskLevel)}`}>
                      {supplier.riskLevel.toUpperCase()}
                    </div>
                  </div>

                  <div className="supplier-details">
                    <div className="detail-row">
                      <MapPin size={16} />
                      <span>{supplier.location}</span>
                    </div>
                    <div className="detail-row">
                      <DollarSign size={16} />
                      <span>{supplier.contractValue}</span>
                    </div>
                    <div className="detail-row">
                      <Star size={16} />
                      <span>{supplier.performance}% performance</span>
                    </div>
                  </div>

                  <div className="risk-score">
                    <div className="risk-score-label">Risk Score</div>
                    <div className="risk-score-value">{supplier.riskScore}</div>
                    <div className="risk-score-bar">
                      <div 
                        className={`risk-score-fill risk-${supplier.riskLevel}`}
                        style={{ width: `${supplier.riskScore}%` }}
                      ></div>
                    </div>
                  </div>

                  {supplier.activeAlerts > 0 && (
                    <div className="alerts-section">
                      <AlertTriangle size={16} />
                      <span>{supplier.activeAlerts} confidence alerts</span>
                    </div>
                  )}

                  <div className="supplier-actions">
                    <button 
                      className="btn btn-ghost btn-sm"
                      onClick={() => setSelectedSupplier(supplier)}
                    >
                      <Eye size={14} />
                      Decision Details
                    </button>
                    <button className="btn btn-primary btn-sm">
                      Review Decision
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedSupplier && (
          <div className="risk-details-panel">
            <div className="panel-header">
              <h3>{selectedSupplier.name} - Risk Analysis</h3>
              <button 
                className="btn btn-ghost btn-sm"
                onClick={() => setSelectedSupplier(null)}
              >
                <XCircle size={16} />
              </button>
            </div>

            <div className="panel-content">
              <div className="risk-overview">
                <div className="risk-score-display">
                  <div className="score-circle">
                    <div className="score-value">{selectedSupplier.riskScore}</div>
                    <div className="score-label">Risk Score</div>
                  </div>
                  <div className={`risk-level-badge level-${selectedSupplier.riskLevel}`}>
                    {selectedSupplier.riskLevel.toUpperCase()} RISK
                  </div>
                </div>

                <div className="assessment-info">
                  <div className="info-item">
                    <Calendar size={16} />
                    <span>Last Assessment: {new Date(selectedSupplier.lastAssessment).toLocaleDateString()}</span>
                  </div>
                  <div className="info-item">
                    <Activity size={16} />
                    <span>Performance: {selectedSupplier.performance}%</span>
                  </div>
                  <div className="info-item">
                    <DollarSign size={16} />
                    <span>Contract Value: {selectedSupplier.contractValue}</span>
                  </div>
                </div>
              </div>

              {selectedSupplier.issues.length > 0 && (
                <div className="issues-section">
                  <h4>Active Issues</h4>
                  <div className="issues-list">
                    {selectedSupplier.issues.map((issue, index) => (
                      <div key={index} className="issue-item">
                        <div className="issue-header">
                          <div className={`issue-severity status-${getSeverityColor(issue.severity)}`}>
                            {issue.severity.toUpperCase()}
                          </div>
                          <div className="issue-type">{issue.type}</div>
                        </div>
                        <div className="issue-description">{issue.description}</div>
                        <div className="issue-impact">
                          <AlertTriangle size={14} />
                          <span>Impact: {issue.impact}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mitigation-actions">
                <h4>Recommended Actions</h4>
                <div className="actions-list">
                  <div className="action-item">
                    <CheckCircle size={16} />
                    <div>
                      <strong>Immediate Review</strong>
                      <p>Schedule comprehensive risk assessment within 5 days</p>
                    </div>
                  </div>
                  <div className="action-item">
                    <Clock size={16} />
                    <div>
                      <strong>Enhanced Monitoring</strong>
                      <p>Increase monitoring frequency to weekly reporting</p>
                    </div>
                  </div>
                  <div className="action-item">
                    <Shield size={16} />
                    <div>
                      <strong>Backup Planning</strong>
                      <p>Identify alternative suppliers for critical services</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .supplier-risk {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-6);
        }

        .risk-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .risk-header h1 {
          font-size: var(--font-size-4xl);
          font-weight: 700;
          margin-bottom: var(--spacing-2);
        }

        .risk-header p {
          color: var(--color-gray-600);
          font-size: var(--font-size-lg);
          margin: 0;
        }

        .risk-actions {
          display: flex;
          gap: var(--spacing-3);
        }

        .risk-metrics {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: var(--spacing-4);
        }

        .metric-card {
          padding: var(--spacing-6);
        }

        .metric-content {
          display: flex;
          align-items: center;
          gap: var(--spacing-4);
        }

        .metric-icon {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-lg);
          background: var(--color-primary-50);
          color: var(--color-primary-600);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .metric-data {
          flex: 1;
        }

        .metric-value {
          font-size: var(--font-size-3xl);
          font-weight: 700;
          color: var(--color-gray-900);
          line-height: 1;
        }

        .metric-label {
          font-size: var(--font-size-sm);
          color: var(--color-gray-600);
          margin-bottom: var(--spacing-1);
        }

        .metric-change {
          display: flex;
          align-items: center;
          gap: var(--spacing-1);
          font-size: var(--font-size-sm);
          font-weight: 600;
        }

        .metric-change.up {
          color: var(--color-success-600);
        }

        .metric-change.down {
          color: var(--color-error-600);
        }

        .risk-content {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: var(--spacing-6);
        }

        .suppliers-section {
          min-width: 0;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-4);
        }

        .section-header h2 {
          font-size: var(--font-size-2xl);
          font-weight: 600;
          margin: 0;
        }

        .section-controls {
          display: flex;
          gap: var(--spacing-3);
        }

        .search-box {
          display: flex;
          align-items: center;
          gap: var(--spacing-2);
          padding: var(--spacing-2) var(--spacing-3);
          border: 1px solid var(--color-gray-300);
          border-radius: var(--radius-base);
          background: white;
        }

        .search-box input {
          border: none;
          outline: none;
          background: none;
          font-size: var(--font-size-sm);
        }

        .filter-select {
          padding: var(--spacing-2) var(--spacing-3);
          border: 1px solid var(--color-gray-300);
          border-radius: var(--radius-base);
          background: white;
          font-size: var(--font-size-sm);
          cursor: pointer;
        }

        .suppliers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: var(--spacing-4);
        }

        .supplier-card {
          transition: all var(--transition-base);
        }

        .supplier-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }

        .supplier-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: var(--spacing-4);
        }

        .supplier-info h3 {
          font-size: var(--font-size-lg);
          font-weight: 600;
          margin-bottom: var(--spacing-1);
        }

        .supplier-info p {
          color: var(--color-gray-500);
          font-size: var(--font-size-sm);
          margin: 0;
        }

        .risk-badge {
          padding: var(--spacing-1) var(--spacing-2);
          border-radius: var(--radius-base);
          font-size: var(--font-size-xs);
          font-weight: 700;
        }

        .supplier-details {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-2);
          margin-bottom: var(--spacing-4);
        }

        .detail-row {
          display: flex;
          align-items: center;
          gap: var(--spacing-2);
          font-size: var(--font-size-sm);
          color: var(--color-gray-600);
        }

        .risk-score {
          margin-bottom: var(--spacing-4);
        }

        .risk-score-label {
          font-size: var(--font-size-sm);
          color: var(--color-gray-600);
          margin-bottom: var(--spacing-1);
        }

        .risk-score-value {
          font-size: var(--font-size-2xl);
          font-weight: 700;
          color: var(--color-gray-900);
          margin-bottom: var(--spacing-2);
        }

        .risk-score-bar {
          height: 6px;
          background: var(--color-gray-200);
          border-radius: 3px;
          overflow: hidden;
        }

        .risk-score-fill {
          height: 100%;
          transition: width var(--transition-base);
        }

        .risk-score-fill.risk-low {
          background: var(--color-success-500);
        }

        .risk-score-fill.risk-medium {
          background: var(--color-warning-500);
        }

        .risk-score-fill.risk-high,
        .risk-score-fill.risk-critical {
          background: var(--color-error-500);
        }

        .alerts-section {
          display: flex;
          align-items: center;
          gap: var(--spacing-2);
          padding: var(--spacing-2);
          background: var(--color-warning-50);
          color: var(--color-warning-600);
          border-radius: var(--radius-base);
          font-size: var(--font-size-sm);
          font-weight: 500;
          margin-bottom: var(--spacing-4);
        }

        .supplier-actions {
          display: flex;
          gap: var(--spacing-2);
        }

        .risk-details-panel {
          width: 400px;
          background: white;
          border: 1px solid var(--color-gray-200);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg);
          max-height: calc(100vh - 200px);
          overflow-y: auto;
        }

        .panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--spacing-4);
          border-bottom: 1px solid var(--color-gray-200);
        }

        .panel-header h3 {
          font-size: var(--font-size-lg);
          font-weight: 600;
          margin: 0;
        }

        .panel-content {
          padding: var(--spacing-4);
        }

        .risk-overview {
          margin-bottom: var(--spacing-6);
        }

        .risk-score-display {
          display: flex;
          align-items: center;
          gap: var(--spacing-4);
          margin-bottom: var(--spacing-4);
        }

        .score-circle {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: var(--color-gray-100);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .score-value {
          font-size: var(--font-size-2xl);
          font-weight: 700;
          color: var(--color-gray-900);
        }

        .score-label {
          font-size: var(--font-size-xs);
          color: var(--color-gray-600);
        }

        .risk-level-badge {
          padding: var(--spacing-2) var(--spacing-3);
          border-radius: var(--radius-base);
          font-size: var(--font-size-sm);
          font-weight: 700;
        }

        .level-low {
          background: var(--color-success-100);
          color: var(--color-success-700);
        }

        .level-medium {
          background: var(--color-warning-100);
          color: var(--color-warning-700);
        }

        .level-high,
        .level-critical {
          background: var(--color-error-100);
          color: var(--color-error-700);
        }

        .assessment-info {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-2);
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-2);
          font-size: var(--font-size-sm);
          color: var(--color-gray-600);
        }

        .issues-section {
          margin-bottom: var(--spacing-6);
        }

        .issues-section h4 {
          font-size: var(--font-size-base);
          font-weight: 600;
          margin-bottom: var(--spacing-3);
        }

        .issues-list {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-3);
        }

        .issue-item {
          padding: var(--spacing-3);
          border: 1px solid var(--color-gray-200);
          border-radius: var(--radius-base);
        }

        .issue-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-2);
        }

        .issue-severity {
          padding: var(--spacing-1) var(--spacing-2);
          border-radius: var(--radius-sm);
          font-size: var(--font-size-xs);
          font-weight: 600;
        }

        .issue-type {
          font-size: var(--font-size-sm);
          color: var(--color-gray-600);
          font-weight: 500;
        }

        .issue-description {
          font-size: var(--font-size-sm);
          color: var(--color-gray-900);
          margin-bottom: var(--spacing-2);
        }

        .issue-impact {
          display: flex;
          align-items: center;
          gap: var(--spacing-2);
          font-size: var(--font-size-xs);
          color: var(--color-warning-600);
        }

        .mitigation-actions h4 {
          font-size: var(--font-size-base);
          font-weight: 600;
          margin-bottom: var(--spacing-3);
        }

        .actions-list {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-3);
        }

        .action-item {
          display: flex;
          gap: var(--spacing-3);
          padding: var(--spacing-3);
          background: var(--color-primary-50);
          border-radius: var(--radius-base);
        }

        .action-item strong {
          display: block;
          font-size: var(--font-size-sm);
          font-weight: 600;
          margin-bottom: var(--spacing-1);
        }

        .action-item p {
          font-size: var(--font-size-xs);
          color: var(--color-gray-600);
          margin: 0;
        }

        @media (max-width: 1024px) {
          .risk-content {
            grid-template-columns: 1fr;
          }

          .risk-details-panel {
            width: 100%;
            max-height: none;
          }
        }

        @media (max-width: 768px) {
          .risk-header {
            flex-direction: column;
            gap: var(--spacing-4);
            align-items: stretch;
          }

          .suppliers-grid {
            grid-template-columns: 1fr;
          }

          .section-controls {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}