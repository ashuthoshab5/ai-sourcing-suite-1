import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Building2, Mail, Lock, User, Briefcase, ArrowRight } from 'lucide-react';

export function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('procurement-manager');
  const [department, setDepartment] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) throw error;
      } else {
        const { error } = await signUp(email, password, fullName, role, department);
        if (error) throw error;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <Building2 size={40} />
          </div>
          <h1>APDE</h1>
          <p>Autonomous Procurement Decision Engine</p>
        </div>

        <div className="auth-tabs">
          <button
            className={`auth-tab ${isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(true)}
          >
            Sign In
          </button>
          <button
            className={`auth-tab ${!isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <>
              <div className="form-group">
                <label className="form-label">
                  <User size={16} />
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="form-input"
                  placeholder="Enter your full name"
                  required={!isLogin}
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Briefcase size={16} />
                  Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="form-input"
                >
                  <option value="cpo">Chief Procurement Officer</option>
                  <option value="procurement-manager">Procurement Manager</option>
                  <option value="operations-manager">Operations Manager</option>
                  <option value="finance-manager">Finance Manager</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Building2 size={16} />
                  Department
                </label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="form-input"
                  placeholder="Enter your department"
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label className="form-label">
              <Mail size={16} />
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <Lock size={16} />
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="Enter your password"
              required
              minLength={6}
            />
          </div>

          {error && <div className="auth-error">{error}</div>}

          <button
            type="submit"
            className="btn btn-primary btn-lg w-full"
            disabled={loading}
          >
            {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
            <ArrowRight size={18} />
          </button>
        </form>

        <div className="auth-footer">
          <p>
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              className="auth-link"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>

      <style jsx>{`
        .auth-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #eff6ff 0%, #f0fdfa 100%);
          padding: var(--spacing-6);
        }

        .auth-card {
          background: white;
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-lg);
          padding: var(--spacing-8);
          max-width: 440px;
          width: 100%;
        }

        .auth-header {
          text-align: center;
          margin-bottom: var(--spacing-6);
        }

        .auth-logo {
          width: 80px;
          height: 80px;
          margin: 0 auto var(--spacing-4);
          background: linear-gradient(135deg, var(--color-primary-500) 0%, var(--color-secondary-500) 100%);
          border-radius: var(--radius-xl);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .auth-header h1 {
          font-size: var(--font-size-3xl);
          font-weight: 700;
          color: var(--color-gray-900);
          margin-bottom: var(--spacing-2);
        }

        .auth-header p {
          color: var(--color-gray-600);
          font-size: var(--font-size-sm);
          margin: 0;
        }

        .auth-tabs {
          display: flex;
          gap: var(--spacing-2);
          margin-bottom: var(--spacing-6);
          padding: var(--spacing-1);
          background: var(--color-gray-100);
          border-radius: var(--radius-lg);
        }

        .auth-tab {
          flex: 1;
          padding: var(--spacing-3);
          border: none;
          background: none;
          border-radius: var(--radius-base);
          font-size: var(--font-size-sm);
          font-weight: 600;
          color: var(--color-gray-600);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .auth-tab:hover {
          color: var(--color-gray-900);
        }

        .auth-tab.active {
          background: white;
          color: var(--color-primary-600);
          box-shadow: var(--shadow-sm);
        }

        .auth-form {
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

        .auth-error {
          padding: var(--spacing-3);
          background: var(--color-error-50);
          color: var(--color-error-600);
          border-radius: var(--radius-base);
          font-size: var(--font-size-sm);
          text-align: center;
        }

        .auth-footer {
          margin-top: var(--spacing-6);
          text-align: center;
        }

        .auth-footer p {
          color: var(--color-gray-600);
          font-size: var(--font-size-sm);
          margin: 0;
        }

        .auth-link {
          background: none;
          border: none;
          color: var(--color-primary-600);
          font-weight: 600;
          cursor: pointer;
          font-size: var(--font-size-sm);
          transition: color var(--transition-fast);
        }

        .auth-link:hover {
          color: var(--color-primary-700);
        }

        .w-full {
          width: 100%;
        }
      `}</style>
    </div>
  );
}
