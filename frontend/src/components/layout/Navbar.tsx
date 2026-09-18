import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { NotificationPanel } from '../common/NotificationPanel';
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
  Languages,
  UserCheck,
  Wrench,
  Shield,
  RotateCcw,
  Check,
  ChevronDown,
  LogOut
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onEmergencyClick: () => void;
  onOpenLogin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, setCurrentTab, onEmergencyClick, onOpenLogin }) => {
  const { 
    user, 
    role, 
    switchRole, 
    language, 
    setLanguage, 
    notifications, 
    unreadCount, 
    markNotificationsAsRead, 
    t, 
    bookings, 
    workers,
    logout,
    isAuthenticated,
    isGuest
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close menus on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowNotifications(false);
        setShowUserMenu(false);
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

  const roles: {
    key: UserRole;
    label: string;
    hindiLabel: string;
    icon: React.ReactNode;
    badge: string;
    desc: string;
  }[] = [
    {
      key: 'customer',
      label: 'Citizen / Customer',
      hindiLabel: 'नागरिक / ग्राहक',
      icon: <UserCheck size={14} />,
      badge: 'Book & Verify',
      desc: 'Browse trades, hire verified workers & track OTP'
    },
    {
      key: 'worker',
      label: 'Artisan Member',
      hindiLabel: 'कारीगर सदस्य',
      icon: <Wrench size={14} />,
      badge: 'Passbook & Jobs',
      desc: 'Artisan duty roster, job dispatch & welfare passbook'
    },
    {
      key: 'admin',
      label: 'Federation Registrar',
      hindiLabel: 'महासंघ रजिस्ट्रार',
      icon: <Shield size={14} />,
      badge: 'Audit & KYC',
      desc: 'Member verification, KYC approval & civic audit'
    }
  ];

  const handleResetData = () => {
    if (window.confirm('Reset all demo bookings, ratings, and state back to default?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

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

        {/* Right Header Utility Cluster: Unified language switcher, SOS, notifications, profile dropdown */}
        <div className="header-utility-cluster" style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          
          {/* Consolidated Language Control: Merged A⇄文 icon + EN/हिन्दी switch into ONE control */}
          <div
            className="header-lang-control"
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
            title="Language / भाषा"
          >
            <div
              style={{
                height: '100%',
                padding: '0 0.45rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'var(--surface)',
                borderRight: '1px solid var(--border-light)',
                color: 'var(--text-secondary)'
              }}
            >
              <Languages size={14} />
            </div>
            <button
              onClick={() => setLanguage('en')}
              style={{
                height: '100%',
                padding: '0 0.5rem',
                fontSize: '0.74rem',
                fontWeight: language === 'en' ? 700 : 500,
                backgroundColor: language === 'en' ? 'var(--primary)' : 'transparent',
                color: language === 'en' ? '#FFFFFF' : 'var(--text-secondary)',
                border: 'none',
                borderRight: '1px solid var(--border-light)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                transition: 'background-color 0.15s ease'
              }}
              title="Switch to English"
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('hi')}
              style={{
                height: '100%',
                padding: '0 0.5rem',
                fontSize: '0.74rem',
                fontWeight: language === 'hi' ? 700 : 500,
                backgroundColor: language === 'hi' ? 'var(--primary)' : 'transparent',
                color: language === 'hi' ? '#FFFFFF' : 'var(--text-secondary)',
                border: 'none',
                fontFamily: "'IBM Plex Sans Devanagari', sans-serif",
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                transition: 'background-color 0.15s ease'
              }}
              title="हिन्दी में बदलें"
            >
              हिन्दी
            </button>
          </div>

          {/* Emergency SOS Button (Single primary entry point) */}
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
            title="24/7 Priority Emergency Worker Dispatch"
          >
            <AlertOctagon size={14} />
            <span className="sos-label-full" style={{ fontFamily: 'var(--font-mono)' }}>SOS 24/7</span>
            <span className="sos-label-short" style={{ fontFamily: 'var(--font-mono)', display: 'none' }}>SOS</span>
          </button>

          {/* Notifications Trigger & Full Panel */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => {
                setShowNotifications(true);
                setShowUserMenu(false);
                markNotificationsAsRead();
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

            <NotificationPanel
              isOpen={showNotifications}
              onClose={() => setShowNotifications(false)}
              onNavigate={(tab) => {
                setCurrentTab(tab);
                setShowNotifications(false);
              }}
            />
          </div>

          {/* User Profile Pill Trigger & Role-Switching Menu */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => {
                setShowUserMenu(!showUserMenu);
                setShowNotifications(false);
                setMobileMenuOpen(false);
              }}
              className="header-user-pill"
              style={{
                height: '34px',
                boxSizing: 'border-box',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0 0.55rem',
                borderRadius: 'var(--radius-xs)',
                backgroundColor: showUserMenu ? 'rgba(28, 61, 46, 0.08)' : '#FFFFFF',
                border: showUserMenu ? '1px solid var(--primary)' : '1px solid var(--border)',
                cursor: 'pointer',
                color: 'var(--text-primary)'
              }}
              title="Cooperative Role & Account Desk"
              aria-label="User profile and role menu"
              aria-expanded={showUserMenu}
            >
              <img
                src={user.avatar}
                alt={user.name}
                style={{ width: '22px', height: '22px', borderRadius: '2px', objectFit: 'cover', flexShrink: 0 }}
              />
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.05, textAlign: 'left' }} className="user-text">
                <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
                  {user.name.split(' ')[0]}
                </span>
                <span style={{ fontSize: '0.62rem', color: 'var(--primary)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}>
                  {role === 'customer' ? 'Citizen' : role === 'worker' ? 'Artisan' : role === 'admin' ? 'Registrar' : 'Guest'}
                </span>
              </div>
              <ChevronDown 
                size={13} 
                color="var(--text-muted)" 
                style={{ 
                  transition: 'transform 0.15s ease', 
                  transform: showUserMenu ? 'rotate(180deg)' : 'none',
                  flexShrink: 0 
                }} 
              />
            </button>

            {/* Backdrop for User Menu Popover */}
            {showUserMenu && (
              <div
                onClick={() => setShowUserMenu(false)}
                style={{
                  position: 'fixed',
                  inset: 0,
                  zIndex: 150
                }}
              />
            )}

            {/* Role Switcher & Account Popover Dropdown */}
            {showUserMenu && (
              <div
                style={{
                  position: 'absolute',
                  top: '42px',
                  right: 0,
                  width: '320px',
                  backgroundColor: '#FFFFFF',
                  border: '2px solid var(--primary)',
                  borderRadius: 'var(--radius-xs)',
                  boxShadow: '0 8px 24px rgba(42, 42, 40, 0.16)',
                  padding: '0.9rem',
                  zIndex: 160
                }}
              >
                {/* Profile Identity Card */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.7rem',
                    paddingBottom: '0.75rem',
                    borderBottom: '1px solid var(--border-light)'
                  }}
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: 'var(--radius-xs)',
                      objectFit: 'cover',
                      border: '1px solid var(--border)',
                      flexShrink: 0
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {user.name}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontFamily: 'var(--font-mono)' }}>
                      {user.email}
                    </div>
                    <div style={{ marginTop: '0.2rem' }}>
                      <span
                        style={{
                          fontSize: '0.62rem',
                          fontWeight: 700,
                          fontFamily: 'var(--font-mono)',
                          padding: '0.1rem 0.35rem',
                          borderRadius: '2px',
                          backgroundColor: 'var(--primary-surface)',
                          color: 'var(--primary)',
                          border: '1px solid rgba(28, 61, 46, 0.18)',
                          textTransform: 'uppercase'
                        }}
                      >
                        {role === 'customer' ? 'Citizen Member' : role === 'worker' ? 'Artisan Member' : 'Federation Registrar'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Section: Switch Cooperative Role */}
                <div style={{ margin: '0.75rem 0 0.5rem 0' }}>
                  <div
                    style={{
                      fontSize: '0.67rem',
                      fontWeight: 700,
                      color: 'var(--primary)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      fontFamily: 'var(--font-mono)',
                      marginBottom: '0.4rem'
                    }}
                  >
                    Switch Cooperative Role
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    {roles.map(r => {
                      const isActive = role === r.key;
                      return (
                        <button
                          key={r.key}
                          onClick={() => {
                            switchRole(r.key);
                            setShowUserMenu(false);
                          }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '0.5rem 0.6rem',
                            borderRadius: 'var(--radius-xs)',
                            backgroundColor: isActive ? 'rgba(28, 61, 46, 0.08)' : 'transparent',
                            border: isActive ? '1px solid var(--primary)' : '1px solid transparent',
                            cursor: 'pointer',
                            textAlign: 'left',
                            width: '100%',
                            transition: 'all 0.15s ease'
                          }}
                          className="role-menu-item"
                          title={`Switch to ${r.label}`}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', minWidth: 0 }}>
                            <div
                              style={{
                                width: '26px',
                                height: '26px',
                                borderRadius: 'var(--radius-xs)',
                                backgroundColor: isActive ? 'var(--primary)' : 'var(--surface)',
                                color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                              }}
                            >
                              {r.icon}
                            </div>
                            <div style={{ minWidth: 0 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                <span style={{ fontSize: '0.79rem', fontWeight: isActive ? 700 : 500, color: 'var(--text-primary)' }}>
                                  {language === 'hi' ? r.hindiLabel : r.label}
                                </span>
                              </div>
                              <div style={{ fontSize: '0.67rem', color: 'var(--text-muted)', lineHeight: 1.2 }}>
                                {r.badge}
                              </div>
                            </div>
                          </div>
                          {isActive && <Check size={14} color="var(--primary)" style={{ flexShrink: 0, marginLeft: '0.25rem' }} />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Direct Register Link for Active Role */}
                <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '0.65rem', marginTop: '0.5rem' }}>
                  <button
                    onClick={() => {
                      if (role === 'customer') setCurrentTab('customer_dashboard');
                      if (role === 'worker') setCurrentTab('worker_dashboard');
                      if (role === 'admin') setCurrentTab('admin_dashboard');
                      setShowUserMenu(false);
                    }}
                    style={{
                      width: '100%',
                      padding: '0.45rem 0.6rem',
                      backgroundColor: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-xs)',
                      fontSize: '0.76rem',
                      fontWeight: 600,
                      color: 'var(--primary)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.35rem',
                      transition: 'background-color 0.15s ease'
                    }}
                  >
                    <Briefcase size={13} />
                    <span>
                      {role === 'customer' && 'Open Customer Register & Bookings'}
                      {role === 'worker' && 'Open Worker Passbook & Jobs'}
                      {role === 'admin' && 'Open Federation Audit & KYC Desk'}
                    </span>
                  </button>
                </div>

                {/* Logout Option */}
                <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '0.55rem', marginTop: '0.5rem' }}>
                  <button
                    onClick={() => {
                      logout();
                      setShowUserMenu(false);
                      if (onOpenLogin) onOpenLogin();
                    }}
                    style={{
                      width: '100%',
                      padding: '0.45rem 0.6rem',
                      backgroundColor: '#FEF2F2',
                      border: '1px solid #DC2626',
                      borderRadius: 'var(--radius-xs)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: '#B91C1C',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.35rem'
                    }}
                  >
                    <LogOut size={13} />
                    <span>{language === 'hi' ? 'लॉग आउट / भूमिका बदलें' : 'Log Out / Switch Role'}</span>
                  </button>
                </div>

                {/* Staging / Demo Debug Reset */}
                <div 
                  style={{ 
                    borderTop: '1px solid var(--border-light)', 
                    paddingTop: '0.6rem', 
                    marginTop: '0.6rem', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center' 
                  }}
                >
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    DEMO CONTROLS
                  </span>
                  <button
                    onClick={handleResetData}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-muted)',
                      fontSize: '0.7rem',
                      cursor: 'pointer',
                      padding: '0.15rem 0.35rem',
                      borderRadius: 'var(--radius-xs)'
                    }}
                    title="Reset all demo bookings, ratings, and state back to default"
                  >
                    <RotateCcw size={11} />
                    <span>Reset Demo State</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
              setShowNotifications(false);
              setShowUserMenu(false);
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

      {/* Mobile Drawer & Backdrop */}
      {mobileMenuOpen && (
        <>
          <div
            onClick={() => setMobileMenuOpen(false)}
            style={{
              position: 'fixed',
              top: '64px',
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
              gap: '0.5rem',
              zIndex: 89,
              boxShadow: '0 8px 24px rgba(42, 42, 40, 0.15)'
            }}
          >
            {/* Mobile User Profile Card & Language Switcher */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.6rem 0.75rem',
                backgroundColor: 'rgba(28, 61, 46, 0.04)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-xs)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <img
                  src={user.avatar}
                  alt={user.name}
                  style={{ width: '32px', height: '32px', borderRadius: '2px', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)' }}>{user.name}</div>
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
                    padding: '0.25rem 0.55rem',
                    fontSize: '0.72rem',
                    fontWeight: language === 'en' ? 700 : 500,
                    backgroundColor: language === 'en' ? 'var(--primary)' : '#FFFFFF',
                    color: language === 'en' ? '#FFFFFF' : 'var(--text-secondary)',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('hi')}
                  style={{
                    padding: '0.25rem 0.55rem',
                    fontSize: '0.72rem',
                    fontWeight: language === 'hi' ? 700 : 500,
                    backgroundColor: language === 'hi' ? 'var(--primary)' : '#FFFFFF',
                    color: language === 'hi' ? '#FFFFFF' : 'var(--text-secondary)',
                    fontFamily: "'IBM Plex Sans Devanagari', sans-serif",
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  हिन्दी
                </button>
              </div>
            </div>

            {/* Role Switcher in Mobile Drawer */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-xs)',
                padding: '0.6rem 0.75rem'
              }}
            >
              <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--primary)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                Switch Cooperative Role:
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.35rem' }}>
                {roles.map(r => {
                  const isActive = role === r.key;
                  return (
                    <button
                      key={r.key}
                      onClick={() => switchRole(r.key)}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.2rem',
                        padding: '0.45rem 0.2rem',
                        borderRadius: 'var(--radius-xs)',
                        fontSize: '0.68rem',
                        fontWeight: isActive ? 700 : 500,
                        backgroundColor: isActive ? 'var(--primary)' : 'var(--surface)',
                        color: isActive ? '#FFFFFF' : 'var(--text-primary)',
                        border: isActive ? '1px solid var(--primary)' : '1px solid var(--border)',
                        cursor: 'pointer'
                      }}
                    >
                      {r.icon}
                      <span>{r.key === 'customer' ? 'Citizen' : r.key === 'worker' ? 'Artisan' : 'Registrar'}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile Navigation Links */}
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

            <div style={{ height: '1px', backgroundColor: 'var(--border-light)', margin: '0.2rem 0' }} />

            {/* Open Active Register Button */}
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

            {/* Mobile SOS Trigger */}
            <button
              onClick={() => {
                onEmergencyClick();
                setMobileMenuOpen(false);
              }}
              className="btn btn-sos"
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                padding: '0.5rem',
                fontSize: '0.8rem',
                fontWeight: 700,
                marginTop: '0.25rem'
              }}
            >
              <AlertOctagon size={15} />
              <span>24/7 Priority Emergency SOS Dispatch</span>
            </button>

            {/* Mobile Logout */}
            <button
              onClick={() => {
                logout();
                setMobileMenuOpen(false);
                if (onOpenLogin) onOpenLogin();
              }}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                padding: '0.5rem',
                fontSize: '0.78rem',
                fontWeight: 700,
                color: '#B91C1C',
                backgroundColor: '#FEF2F2',
                border: '1px solid #DC2626',
                borderRadius: 'var(--radius-xs)',
                cursor: 'pointer',
                marginTop: '0.25rem'
              }}
            >
              <LogOut size={14} />
              <span>{language === 'hi' ? 'लॉग आउट' : 'Log Out & Change Role'}</span>
            </button>

            {/* Reset Demo Option */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '0.35rem' }}>
              <button
                onClick={handleResetData}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  color: 'var(--text-muted)',
                  fontSize: '0.72rem',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <RotateCcw size={11} />
                <span>Reset Demo State</span>
              </button>
            </div>
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
        .role-menu-item:hover {
          background-color: rgba(28, 61, 46, 0.05) !important;
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
            padding: 0.35rem 0.45rem !important;
            font-size: 0.8rem !important;
            gap: 0.2rem !important;
          }
        }

        /* Wide screens: Show user text */
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

        /* Small screen adjustments under 640px */
        @media (max-width: 640px) {
          .header-lang-control { display: none !important; }
          .brand-seal-badge { display: none !important; }
        }

        /* Small mobile screens */
        @media (max-width: 520px) {
          .sos-label-full { display: none !important; }
          .sos-label-short { display: inline !important; }
          .header-utility-cluster { gap: 6px !important; }
        }
      `}</style>
    </header>
  );
};
