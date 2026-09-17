import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { Booking, WorkerProfile } from '../types';
import { 
  Power, 
  ShieldCheck, 
  TrendingUp, 
  Phone, 
  CheckCircle2, 
  AlertCircle, 
  Lock,
  Award,
  Wallet,
  Building2,
  FileCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const WorkerDashboard: React.FC = () => {
  const { workers, bookings, toggleWorkerDuty, startJob, completeJob } = useApp();

  // Current active worker (Ramesh Kumar Verma)
  const worker: WorkerProfile = workers[0];

  // Bookings assigned to this worker
  const myBookings: Booking[] = bookings.filter((b: Booking) => b.workerId === worker.id);
  const activeJobs: Booking[] = myBookings.filter((b: Booking) => b.status === 'confirmed' || b.status === 'in_progress');
  const completedJobsList: Booking[] = myBookings.filter((b: Booking) => b.status === 'completed');

  // Local state for OTP verification input per booking
  const [otpInputs, setOtpInputs] = useState<{ [bookingId: string]: string }>({});
  const [otpErrors, setOtpErrors] = useState<{ [bookingId: string]: string }>({});

  const handleOtpChange = (bookingId: string, val: string) => {
    setOtpInputs(prev => ({ ...prev, [bookingId]: val }));
    setOtpErrors(prev => ({ ...prev, [bookingId]: '' }));
  };

  const handleVerifyStart = (bookingId: string) => {
    const code = otpInputs[bookingId] || '';
    const res = startJob(bookingId, code);
    if (!res.success) {
      setOtpErrors(prev => ({ ...prev, [bookingId]: res.message }));
    } else {
      setOtpInputs(prev => ({ ...prev, [bookingId]: '' }));
    }
  };

  const handleMarkComplete = (bookingId: string) => {
    completeJob(bookingId);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  // Financial calculations for worker (Cooperative Model)
  const totalCompletedGross = completedJobsList.reduce((acc: number, b: Booking) => acc + b.pricing.baseRate + b.pricing.travelFee, 0);
  const cooperativeUpkeep = Math.round(totalCompletedGross * 0.05); // 5% upkeep
  const netEarnings = totalCompletedGross - cooperativeUpkeep; // 95% take-home
  const welfareContributed = completedJobsList.reduce((acc: number, b: Booking) => acc + b.pricing.welfareFund, 0);

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem', minHeight: '85vh' }}>
      {/* Header Profile & Duty Switch (Cooperative Membership Passbook Card) */}
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
          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
            <img
              src={worker.avatar}
              alt={worker.name}
              style={{
                width: '68px',
                height: '68px',
                borderRadius: 'var(--radius-xs)',
                objectFit: 'cover',
                border: '2px solid var(--primary)'
              }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                <h1 style={{ fontSize: '1.6rem', color: 'var(--primary)' }}>{worker.name}</h1>
                <span className="stamp-gold" style={{ fontSize: '0.68rem', padding: '0.1rem 0.4rem' }}>
                  <ShieldCheck size={12} /> {worker.kycStatus === 'verified' ? 'VERIFIED ARTISAN MEMBER' : 'KYC PENDING'}
                </span>
              </div>
              <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                {worker.cooperativeSociety} • Passbook Reg #{worker.membershipId}
              </div>
              <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.4rem' }}>
                {worker.badges.map((b: string, i: number) => (
                  <span
                    key={i}
                    style={{
                      fontSize: '0.7rem',
                      background: 'var(--surface)',
                      border: '1px solid var(--border-light)',
                      padding: '0.1rem 0.45rem',
                      borderRadius: 'var(--radius-xs)',
                      color: 'var(--text-secondary)',
                      fontFamily: 'var(--font-mono)'
                    }}
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Duty Switch Button */}
          <div>
            <button
              onClick={() => toggleWorkerDuty(worker.id)}
              className="btn btn-outline"
              style={{
                borderColor: worker.isOnline ? 'var(--primary)' : 'var(--border)',
                backgroundColor: worker.isOnline ? 'var(--primary-surface)' : 'transparent',
                color: worker.isOnline ? 'var(--primary)' : 'var(--text-muted)',
                fontWeight: 700,
                fontSize: '0.86rem',
                padding: '0.6rem 1.2rem',
                borderRadius: 'var(--radius-xs)'
              }}
            >
              <Power size={15} color={worker.isOnline ? 'var(--primary)' : 'var(--text-muted)'} />
              <span>Status: {worker.isOnline ? 'ON DUTY (READY FOR JOBS)' : 'OFF DUTY'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Passbook Earnings Ledger Summary */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2rem'
        }}
      >
        <div className="card" style={{ backgroundColor: '#FFFFFF', padding: '1.25rem' }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: '0.25rem' }}>
            Net Livelihood Payout (95%)
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--primary)', fontFamily: 'var(--font-heading)' }}>
            ₹{netEarnings.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
            Deposited directly to cooperative bank a/c
          </div>
        </div>

        <div className="card" style={{ backgroundColor: '#FFFFFF', padding: '1.25rem' }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: '0.25rem' }}>
            Federation Upkeep Cap (5%)
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--text-secondary)', fontFamily: 'var(--font-heading)' }}>
            ₹{cooperativeUpkeep.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
            Server & registry maintenance fee
          </div>
        </div>

        <div className="card" style={{ backgroundColor: '#FFFFFF', padding: '1.25rem' }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: '0.25rem' }}>
            Welfare Fund Pool
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-heading)' }}>
            ₹{welfareContributed.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
            ₹20/job pooled for health & emergency aid
          </div>
        </div>

        <div className="card" style={{ backgroundColor: '#FFFFFF', padding: '1.25rem' }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: '0.25rem' }}>
            Completed Member Services
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--primary)', fontFamily: 'var(--font-heading)' }}>
            {completedJobsList.length}
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
            Rating: {worker.rating} / 5.0 (Audited)
          </div>
        </div>
      </div>

      {/* Active Dispatches & Work Schedule */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '2px solid var(--primary)', paddingBottom: '0.5rem' }}>
          <h2 style={{ fontSize: '1.4rem', color: 'var(--primary)' }}>
            Active Dispatched Jobs ({activeJobs.length})
          </h2>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            OTP Arrival Verification Protocol Required
          </span>
        </div>

        {activeJobs.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '3rem 1.5rem', background: '#FFFFFF' }}>
            <CheckCircle2 size={40} color="var(--primary)" style={{ margin: '0 auto 0.75rem auto' }} />
            <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '0.3rem' }}>No Active Jobs Assigned</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem' }}>
              Ensure your duty toggle is set to "ON DUTY" to receive proximity job allocations.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {activeJobs.map((job: Booking) => (
              <div
                key={job.id}
                className="card"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderLeft: `4px solid ${job.status === 'in_progress' ? 'var(--primary)' : 'var(--accent)'}`,
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-xs)'
                }}
              >
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                      <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                        #{job.id}
                      </span>
                      <span className="badge badge-verified">
                        {job.status === 'in_progress' ? 'Work Underway' : 'Customer Waiting'}
                      </span>
                      {job.isEmergency && (
                        <span className="badge badge-emergency">24/7 SOS Urgent</span>
                      )}
                    </div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>{job.serviceName}</h3>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Direct Artisan Share</div>
                    <div style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>
                      ₹{Math.round(job.pricing.total * 0.95)}
                    </div>
                  </div>
                </div>

                {/* Customer Details Box */}
                <div
                  style={{
                    backgroundColor: 'var(--surface)',
                    border: '1px solid var(--border-light)',
                    padding: '0.85rem 1rem',
                    borderRadius: 'var(--radius-xs)',
                    marginBottom: '1rem',
                    fontSize: '0.84rem'
                  }}
                >
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                    Customer: {job.customerName} • <Phone size={12} style={{ display: 'inline' }} /> {job.customerPhone}
                  </div>
                  <div style={{ color: 'var(--text-secondary)', marginBottom: '0.2rem' }}>
                    Location: {job.customerAddress}
                  </div>
                  {job.customerNotes && (
                    <div style={{ color: 'var(--text-muted)', fontStyle: 'italic', fontSize: '0.8rem' }}>
                      Notes: "{job.customerNotes}"
                    </div>
                  )}
                </div>

                {/* OTP Verification Desk to Start Work */}
                {job.status === 'confirmed' && (
                  <div
                    style={{
                      backgroundColor: 'var(--surface)',
                      border: '1px solid var(--border)',
                      padding: '1rem',
                      borderRadius: 'var(--radius-xs)',
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '1rem'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '0.86rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Lock size={14} /> Enter Customer Verification OTP to Begin Work
                      </div>
                      <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                        Request the 4-digit code displayed on citizen's screen upon reaching their doorstep.
                      </div>
                      {otpErrors[job.id] && (
                        <div style={{ color: 'var(--sos-red)', fontSize: '0.74rem', marginTop: '0.2rem', fontWeight: 600 }}>
                          {otpErrors[job.id]}
                        </div>
                      )}
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <input
                        type="text"
                        maxLength={4}
                        placeholder="4-digit OTP"
                        value={otpInputs[job.id] || ''}
                        onChange={e => handleOtpChange(job.id, e.target.value)}
                        style={{
                          width: '110px',
                          padding: '0.45rem',
                          textAlign: 'center',
                          fontSize: '1rem',
                          fontWeight: 700,
                          letterSpacing: '0.2em',
                          fontFamily: 'var(--font-mono)'
                        }}
                      />
                      <button
                        onClick={() => handleVerifyStart(job.id)}
                        className="btn btn-primary btn-sm"
                      >
                        Verify & Start Job
                      </button>
                    </div>
                  </div>
                )}

                {/* Work Underway Action */}
                {job.status === 'in_progress' && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-light)', paddingTop: '0.75rem' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600 }}>
                      ✓ Job Verified & Started. Complete work to disburse compensation.
                    </div>
                    {/* Primary Action in Tool-belt Rust Orange */}
                    <button
                      onClick={() => handleMarkComplete(job.id)}
                      className="btn btn-accent btn-sm"
                    >
                      <CheckCircle2 size={14} /> Mark Service Completed
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Completed Services Passbook Record Table */}
      <div>
        <div style={{ marginBottom: '1rem', borderBottom: '2px solid var(--primary)', paddingBottom: '0.5rem' }}>
          <h2 style={{ fontSize: '1.4rem', color: 'var(--primary)' }}>
            Service Passbook Settlement History
          </h2>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--border)', borderRadius: 'var(--radius-xs)', overflowX: 'auto' }}>
          <table className="ledger-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Service Date</th>
                <th>Trade Description</th>
                <th>Customer</th>
                <th>Gross (INR)</th>
                <th>Net Payout (95%)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {completedJobsList.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '2rem' }}>
                    No completed settlements recorded in this cycle.
                  </td>
                </tr>
              ) : (
                completedJobsList.map((b: Booking) => (
                  <tr key={b.id}>
                    <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>#{b.id}</td>
                    <td>{b.date}</td>
                    <td>{b.serviceName}</td>
                    <td>{b.customerName}</td>
                    <td style={{ fontFamily: 'var(--font-mono)' }}>₹{b.pricing.total}</td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--primary)' }}>
                      ₹{Math.round(b.pricing.total * 0.95)}
                    </td>
                    <td>
                      <span className="badge badge-verified">Settled</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
