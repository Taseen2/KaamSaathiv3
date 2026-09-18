import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { WorkerProfile, AIInsight, ServiceCategory } from '../types';
import { 
  ShieldCheck, 
  BrainCircuit, 
  CheckCircle, 
  XCircle, 
  MapPin, 
  Clock, 
  Layers,
  Building2,
  Award,
  TrendingUp,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { formatINR } from '../utils/currency';

export const AdminDashboard: React.FC = () => {
  const { workers, stats, aiInsights, categories, verifyWorker, t } = useApp();

  const [activeTab, setActiveTab] = useState<'ai_forecast' | 'kyc_desk' | 'wage_standards'>('ai_forecast');

  // Filter pending KYC workers
  const pendingWorkers: WorkerProfile[] = workers.filter((w: WorkerProfile) => w.kycStatus === 'pending');
  const verifiedWorkersList: WorkerProfile[] = workers.filter((w: WorkerProfile) => w.kycStatus === 'verified');

  const handleApprove = (id: string) => {
    verifyWorker(id, true);
    confetti({ particleCount: 50, spread: 60 });
  };

  const handleReject = (id: string) => {
    if (window.confirm('Are you sure you want to reject this worker application?')) {
      verifyWorker(id, false);
    }
  };

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem', minHeight: '85vh' }}>
      {/* Federation Header (Institutional Registrar Desk) */}
      <div
        className="card"
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--border)',
          borderTop: '3px solid var(--primary)',
          borderRadius: 'var(--radius-xs)',
          marginBottom: '2rem',
          padding: '1.75rem',
          boxShadow: 'var(--shadow-subtle)'
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <span className="stamp-official" style={{ fontSize: '0.7rem' }}>
                <Building2 size={12} /> NATIONAL LABOUR COOPERATIVE FEDERATION
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                Registrar & Audit Desk
              </span>
            </div>
            <h1 style={{ fontSize: '1.8rem', color: 'var(--primary)', marginTop: '0.2rem' }}>
              {t('dashboards.admin.title')}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
              {t('dashboards.admin.subtitle')}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <div style={{ padding: '0.6rem 1rem', background: 'var(--surface)', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border)', textAlign: 'center' }}>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Welfare Reserve Fund</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
                {formatINR(stats.welfareFundBalance)}
              </div>
            </div>

            <div style={{ padding: '0.6rem 1rem', background: 'var(--surface)', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border)', textAlign: 'center' }}>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Verified Artisans</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>
                {stats.verifiedWorkers}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          borderBottom: '2px solid var(--border)',
          marginBottom: '2rem'
        }}
      >
        <button
          onClick={() => setActiveTab('ai_forecast')}
          style={{
            padding: '0.65rem 0.5rem',
            fontSize: '0.95rem',
            fontWeight: 700,
            color: activeTab === 'ai_forecast' ? 'var(--primary)' : 'var(--text-secondary)',
            borderBottom: activeTab === 'ai_forecast' ? '3px solid var(--primary)' : '3px solid transparent',
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            cursor: 'pointer'
          }}
        >
          <BrainCircuit size={15} />
          <span>Demand Balancing Forecast</span>
          <span className="stamp-official" style={{ fontSize: '0.6rem', padding: '0.05rem 0.35rem' }}>ML AUDIT</span>
        </button>

        <button
          onClick={() => setActiveTab('kyc_desk')}
          style={{
            padding: '0.65rem 0.5rem',
            fontSize: '0.95rem',
            fontWeight: 700,
            color: activeTab === 'kyc_desk' ? 'var(--primary)' : 'var(--text-secondary)',
            borderBottom: activeTab === 'kyc_desk' ? '3px solid var(--primary)' : '3px solid transparent',
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            cursor: 'pointer'
          }}
        >
          <ShieldCheck size={15} />
          <span>Artisan KYC & Accreditation</span>
          {pendingWorkers.length > 0 && (
            <span
              style={{
                backgroundColor: 'var(--accent)',
                color: '#FFFFFF',
                padding: '0.1rem 0.45rem',
                borderRadius: 'var(--radius-xs)',
                fontSize: '0.68rem',
                fontWeight: 700,
                fontFamily: 'var(--font-mono)'
              }}
            >
              {pendingWorkers.length} Pending
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('wage_standards')}
          style={{
            padding: '0.65rem 0.5rem',
            fontSize: '0.95rem',
            fontWeight: 700,
            color: activeTab === 'wage_standards' ? 'var(--primary)' : 'var(--text-secondary)',
            borderBottom: activeTab === 'wage_standards' ? '3px solid var(--primary)' : '3px solid transparent',
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            cursor: 'pointer'
          }}
        >
          <Layers size={15} />
          <span>Statutory Wage Benchmark Gazette</span>
        </button>
      </div>

      {/* Tab 1: AI Demand Balancing Engine */}
      {activeTab === 'ai_forecast' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* AI Banner summary */}
          <div
            className="card"
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-xs)',
              padding: '1.25rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.4rem' }}>
              <BrainCircuit size={20} color="var(--primary)" />
              <h3 style={{ fontSize: '1.15rem', color: 'var(--primary)' }}>
                Predictive Demand Balancing & Worker Mobilization Protocol
              </h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', lineHeight: 1.6, maxWidth: '820px' }}>
              The cooperative algorithm forecasts regional service demand clusters 24-48 hours in advance to pre-mobilize certified technicians, avoiding predatory surge pricing while keeping artisan wait times minimal.
            </p>
          </div>

          {/* AI Insights Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '1.25rem'
            }}
          >
            {aiInsights.map((insight: AIInsight, idx: number) => (
              <div
                key={idx}
                className="card card-hover"
                style={{
                  borderLeft: `4px solid ${insight.shortageWarning ? 'var(--sos-red)' : 'var(--primary)'}`,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  backgroundColor: '#FFFFFF',
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-xs)'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                        <MapPin size={12} color="var(--primary)" />
                        <span>{insight.locality}</span>
                      </div>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '0.15rem', color: 'var(--text-primary)' }}>
                        {insight.highDemandService}
                      </h4>
                    </div>

                    <span
                      style={{
                        backgroundColor: insight.shortageWarning ? 'var(--sos-red-bg)' : 'var(--primary-surface)',
                        color: insight.shortageWarning ? 'var(--sos-red)' : 'var(--primary)',
                        padding: '0.15rem 0.5rem',
                        borderRadius: 'var(--radius-xs)',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        border: `1px solid ${insight.shortageWarning ? 'var(--sos-red-border)' : 'var(--primary)'}`,
                        fontFamily: 'var(--font-mono)'
                      }}
                    >
                      +{insight.expectedDemandSurge}% Demand
                    </span>
                  </div>

                  {/* Visual Demand Progress Bar */}
                  <div style={{ marginBottom: '0.85rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.2rem', fontFamily: 'var(--font-mono)' }}>
                      <span>Predicted Load Surge</span>
                      <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{insight.expectedDemandSurge}%</span>
                    </div>
                    <div style={{ width: '100%', height: '5px', backgroundColor: 'var(--bg-secondary)', borderRadius: '1px', overflow: 'hidden' }}>
                      <div
                        style={{
                          height: '100%',
                          backgroundColor: insight.shortageWarning ? 'var(--sos-red)' : 'var(--primary)',
                          width: `${insight.expectedDemandSurge}%`
                        }}
                      />
                    </div>
                  </div>

                  {/* Timing & Confidence */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.85rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Clock size={12} color="var(--primary)" />
                      <span>{insight.peakHours}</span>
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      Model Confidence: <strong>{insight.confidenceScore}%</strong>
                    </div>
                  </div>

                  {/* Recommendation Box */}
                  <div
                    style={{
                      background: 'var(--surface)',
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-xs)',
                      padding: '0.65rem 0.85rem',
                      fontSize: '0.8rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.5
                    }}
                  >
                    <div style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.68rem', textTransform: 'uppercase', marginBottom: '0.2rem', fontFamily: 'var(--font-mono)' }}>
                      Federation Dispatch Advisory
                    </div>
                    {insight.recommendedAction}
                  </div>
                </div>

                <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '0.75rem', marginTop: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    Model v2.4 • Open ARIMA
                  </span>
                  <button className="btn btn-primary btn-sm" style={{ fontSize: '0.74rem' }}>
                    Mobilize Standby Workers
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: KYC & Worker Approvals */}
      {activeTab === 'kyc_desk' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--primary)', marginBottom: '0.3rem' }}>
              Pending Artisan Certification Queue ({pendingWorkers.length})
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
              Verify government identity, trade training certification, and cooperative society membership before issuing the verified trust stamp.
            </p>
          </div>

          {pendingWorkers.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '3rem', background: '#FFFFFF' }}>
              <CheckCircle size={44} color="var(--primary)" style={{ margin: '0 auto 0.75rem auto' }} />
              <h4 style={{ fontSize: '1.15rem', color: 'var(--text-primary)' }}>All Artisan Applications Audited</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                There are no pending applications in the accreditation queue.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {pendingWorkers.map((w: WorkerProfile) => (
                <div key={w.id} className="card" style={{ borderLeft: '4px solid var(--accent)', backgroundColor: '#FFFFFF', padding: '1.25rem' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <img
                        src={w.avatar}
                        alt={w.name}
                        style={{ width: '56px', height: '56px', borderRadius: 'var(--radius-xs)', objectFit: 'cover', border: '1px solid var(--border)' }}
                      />
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                          <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{w.name}</h4>
                          <span className="badge badge-pending">Verification Pending</span>
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--primary)', textTransform: 'capitalize', fontWeight: 600 }}>
                          {w.primaryCategory} • {w.experienceYears} Years Trade Experience
                        </div>
                        <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '0.1rem', fontFamily: 'var(--font-mono)' }}>
                          Society: {w.cooperativeSociety} • Membership ID: {w.membershipId}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => handleReject(w.id)}
                        className="btn btn-outline btn-sm"
                        style={{ color: 'var(--sos-red)' }}
                      >
                        <XCircle size={14} /> Reject Application
                      </button>
                      <button
                        onClick={() => handleApprove(w.id)}
                        className="btn btn-primary btn-sm"
                      >
                        <CheckCircle size={14} /> Approve & Issue NSDC Stamp
                      </button>
                    </div>
                  </div>

                  {/* Application details */}
                  <div style={{ marginTop: '0.85rem', background: 'var(--surface)', padding: '0.75rem', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-light)', fontSize: '0.8rem' }}>
                    <div style={{ color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                      <strong>Trade Declaration:</strong> {w.bio}
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Accredited Skills:</span>
                      {w.skills.map((s: string, i: number) => (
                        <span key={i} style={{ background: '#FFFFFF', border: '1px solid var(--border-light)', padding: '0.1rem 0.35rem', borderRadius: 'var(--radius-xs)' }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* List of already verified workers */}
          <div style={{ marginTop: '1.5rem' }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.85rem' }}>
              Active Accredited Federation Artisans ({verifiedWorkersList.length})
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '0.85rem' }}>
              {verifiedWorkersList.map((w: WorkerProfile) => (
                <div key={w.id} className="card" style={{ padding: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.75rem', backgroundColor: '#FFFFFF' }}>
                  <img src={w.avatar} alt={w.name} style={{ width: '38px', height: '38px', borderRadius: 'var(--radius-xs)', objectFit: 'cover', border: '1px solid var(--border)' }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: '0.86rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {w.name}
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--primary)', textTransform: 'capitalize' }}>
                      {w.primaryCategory} • Rating: {w.rating}
                    </div>
                  </div>
                  <span className="seal-badge seal-govt" style={{ fontSize: '0.62rem', padding: '0.1rem 0.35rem' }}>Verified</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Cooperative Benchmark Wage Rates */}
      {activeTab === 'wage_standards' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card" style={{ padding: '1.5rem', backgroundColor: '#FFFFFF' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--primary)' }}>
                Cooperative Federation Statutory Wage Benchmark
              </h3>
              <span className="stamp-official" style={{ fontSize: '0.68rem' }}>
                MINIMUM WAGES ACT COMPLIANT
              </span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
              All service orders on KaamSaathi adhere to minimum statutory wage rates to prevent predatory wage undercutting and ensure dignified artisan compensation.
            </p>

            <table className="ledger-table">
              <thead>
                <tr>
                  <th>Trade Service</th>
                  <th>Standard Base Rate</th>
                  <th>Direct Artisan Payout (95%)</th>
                  <th>Welfare Reserve Cess</th>
                  <th>Statutory Mandate</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((c: ServiceCategory) => (
                  <tr key={c.id}>
                    <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{c.name}</td>
                    <td style={{ color: 'var(--primary)', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{formatINR(c.basePrice)}</td>
                    <td style={{ color: 'var(--primary)', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{formatINR(Math.round(c.basePrice * 0.95))}</td>
                    <td style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>{formatINR(20)} / booking</td>
                    <td style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>National Labour Cooperative Gazette 2024</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
