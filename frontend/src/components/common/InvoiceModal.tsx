import React from 'react';
import { Booking } from '../../types';
import { X, Printer, ShieldCheck, CheckCircle } from 'lucide-react';

interface InvoiceModalProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ booking, isOpen, onClose }) => {
  if (!isOpen || !booking) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: '680px',
          backgroundColor: '#FFFFFF',
          color: 'var(--text-primary)',
          borderRadius: 'var(--radius-xs)',
          border: '2px solid var(--primary)'
        }}
      >
        {/* Printable Invoice Container */}
        <div id="printable-invoice" style={{ padding: '2rem' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid var(--primary)', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <div style={{ width: '28px', height: '28px', background: 'var(--primary)', borderRadius: 'var(--radius-xs)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
                  <ShieldCheck size={18} />
                </div>
                <span style={{ fontSize: '1.4rem', fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--primary)' }}>
                  KaamSaathi
                </span>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                National Labour Cooperative Federation of India (Regd.)
              </p>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                GSTIN: 07AAAFK8920C1ZP • Multi-State Coop Reg: DL/MSCS/FED/2024/091
              </p>
            </div>

            <div style={{ textAlign: 'right' }}>
              <span className="stamp-official" style={{ fontSize: '0.7rem' }}>
                STATUTORY TAX INVOICE
              </span>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.5rem', fontFamily: 'var(--font-mono)' }}>
                Docket #: INV-{booking.id.replace('KS-BK-', '')}-2026
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Date: {booking.date}
              </div>
            </div>
          </div>

          {/* Customer & Worker Details Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.5rem', fontSize: '0.82rem' }}>
            <div style={{ background: 'var(--surface)', padding: '0.85rem', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-light)' }}>
              <div style={{ fontWeight: 700, color: 'var(--text-muted)', fontSize: '0.7rem', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: '0.35rem' }}>
                Billed To (Citizen):
              </div>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{booking.customerName}</div>
              <div style={{ color: 'var(--text-secondary)' }}>{booking.customerPhone}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.76rem', marginTop: '0.2rem' }}>{booking.customerAddress}</div>
            </div>

            <div style={{ background: 'var(--surface)', padding: '0.85rem', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-light)' }}>
              <div style={{ fontWeight: 700, color: 'var(--text-muted)', fontSize: '0.7rem', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: '0.35rem' }}>
                Accredited Cooperative Artisan:
              </div>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{booking.workerName}</div>
              <div style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.76rem' }}>
                Affiliation: Delhi Shramik Sahakari Federation
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.76rem' }}>
                Worker Contact: {booking.workerPhone}
              </div>
            </div>
          </div>

          {/* Itemized Table */}
          <table className="ledger-table" style={{ marginBottom: '1.5rem', fontSize: '0.84rem' }}>
            <thead>
              <tr>
                <th style={{ padding: '0.6rem 0.75rem' }}>Statutory Line Item</th>
                <th style={{ padding: '0.6rem 0.75rem', textAlign: 'center' }}>Units</th>
                <th style={{ padding: '0.6rem 0.75rem', textAlign: 'right' }}>Benchmark Rate</th>
                <th style={{ padding: '0.6rem 0.75rem', textAlign: 'right' }}>Amount (INR)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '0.65rem 0.75rem' }}>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{booking.serviceName}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Cooperative Benchmark Labor Rate (95% to Worker)</div>
                </td>
                <td style={{ padding: '0.65rem 0.75rem', textAlign: 'center' }}>1</td>
                <td style={{ padding: '0.65rem 0.75rem', textAlign: 'right', fontFamily: 'var(--font-mono)' }}>₹{booking.pricing.baseRate}</td>
                <td style={{ padding: '0.65rem 0.75rem', textAlign: 'right', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>₹{booking.pricing.baseRate}</td>
              </tr>
              <tr>
                <td style={{ padding: '0.65rem 0.75rem' }}>Artisan Local Conveyance Allowance</td>
                <td style={{ padding: '0.65rem 0.75rem', textAlign: 'center' }}>1</td>
                <td style={{ padding: '0.65rem 0.75rem', textAlign: 'right', fontFamily: 'var(--font-mono)' }}>₹{booking.pricing.travelFee}</td>
                <td style={{ padding: '0.65rem 0.75rem', textAlign: 'right', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>₹{booking.pricing.travelFee}</td>
              </tr>
              <tr>
                <td style={{ padding: '0.65rem 0.75rem', color: 'var(--primary)', fontWeight: 600 }}>
                  Worker Welfare & Group Accidental Insurance Reserve
                </td>
                <td style={{ padding: '0.65rem 0.75rem', textAlign: 'center' }}>1</td>
                <td style={{ padding: '0.65rem 0.75rem', textAlign: 'right', fontFamily: 'var(--font-mono)' }}>₹{booking.pricing.welfareFund}</td>
                <td style={{ padding: '0.65rem 0.75rem', textAlign: 'right', fontWeight: 600, color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>
                  ₹{booking.pricing.welfareFund}
                </td>
              </tr>
              <tr>
                <td style={{ padding: '0.65rem 0.75rem' }}>Cooperative Registry & Administrative Upkeep (5%)</td>
                <td style={{ padding: '0.65rem 0.75rem', textAlign: 'center' }}>1</td>
                <td style={{ padding: '0.65rem 0.75rem', textAlign: 'right', fontFamily: 'var(--font-mono)' }}>₹{booking.pricing.platformCess}</td>
                <td style={{ padding: '0.65rem 0.75rem', textAlign: 'right', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>₹{booking.pricing.platformCess}</td>
              </tr>
              <tr>
                <td style={{ padding: '0.65rem 0.75rem' }}>Central & State GST (18%)</td>
                <td style={{ padding: '0.65rem 0.75rem', textAlign: 'center' }}>-</td>
                <td style={{ padding: '0.65rem 0.75rem', textAlign: 'right', fontFamily: 'var(--font-mono)' }}>18%</td>
                <td style={{ padding: '0.65rem 0.75rem', textAlign: 'right', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>₹{booking.pricing.gst}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', borderTop: '2px solid var(--primary)' }}>
                <td colSpan={3} style={{ padding: '0.75rem', textAlign: 'right' }}>
                  Total Settlement:
                </td>
                <td style={{ padding: '0.75rem', textAlign: 'right', color: 'var(--primary)', fontSize: '1.2rem', fontFamily: 'var(--font-mono)' }}>
                  ₹{booking.pricing.total}
                </td>
              </tr>
            </tfoot>
          </table>

          {/* Footer certification & payment status */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--surface)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-light)' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--primary)', fontWeight: 700, fontSize: '0.82rem' }}>
                <CheckCircle size={14} /> Settlement Mode: {booking.paymentMethod?.toUpperCase()} • {booking.paymentStatus === 'paid_online' ? 'PAID ONLINE (RAZORPAY)' : 'CASH CONFIRMED'}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.15rem', fontFamily: 'var(--font-mono)' }}>
                Ref ID: {booking.paymentTransactionId || 'TXN-CASH-SETTLED'}
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>AUDITED SIGNATORY</div>
              <div style={{ fontSize: '0.68rem', color: 'var(--primary)', fontWeight: 600 }}>Labour Cooperative Federation</div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ padding: '0.85rem 1.5rem', background: '#FAF7F0', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end', gap: '0.65rem' }}>
          <button
            onClick={onClose}
            className="btn btn-outline btn-sm"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="btn btn-primary btn-sm"
          >
            <Printer size={14} /> Print / Save PDF
          </button>
        </div>
      </div>
    </div>
  );
};
