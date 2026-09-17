import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Search, 
  ShieldCheck, 
  AlertTriangle, 
  ArrowRight, 
  Star, 
  CheckCircle2, 
  HeartHandshake, 
  Award, 
  TrendingUp, 
  Clock, 
  Zap,
  Droplets,
  Hammer,
  Paintbrush,
  Wrench,
  FileCheck,
  Building2
} from 'lucide-react';
import type { WorkerProfile, ServiceCategory } from '../types';
import heroWorkerImg from '../assets/cooperative_worker_hero.jpg';

interface HomeProps {
  onSelectCategory: (categoryId: string) => void;
  onBookWorker: (worker: WorkerProfile) => void;
  onEmergencyClick: () => void;
  onExploreWorkers: () => void;
}

export const Home: React.FC<HomeProps> = ({
  onSelectCategory,
  onBookWorker,
  onEmergencyClick,
  onExploreWorkers
}) => {
  const { categories, workers, stats, language, t } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  // Hand-tool iconography mapper
  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'electrician': return <Zap size={22} color="var(--primary)" />;
      case 'plumber': return <Droplets size={22} color="var(--primary)" />;
      case 'carpenter': return <Hammer size={22} color="var(--primary)" />;
      case 'cleaning': return <Wrench size={22} color="var(--primary)" />;
      case 'appliance': return <Wrench size={22} color="var(--primary)" />;
      case 'painting': return <Paintbrush size={22} color="var(--primary)" />;
      case 'caregiving': return <HeartHandshake size={22} color="var(--primary)" />;
      case 'emergency': return <AlertTriangle size={22} color="var(--sos-red)" />;
      default: return <Wrench size={22} color="var(--primary)" />;
    }
  };

  const filteredCategories: ServiceCategory[] = categories.filter((c: ServiceCategory) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
      {/* =====================================================================
          Hero Section: Left-aligned document structure paired with real worker photo
          ===================================================================== */}
      <section
        style={{
          backgroundColor: '#FAF7F0',
          borderBottom: '1px solid var(--border)',
          padding: '3rem 0 3.5rem 0'
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 0.85fr)',
              gap: '2.5rem',
              alignItems: 'center'
            }}
            className="hero-grid"
          >
            {/* Left Column: Document-like structure & Headlines */}
            <div style={{ textAlign: 'left' }}>
              {/* Trust Signal: Stamped official seal (Principle 2) */}
              <div style={{ marginBottom: '1.25rem' }}>
                <div className="stamp-official">
                  <Building2 size={14} />
                  <span>GOVT. RECOGNIZED LABOUR COOPERATIVE FEDERATION • MSCS ACT 2002</span>
                </div>
              </div>

              {/* Sturdy Serif Headline (Solid ink color, NO gradient text ever) */}
              <h1
                style={{
                  fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  lineHeight: 1.15,
                  marginBottom: '1rem',
                  letterSpacing: '-0.02em'
                }}
              >
                {language === 'hi' ? (
                  <>
                    उचित मजदूरी। सम्मानजनक कार्य। <br />
                    <span style={{ color: 'var(--primary)' }}>बिचौलिया-मुक्त श्रम सहकारी।</span>
                  </>
                ) : (
                  <>
                    Fair Wages. Dignified Work. <br />
                    <span style={{ color: 'var(--primary)' }}>Zero Exploitative Middlemen.</span>
                  </>
                )}
              </h1>

              {/* Subtitle */}
              <p
                style={{
                  fontSize: '1rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                  marginBottom: '2rem',
                  maxWidth: '560px'
                }}
              >
                {language === 'hi'
                  ? 'श्रम सहकारी मॉडल: कारीगरों और ग्राहकों का सीधा जुड़ाव। 95% भुगतान सीधे कामगारों को, ₹5 लाख दुर्घटना बीमा और सामाजिक सुरक्षा के साथ।'
                  : 'India’s institutional cooperative model directly connecting verified electricians, plumbers, and technicians with households. Capped 5% admin fee, 95% direct artisan wage, and full social security protection.'}
              </p>

              {/* Search Bar & Action Buttons */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.75rem',
                  alignItems: 'center',
                  marginBottom: '2rem'
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    flex: '1 1 auto',
                    minWidth: '280px',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <Search
                    size={17}
                    style={{ position: 'absolute', left: '0.8rem', color: 'var(--text-muted)' }}
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder={language === 'hi' ? 'सेवा खोजें (उदा. इलेक्ट्रीशियन, प्लंबर)...' : 'Search trade service (e.g. Electrician, Plumbing)...'}
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.75rem 0.75rem 2.25rem',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-xs)',
                      color: 'var(--text-primary)',
                      fontSize: '0.92rem'
                    }}
                  />
                </div>

                {/* Primary CTA in Tool-belt Rust Orange (#B5651D) */}
                <button
                  onClick={onExploreWorkers}
                  className="btn btn-accent"
                  style={{
                    flex: '0 0 auto',
                    padding: '0.75rem 0.95rem',
                    fontSize: '0.88rem',
                    whiteSpace: 'nowrap'
                  }}
                  title="Browse verified cooperative artisan directory"
                >
                  <span>{language === 'hi' ? 'कारीगर खोजें' : 'Book Worker'}</span>
                  <ArrowRight size={15} />
                </button>

                {/* Strict Distinct Saturated Red SOS Button (Principle 4) */}
                <button
                  onClick={onEmergencyClick}
                  className="btn btn-sos"
                  style={{
                    flex: '0 0 auto',
                    padding: '0.75rem 0.8rem',
                    fontSize: '0.88rem',
                    whiteSpace: 'nowrap'
                  }}
                  title="Priority 15-20 min emergency domestic response"
                >
                  <AlertTriangle size={15} />
                  <span style={{ fontFamily: 'var(--font-mono)' }}>24/7 SOS</span>
                </button>
              </div>

              {/* Stamped Trust Marks Ribbon */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  alignItems: 'center',
                  fontSize: '0.78rem',
                  color: 'var(--text-muted)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <ShieldCheck size={16} color="var(--primary)" />
                  <span>Police Verified Backgrounds</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Award size={16} color="var(--seal-gold-border)" />
                  <span>NSDC Skill India Certified</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <HeartHandshake size={16} color="var(--primary)" />
                  <span>Worker Welfare Fund Pooled</span>
                </div>
              </div>
            </div>

            {/* Right Column: Authentic Worker Hero Photograph (Principle 1) */}
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-xs)',
                  padding: '0.75rem',
                  boxShadow: 'var(--shadow-card)'
                }}
              >
                {/* Official Artisan Identification Header Header */}
                <div
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderBottom: '1px solid var(--border)',
                    padding: '0.5rem 0.75rem',
                    marginBottom: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.72rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text-primary)'
                  }}
                >
                  <div>
                    <span style={{ fontWeight: 700, color: 'var(--primary)' }}>FEDERATION MEMBER RECORD</span> #DL-7829-ELEC
                  </div>
                  <div className="stamp-gold" style={{ padding: '0.1rem 0.4rem', fontSize: '0.65rem' }}>
                    VERIFIED TRADESPERSON
                  </div>
                </div>

                {/* The Worker Photograph — Clean, dignified craftsman */}
                <div style={{ position: 'relative', overflow: 'hidden', border: '1px solid var(--border)' }}>
                  <img
                    src={heroWorkerImg}
                    alt="Indian Cooperative Electrician Technician inspecting circuit panel with professional hand tools"
                    style={{
                      width: '100%',
                      height: '340px',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                  {/* Photo identification overlay caption */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      backgroundColor: 'rgba(28, 61, 46, 0.92)',
                      color: '#FAF7F0',
                      padding: '0.5rem 0.75rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '0.75rem'
                    }}
                  >
                    <div>
                      <strong>Ramesh Kumar Verma</strong> • Master Electrician (12 Yrs Exp)
                      <div style={{ fontSize: '0.68rem', color: '#B3C4B8' }}>
                        Delhi Shramik Sahakari Samiti Ltd. • Badge #EL-409
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#D4AF37' }}>
                      ★ 4.95 (142 reviews)
                    </div>
                  </div>
                </div>

                {/* Passbook Member Note */}
                <div
                  style={{
                    marginTop: '0.75rem',
                    padding: '0.6rem 0.75rem',
                    backgroundColor: 'var(--surface)',
                    border: '1px solid var(--border-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.78rem'
                  }}
                >
                  <span style={{ color: 'var(--text-secondary)' }}>
                    Social Security: <strong>PM-SYM & ESI Active</strong>
                  </span>
                  <span style={{ color: 'var(--primary)', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                    Standard Rate: ₹250/hr
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Passbook Ledger Registry Row for Key Performance Metrics */}
          <div
            style={{
              marginTop: '2.5rem',
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-xs)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))'
            }}
          >
            <div style={{ padding: '1.25rem', borderRight: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: '0.2rem' }}>
                Active Cooperative Members
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--primary)' }}>
                {stats.verifiedWorkers.toLocaleString()}+
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                NSDC Skill-accredited artisans
              </div>
            </div>

            <div style={{ padding: '1.25rem', borderRight: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: '0.2rem' }}>
                Direct Fair Wages Disbursed
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>
                ₹{(stats.fairWagesDisbursed / 100000).toFixed(1)} Lakhs
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                95% paid directly to worker accounts
              </div>
            </div>

            <div style={{ padding: '1.25rem', borderRight: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: '0.2rem' }}>
                Worker Accidental Insurance
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--primary)' }}>
                ₹5,00,000
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                Mandatory group life & accident cover
              </div>
            </div>

            <div style={{ padding: '1.25rem' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: '0.2rem' }}>
                Citizen Satisfaction Ledger
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--primary)' }}>
                {stats.customerSatisfaction} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/ 5.0</span>
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                Audited monthly by member council
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          Services Index Cards Section
          Index cards, 2-4px radius, thin hairline borders, hand-tool iconography
          ===================================================================== */}
      <section className="container">
        <div style={{ marginBottom: '2rem', textAlign: 'left', borderBottom: '2px solid var(--primary)', paddingBottom: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}>
              OFFICIAL SERVICE SCHEDULE
            </div>
            <h2 style={{ fontSize: '1.8rem', color: 'var(--primary)', marginTop: '0.2rem', fontFamily: 'var(--font-heading)' }}>
              {language === 'hi' ? 'मानक सेवा श्रेणियां' : 'Certified Trade Categories'}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
              Benchmark fair wages set by the Tripartite Wage Board. Zero aggregator surge gouging.
            </p>
          </div>
          <button
            onClick={onExploreWorkers}
            className="btn btn-outline btn-sm"
          >
            <span>View All Trades on Map</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
            gap: '1.25rem'
          }}
        >
          {filteredCategories.map((cat: ServiceCategory) => (
            <div
              key={cat.id}
              className="card card-hover"
              onClick={() => onSelectCategory(cat.id)}
              style={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '1.25rem',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-xs)'
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1rem'
                  }}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: 'var(--radius-xs)',
                      backgroundColor: 'var(--primary-surface)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid var(--border-light)'
                    }}
                  >
                    {getCategoryIcon(cat.id)}
                  </div>
                  {cat.popular && (
                    <span className="seal-badge seal-govt" style={{ fontSize: '0.68rem', padding: '0.15rem 0.45rem' }}>
                      High Demand
                    </span>
                  )}
                  {cat.id === 'emergency' && (
                    <span className="badge badge-emergency" style={{ fontSize: '0.68rem', padding: '0.15rem 0.45rem', fontFamily: 'var(--font-mono)' }}>
                      24/7 Priority
                    </span>
                  )}
                </div>

                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.35rem', color: 'var(--text-primary)' }}>
                  {language === 'hi' ? cat.nameHi : cat.name}
                </h3>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                  {language === 'hi' ? cat.descriptionHi : cat.description}
                </p>
              </div>

              <div
                style={{
                  borderTop: '1px solid var(--border-light)',
                  paddingTop: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                    Standard Base Rate
                  </div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>
                    ₹{cat.basePrice}
                  </div>
                </div>

                {/* Primary CTA in Rust Orange (#B5651D) */}
                <button
                  className="btn btn-accent btn-sm"
                  onClick={e => {
                    e.stopPropagation();
                    onSelectCategory(cat.id);
                  }}
                >
                  {language === 'hi' ? 'बुक करें' : 'Book Service'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          Why Cooperative Model? (Comparative Register & Gazette)
          ===================================================================== */}
      <section
        style={{
          backgroundColor: '#FAF7F0',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
          padding: '3.5rem 0'
        }}
      >
        <div className="container">
          <div style={{ textAlign: 'left', marginBottom: '2.5rem', borderBottom: '2px solid var(--primary)', paddingBottom: '0.75rem' }}>
            <span className="stamp-official" style={{ marginBottom: '0.5rem' }}>
              CIVIC COMPARISON REGISTER
            </span>
            <h2 style={{ fontSize: '1.8rem', color: 'var(--primary)', marginTop: '0.3rem', fontFamily: 'var(--font-heading)' }}>
              Why Choose the Cooperative Model Over Middleman Apps?
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '720px' }}>
              Commercial gig companies extract 25% to 35% commission from informal workers while offering zero security. KaamSaathi operates under democratic cooperative principles where workers own the federation.
            </p>
          </div>

          {/* Passbook Comparison Ledger Table */}
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--border)', borderRadius: 'var(--radius-xs)', overflowX: 'auto', marginBottom: '2.5rem' }}>
            <table className="ledger-table">
              <thead>
                <tr>
                  <th style={{ width: '32%' }}>Audit Criteria</th>
                  <th style={{ width: '34%', color: '#991B1B' }}>Corporate Gig Aggregators</th>
                  <th style={{ width: '34%', color: 'var(--primary)' }}>KaamSaathi Cooperative Federation</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Worker Commission Extraction</td>
                  <td style={{ color: '#991B1B' }}>20% - 35% deducted from every order</td>
                  <td style={{ color: 'var(--primary)', fontWeight: 700, background: 'var(--primary-surface)' }}>
                    Strict 5% upkeep cap (95% to worker)
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Accidental & Medical Insurance</td>
                  <td style={{ color: 'var(--text-muted)' }}>Excluded or token corporate policy</td>
                  <td style={{ color: 'var(--primary)', fontWeight: 700, background: 'var(--primary-surface)' }}>
                    ₹5,00,000 group insurance mandatory
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Crisis Surge Pricing Gouging</td>
                  <td style={{ color: '#991B1B' }}>Algorithmic surge up to 300% markup</td>
                  <td style={{ color: 'var(--primary)', fontWeight: 700, background: 'var(--primary-surface)' }}>
                    Zero surge gouging (Govt. benchmark rates)
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Governance & Ownership</td>
                  <td style={{ color: 'var(--text-muted)' }}>Private venture shareholders</td>
                  <td style={{ color: 'var(--primary)', fontWeight: 700, background: 'var(--primary-surface)' }}>
                    Democratic: One Worker, One Vote
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Worker Social Security</td>
                  <td style={{ color: 'var(--text-muted)' }}>None (Informal gig contractors)</td>
                  <td style={{ color: 'var(--primary)', fontWeight: 700, background: 'var(--primary-surface)' }}>
                    ₹20 per booking pooled in Welfare Fund
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 4 Pillars Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.25rem'
            }}
          >
            <div className="card" style={{ padding: '1.25rem' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-xs)', backgroundColor: 'var(--primary-surface)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.85rem' }}>
                <TrendingUp size={18} />
              </div>
              <h3 style={{ fontSize: '1.05rem', marginBottom: '0.4rem', color: 'var(--text-primary)' }}>95% Fair Wage Payout</h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Workers receive full compensation for their labor without predatory commission deductions.
              </p>
            </div>

            <div className="card" style={{ padding: '1.25rem' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-xs)', backgroundColor: 'var(--primary-surface)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.85rem' }}>
                <ShieldCheck size={18} />
              </div>
              <h3 style={{ fontSize: '1.05rem', marginBottom: '0.4rem', color: 'var(--text-primary)' }}>Social Security Guarantee</h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Every verified worker is enrolled in comprehensive health cover, pension, and disability aid.
              </p>
            </div>

            <div className="card" style={{ padding: '1.25rem' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-xs)', backgroundColor: 'var(--seal-gold-bg)', color: '#8C6F19', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.85rem' }}>
                <Award size={18} />
              </div>
              <h3 style={{ fontSize: '1.05rem', marginBottom: '0.4rem', color: 'var(--text-primary)' }}>Skill India Certified</h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Formal recognition of prior learning (RPL) accredited by the National Skill Development Corporation.
              </p>
            </div>

            <div className="card" style={{ padding: '1.25rem' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-xs)', backgroundColor: 'var(--primary-surface)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.85rem' }}>
                <Clock size={18} />
              </div>
              <h3 style={{ fontSize: '1.05rem', marginBottom: '0.4rem', color: 'var(--text-primary)' }}>Cooperative Grievance Redress</h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Transparent dispute settlement managed by an independent citizen and worker ombudsman council.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          Featured Cooperative Tradespeople Section
          Index card profiles, verified seals, rust orange booking actions
          ===================================================================== */}
      <section className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem', borderBottom: '2px solid var(--primary)', paddingBottom: '0.75rem' }}>
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}>
              VERIFIED ARTISAN ROSTER
            </div>
            <h2 style={{ fontSize: '1.8rem', color: 'var(--primary)', marginTop: '0.2rem', fontFamily: 'var(--font-heading)' }}>
              Featured Cooperative Members
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
              Accredited professionals from affiliated district labour cooperative societies.
            </p>
          </div>
          <button onClick={onExploreWorkers} className="btn btn-outline btn-sm">
            <span>View All {workers.length} Members on Map</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
            gap: '1.25rem'
          }}
        >
          {workers.slice(0, 4).map((worker: WorkerProfile) => (
            <div
              key={worker.id}
              className="card card-hover"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '1.25rem',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-xs)'
              }}
            >
              <div>
                <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'center', marginBottom: '0.85rem' }}>
                  <img
                    src={worker.avatar}
                    alt={worker.name}
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: 'var(--radius-xs)',
                      objectFit: 'cover',
                      border: '1px solid var(--border)'
                    }}
                  />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{worker.name}</h4>
                      {worker.kycStatus === 'verified' && (
                        <CheckCircle2 size={15} color="var(--primary)" />
                      )}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--primary)', textTransform: 'capitalize', fontWeight: 600 }}>
                      {worker.primaryCategory} • {worker.experienceYears} Yrs Exp
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.78rem', color: '#8C6F19', marginTop: '0.1rem' }}>
                      <Star size={12} fill="#8C6F19" />
                      <span style={{ fontWeight: 700 }}>{worker.rating}</span>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>({worker.reviewCount})</span>
                    </div>
                  </div>
                </div>

                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '0.85rem' }}>
                  {worker.bio}
                </p>

                {/* Society and Membership Tag */}
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '0.85rem' }}>
                  🏛️ {worker.cooperativeSociety}
                </div>

                {/* Skills tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1rem' }}>
                  {worker.skills.slice(0, 3).map((skill: string, idx: number) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: '0.72rem',
                        backgroundColor: 'var(--surface)',
                        border: '1px solid var(--border-light)',
                        padding: '0.15rem 0.45rem',
                        borderRadius: 'var(--radius-xs)',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div
                style={{
                  borderTop: '1px solid var(--border-light)',
                  paddingTop: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                    Standard Rate
                  </div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>
                    ₹{worker.hourlyRate}<span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>/hr</span>
                  </div>
                </div>

                {/* Book Worker CTA in Rust Orange */}
                <button
                  className="btn btn-accent btn-sm"
                  onClick={() => onBookWorker(worker)}
                >
                  Book Worker
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Responsive Inline CSS for Hero */}
      <style>{`
        @media (max-width: 899px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
