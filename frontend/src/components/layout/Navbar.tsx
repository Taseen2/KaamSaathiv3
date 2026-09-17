import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  MapPin, 
  Bell, 
  ShieldCheck, 
  AlertOctagon, 
  Menu, 
  X, 
  CalendarCheck, 
  Briefcase,
  Languages
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onEmergencyClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, setCurrentTab, onEmergencyClick }) => {
  const { user, role, language, setLanguage, notifications, unreadCount, markNotificationsAsRead, t, bookings, workers } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close menus on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowNotifications(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Active bookings for customer
  const activeBookingsCount = bookings.filter(
    b => b.status === 'confirmed' || b.status === 'in_progress'
  ).length;

  // Pending KYC for admin
  const pendingKycCount = workers.filter(w => w.kycStatus === 'pending').length;

  return (
    <header
      style={{
        height: '64px',
        backgroundColor: '#FAF7F0',
        borderBottom: '1px solid var(--border)',
        boxShadow: '0 1px 3px rgba(42, 42, 40, 0.05)',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        zIndex: 90
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          gap: '0.75rem'
        }}
      >
        {/* Brand Logo & Institutional Emblem */}
        <div
          onClick={() => {
            setCurrentTab('home');
            setMobileMenuOpen(false);
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            cursor: 'pointer',
            flexShrink: 0
          }}
          role="button"
          tabIndex={0}
          title="KaamSaathi — Return to Gazette Home"
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-xs)',
              backgroundColor: 'var(--primary)',
              border: '1px solid #142E23',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FAF7F0',
              flexShrink: 0
            }}
          >
            <Users size={19} strokeWidth={2.2} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', lineHeight: 1.1 }}>
              <span
                style={{
                  fontSize: '1.3rem',
                  fontWeight: 700,
                  fontFamily: 'var(--font-heading)',
                  letterSpacing: '-0.02em',
                  color: 'var(--primary)',
                  whiteSpace: 'nowrap'
                }}
              >
                KaamSaathi
              </span>
              <span
                className="seal-badge seal-govt brand-seal-badge"
                style={{
                  fontSize: '0.6rem',
                  padding: '0.1rem 0.35rem',
                  fontFamily: 'var(--font-mono)',
                  whiteSpace: 'nowrap'
                }}
              >
                Coop Federation
              </span>
            </div>
            <div
              className="brand-subtitle"
              style={{
                fontSize: '0.67rem',
                color: 'var(--text-muted)',
                marginTop: '2px',
                whiteSpace: 'nowrap'
              }}
            >
              {language === 'hi' 
                ? 'राष्ट्रीय श्रम सहकारी वेब मंच • पंजीकृत महासंघ' 
                : 'National Labour Cooperative Platform • MSCS Act Compliant'}
            </div>
          </div>
        </div>

        {/* Desktop Nav Items */}
        <nav className="desktop-nav">
          {/* Home Link */}
          <button
            onClick={() => setCurrentTab('home')}
            className={`nav-tab-btn ${currentTab === 'home' ? 'active' : ''}`}
            title="Gazette Main Portal"
          >
            <span>{language === 'hi' ? 'मुख्य पृष्ठ' : 'Home'}</span>
          </button>

          {/* Find Workers Link */}
          <button
            onClick={() => setCurrentTab('workers')}
            className={`nav-tab-btn ${currentTab === 'workers' ? 'active' : ''}`}
            title={t('nav.findWorkers')}
          >
            <MapPin size={13} />
            <span>{t('nav.findWorkers')}</span>
          </button>

          {/* Cooperative Model Link */}
          <button
            onClick={() => setCurrentTab('cooperative')}
            className={`nav-tab-btn ${currentTab === 'cooperative' ? 'active' : ''}`}
            title={t('nav.cooperativeModel')}
          >
            <ShieldCheck size={13} />
            <span>{t('nav.cooperativeModel')}</span>
          </button>

          {/* Role specific link: Customer Dashboard */}
          {role === 'customer' && (
            <button
              onClick={() => setCurrentTab('customer_dashboard')}
              className={`nav-tab-btn ${currentTab === 'customer_dashboard' ? 'active' : ''}`}
              title="View your service bookings"
            >
              <CalendarCheck size={13} />
              <span>{t('nav.customerDashboard')}</span>
            </button>
          )}

          {/* Role specific link: Worker Dashboard */}
          {role === 'worker' && (
            <button
              onClick={() => setCurrentTab('worker_dashboard')}
              className={`nav-tab-btn ${currentTab === 'worker_dashboard' ? 'active' : ''}`}
              title="Artisan Passbook & Duty Register"
            >
              <Briefcase size={13} />
              <span>{t('nav.workerDashboard')}</span>
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '1px',
                  backgroundColor: 'var(--primary)'
                }}
              />
            </button>
          )}

          {/* Role specific link: Admin Dashboard */}
          {role === 'admin' && (
            <button
              onClick={() => setCurrentTab('admin_dashboard')}
              className={`nav-tab-btn ${currentTab === 'admin_dashboard' ? 'active' : ''}`}
              title="Registrar Audit & Member KYC Desk"
            >
              <ShieldCheck size={13} />
              <span>{t('nav.adminDashboard')}</span>
              {pendingKycCount > 0 && (
                <span
                  style={{
                    backgroundColor: 'var(--accent)',
                    color: '#FFFFFF',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    borderRadius: '2px',
                    padding: '0.05rem 0.35rem',
                    fontFamily: 'var(--font-mono)'
                  }}
                >
                  {pendingKycCount} KYC
                </span>
              )}
            </button>
          )}
        </nav>

        {/* Right Header Controls — Grouped into Cluster A (Utility) & Cluster B (Account & Safety) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexShrink: 0 }}>
          {/* Cluster A (utility): EN toggle, translate icon */}
          <div
            className="header-cluster-utility"
            style={{ display: 'flex', alignItems: 'center', gap: '16px' }}
          >
            {/* Native Hindi / English Civic Toggle */}
            <div
              className="header-lang-toggle"
              style={{
                height: '34px',
                display: 'inline-flex',
                alignItems: 'center',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-xs)',
                overflow: 'hidden',
                backgroundColor: '#FFFFFF',
                boxSizing: 'border-box'
              }}
            >
              <button
                onClick={() => setLanguage('en')}
                style={{
                  height: '100%',
                  padding: '0 0.55rem',
                  fontSize: '0.74rem',
                  fontWeight: language === 'en' ? 700 : 500,
                  backgroundColor: language === 'en' ? 'var(--primary)' : 'transparent',
                  color: language === 'en' ? '#FFFFFF' : 'var(--text-secondary)',
                  borderRight: '1px solid var(--border)',
                  borderTop: 'none',
                  borderBottom: 'none',
                  borderLeft: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center'
                }}
                title="English Language"
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('hi')}
                style={{
                  height: '100%',
                  padding: '0 0.55rem',
                  fontSize: '0.74rem',
                  fontWeight: language === 'hi' ? 700 : 500,
                  backgroundColor: language === 'hi' ? 'var(--primary)' : 'transparent',
                  color: language === 'hi' ? '#FFFFFF' : 'var(--text-secondary)',
                  border: 'none',
                  fontFamily: "'IBM Plex Sans Devanagari', sans-serif",
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center'
                }}
                title="हिन्दी भाषा"
              >
                हिन्दी
              </button>
            </div>

            {/* Translate Icon Button */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="header-translate-btn"
              style={{
                width: '34px',
                height: '34px',
                boxSizing: 'border-box',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-xs)',
                color: 'var(--text-secondary)',
                cursor: 'pointer'
              }}
              title={language === 'en' ? 'Translate to Hindi' : 'Switch to English'}
              aria-label="Toggle language translation"
            >
              <Languages size={16} />
            </button>
          </div>

          {/* Subtle Vertical Divider between Cluster A and Cluster B */}
          <div
            className="header-cluster-divider"
            style={{
              width: '1px',
              height: '24px',
              backgroundColor: 'var(--border)',
              flexShrink: 0
            }}
            aria-hidden="true"
          />

          {/* Cluster B (account/safety): SOS 24/7, notification bell, profile */}
          <div
            className="header-cluster-account"
            style={{ display: 'flex', alignItems: 'center', gap: '16px' }}
          >
            {/* Emergency SOS Button (Deliberate visual break) */}
            <button
              onClick={onEmergencyClick}
              className="btn btn-sos"
              style={{
                height: '34px',
                boxSizing: 'border-box',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                borderRadius: 'var(--radius-xs)',
                padding: '0 0.65rem',
                fontSize: '0.76rem',
                fontWeight: 700,
                whiteSpace: 'nowrap'
              }}
              title="24/7 Emergency Worker Dispatch"
            >
              <AlertOctagon size={14} />
              <span className="sos-label-full" style={{ fontFamily: 'var(--font-mono)' }}>SOS 24/7</span>
              <span className="sos-label-short" style={{ fontFamily: 'var(--font-mono)', display: 'none' }}>SOS</span>
            </button>

            {/* Notifications Trigger & Popover */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  if (!showNotifications) markNotificationsAsRead();
                  setMobileMenuOpen(false);
                }}
                style={{
                  width: '34px',
                  height: '34px',
                  boxSizing: 'border-box',
                  borderRadius: 'var(--radius-xs)',
                  backgroundColor: showNotifications ? 'rgba(28, 61, 46, 0.08)' : '#FFFFFF',
                  border: showNotifications ? '1px solid var(--primary)' : '1px solid var(--border)',
                  color: unreadCount > 0 ? 'var(--primary)' : 'var(--text-muted)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  cursor: 'pointer'
                }}
                title="Official Gazette & Alerts"
              >
                <Bell size={15} />
                {unreadCount > 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '4px',
                      right: '4px',
                      width: '6px',
                      height: '6px',
                      borderRadius: '1px',
                      backgroundColor: 'var(--sos-red)'
                    }}
                  />
                )}
              </button>

              {/* Backdrop for notifications */}
              {showNotifications && (
                <div
                  onClick={() => setShowNotifications(false)}
                  style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 150
                  }}
                />
              )}

              {/* Notification popover */}
              {showNotifications && (
                <div
                  style={{
                    position: 'absolute',
                    top: '42px',
                    right: 0,
                    width: '320px',
                    backgroundColor: '#FFFFFF',
                    border: '2px solid var(--primary)',
                    borderRadius: 'var(--radius-xs)',
                    boxShadow: '0 4px 16px rgba(42, 42, 40, 0.18)',
                    padding: '1rem',
                    zIndex: 160
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>
                    <h4 style={{ fontSize: '0.88rem', fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--primary)' }}>Official Notifications</h4>
                    <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>Live Dispatch</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '280px', overflowY: 'auto' }}>
                    {notifications.length === 0 ? (
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textAlign: 'center', padding: '1rem 0' }}>
                        No active alerts in gazette dispatch.
                      </div>
                    ) : (
                      notifications.map(n => (
                        <div
                          key={n.id}
                          style={{
                            padding: '0.55rem',
                            borderRadius: 'var(--radius-xs)',
                            backgroundColor: 'var(--surface)',
                            borderLeft: `3px solid ${n.type === 'payment' ? 'var(--primary)' : n.type === 'emergency' ? 'var(--sos-red)' : 'var(--accent)'}`
                          }}
                        >
                          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>{n.title}</div>
                          <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', margin: '0.15rem 0' }}>{n.message}</div>
                          <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{n.time}</div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Pill */}
            <div
              className="header-user-pill"
              onClick={() => {
                if (role === 'customer') setCurrentTab('customer_dashboard');
                if (role === 'worker') setCurrentTab('worker_dashboard');
                if (role === 'admin') setCurrentTab('admin_dashboard');
                setMobileMenuOpen(false);
              }}
              style={{
                height: '34px',
                boxSizing: 'border-box',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0 0.5rem',
                borderRadius: 'var(--radius-xs)',
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--border)',
                cursor: 'pointer'
              }}
              title="Open Current Role Register"
              role="button"
              tabIndex={0}
            >
              <img
                src={user.avatar}
                alt={user.name}
                style={{ width: '22px', height: '22px', borderRadius: '2px', objectFit: 'cover', flexShrink: 0 }}
              />
              <div style={{ display: 'none', flexDirection: 'column', lineHeight: 1.05 }} className="user-text">
                <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
                  {user.name.split(' ')[0]}
                </span>
                <span style={{ fontSize: '0.62rem', color: 'var(--primary)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}>
                  {role}
                </span>
              </div>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                setShowNotifications(false);
              }}
              style={{
                width: '34px',
                height: '34px',
                boxSizing: 'border-box',
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-primary)',
                borderRadius: 'var(--radius-xs)',
                border: '1px solid var(--border)',
                backgroundColor: mobileMenuOpen ? 'rgba(28, 61, 46, 0.08)' : '#FFFFFF',
                cursor: 'pointer'
              }}
              className="mobile-menu-btn"
              title="Toggle navigation menu"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer & Backdrop */}
      {mobileMenuOpen && (
        <>
          <div
            onClick={() => setMobileMenuOpen(false)}
            style={{
              position: 'fixed',
              top: '95px',
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(42, 42, 40, 0.35)',
              zIndex: 88
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '64px',
              left: 0,
              right: 0,
              backgroundColor: '#FAF7F0',
              borderBottom: '2px solid var(--primary)',
              padding: '1rem 1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.4rem',
              zIndex: 89,
              boxShadow: '0 8px 24px rgba(42, 42, 40, 0.15)'
            }}
          >
            {/* Mobile User Profile Card & Language Row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.5rem 0.6rem',
                backgroundColor: 'rgba(28, 61, 46, 0.04)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-xs)',
                marginBottom: '0.35rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <img
                  src={user.avatar}
                  alt={user.name}
                  style={{ width: '28px', height: '28px', borderRadius: '2px', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>{user.name}</div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--primary)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
                    ROLE: {role}
                  </div>
                </div>
              </div>

              {/* Language Switcher in Drawer */}
              <div style={{ display: 'inline-flex', border: '1px solid var(--border)', borderRadius: '2px', overflow: 'hidden' }}>
                <button
                  onClick={() => setLanguage('en')}
                  style={{
                    padding: '0.2rem 0.5rem',
                    fontSize: '0.72rem',
                    fontWeight: language === 'en' ? 700 : 500,
                    backgroundColor: language === 'en' ? 'var(--primary)' : '#FFFFFF',
                    color: language === 'en' ? '#FFFFFF' : 'var(--text-secondary)'
                  }}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('hi')}
                  style={{
                    padding: '0.2rem 0.5rem',
                    fontSize: '0.72rem',
                    fontWeight: language === 'hi' ? 700 : 500,
                    backgroundColor: language === 'hi' ? 'var(--primary)' : '#FFFFFF',
                    color: language === 'hi' ? '#FFFFFF' : 'var(--text-secondary)',
                    fontFamily: "'IBM Plex Sans Devanagari', sans-serif"
                  }}
                >
                  हिन्दी
                </button>
              </div>
            </div>

            <button
              onClick={() => { setCurrentTab('home'); setMobileMenuOpen(false); }}
              className="mobile-nav-link"
              style={{
                backgroundColor: currentTab === 'home' ? 'rgba(28, 61, 46, 0.1)' : 'transparent',
                fontWeight: currentTab === 'home' ? 700 : 500,
                color: currentTab === 'home' ? 'var(--primary)' : 'var(--text-primary)'
              }}
            >
              <span>{language === 'hi' ? 'मुख्य पृष्ठ' : 'Home'}</span>
            </button>
            <button
              onClick={() => { setCurrentTab('workers'); setMobileMenuOpen(false); }}
              className="mobile-nav-link"
              style={{
                backgroundColor: currentTab === 'workers' ? 'rgba(28, 61, 46, 0.1)' : 'transparent',
                fontWeight: currentTab === 'workers' ? 700 : 500,
                color: currentTab === 'workers' ? 'var(--primary)' : 'var(--text-primary)'
              }}
            >
              <span>{t('nav.findWorkers')}</span>
            </button>
            <button
              onClick={() => { setCurrentTab('cooperative'); setMobileMenuOpen(false); }}
              className="mobile-nav-link"
              style={{
                backgroundColor: currentTab === 'cooperative' ? 'rgba(28, 61, 46, 0.1)' : 'transparent',
                fontWeight: currentTab === 'cooperative' ? 700 : 500,
                color: currentTab === 'cooperative' ? 'var(--primary)' : 'var(--text-primary)'
              }}
            >
              <span>{t('nav.cooperativeModel')}</span>
            </button>

            <div style={{ height: '1px', backgroundColor: 'var(--border-light)', margin: '0.4rem 0' }} />

            <button
              onClick={() => {
                if (role === 'customer') setCurrentTab('customer_dashboard');
                if (role === 'worker') setCurrentTab('worker_dashboard');
                if (role === 'admin') setCurrentTab('admin_dashboard');
                setMobileMenuOpen(false);
              }}
              className="mobile-nav-link"
              style={{
                fontWeight: 700,
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: 'rgba(28, 61, 46, 0.05)'
              }}
            >
              <span>
                {role === 'customer' && `${t('nav.customerDashboard')} (${activeBookingsCount} active)`}
                {role === 'worker' && `${t('nav.workerDashboard')} (Passbook)`}
                {role === 'admin' && `${t('nav.adminDashboard')} (${pendingKycCount} KYC)`}
              </span>
              <span
                style={{
                  fontSize: '0.65rem',
                  fontFamily: 'var(--font-mono)',
                  padding: '0.1rem 0.4rem',
                  borderRadius: '2px',
                  backgroundColor: 'var(--primary)',
                  color: '#FFFFFF'
                }}
              >
                OPEN REGISTER
              </span>
            </button>
          </div>
        </>
      )}

      {/* Responsive Stylesheet */}
      <style>{`
        .nav-tab-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          white-space: nowrap;
          font-size: 0.84rem;
          font-weight: 500;
          padding: 0.35rem 0.65rem;
          border-radius: var(--radius-xs);
          background-color: transparent;
          color: var(--text-secondary);
          border: 1px solid transparent;
          cursor: pointer;
          transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;
        }
        .nav-tab-btn:hover {
          background-color: rgba(28, 61, 46, 0.05);
          color: var(--primary);
          border-color: rgba(28, 61, 46, 0.15);
        }
        .nav-tab-btn.active {
          font-weight: 700;
          background-color: rgba(28, 61, 46, 0.08);
          color: var(--primary);
          border-color: rgba(28, 61, 46, 0.22);
        }
        .mobile-nav-link {
          text-align: left;
          font-size: 0.92rem;
          padding: 0.55rem 0.75rem;
          border-radius: var(--radius-xs);
          border: 1px solid transparent;
          cursor: pointer;
          display: flex;
          align-items: center;
          justifyContent: space-between;
          transition: background-color 0.15s ease;
        }
        .mobile-nav-link:hover {
          background-color: rgba(28, 61, 46, 0.08);
        }

        /* Desktop Breakpoints */
        @media (min-width: 1080px) {
          .desktop-nav {
            display: flex !important;
            align-items: center;
            gap: 0.25rem;
            height: 100%;
            flex-shrink: 0;
          }
          .mobile-menu-btn { display: none !important; }
        }

        /* Compact nav link padding on 1080px - 1180px */
        @media (min-width: 1080px) and (max-width: 1180px) {
          .nav-tab-btn {
            padding: 0.35rem 0.5rem !important;
            font-size: 0.82rem !important;
            gap: 0.25rem !important;
          }
        }

        /* Wide screens: Show user name and role */
        @media (min-width: 1220px) {
          .user-text { display: flex !important; }
          .brand-subtitle { display: block !important; }
        }

        /* Narrow screens: Hide user text and subtitle */
        @media (max-width: 1219px) {
          .user-text { display: none !important; }
          .brand-subtitle { display: none !important; }
        }

        /* Mobile & Tablet Breakpoint (under 1080px) */
        @media (max-width: 1079px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: inline-flex !important; }
        }

        /* Mobile phones under 640px: Compact header with language & profile in drawer */
        @media (max-width: 640px) {
          .header-cluster-utility { display: none !important; }
          .header-cluster-divider { display: none !important; }
          .header-lang-toggle { display: none !important; }
          .header-translate-btn { display: none !important; }
          .header-user-pill { display: none !important; }
          .brand-seal-badge { display: none !important; }
        }

        /* Small mobile screens */
        @media (max-width: 520px) {
          .sos-label-full { display: none !important; }
          .sos-label-short { display: inline !important; }
        }
      `}</style>
    </header>
  );
};
