import React, { useState } from 'react';
import { createDecisionRequest } from '../lib/decisions';
import {
  X,
  Send,
  DollarSign,
  Tag,
  AlertTriangle,
  FileText,
  CheckCircle,
} from 'lucide-react';

interface NewDecisionRequestProps {
  onClose: () => void;
  onSubmit: () => void;
}

export function NewDecisionRequest({ onClose, onSubmit }: NewDecisionRequestProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [estimatedValue, setEstimatedValue] = useState('');
  const [urgency, setUrgency] = useState<'low' | 'medium' | 'high' | 'critical'>('medium');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    'IT Equipment',
    'Professional Services',
    'Office Supplies',
    'Marketing Services',
    'Facilities',
    'Manufacturing',
    'Logistics',
    'Cloud Services',
    'Security Services',
    'Other',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const value = parseFloat(estimatedValue);
      if (isNaN(value) || value <= 0) {
        throw new Error('Please enter a valid estimated value');
      }

      const { error } = await createDecisionRequest(
        'demo-user',
        title,
        description,
        category,
        value,
        urgency
      );

      if (error) throw error;

      onSubmit();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>New Decision Request</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-group">
            <label className="form-label">
              <FileText size={16} />
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-input"
              placeholder="Brief title for the decision request"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <FileText size={16} />
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-input form-textarea"
              placeholder="Detailed description of what you need"
              required
              rows={4}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                <Tag size={16} />
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="form-input"
                required
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">
                <DollarSign size={16} />
                Estimated Value
              </label>
              <input
                type="number"
                value={estimatedValue}
                onChange={(e) => setEstimatedValue(e.target.value)}
                className="form-input"
                placeholder="0.00"
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              <AlertTriangle size={16} />
              Urgency Level
            </label>
            <div className="urgency-options">
              {(['low', 'medium', 'high', 'critical'] as const).map((level) => (
                <button
                  key={level}
                  type="button"
                  className={`urgency-option ${urgency === level ? 'active' : ''} urgency-${level}`}
                  onClick={() => setUrgency(level)}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {error && <div className="form-error">{error}</div>}

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Request'}
              <Send size={16} />
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: var(--spacing-6);
        }

        .modal-content {
          background: white;
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-lg);
          max-width: 600px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--spacing-6);
          border-bottom: 1px solid var(--color-gray-200);
        }

        .modal-header h2 {
          font-size: var(--font-size-2xl);
          font-weight: 700;
          margin: 0;
        }

        .modal-close {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border: none;
          background: none;
          color: var(--color-gray-600);
          cursor: pointer;
          border-radius: var(--radius-base);
          transition: all var(--transition-fast);
        }

        .modal-close:hover {
          background: var(--color-gray-100);
          color: var(--color-gray-900);
        }

        .modal-body {
          padding: var(--spacing-6);
          display: flex;
          flex-direction: column;
          gap: var(--spacing-4);
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-2);
        }

        .form-label {
          display: flex;
          align-items: center;
          gap: var(--spacing-2);
          font-size: var(--font-size-sm);
          font-weight: 500;
          color: var(--color-gray-700);
        }

        .form-input {
          width: 100%;
          padding: var(--spacing-3);
          border: 1px solid var(--color-gray-300);
          border-radius: var(--radius-base);
          font-size: var(--font-size-base);
          transition: all var(--transition-fast);
        }

        .form-input:focus {
          outline: none;
          border-color: var(--color-primary-500);
          box-shadow: 0 0 0 3px rgb(59 130 246 / 0.1);
        }

        .form-textarea {
          resize: vertical;
          min-height: 100px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-4);
        }

        .urgency-options {
          display: flex;
          gap: var(--spacing-2);
        }

        .urgency-option {
          flex: 1;
          padding: var(--spacing-3);
          border: 2px solid var(--color-gray-300);
          background: white;
          border-radius: var(--radius-base);
          font-size: var(--font-size-sm);
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .urgency-option:hover {
          border-color: var(--color-gray-400);
        }

        .urgency-option.active.urgency-low {
          border-color: var(--color-success-500);
          background: var(--color-success-50);
          color: var(--color-success-700);
        }

        .urgency-option.active.urgency-medium {
          border-color: var(--color-primary-500);
          background: var(--color-primary-50);
          color: var(--color-primary-700);
        }

        .urgency-option.active.urgency-high {
          border-color: var(--color-warning-500);
          background: var(--color-warning-50);
          color: var(--color-warning-700);
        }

        .urgency-option.active.urgency-critical {
          border-color: var(--color-error-500);
          background: var(--color-error-50);
          color: var(--color-error-700);
        }

        .form-error {
          padding: var(--spacing-3);
          background: var(--color-error-50);
          color: var(--color-error-600);
          border-radius: var(--radius-base);
          font-size: var(--font-size-sm);
          text-align: center;
        }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: var(--spacing-3);
          padding-top: var(--spacing-4);
          border-top: 1px solid var(--color-gray-200);
          margin-top: var(--spacing-4);
        }

        @media (max-width: 768px) {
          .form-row {
            grid-template-columns: 1fr;
          }

          .urgency-options {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}
