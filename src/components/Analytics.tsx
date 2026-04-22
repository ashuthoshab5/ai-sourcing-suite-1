import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Clock,
  Target,
  BarChart3,
  PieChart,
  Activity,
  Filter,
  Download,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  AlertTriangle,
  CheckCircle,
  Zap
} from 'lucide-react';

const analyticsData = {
  overview: [
    { 
      label: 'Decisions Processed', 
      value: '1,247', 
      change: '+34%', 
      trend: 'up', 
      icon: Activity,
      detail: 'this quarter'
    },
    { 
      label: 'Automation Rate', 
      value: '87.2%', 
      change: '+15%', 
      trend: 'up', 
      icon: Zap,
      detail: 'vs manual baseline'
    },
    { 
      label: 'Decision Accuracy', 
      value: '94.8%', 
      change: '+2.3%', 
      trend: 'up', 
      icon: Target,
      detail: 'validated decisions'
    },
    { 
      label: 'Avg Decision Time', 
      value: '2.4 min', 
      change: '-78%', 
      trend: 'down', 
      icon: Clock,
      detail: 'vs manual process'
    }
  ],
  categories: [
    { name: 'IT Equipment', spend: 423, percentage: 33.9, change: 12.3 },
    { name: 'Professional Services', spend: 267, percentage: 21.4, change: -4.2 },
    { name: 'Office Supplies', spend: 198, percentage: 15.9, change: 8.7 },
    { name: 'Marketing Services', spend: 156, percentage: 12.5, change: 22.1 },
    { name: 'Facilities', spend: 124, percentage: 9.9, change: -1.8 },
    { name: 'Other', spend: 79, percentage: 6.4, change: 5.2 }
  ],
  suppliers: [
    { name: 'Multi-Supplier Decisions', spend: 456, performance: 96, risk: 'low' },
    { name: 'Single Supplier Decisions', spend: 623, performance: 91, risk: 'low' },
    { name: 'Negotiated Decisions', spend: 89, performance: 94, risk: 'low' },
    { name: 'Manual Override Decisions', spend: 45, performance: 88, risk: 'medium' },
    { name: 'Low Confidence Decisions', spend: 34, performance: 82, risk: 'high' }
  ],
  trends: {
    monthly: [
      { month: 'Jan', spend: 89, savings: 78 },
      { month: 'Feb', spend: 95, savings: 84 },
      { month: 'Mar', spend: 112, savings: 89 },
      { month: 'Apr', spend: 98, savings: 86 },
      { month: 'May', spend: 134, savings: 91 },
      { month: 'Jun', spend: 118, savings: 88 },
      { month: 'Jul', spend: 145, savings: 93 },
      { month: 'Aug', spend: 128, savings: 90 },
      { month: 'Sep', spend: 156, savings: 94 },
      { month: 'Oct', spend: 142, savings: 92 },
      { month: 'Nov', spend: 167, savings: 95 },
      { month: 'Dec', spend: 158, savings: 94 }
    ]
  }
};

const insights = [
  {
    type: 'opportunity',
    title: 'Multi-Supplier Optimization Opportunity',
    description: 'Increasing multi-supplier decisions could improve savings by 23%',
    impact: '+$180,000/year',
    confidence: 'High',
    action: 'Adjust optimization thresholds'
  },
  {
    type: 'risk',
    title: 'Low Confidence Decision Pattern',
    description: '12% of high-value decisions require manual review',
    impact: 'Automation efficiency risk',
    confidence: 'Medium',
    action: 'Enhance preference learning'
  },
  {
    type: 'trend',
    title: 'Decision Accuracy Improving',
    description: 'AI accuracy increased 4.2% after latest model update',
    impact: 'Reduced manual intervention',
    confidence: 'High',
    action: 'Deploy to additional categories'
  },
  {
    type: 'performance',
    title: 'Negotiation Agent Success',
    description: 'Automated negotiations achieving 8.7% average price reductions',
    impact: 'Enhanced cost optimization',
    confidence: 'High',
    action: 'Expand negotiation capabilities'
  }
];

export function Analytics() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('quarterly');
  const [selectedView, setSelectedView] = useState('overview');

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`;
    }
    return `$${amount.toLocaleString()}`;
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'success';
      case 'medium': return 'warning';
      case 'high': return 'error';
      default: return 'info';
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'opportunity': return CheckCircle;
      case 'risk': return AlertTriangle;
      case 'trend': return TrendingUp;
      case 'performance': return Target;
      default: return Activity;
    }
  };

  return (
    <div className="analytics animate-fade-in">
      <div className="analytics-header">
        <div>
          <h1>Decision Engine Analytics</h1>
          <p>Autonomous decision performance, learning insights, and optimization metrics</p>
        </div>
        <div className="header-actions">
          <select 
            value={selectedTimeframe} 
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="timeframe-select"
          >
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>
          <button className="btn btn-secondary">
            <Filter size={18} />
            Filters
          </button>
          <button className="btn btn-primary">
            <Download size={18} />
            Export
          </button>
        </div>
      </div>

      <div className="analytics-nav">
        <button 
          className={`nav-btn ${selectedView === 'overview' ? 'active' : ''}`}
          onClick={() => setSelectedView('overview')}
        >
          <BarChart3 size={18} />
          Overview
        </button>
        <button 
          className={`nav-btn ${selectedView === 'categories' ? 'active' : ''}`}
          onClick={() => setSelectedView('categories')}
        >
          <PieChart size={18} />
          Categories
        </button>
        <button 
          className={`nav-btn ${selectedView === 'suppliers' ? 'active' : ''}`}
          onClick={() => setSelectedView('suppliers')}
        >
          <Users size={18} />
          Suppliers
        </button>
        <button 
          className={`nav-btn ${selectedView === 'insights' ? 'active' : ''}`}
          onClick={() => setSelectedView('insights')}
        >
          <Target size={18} />
          AI Insights
        </button>
      </div>

      <div className="analytics-content">
        {selectedView === 'overview' && (
          <div className="overview-section">
            <div className="metrics-grid">
              {analyticsData.overview.map((metric, index) => (
                <div key={index} className="metric-card card">
                  <div className="metric-header">
                    <div className="metric-icon">
                      <metric.icon size={24} />
                    </div>
                    <div className={`metric-trend ${metric.trend}`}>
                      {metric.trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                      {metric.change}
                    </div>
                  </div>
                  <div className="metric-value">{metric.value}</div>
                  <div className="metric-label">{metric.label}</div>
                  <div className="metric-detail">{metric.detail}</div>
                </div>
              ))}
            </div>

            <div className="charts-section">
              <div className="spend-trend-chart card">
                <div className="card-header">
                  <h3>Monthly Decisions & Automation Rate</h3>
                  <div className="chart-legend">
                    <div className="legend-item">
                      <div className="legend-color spend"></div>
                      <span>Decisions</span>
                    </div>
                    <div className="legend-item">
                      <div className="legend-color savings"></div>
                      <span>Automation %</span>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="chart-container">
                    <svg className="chart-svg" viewBox="0 0 800 300">
                      {/* Chart background grid */}
                      <defs>
                        <pattern id="grid" width="40" height="30" patternUnits="userSpaceOnUse">
                          <path d="M 40 0 L 0 0 0 30" fill="none" stroke="#f3f4f6" strokeWidth="1"/>
                        </pattern>
                      </defs>
                      <rect width="800" height="300" fill="url(#grid)" />
                      
                      {/* Spend line */}
                      <polyline
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="3"
                        points={analyticsData.trends.monthly.map((d, i) => 
                          `${60 + i * 60},${250 - (d.spend / 3000000) * 200}`
                        ).join(' ')}
                      />
                      
                      {/* Savings line */}
                      <polyline
                        fill="none"
                        stroke="#22c55e"
                        strokeWidth="3"
                        points={analyticsData.trends.monthly.map((d, i) => 
                          `${60 + i * 60},${250 - (d.savings / 600000) * 200}`
                        ).join(' ')}
                      />
                      
                      {/* Data points */}
                      {analyticsData.trends.monthly.map((d, i) => (
                        <g key={i}>
                          <circle
                            cx={60 + i * 60}
                            cy={250 - (d.spend / 3000000) * 200}
                            r="4"
                            fill="#3b82f6"
                          />
                          <circle
                            cx={60 + i * 60}
                            cy={250 - (d.savings / 600000) * 200}
                            r="4"
                            fill="#22c55e"
                          />
                          <text
                            x={60 + i * 60}
                            y={280}
                            textAnchor="middle"
                            fontSize="12"
                            fill="#6b7280"
                          >
                            {d.month}
                          </text>
                        </g>
                      ))}
                    </svg>
                  </div>
                </div>
              </div>

              <div className="category-breakdown card">
                <div className="card-header">
                  <h3>Decisions by Category</h3>
                </div>
                <div className="card-body">
                  <div className="category-chart">
                    {analyticsData.categories.map((category, index) => (
                      <div key={index} className="category-item">
                        <div className="category-info">
                          <div className="category-name">{category.name}</div>
                          <div className="category-amount">{category.spend} decisions</div>
                        </div>
                        <div className="category-bar">
                          <div 
                            className="category-fill"
                            style={{ width: `${category.percentage}%` }}
                          ></div>
                        </div>
                        <div className={`category-change ${category.change >= 0 ? 'positive' : 'negative'}`}>
                          {category.change >= 0 ? '+' : ''}{category.change}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedView === 'suppliers' && (
          <div className="suppliers-section">
            <div className="section-header">
              <h2>Decision Type Performance Analysis</h2>
              <p>Automation performance and accuracy analysis by decision complexity</p>
            </div>
            
            <div className="suppliers-table card">
              <div className="table-container">
                <table className="suppliers-data">
                  <thead>
                    <tr>
                      <th>Decision Type</th>
                      <th>Volume</th>
                      <th>Accuracy Score</th>
                      <th>Confidence Level</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analyticsData.suppliers.map((supplier, index) => (
                      <tr key={index}>
                        <td>
                          <div className="supplier-cell">
                            <div className="supplier-name">{supplier.name}</div>
                          </div>
                        </td>
                        <td>
                          <div className="spend-cell">
                            {supplier.spend} decisions
                          </div>
                        </td>
                        <td>
                          <div className="performance-cell">
                            <div className="performance-bar">
                              <div 
                                className="performance-fill"
                                style={{ width: `${supplier.performance}%` }}
                              ></div>
                            </div>
                            <span className="performance-text">{supplier.performance}%</span>
                          </div>
                        </td>
                        <td>
                          <div className={`risk-badge status-${getRiskColor(supplier.risk)}`}>
                            {supplier.risk.toUpperCase()}
                          </div>
                        </td>
                        <td>
                          <button className="btn btn-ghost btn-sm">View Details</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {selectedView === 'insights' && (
          <div className="insights-section">
            <div className="section-header">
              <h2>Decision Engine Insights</h2>
              <p>AI-generated recommendations for improving automation performance</p>
            </div>
            
            <div className="insights-grid">
              {insights.map((insight, index) => {
                const Icon = getInsightIcon(insight.type);
                return (
                  <div key={index} className={`insight-card card insight-${insight.type}`}>
                    <div className="card-body">
                      <div className="insight-header">
                        <div className="insight-icon">
                          <Icon size={24} />
                        </div>
                        <div className={`insight-type type-${insight.type}`}>
                          {insight.type.toUpperCase()}
                        </div>
                      </div>
                      
                      <h3>{insight.title}</h3>
                      <p>{insight.description}</p>
                      
                      <div className="insight-metrics">
                        <div className="metric">
                          <span className="metric-label">Impact:</span>
                          <span className="metric-value">{insight.impact}</span>
                        </div>
                        <div className="metric">
                          <span className="metric-label">Confidence:</span>
                          <span className="metric-value">{insight.confidence}</span>
                        </div>
                      </div>
                      
                      <button className="btn btn-primary btn-sm">
                        {insight.action}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .analytics {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-6);
        }

        .analytics-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .analytics-header h1 {
          font-size: var(--font-size-4xl);
          font-weight: 700;
          margin-bottom: var(--spacing-2);
        }

        .analytics-header p {
          color: var(--color-gray-600);
          font-size: var(--font-size-lg);
          margin: 0;
        }

        .header-actions {
          display: flex;
          gap: var(--spacing-3);
          align-items: center;
        }

        .timeframe-select {
          padding: var(--spacing-2) var(--spacing-3);
          border: 1px solid var(--color-gray-300);
          border-radius: var(--radius-base);
          background: white;
          font-size: var(--font-size-sm);
          cursor: pointer;
        }

        .analytics-nav {
          display: flex;
          gap: var(--spacing-2);
          padding: var(--spacing-2);
          background: var(--color-gray-100);
          border-radius: var(--radius-lg);
        }

        .nav-btn {
          display: flex;
          align-items: center;
          gap: var(--spacing-2);
          padding: var(--spacing-3) var(--spacing-4);
          border: none;
          background: none;
          border-radius: var(--radius-base);
          cursor: pointer;
          font-size: var(--font-size-sm);
          font-weight: 500;
          color: var(--color-gray-600);
          transition: all var(--transition-fast);
        }

        .nav-btn:hover {
          background: white;
          color: var(--color-gray-900);
        }

        .nav-btn.active {
          background: white;
          color: var(--color-primary-600);
          box-shadow: var(--shadow-sm);
        }

        .analytics-content {
          min-height: 600px;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: var(--spacing-4);
          margin-bottom: var(--spacing-6);
        }

        .metric-card {
          padding: var(--spacing-6);
          transition: all var(--transition-base);
        }

        .metric-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
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
          background: var(--color-primary-50);
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

        .metric-trend.up {
          background: var(--color-success-50);
          color: var(--color-success-600);
        }

        .metric-trend.down {
          background: var(--color-error-50);
          color: var(--color-error-600);
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
          margin-bottom: var(--spacing-1);
        }

        .metric-detail {
          font-size: var(--font-size-xs);
          color: var(--color-gray-500);
        }

        .charts-section {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: var(--spacing-6);
        }

        .spend-trend-chart .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .chart-legend {
          display: flex;
          gap: var(--spacing-4);
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-2);
          font-size: var(--font-size-sm);
        }

        .legend-color {
          width: 12px;
          height: 12px;
          border-radius: 2px;
        }

        .legend-color.spend {
          background: #3b82f6;
        }

        .legend-color.savings {
          background: #22c55e;
        }

        .chart-container {
          width: 100%;
          height: 300px;
        }

        .chart-svg {
          width: 100%;
          height: 100%;
        }

        .category-chart {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-4);
        }

        .category-item {
          display: grid;
          grid-template-columns: 1fr 150px auto;
          gap: var(--spacing-3);
          align-items: center;
        }

        .category-info {
          display: flex;
          flex-direction: column;
        }

        .category-name {
          font-size: var(--font-size-sm);
          font-weight: 600;
          color: var(--color-gray-900);
        }

        .category-amount {
          font-size: var(--font-size-sm);
          color: var(--color-gray-600);
        }

        .category-bar {
          height: 8px;
          background: var(--color-gray-200);
          border-radius: 4px;
          overflow: hidden;
        }

        .category-fill {
          height: 100%;
          background: var(--color-primary-500);
          transition: width var(--transition-base);
        }

        .category-change {
          font-size: var(--font-size-sm);
          font-weight: 600;
          min-width: 60px;
          text-align: right;
        }

        .category-change.positive {
          color: var(--color-success-600);
        }

        .category-change.negative {
          color: var(--color-error-600);
        }

        .suppliers-section {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-4);
        }

        .section-header {
          margin-bottom: var(--spacing-4);
        }

        .section-header h2 {
          font-size: var(--font-size-2xl);
          font-weight: 600;
          margin-bottom: var(--spacing-2);
        }

        .section-header p {
          color: var(--color-gray-600);
          margin: 0;
        }

        .suppliers-table {
          overflow: hidden;
        }

        .table-container {
          overflow-x: auto;
        }

        .suppliers-data {
          width: 100%;
          border-collapse: collapse;
        }

        .suppliers-data th {
          text-align: left;
          padding: var(--spacing-4);
          font-size: var(--font-size-sm);
          font-weight: 600;
          color: var(--color-gray-700);
          background: var(--color-gray-50);
          border-bottom: 1px solid var(--color-gray-200);
        }

        .suppliers-data td {
          padding: var(--spacing-4);
          border-bottom: 1px solid var(--color-gray-100);
        }

        .supplier-name {
          font-weight: 600;
          color: var(--color-gray-900);
        }

        .spend-cell {
          font-weight: 600;
          color: var(--color-gray-900);
        }

        .performance-cell {
          display: flex;
          align-items: center;
          gap: var(--spacing-3);
        }

        .performance-bar {
          width: 80px;
          height: 6px;
          background: var(--color-gray-200);
          border-radius: 3px;
          overflow: hidden;
        }

        .performance-fill {
          height: 100%;
          background: var(--color-success-500);
          transition: width var(--transition-base);
        }

        .performance-text {
          font-size: var(--font-size-sm);
          color: var(--color-gray-600);
          min-width: 40px;
        }

        .risk-badge {
          padding: var(--spacing-1) var(--spacing-2);
          border-radius: var(--radius-base);
          font-size: var(--font-size-xs);
          font-weight: 600;
        }

        .insights-section {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-4);
        }

        .insights-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: var(--spacing-4);
        }

        .insight-card {
          border-left: 4px solid;
          transition: all var(--transition-base);
        }

        .insight-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }

        .insight-card.insight-opportunity {
          border-left-color: var(--color-success-500);
        }

        .insight-card.insight-risk {
          border-left-color: var(--color-error-500);
        }

        .insight-card.insight-trend {
          border-left-color: var(--color-primary-500);
        }

        .insight-card.insight-performance {
          border-left-color: var(--color-secondary-500);
        }

        .insight-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-3);
        }

        .insight-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .insight-opportunity .insight-icon {
          background: var(--color-success-100);
          color: var(--color-success-600);
        }

        .insight-risk .insight-icon {
          background: var(--color-error-100);
          color: var(--color-error-600);
        }

        .insight-trend .insight-icon {
          background: var(--color-primary-100);
          color: var(--color-primary-600);
        }

        .insight-performance .insight-icon {
          background: var(--color-secondary-100);
          color: var(--color-secondary-600);
        }

        .insight-type {
          padding: var(--spacing-1) var(--spacing-2);
          border-radius: var(--radius-sm);
          font-size: var(--font-size-xs);
          font-weight: 700;
        }

        .type-opportunity {
          background: var(--color-success-100);
          color: var(--color-success-700);
        }

        .type-risk {
          background: var(--color-error-100);
          color: var(--color-error-700);
        }

        .type-trend {
          background: var(--color-primary-100);
          color: var(--color-primary-700);
        }

        .type-performance {
          background: var(--color-secondary-100);
          color: var(--color-secondary-700);
        }

        .insight-card h3 {
          font-size: var(--font-size-lg);
          font-weight: 600;
          margin-bottom: var(--spacing-2);
        }

        .insight-card p {
          color: var(--color-gray-600);
          margin-bottom: var(--spacing-4);
          line-height: 1.5;
        }

        .insight-metrics {
          display: flex;
          gap: var(--spacing-4);
          margin-bottom: var(--spacing-4);
        }

        .metric {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-1);
        }

        .metric-label {
          font-size: var(--font-size-xs);
          color: var(--color-gray-500);
          font-weight: 500;
        }

        .metric-value {
          font-size: var(--font-size-sm);
          color: var(--color-gray-900);
          font-weight: 600;
        }

        @media (max-width: 1024px) {
          .charts-section {
            grid-template-columns: 1fr;
          }

          .insights-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .analytics-header {
            flex-direction: column;
            gap: var(--spacing-4);
            align-items: stretch;
          }

          .analytics-nav {
            overflow-x: auto;
            flex-wrap: nowrap;
          }

          .metrics-grid {
            grid-template-columns: 1fr;
          }

          .category-item {
            grid-template-columns: 1fr;
            gap: var(--spacing-2);
          }

          .category-bar {
            order: -1;
          }
        }
      `}</style>
    </div>
  );
}