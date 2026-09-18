import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { FindWorkers } from './pages/FindWorkers';
import { CustomerDashboard } from './pages/CustomerDashboard';
import { WorkerDashboard } from './pages/WorkerDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { CooperativeModel } from './pages/CooperativeModel';
import { LoginPage } from './pages/LoginPage';
import { BookingModal } from './components/booking/BookingModal';
import { InvoiceModal } from './components/common/InvoiceModal';
import { RatingModal } from './components/common/RatingModal';
import { EmergencyModal } from './components/common/EmergencyModal';
import { WorkerProfile, Booking } from './types';
import { ShieldAlert, ArrowLeft, Lock, LogOut } from 'lucide-react';

const MainApp: React.FC = () => {
  const { role, isAuthenticated, isGuest, logout, language } = useApp();

  // Read initial tab from URL hash if available
  const [currentTab, setCurrentTab] = useState<string>(() => {
    const hash = window.location.hash.replace('#', '').trim();
    if (hash) return hash;
    return 'home';
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Modals state
  const [bookingWorker, setBookingWorker] = useState<WorkerProfile | null>(null);
  const [invoiceBooking, setInvoiceBooking] = useState<Booking | null>(null);
  const [ratingBooking, setRatingBooking] = useState<Booking | null>(null);
  const [emergencyModalOpen, setEmergencyModalOpen] = useState<boolean>(false);

  // Sync tab with URL hash
  useEffect(() => {
    if (currentTab) {
      window.location.hash = currentTab;
    }
  }, [currentTab]);

  // Handle browser back/forward and direct hash manipulation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').trim();
      if (hash) {
        setCurrentTab(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentTab('workers');
  };

  const handleBookWorker = (worker: WorkerProfile) => {
    if (isGuest) {
      alert(language === 'hi'
        ? 'कारीगर बुक करने के लिए कृपया नागरिक खाते से लॉग इन करें।'
        : 'To book a verified artisan, please sign in as a Citizen Member.');
      setCurrentTab('login');
      return;
    }
    setBookingWorker(worker);
  };

  // If user is not authenticated and not continuing as guest, show Login Page
  if ((!isAuthenticated && !isGuest) || currentTab === 'login') {
    return (
      <LoginPage
        onLoginSuccess={(destinationTab) => {
          setCurrentTab(destinationTab);
        }}
        onBrowseAsGuest={() => {
          setSelectedCategory('all');
          setCurrentTab('workers');
        }}
      />
    );
  }

  // =====================================================================
  // Role-Based Access Control (RBAC) Route Guard
  // =====================================================================
  const checkRoleAccess = (tab: string): { allowed: boolean; reason: string; redirectTab: string } => {
    // Public routes accessible to everyone (Citizens, Workers, Admins, Guests)
    if (tab === 'home' || tab === 'workers' || tab === 'cooperative') {
      return { allowed: true, reason: '', redirectTab: tab };
    }

    // Guest accessing private dashboard
    if (isGuest) {
      return {
        allowed: false,
        reason: language === 'hi'
          ? 'अतिथि पहुंच प्रतिबंध: व्यक्तिगत डैशबोर्ड व पासबुक देखने के लिए कृपया लॉग इन करें।'
          : 'Guest Access Restriction: Please log in with your cooperative credentials to access private booking and passbook desks.',
        redirectTab: 'workers'
      };
    }

    // Customer route guard
    if (tab === 'customer_dashboard') {
      if (role === 'customer') return { allowed: true, reason: '', redirectTab: tab };
      return {
        allowed: false,
        reason: language === 'hi'
          ? `पहुंच वर्जित: आप वर्तमान में ${role === 'worker' ? 'कारीगर' : 'रजिस्ट्रार'} रूप में लॉग इन हैं। "मेरी बुकिंग" नागरिक खातों के लिए है।`
          : `Access Restricted: You are currently signed in as an ${role === 'worker' ? 'Artisan Member' : 'Federation Registrar'}. Citizen "My Bookings" is reserved for household consumers.`,
        redirectTab: role === 'worker' ? 'worker_dashboard' : 'admin_dashboard'
      };
    }

    // Worker route guard
    if (tab === 'worker_dashboard') {
      if (role === 'worker') return { allowed: true, reason: '', redirectTab: tab };
      return {
        allowed: false,
        reason: language === 'hi'
          ? `पहुंच वर्जित: आप वर्तमान में ${role === 'customer' ? 'नागरिक' : 'रजिस्ट्रार'} रूप में लॉग इन हैं। "कारीगर पोर्टल" पंजीकृत श्रम सदस्यों के लिए है।`
          : `Access Restricted: You are currently signed in as a ${role === 'customer' ? 'Citizen' : 'Federation Registrar'}. The "Worker Portal" is reserved for verified artisan members.`,
        redirectTab: role === 'customer' ? 'customer_dashboard' : 'admin_dashboard'
      };
    }

    // Admin route guard
    if (tab === 'admin_dashboard') {
      if (role === 'admin') return { allowed: true, reason: '', redirectTab: tab };
      return {
        allowed: false,
        reason: language === 'hi'
          ? `पहुंच वर्जित: आप वर्तमान में ${role === 'customer' ? 'नागरिक' : 'कारीगर'} रूप में लॉग इन हैं। "फेडरेशन डेस्क" केवल अधिकृत रजिस्ट्रार हेतु है।`
          : `Access Restricted: You are currently signed in as a ${role === 'customer' ? 'Citizen' : 'Artisan Member'}. The "Federation Desk" requires cooperative registrar audit clearance.`,
        redirectTab: role === 'customer' ? 'customer_dashboard' : 'worker_dashboard'
      };
    }

    return { allowed: true, reason: '', redirectTab: 'home' };
  };

  const accessCheck = checkRoleAccess(currentTab);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Sticky Header Region */}
      <div style={{ position: 'sticky', top: 0, zIndex: 100, backgroundColor: '#FAF7F0' }}>
        <Navbar
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          onEmergencyClick={() => setEmergencyModalOpen(true)}
          onOpenLogin={() => setCurrentTab('login')}
        />
      </div>

      {/* Dynamic Content View with RBAC Protection */}
      <main style={{ flex: 1 }}>
        {!accessCheck.allowed ? (
          /* Access Denied Card */
          <div className="container" style={{ padding: '4rem 1.5rem', display: 'flex', justifyContent: 'center' }}>
            <div
              className="card"
              style={{
                maxWidth: '600px',
                width: '100%',
                backgroundColor: '#FFFFFF',
                border: '2px solid #DC2626',
                borderTop: '5px solid #DC2626',
                borderRadius: 'var(--radius-xs)',
                padding: '2.5rem',
                textAlign: 'center',
                boxShadow: '0 8px 24px rgba(42, 42, 40, 0.12)'
              }}
            >
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: 'var(--radius-xs)',
                  backgroundColor: '#FEF2F2',
                  color: '#DC2626',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem auto'
                }}
              >
                <ShieldAlert size={28} />
              </div>
              <div style={{ fontSize: '0.74rem', color: '#DC2626', fontWeight: 700, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                Statutory Role-Based Access Control
              </div>
              <h2 style={{ fontSize: '1.6rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                Cooperative Clearance Required
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.5, marginBottom: '2rem' }}>
                {accessCheck.reason}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
                <button
                  onClick={() => setCurrentTab(accessCheck.redirectTab)}
                  className="btn btn-primary"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  <ArrowLeft size={15} />
                  <span>Return to Authorized Desk</span>
                </button>
                <button
                  onClick={() => {
                    logout();
                    setCurrentTab('login');
                  }}
                  className="btn btn-outline"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', borderColor: '#DC2626', color: '#DC2626' }}
                >
                  <LogOut size={15} />
                  <span>Sign In as Another Role</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {currentTab === 'home' && (
              <Home
                onSelectCategory={handleSelectCategory}
                onBookWorker={handleBookWorker}
                onEmergencyClick={() => setEmergencyModalOpen(true)}
                onExploreWorkers={() => {
                  setSelectedCategory('all');
                  setCurrentTab('workers');
                }}
              />
            )}

            {currentTab === 'workers' && (
              <FindWorkers
                initialCategory={selectedCategory}
                onBookWorker={handleBookWorker}
              />
            )}

            {currentTab === 'cooperative' && (
              <CooperativeModel
                onExplore={() => {
                  setSelectedCategory('all');
                  setCurrentTab('workers');
                }}
              />
            )}

            {currentTab === 'customer_dashboard' && (
              <CustomerDashboard
                onViewInvoice={b => setInvoiceBooking(b)}
                onRateBooking={b => setRatingBooking(b)}
                onExploreWorkers={() => {
                  setSelectedCategory('all');
                  setCurrentTab('workers');
                }}
              />
            )}

            {currentTab === 'worker_dashboard' && <WorkerDashboard />}

            {currentTab === 'admin_dashboard' && <AdminDashboard />}
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={tab => {
          if (tab === 'login') {
            logout();
            setCurrentTab('login');
          } else {
            setCurrentTab(tab);
          }
        }}
        onEmergencyClick={() => setEmergencyModalOpen(true)}
      />

      {/* Booking Modal */}
      {bookingWorker && (
        <BookingModal
          worker={bookingWorker}
          isOpen={!!bookingWorker}
          onClose={() => setBookingWorker(null)}
          onBookingComplete={() => {
            if (role === 'customer') {
              setCurrentTab('customer_dashboard');
            }
          }}
        />
      )}

      {/* Digital Tax Invoice Modal */}
      {invoiceBooking && (
        <InvoiceModal
          booking={invoiceBooking}
          isOpen={!!invoiceBooking}
          onClose={() => setInvoiceBooking(null)}
        />
      )}

      {/* Rating / Review Modal */}
      {ratingBooking && (
        <RatingModal
          booking={ratingBooking}
          isOpen={!!ratingBooking}
          onClose={() => setRatingBooking(null)}
        />
      )}

      {/* Emergency SOS Modal */}
      <EmergencyModal
        isOpen={emergencyModalOpen}
        onClose={() => setEmergencyModalOpen(false)}
        onEmergencyBooked={() => {
          if (role === 'customer') {
            setCurrentTab('customer_dashboard');
          } else {
            setCurrentTab('workers');
          }
        }}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
