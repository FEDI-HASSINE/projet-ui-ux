import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { Calendar, CheckCircle, Download, Home, Mail, MapPin } from 'lucide-react';
import { StepHeader } from '../components/StepHeader';
import { Button } from '../components/Button';
import { Toast } from '../components/Toast';
import { BilingualText } from '../components/BilingualText';
import { useBooking } from '../context/BookingContext';
import { bookingSteps, centers, services } from '../data/booking';
import { bilingual, inlineBilingual } from '../utils/bilingual';
import { formatDateBilingual } from '../utils/date';
import { motion } from 'motion/react';

export function Confirmation() {
  const navigate = useNavigate();
  const { bookingData, resetBooking } = useBooking();
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (!bookingData.bookingNumber) {
      navigate('/summary');
    }
  }, [bookingData.bookingNumber, navigate]);

  const service = useMemo(
    () => services.find((item) => item.id === bookingData.serviceId),
    [bookingData.serviceId]
  );

  const center = useMemo(
    () => centers.find((item) => item.id === bookingData.centerId),
    [bookingData.centerId]
  );

  const formattedDate = bookingData.date
    ? formatDateBilingual(new Date(`${bookingData.date}T00:00:00`))
    : null;

  const showToastNotification = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleBackHome = () => {
    resetBooking();
    navigate('/');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-full"
    >
      <div className="px-6 py-8 space-y-6">
        <StepHeader
          step={6}
          title={bookingSteps[5].title}
          subtitle={bilingual('Votre rendez-vous est confirmé', 'Your appointment is confirmed')}
        />

        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F5EE]">
            <CheckCircle size={40} className="text-attt-success" strokeWidth={2} />
          </div>
        </div>

        <div className="rounded-3xl border border-attt-border-light bg-white p-6 shadow-sm space-y-4">
          <div className="text-center space-y-1">
            <p className="text-xs uppercase tracking-[0.2em] text-attt-text-secondary">
              Reference / Booking ID
            </p>
            <p className="text-xl font-semibold text-attt-primary">#{bookingData.bookingNumber}</p>
          </div>

          <div className="space-y-3 text-sm text-attt-text-secondary">
            <div className="flex items-start gap-2">
              <Calendar size={16} className="mt-0.5 text-attt-secondary" />
              <div>
                {formattedDate && <BilingualText text={formattedDate} variant="inline" />}
                <div>{bookingData.time}</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 text-attt-secondary" />
              <div>
                <div>{center ? inlineBilingual(center.name) : '-'}</div>
                {center && <div className="text-xs">{center.address}</div>}
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Mail size={16} className="mt-0.5 text-attt-secondary" />
              <div>
                <div>{service ? inlineBilingual(service.title) : '-'}</div>
                <div className="text-xs">{bookingData.vehicleInfo}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-attt-border-light bg-attt-surface p-4 text-xs text-attt-text-secondary">
          <BilingualText
            text={bilingual(
              'Merci d\'arriver 10 minutes avant l\'heure prévue avec votre carte grise et CIN.',
              'Please arrive 10 minutes early with your registration card and ID.'
            )}
          />
        </div>

        <div className="space-y-3">
          <Button
            variant="secondary"
            onClick={() => showToastNotification('PDF téléchargé / PDF downloaded')}
          >
            <Download size={18} />
            <BilingualText text={bilingual('Télécharger le récap', 'Download summary')} variant="inline" />
          </Button>
          <Button
            variant="secondary"
            onClick={() => showToastNotification('Ajouté au calendrier / Added to calendar')}
          >
            <Calendar size={18} />
            <BilingualText text={bilingual('Ajouter au calendrier', 'Add to calendar')} variant="inline" />
          </Button>
          <Button onClick={handleBackHome}>
            <Home size={18} />
            <BilingualText text={bilingual("Retour à l'accueil", 'Back to home')} variant="inline" />
          </Button>
        </div>
      </div>

      <Toast message={toastMessage} show={showToast} />
    </motion.div>
  );
}
