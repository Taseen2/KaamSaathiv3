import React from 'react';
import { useApp } from '../../context/AppContext';
import { Users, ShieldCheck, HeartHandshake, Award, FileText, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC<{ onNavigate: (tab: string) => void }> = ({ onNavigate }) => {
  const { language } = useApp();

  return (
    <footer
      style={{
        backgroundColor: '#1C3D2E',
        borderTop: '3px solid #12281E',
        paddingTop: '3.5rem',
        paddingBottom: '2.5rem',
        marginTop: '4rem',
        color: '#E8EFEA',
        fontSize: '0.88rem',
        fontFamily: 'var(--font-body)'
      }}
    >
      <div className="container">
        {/* Top Registration Stamped Ribbon */}
        <div
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            border: '1px solid rgba(139, 154, 140, 0.3)',
            borderRadius: 'var(--radius-xs)',
            padding: '1rem 1.25rem',
            marginBottom: '3rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: 'var(--radius-xs)',
                backgroundColor: '#D4AF37',
                color: '#1C3D2E',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Award size={18} />
            </div>
            <div>
              <div style={{ fontWeight: 700, color: '#FAF7F0', fontSize: '0.86rem', letterSpacing: '0.02em' }}>
                GOVERNMENT-RECOGNIZED WORKER FEDERATION MODEL
              </div>
              <div style={{ fontSize: '0.74rem', color: '#B3C4B8' }}>
                Multi-State Cooperative Societies Act, 2002 • Registration No. DL/MSCS/FED/2024/091
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem', color: '#D4AF37', fontFamily: 'var(--font-mono)' }}>
              <CheckCircle2 size={14} /> 95% DIRECT WORKER PAYOUT
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem', color: '#D4AF37', fontFamily: 'var(--font-mono)' }}>
              <CheckCircle2 size={14} /> ₹5 LAKH GROUP INSURANCE
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '2.5rem',
            marginBottom: '3rem'
          }}
        >
          {/* Col 1: Brand & Cooperative Mission */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: 'var(--radius-xs)',
                  backgroundColor: '#FAF7F0',
                  color: '#1C3D2E',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Users size={18} />
              </div>
              <span
                style={{
                  fontSize: '1.35rem',
                  fontWeight: 700,
                  fontFamily: 'var(--font-heading)',
                  color: '#FAF7F0'
                }}
              >
                KaamSaathi
              </span>
            </div>
            <p style={{ lineHeight: 1.6, fontSize: '0.84rem', color: '#B3C4B8', marginBottom: '1.25rem' }}>
              {language === 'hi'
                ? 'भारत का प्रथम श्रम सहकारी गिग सेवा वेब मंच। उचित मजदूरी, पारदर्शी शुल्क, सामाजिक सुरक्षा और सामूहिक कल्याण के साथ घरेलू सेवाएं।'
                : 'India’s pioneering cooperative gig platform connecting informal workers directly with citizens — replacing private platform exploitation with democratic worker ownership.'}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#D4AF37', fontSize: '0.78rem', fontWeight: 600 }}>
              <ShieldCheck size={16} />
              <span>National Labour Cooperative Federation of India Member</span>
            </div>
          </div>

          {/* Col 2: Services Directory */}
          <div>
            <h4 style={{ color: '#FAF7F0', fontSize: '0.92rem', fontWeight: 700, fontFamily: 'var(--font-heading)', marginBottom: '1rem', borderBottom: '1px solid rgba(139, 154, 140, 0.4)', paddingBottom: '0.4rem' }}>
              Verified Trade Services
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.84rem' }}>
              <li>
                <button onClick={() => onNavigate('workers')} style={{ color: '#E8EFEA', textAlign: 'left' }}>
                  Electrician & Circuit Diagnosis
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('workers')} style={{ color: '#E8EFEA', textAlign: 'left' }}>
                  Plumbing & Sanitation Repair
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('workers')} style={{ color: '#E8EFEA', textAlign: 'left' }}>
                  Carpentry & Structural Woodwork
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('workers')} style={{ color: '#E8EFEA', textAlign: 'left' }}>
                  Residential Deep Cleaning
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('workers')} style={{ color: '#E8EFEA', textAlign: 'left' }}>
                  Appliance Servicing & Maintenance
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('workers')} style={{ color: '#FCA5A5', fontWeight: 700, textAlign: 'left', fontFamily: 'var(--font-mono)' }}>
                  [SOS] 24/7 Priority Emergency Dispatch
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Cooperative Welfare & Transparency */}
          <div>
            <h4 style={{ color: '#FAF7F0', fontSize: '0.92rem', fontWeight: 700, fontFamily: 'var(--font-heading)', marginBottom: '1rem', borderBottom: '1px solid rgba(139, 154, 140, 0.4)', paddingBottom: '0.4rem' }}>
              Social Security & Welfare Charter
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.84rem', color: '#B3C4B8' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <HeartHandshake size={15} color="#D4AF37" />
                <span>₹20 Welfare contribution per booking</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Award size={15} color="#D4AF37" />
                <span>NSDC certified skilled artisans</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <ShieldCheck size={15} color="#D4AF37" />
                <span>Zero commission gouging (5% admin cap)</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <FileText size={15} color="#D4AF37" />
                <span>Audited cooperative balance sheets</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Grievance & Citizen Desk */}
          <div>
            <h4 style={{ color: '#FAF7F0', fontSize: '0.92rem', fontWeight: 700, fontFamily: 'var(--font-heading)', marginBottom: '1rem', borderBottom: '1px solid rgba(139, 154, 140, 0.4)', paddingBottom: '0.4rem' }}>
              Ombudsman & Grievance Cell
            </h4>
            <div style={{ fontSize: '0.82rem', color: '#B3C4B8', lineHeight: 1.6 }}>
              <p style={{ marginBottom: '0.5rem' }}>
                Cooperative Bhavan, 14 Institutional Area, New Delhi 110003
              </p>
              <p style={{ marginBottom: '0.5rem', fontFamily: 'var(--font-mono)' }}>
                Toll-Free Helpline: 1800-425-SHRAM (74726)
              </p>
              <p style={{ fontFamily: 'var(--font-mono)' }}>
                Email: secretariat@kaamsaathi.coop.in
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Legal Copyright Gazette Rule */}
        <div
          style={{
            borderTop: '1px solid rgba(139, 154, 140, 0.3)',
            paddingTop: '1.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            fontSize: '0.78rem',
            color: '#B3C4B8'
          }}
        >
          <div>
            © 2026 KaamSaathi National Labour Cooperative Federation. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            <span>Cooperative Bylaws</span>
            <span>Fair Wage Benchmark Gazette</span>
            <span>Privacy & Grievance Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
