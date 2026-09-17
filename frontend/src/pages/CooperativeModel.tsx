import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Heart, Award, TrendingUp, ArrowRight, Building2, CheckCircle2 } from 'lucide-react';

export const CooperativeModel: React.FC<{ onExplore: () => void }> = ({ onExplore }) => {
  const { language } = useApp();

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem', maxWidth: '1020px', minHeight: '85vh' }}>
      {/* Official Gazette Header */}
      <div style={{ textAlign: 'left', marginBottom: '2.5rem', borderBottom: '2px solid var(--primary)', paddingBottom: '1.25rem' }}>
        <div style={{ marginBottom: '0.65rem' }}>
          <span className="stamp-official">
            <Building2 size={13} /> OFFICIAL COOPERATIVE CHARTER & GAZETTE
          </span>
        </div>
        <h1 style={{ fontSize: '2.4rem', color: 'var(--primary)', marginBottom: '0.75rem' }}>
          {language === 'hi'
            ? 'श्रम सहकारिता: गिग अर्थव्यवस्था में लोकतांत्रिक क्रांति'
            : 'Democratizing Gig Work Through Labour Cooperatives'}
        </h1>
        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '820px' }}>
          KaamSaathi is registered under the Multi-State Cooperative Societies Act to dismantle predatory 30% aggregator commissions. By transferring platform control to artisans and households, we ensure fair minimum wages, collective welfare, and institutional stability.
        </p>
      </div>

      {/* Comparison Ledger: Corporate Aggregators vs KaamSaathi */}
      <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--border)', borderRadius: 'var(--radius-xs)', marginBottom: '3rem', padding: '1.5rem', boxShadow: 'var(--shadow-subtle)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)', color: 'var(--primary)' }}>
            Comparative Audit: Commercial Aggregators vs. KaamSaathi Federation
          </h3>
          <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            Statutory Standards
          </span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="ledger-table">
            <thead>
              <tr>
                <th style={{ width: '30%' }}>Policy Dimension</th>
                <th style={{ width: '35%', color: '#991B1B' }}>Corporate Gig Platforms</th>
                <th style={{ width: '35%', color: 'var(--primary)' }}>KaamSaathi Labour Cooperative</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Platform Commission</td>
                <td style={{ color: '#991B1B' }}>20% to 35% deducted from worker earnings</td>
                <td style={{ color: 'var(--primary)', fontWeight: 700, background: 'var(--primary-surface)' }}>
                  5% strict ceiling (server & registry upkeep only)
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Direct Artisan Take-Home</td>
                <td style={{ color: 'var(--text-secondary)' }}>65% - 75% after hidden deductions</td>
                <td style={{ color: 'var(--primary)', fontWeight: 700, background: 'var(--primary-surface)' }}>
                  95% direct payout deposited instantly
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Accidental & Medical Cover</td>
                <td style={{ color: '#991B1B' }}>Rarely covered / Gig worker excluded</td>
                <td style={{ color: 'var(--primary)', fontWeight: 700, background: 'var(--primary-surface)' }}>
                  Mandatory ₹5 Lakh group insurance policy
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Crisis Surge Pricing</td>
                <td style={{ color: '#991B1B' }}>Dynamic algorithmic markup up to 3x</td>
                <td style={{ color: 'var(--primary)', fontWeight: 700, background: 'var(--primary-surface)' }}>
                  Zero surge gouging (Tripartite benchmark rates)
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Democratic Governance</td>
                <td style={{ color: '#991B1B' }}>Private venture capital shareholders</td>
                <td style={{ color: 'var(--primary)', fontWeight: 700, background: 'var(--primary-surface)' }}>
                  One Worker, One Vote (Federation General Body)
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Skill Certification</td>
                <td style={{ color: 'var(--text-secondary)' }}>Internal superficial onboarding video</td>
                <td style={{ color: 'var(--primary)', fontWeight: 700, background: 'var(--primary-surface)' }}>
                  Formal NSDC Skill India RPL accreditation
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Pillars Grid (Index Card Styling) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.25rem',
          marginBottom: '3rem'
        }}
      >
        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-xs)', backgroundColor: 'var(--primary-surface)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.85rem' }}>
            <Award size={18} />
          </div>
          <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--text-primary)' }}>
            Statutory Recognition
          </h4>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            Affiliated with state labour cooperative federations registered under the Multi-State Cooperative Societies Act.
          </p>
        </div>

        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-xs)', backgroundColor: 'var(--primary-surface)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.85rem' }}>
            <Heart size={18} />
          </div>
          <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--text-primary)' }}>
            Worker Welfare Reserve
          </h4>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            Every service transaction pools ₹20 directly into the collective welfare fund for health aid, emergency loans, and child education.
          </p>
        </div>

        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-xs)', backgroundColor: 'var(--primary-surface)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.85rem' }}>
            <TrendingUp size={18} />
          </div>
          <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--text-primary)' }}>
            Public Interest Optimization
          </h4>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            Open geospatial routing matches nearby verified workers without predatory algorithmic throttling or bidding penalties.
          </p>
        </div>
      </div>

      {/* Cooperative Charter Declaration Box */}
      <div
        className="card"
        style={{
          padding: '2rem',
          backgroundColor: '#FAF7F0',
          border: '2px solid var(--primary)',
          textAlign: 'left'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <span className="seal-badge seal-govt">ARTICLE IV • FEDERATION CONSTITUTION</span>
        </div>
        <h3 style={{ fontSize: '1.4rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>
          Dignity for Informal Workers • Integrity for Indian Households
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem', maxWidth: '720px' }}>
          When you book through KaamSaathi, 95% of your expenditure reaches the artisan who repaired your home, protected under statutory trade union charters. You actively strengthen India's cooperative foundation.
        </p>

        {/* Primary CTA in Tool-belt Rust Orange (#B5651D) */}
        <button onClick={onExplore} className="btn btn-accent btn-lg">
          <span>Schedule a Verified Cooperative Worker</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
