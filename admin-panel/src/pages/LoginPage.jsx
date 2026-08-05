import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) { toast.error('Please fill all fields'); return; }
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success('Welcome back!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed. Check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0d2247 0%, #1a3a6b 50%, #2451a0 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <style>{`
        .login-card {
          background: #fff;
          border-radius: 16px;
          padding: 40px;
          width: 100%;
          max-width: 420px;
          box-shadow: 0 25px 50px rgba(0,0,0,0.25);
        }
        .login-logo { text-align: center; margin-bottom: 28px; }
        .login-logo-icon {
          width: 64px; height: 64px;
          background: linear-gradient(135deg, #1a3a6b, #2451a0);
          border-radius: 16px;
          display: flex; align-items: center; justify-content: center;
          font-size: 28px; margin: 0 auto 12px;
          box-shadow: 0 8px 20px rgba(26,58,107,0.3);
        }
        .login-title { font-size: 22px; font-weight: 800; color: #1a3a6b; }
        .login-sub { font-size: 13px; color: #64748b; margin-top: 4px; }
        .form-group { margin-bottom: 18px; }
        .form-label { font-size: 13px; font-weight: 600; color: #374151; display: block; margin-bottom: 6px; }
        .form-input {
          width: 100%; padding: 10px 14px;
          border: 1.5px solid #e2e8f0;
          border-radius: 8px;
          font-size: 14px; color: #1e293b;
          outline: none; transition: border-color 0.15s;
          background: #f8fafc;
        }
        .form-input:focus { border-color: #1a3a6b; background: #fff; }
        .pass-wrapper { position: relative; }
        .pass-toggle {
          position: absolute; right: 12px; top: 50%;
          transform: translateY(-50%);
          font-size: 16px; cursor: pointer; color: #94a3b8;
          background: none; border: none;
        }
        .login-btn {
          width: 100%; padding: 12px;
          background: linear-gradient(135deg, #1a3a6b, #2451a0);
          color: #fff; border-radius: 8px;
          font-size: 15px; font-weight: 700;
          transition: opacity 0.15s;
          margin-top: 6px;
        }
        .login-btn:hover:not(:disabled) { opacity: 0.9; }
        .login-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .demo-hint {
          margin-top: 20px; padding: 14px;
          background: #f0f9ff;
          border: 1px solid #bae6fd;
          border-radius: 8px;
          font-size: 12px; color: #0369a1;
        }
        .demo-hint strong { display: block; margin-bottom: 4px; }
      `}</style>

      <div className="login-card">
        <div className="login-logo">
          <div className="login-logo-icon">⚕️</div>
          <div className="login-title">Novamax Admin</div>
          <div className="login-sub">Sign in to manage your platform</div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-input"
              placeholder="admin@novamaxfoundation.org"
              value={form.email}
              onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="pass-wrapper">
              <input
                type={showPass ? 'text' : 'password'}
                className="form-input"
                placeholder="Enter your password"
                value={form.password}
                onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                required
              />
              <button type="button" className="pass-toggle" onClick={() => setShowPass(p => !p)}>
                {showPass ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="demo-hint">
          <strong>🔑 Default Credentials</strong>
          Email: admin@novamaxfoundation.org<br />
          Password: Admin@123
        </div>
      </div>
    </div>
  );
}
