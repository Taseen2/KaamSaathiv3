import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import { 
  Users, 
  UserCheck, 
  Wrench, 
  Shield, 
  ArrowRight, 
  Lock, 
  Phone, 
  Mail, 
  KeyRound, 
  CheckCircle2, 
  Building2, 
  Sparkles,
  MapPin,
  Languages
} from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: (destinationTab: string) => void;
  onBrowseAsGuest: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
  onBrowseAsGuest
}) => {
  const { login, language, setLanguage, t } = useApp();

  const [selectedRole, setSelectedRole] = useState<UserRole>('customer');
  const [authMethod, setAuthMethod] = useState<'otp' | 'password'>('otp');
  const [identifier, setIdentifier] = useState<string>('+91 98234 56789');
  const [credential, setCredential] = useState<string>('4829');
  const [error, setError] = useState<string>('');
  const [otpSent, setOtpSent] = useState<boolean>(true);

  // Pre-configured official demo profiles
  const roleProfiles = {
    customer: {
      title: language === 'hi' ? 'नागरिक / ग्राहक' : 'Citizen / Customer',
      badge: language === 'hi' ? 'बुकिंग एवं सत्यापन' : 'Book & Verify',
      desc: language === 'hi' 
        ? 'सत्यापित कारीगर बुक करें, पारदर्शी सहकारी न्यूनतम दरें, डोरस्टेप 4-अंकीय ओटीपी सुरक्षा।' 
        : 'Book verified trade artisans, transparent cooperative benchmark rates, doorstep 4-digit OTP security.',
      icon: <UserCheck size={24} />,
      demoName: 'Aarav Gupta',
      demoIdentifier: '+91 98234 56789',
      demoCred: '4829',
      destinationTab: 'customer_dashboard',
      society: 'Noida Sector 78 Resident Welfare',
      buttonText: language === 'hi' ? 'ग्राहक पोर्टल में प्रवेश करें' : 'Enter Citizen Portal (My Bookings)'
    },
    worker: {
      title: language === 'hi' ? 'कारीगर सदस्य' : 'Artisan / Cooperative Worker',
      badge: language === 'hi' ? 'पासबुक एवं कार्य' : 'Passbook & Jobs',
      desc: language === 'hi' 
        ? 'ड्यूटी रजिस्टर ऑन करें, नजदीकी बुकिंग स्वीकार करें, 95% दैनिक आजीविका पासबुक व कल्याण कोष।' 
        : 'Toggle duty register, accept proximity dispatches, 95% direct livelihood passbook & welfare pool.',
      icon: <Wrench size={24} />,
      demoName: 'Ramesh Kumar Verma',
      demoIdentifier: '+91 98112 34567',
      demoCred: '4829',
      destinationTab: 'worker_dashboard',
      society: 'Delhi Central Shramik Sahakari Samiti (DCS-2021-0498)',
      buttonText: language === 'hi' ? 'कारीगर पासबुक में प्रवेश करें' : 'Enter Worker Portal (Passbook)'
    },
    admin: {
      title: language === 'hi' ? 'महासंघ रजिस्ट्रार' : 'Federation Registrar / Admin',
      badge: language === 'hi' ? 'ऑडिट एवं केवाईसी' : 'Audit & KYC Desk',
      desc: language === 'hi' 
        ? 'कारीगर केवाईसी अनुमोदन, सामाजिक सुरक्षा कोष ऑडिट, एआई मांग पूर्वानुमान एवं मानक दर निर्धारण।' 
        : 'Artisan member accreditation, welfare reserve audits, AI demand forecasting & statutory rate schedules.',
      icon: <Shield size={24} />,
      demoName: 'Dr. Savita Deshmukh',
      demoIdentifier: 'savita.admin@shramikcoop.org',
      demoCred: 'coop@admin2026',
      destinationTab: 'admin_dashboard',
      society: 'National Labour Cooperative Federation Secretariat, New Delhi',
      buttonText: language === 'hi' ? 'फेडरेशन डेस्क में प्रवेश करें' : 'Enter Federation Desk (Admin Desk)'
    }
  };

  const handleSelectRole = (r: UserRole) => {
    setSelectedRole(r);
    setError('');
    const prof = roleProfiles[r as keyof typeof roleProfiles];
    if (prof) {
      setIdentifier(prof.demoIdentifier);
      setCredential(prof.demoCred);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setError(language === 'hi' ? 'कृपया फोन नंबर या ईमेल दर्ज करें।' : 'Please enter your phone number or email address.');
      return;
    }
    if (!credential.trim()) {
      setError(language === 'hi' ? 'कृपया ओटीपी या पासवर्ड दर्ज करें।' : 'Please enter the 4-digit OTP or password.');
      return;
    }

    const currentProfile = roleProfiles[selectedRole as keyof typeof roleProfiles] || roleProfiles.customer;
    login(selectedRole, {
      name: currentProfile.demoName,
      email: selectedRole === 'admin' ? identifier : `${currentProfile.demoName.toLowerCase().replace(' ', '.')}@example.com`,
      phone: selectedRole !== 'admin' ? identifier : '+91 99990 00111'
    });

    onLoginSuccess(currentProfile.destinationTab);
  };

  const handleGuestClick = () => {
    login('guest');
    onBrowseAsGuest();
  };

  const activeProf = roleProfiles[selectedRole as keyof typeof roleProfiles];

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg-main)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Top Gazette Header Bar */}
      <header
        style={{
          padding: '0.85rem 2rem',
          backgroundColor: '#FAF7F0',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: 'var(--radius-xs)',
              backgroundColor: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FAF7F0'
            }}
          >
            <Users size={20} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', lineHeight: 1.1 }}>
              <span style={{ fontSize: '1.35rem', fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--primary)' }}>
                KaamSaathi
              </span>
              <span className="seal-badge seal-govt" style={{ fontSize: '0.62rem', padding: '0.1rem 0.35rem', fontFamily: 'var(--font-mono)' }}>
                Official Federation Portal
              </span>
            </div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
              {language === 'hi'
                ? 'राष्ट्रीय श्रम सहकारी मंच • बहु-राज्य सहकारी समिति अधिनियम 2002'
                : 'National Labour Cooperative Federation • MSCS Act 2002 Statutory Compliance'}
            </div>
          </div>
        </div>

        {/* Language switch */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-xs)',
              overflow: 'hidden',
              backgroundColor: '#FFFFFF'
            }}
          >
            <div style={{ padding: '0 0.45rem', display: 'flex', alignItems: 'center', backgroundColor: 'var(--surface)', color: 'var(--text-secondary)' }}>
              <Languages size={13} />
            </div>
            <button
              onClick={() => setLanguage('en')}
              style={{
                padding: '0.3rem 0.6rem',
                fontSize: '0.74rem',
                fontWeight: language === 'en' ? 700 : 500,
                backgroundColor: language === 'en' ? 'var(--primary)' : 'transparent',
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
                padding: '0.3rem 0.6rem',
                fontSize: '0.74rem',
                fontWeight: language === 'hi' ? 700 : 500,
                backgroundColor: language === 'hi' ? 'var(--primary)' : 'transparent',
                color: language === 'hi' ? '#FFFFFF' : 'var(--text-secondary)',
                border: 'none',
                fontFamily: "'IBM Plex Sans Devanagari', sans-serif",
                cursor: 'pointer'
              }}
            >
              हिन्दी
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main style={{ flex: 1, padding: '3rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: '980px' }}>
          {/* Institutional Banner */}
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div className="stamp-official" style={{ margin: '0 auto 0.75rem auto', display: 'inline-flex' }}>
              <Building2 size={13} />
              <span>COOPERATIVE FEDERATION IDENTITY & ACCESS REGISTER</span>
            </div>
            <h1 style={{ fontSize: '2.2rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>
              {language === 'hi' ? 'अपने सहकारी डेस्क का चयन करें' : 'Select Your Cooperative Member Desk'}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.96rem', maxWidth: '620px', margin: '0 auto' }}>
              {language === 'hi'
                ? 'कामसाथी गैर-शोषणकारी सहकारी मंच है। प्रमाणित कारीगरों, नागरिकों और फेडरेशन रजिस्ट्रार के लिए समर्पित पोर्टल।'
                : 'KaamSaathi eliminates exploitative aggregator margins. Access your dedicated portal with statutory fair wages, transparent audits, and mutual security.'}
            </p>
          </div>

          {/* 3 Role Selection Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.25rem',
              marginBottom: '2rem'
            }}
          >
            {(['customer', 'worker', 'admin'] as const).map(rKey => {
              const r = roleProfiles[rKey];
              const isSelected = selectedRole === rKey;
              return (
                <div
                  key={rKey}
                  onClick={() => handleSelectRole(rKey)}
                  className="card"
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border)',
                    boxShadow: isSelected ? '0 6px 18px rgba(28, 61, 46, 0.12)' : 'var(--shadow-subtle)',
                    padding: '1.35rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    position: 'relative',
                    transform: isSelected ? 'translateY(-2px)' : 'none'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: 'var(--radius-xs)',
                        backgroundColor: isSelected ? 'var(--primary)' : 'var(--surface)',
                        color: isSelected ? '#FFFFFF' : 'var(--primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {r.icon}
                    </div>
                    <span
                      style={{
                        fontSize: '0.66rem',
                        fontWeight: 700,
                        fontFamily: 'var(--font-mono)',
                        padding: '0.15rem 0.45rem',
                        borderRadius: '2px',
                        backgroundColor: isSelected ? 'var(--primary-surface)' : 'var(--bg-secondary)',
                        color: isSelected ? 'var(--primary)' : 'var(--text-secondary)'
                      }}
                    >
                      {r.badge}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                    {r.title}
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.45, marginBottom: '0.85rem' }}>
                    {r.desc}
                  </p>

                  <div
                    style={{
                      borderTop: '1px solid var(--border-light)',
                      paddingTop: '0.65rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.74rem',
                      color: isSelected ? 'var(--primary)' : 'var(--text-muted)'
                    }}
                  >
                    <span>{isSelected ? '✓ Active Desk' : 'Click to Select'}</span>
                    <span style={{ fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
                      Profile: {r.demoName.split(' ')[0]} <ArrowRight size={11} />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Login Form Card */}
          <div
            className="card"
            style={{
              backgroundColor: '#FFFFFF',
              border: '2px solid var(--primary)',
              borderRadius: 'var(--radius-xs)',
              padding: '2rem',
              boxShadow: 'var(--shadow-card)',
              marginBottom: '1.5rem'
            }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--primary)', fontWeight: 700, fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
                  Member Authentication Desk
                </div>
                <h2 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                  Sign in as {activeProf.title}
                </h2>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  Affiliation: {activeProf.society}
                </div>
              </div>

              {/* Method Switcher */}
              <div style={{ display: 'inline-flex', border: '1px solid var(--border)', borderRadius: 'var(--radius-xs)', overflow: 'hidden' }}>
                <button
                  type="button"
                  onClick={() => setAuthMethod('otp')}
                  style={{
                    padding: '0.35rem 0.75rem',
                    fontSize: '0.76rem',
                    fontWeight: authMethod === 'otp' ? 700 : 500,
                    backgroundColor: authMethod === 'otp' ? 'var(--primary)' : '#FFFFFF',
                    color: authMethod === 'otp' ? '#FFFFFF' : 'var(--text-secondary)',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Mobile OTP
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMethod('password')}
                  style={{
                    padding: '0.35rem 0.75rem',
                    fontSize: '0.76rem',
                    fontWeight: authMethod === 'password' ? 700 : 500,
                    backgroundColor: authMethod === 'password' ? 'var(--primary)' : '#FFFFFF',
                    color: authMethod === 'password' ? '#FFFFFF' : 'var(--text-secondary)',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Password / Passbook ID
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {error && (
                <div
                  style={{
                    padding: '0.65rem 1rem',
                    backgroundColor: '#FEF2F2',
                    border: '1px solid #DC2626',
                    borderRadius: 'var(--radius-xs)',
                    color: '#B91C1C',
                    fontSize: '0.82rem',
                    fontWeight: 600
                  }}
                >
                  {error}
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
                {/* Identifier field */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                    {selectedRole === 'admin' ? 'Registered Administrative Email' : 'Registered Mobile Number or Email'}
                  </label>
                  <div style={{ position: 'relative' }}>
                    {selectedRole === 'admin' ? (
                      <Mail size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    ) : (
                      <Phone size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    )}
                    <input
                      type="text"
                      value={identifier}
                      onChange={e => setIdentifier(e.target.value)}
                      placeholder={selectedRole === 'admin' ? 'admin@shramikcoop.org' : '+91 98XXX XXXXX'}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem 0.65rem 2.4rem',
                        backgroundColor: 'var(--surface)',
                        border: '1px solid var(--border)',
                        borderRadius: 'var(--radius-xs)',
                        color: 'var(--text-primary)',
                        fontSize: '0.9rem',
                        fontFamily: 'var(--font-mono)'
                      }}
                    />
                  </div>
                </div>

                {/* Credential field */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {authMethod === 'otp' ? '4-Digit Verification OTP' : 'Security Passbook Password'}
                    </label>
                    <span style={{ fontSize: '0.7rem', color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>
                      Demo Code: {activeProf.demoCred}
                    </span>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <KeyRound size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                      type={authMethod === 'password' && selectedRole === 'admin' ? 'password' : 'text'}
                      value={credential}
                      maxLength={authMethod === 'otp' ? 4 : 32}
                      onChange={e => setCredential(e.target.value)}
                      placeholder={authMethod === 'otp' ? '4829' : '••••••••'}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem 0.65rem 2.4rem',
                        backgroundColor: 'var(--surface)',
                        border: '1px solid var(--border)',
                        borderRadius: 'var(--radius-xs)',
                        color: 'var(--text-primary)',
                        fontSize: '0.95rem',
                        letterSpacing: authMethod === 'otp' ? '0.25em' : 'normal',
                        fontFamily: 'var(--font-mono)'
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Demo quick load badge banner */}
              <div
                style={{
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-xs)',
                  padding: '0.75rem 1rem',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.75rem',
                  fontSize: '0.78rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--text-secondary)' }}>
                  <Sparkles size={14} color="var(--accent)" />
                  <span>Pre-authenticated demo identity: <strong>{activeProf.demoName}</strong></span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIdentifier(activeProf.demoIdentifier);
                    setCredential(activeProf.demoCred);
                  }}
                  style={{
                    backgroundColor: 'transparent',
                    border: '1px dashed var(--primary)',
                    borderRadius: '2px',
                    padding: '0.2rem 0.5rem',
                    color: 'var(--primary)',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontSize: '0.72rem'
                  }}
                >
                  Reload Demo Defaults
                </button>
              </div>

              {/* Action row */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.5rem' }}>
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={{
                    flex: '1 1 240px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '0.8rem 1.5rem',
                    fontSize: '0.95rem'
                  }}
                >
                  <Lock size={16} />
                  <span>{activeProf.buttonText}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Secondary Option: Continue as Guest */}
          <div
            style={{
              textAlign: 'center',
              padding: '1.25rem',
              backgroundColor: '#FAF7F0',
              border: '1px dashed var(--border)',
              borderRadius: 'var(--radius-xs)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {language === 'hi' ? 'केवल कारीगरों को खोजना व देखना चाहते हैं?' : 'Looking to browse verified workers first?'}
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', maxWidth: '540px' }}>
              {language === 'hi'
                ? 'बिना लॉगिन किए कारीगरों की सूची, ओपनस्ट्रीटमैप लाइव पिन और मानक दरें देखें।'
                : 'You can explore our OpenStreetMap geo-roster, check fair rates, and review verified profiles without logging in.'}
            </p>
            <button
              type="button"
              onClick={handleGuestClick}
              className="btn btn-outline"
              style={{
                borderColor: 'var(--primary)',
                color: 'var(--primary)',
                fontWeight: 700,
                fontSize: '0.86rem',
                padding: '0.55rem 1.4rem',
                marginTop: '0.35rem'
              }}
            >
              <span>{language === 'hi' ? 'अतिथि रूप में जारी रखें — कारीगर खोजें' : 'Continue as Guest — Browse Workers'}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </main>

      {/* Footer minimal info */}
      <footer style={{ padding: '1rem', textAlign: 'center', fontSize: '0.74rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-light)', backgroundColor: '#FAF7F0' }}>
        KaamSaathi Cooperative Labour Federation • All Rights Reserved • Transparent Civic Ledger System
      </footer>
    </div>
  );
};
