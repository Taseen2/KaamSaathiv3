import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { DemoRoleBar } from './components/layout/DemoRoleBar';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { FindWorkers } from './pages/FindWorkers';
import { CustomerDashboard } from './pages/CustomerDashboard';
import { WorkerDashboard } from './pages/WorkerDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { CooperativeModel } from './pages/CooperativeModel';
import { BookingModal } from './components/booking/BookingModal';
import { InvoiceModal } from './components/common/InvoiceModal';
import { RatingModal } from './components/common/RatingModal';
import { EmergencyModal } from './components/common/EmergencyModal';
import { WorkerProfile, Booking } from './types';

const MainApp: React.FC = () => {
  const { role } = useApp();

  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Modals state
  const [bookingWorker, setBookingWorker] = useState<WorkerProfile | null>(null);
  const [invoiceBooking, setInvoiceBooking] = useState<Booking | null>(null);
  const [ratingBooking, setRatingBooking] = useState<Booking | null>(null);
  const [emergencyModalOpen, setEmergencyModalOpen] = useState<boolean>(false);

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentTab('workers');
  };

  const handleBookWorker = (worker: WorkerProfile) => {
    setBookingWorker(worker);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Sticky Header Region */}
      <div style={{ position: 'sticky', top: 0, zIndex: 100, backgroundColor: '#FAF7F0' }}>
        <DemoRoleBar />
        <Navbar
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          onEmergencyClick={() => setEmergencyModalOpen(true)}
        />
      </div>

      {/* Dynamic Content View */}
      <main style={{ flex: 1 }}>
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
      </main>

      {/* Footer */}
      <Footer onNavigate={tab => setCurrentTab(tab)} />

      {/* Booking Modal */}
      {bookingWorker && (
        <BookingModal
          worker={bookingWorker}
          isOpen={!!bookingWorker}
          onClose={() => setBookingWorker(null)}
          onBookingComplete={() => {
            // If user is in customer mode, they can see it in dashboard
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
        onEmergencyBooked={() => setCurrentTab('customer_dashboard')}
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
