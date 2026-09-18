import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { NotificationItem } from '../../types';
import { Bell, Check, X, ShieldAlert, CreditCard, CalendarCheck, Info, Trash2, ArrowRight } from 'lucide-react';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (tab: string) => void;
}

export const NotificationPanel: React.FC<NotificationPanelProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const { notifications, unreadCount, markNotificationsAsRead } = useApp();
  const [filter, setFilter] = useState<'all' | 'booking' | 'payment' | 'system'>('all');

  if (!isOpen) return null;

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'all') return true;
    return n.type === filter;
  });

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'emergency':
        return <ShieldAlert size={16} color="var(--sos-red)" />;
      case 'payment':
        return <CreditCard size={16} color="var(--primary)" />;
      case 'booking':
        return <CalendarCheck size={16} color="var(--accent)" />;
      case 'system':
      default:
        return <Info size={16} color="var(--text-secondary)" />;
    }
  };

  const handleActionClick = (n: NotificationItem) => {
    onClose();
    if (!onNavigate) return;

    if (n.type === 'booking') {
      onNavigate('customer_dashboard');
    } else if (n.type === 'payment') {
      onNavigate('worker_dashboard');
    } else if (n.type === 'emergency') {
      onNavigate('customer_dashboard');
    } else {
      onNavigate('admin_dashboard');
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(42, 42, 40, 0.45)',
        backdropFilter: 'blur(2px)',
        zIndex: 999,
        display: 'flex',
        justifyContent: 'flex-end'
      }}
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '420px',
          height: '100%',
          backgroundColor: '#FFFFFF',
          borderLeft: '2px solid var(--primary)',
          boxShadow: '-4px 0 24px rgba(42, 42, 40, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideInRight 0.25s ease-out'
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            backgroundColor: '#FAF7F0',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: 'var(--radius-xs)',
                backgroundColor: 'var(--primary)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Bell size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--primary)' }}>
                Official Gazette Alerts
              </h3>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                {unreadCount > 0 ? `${unreadCount} unread notices` : 'All notices acknowledged'}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-secondary)',
              padding: '0.25rem'
            }}
            title="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Filter Controls & Mark Read Bar */}
        <div
          style={{
            padding: '0.65rem 1.25rem',
            backgroundColor: 'var(--surface)',
            borderBottom: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.5rem',
            fontSize: '0.75rem'
          }}
        >
          <div style={{ display: 'flex', gap: '0.3rem' }}>
            {(['all', 'booking', 'payment', 'system'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  padding: '0.2rem 0.55rem',
                  borderRadius: 'var(--radius-xs)',
                  border: filter === cat ? '1px solid var(--primary)' : '1px solid transparent',
                  backgroundColor: filter === cat ? 'var(--primary)' : 'transparent',
                  color: filter === cat ? '#FFFFFF' : 'var(--text-secondary)',
                  fontWeight: filter === cat ? 700 : 500,
                  cursor: 'pointer',
                  fontSize: '0.7rem',
                  textTransform: 'capitalize'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {unreadCount > 0 && (
            <button
              onClick={markNotificationsAsRead}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
                border: 'none',
                background: 'transparent',
                color: 'var(--primary)',
                fontWeight: 700,
                fontSize: '0.72rem',
                cursor: 'pointer'
              }}
            >
              <Check size={13} />
              <span>Mark all read</span>
            </button>
          )}
        </div>

        {/* Notifications List */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1rem 1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem'
          }}
        >
          {filteredNotifications.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
              <Bell size={32} style={{ margin: '0 auto 0.5rem auto', opacity: 0.4 }} />
              <p style={{ fontSize: '0.85rem' }}>No alerts matching this filter.</p>
            </div>
          ) : (
            filteredNotifications.map(n => (
              <div
                key={n.id}
                onClick={() => handleActionClick(n)}
                style={{
                  padding: '0.85rem',
                  borderRadius: 'var(--radius-xs)',
                  backgroundColor: n.read ? '#FFFFFF' : 'var(--primary-surface)',
                  border: n.read ? '1px solid var(--border-light)' : '1px solid var(--primary)',
                  borderLeft: `4px solid ${
                    n.type === 'emergency'
                      ? 'var(--sos-red)'
                      : n.type === 'payment'
                      ? 'var(--primary)'
                      : n.type === 'booking'
                      ? 'var(--accent)'
                      : 'var(--border-strong)'
                  }`,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                  <div style={{ marginTop: '2px' }}>{getIcon(n.type)}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '0.5rem' }}>
                      <h4 style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {n.title}
                      </h4>
                      {!n.read && (
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--sos-red)', flexShrink: 0 }} />
                      )}
                    </div>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: '0.25rem 0' }}>
                      {n.message}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.35rem' }}>
                      <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                        {n.time}
                      </span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--primary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
                        View details <ArrowRight size={11} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '0.85rem 1.25rem',
            borderTop: '1px solid var(--border)',
            backgroundColor: '#FAF7F0',
            fontSize: '0.74rem',
            color: 'var(--text-secondary)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <span>Cooperative Dispatch Stream</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)' }}>
            Official Gazette v3.4
          </span>
        </div>
      </div>
    </div>
  );
};
