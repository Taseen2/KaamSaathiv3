import React from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { Shield, UserCheck, Wrench, RotateCcw } from 'lucide-react';

export const DemoRoleBar: React.FC = () => {
  const { role, switchRole } = useApp();

  const roles: { key: UserRole; label: string; icon: React.ReactNode; badge: string }[] = [
    {
      key: 'customer',
      label: 'Citizen / Customer',
      icon: <UserCheck size={13} />,
      badge: 'Book & Verify'
    },
    {
      key: 'worker',
      label: 'Artisan Member',
      icon: <Wrench size={13} />,
      badge: 'Passbook & Jobs'
    },
    {
      key: 'admin',
      label: 'Federation Registrar',
      icon: <Shield size={13} />,
      badge: 'Audit & KYC'
    }
  ];

  const handleResetData = () => {
    if (window.confirm('Reset all demo bookings, ratings, and state back to default?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#EBE4D2',
        borderBottom: '1px solid var(--border)',
        padding: '0.35rem 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '0.78rem',
        color: 'var(--text-secondary)',
        flexWrap: 'nowrap',
        overflowX: 'auto',
        gap: '0.5rem',
        fontFamily: 'var(--font-body)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
        <span
          className="demo-bar-title"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            color: 'var(--primary)',
            fontWeight: 700,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            fontSize: '0.72rem',
            fontFamily: 'var(--font-mono)',
            whiteSpace: 'nowrap'
          }}
        >
          Cooperative Role Desk:
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', flexShrink: 0 }}>
          {roles.map(r => {
            const isActive = role === r.key;
            return (
              <button
                key={r.key}
                onClick={() => switchRole(r.key)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  padding: '0.2rem 0.5rem',
                  borderRadius: 'var(--radius-xs)',
                  fontSize: '0.72rem',
                  fontWeight: isActive ? 700 : 500,
                  backgroundColor: isActive ? 'var(--primary)' : '#FAF7F0',
                  color: isActive ? '#FFFFFF' : 'var(--text-primary)',
                  border: isActive ? '1px solid var(--primary)' : '1px solid var(--border)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
                title={`Switch to ${r.label}`}
              >
                {r.icon}
                <span className="role-full-label">{r.label}</span>
                <span className="role-short-label" style={{ display: 'none' }}>
                  {r.key === 'customer' ? 'Citizen' : r.key === 'worker' ? 'Artisan' : 'Registrar'}
                </span>
                <span
                  className="role-badge"
                  style={{
                    fontSize: '0.62rem',
                    background: isActive ? 'rgba(255, 255, 255, 0.2)' : 'var(--bg-secondary)',
                    padding: '0.05rem 0.25rem',
                    borderRadius: '2px',
                    fontFamily: 'var(--font-mono)'
                  }}
                >
                  {r.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
        <button
          onClick={handleResetData}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.25rem',
            color: 'var(--text-muted)',
            fontSize: '0.72rem',
            padding: '0.15rem 0.35rem',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            whiteSpace: 'nowrap'
          }}
          title="Reset local state to factory default"
        >
          <RotateCcw size={11} />
          <span>Reset Demo</span>
        </button>
      </div>

      <style>{`
        @media (max-width: 1150px) {
          .role-badge { display: none !important; }
        }
        @media (max-width: 850px) {
          .demo-bar-title { display: none !important; }
          .role-full-label { display: none !important; }
          .role-short-label { display: inline !important; }
        }
      `}</style>
    </div>
  );
};
