import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { Check, Edit2 } from 'lucide-react';
import { StepHeader } from '../components/StepHeader';
import { Button } from '../components/Button';
import { BilingualText } from '../components/BilingualText';
import { SectionHint } from '../components/SectionHint';
import { useBooking } from '../context/BookingContext';
import { bookingSteps, centers, services } from '../data/booking';
import { bilingual, inlineBilingual } from '../utils/bilingual';
import { formatDateBilingual } from '../utils/date';
import { motion } from 'motion/react';

interface SummaryCardProps {
  title: React.ReactNode;
  children: React.ReactNode;
  onEdit: () => void;
}

function SummaryCard({ title, children, onEdit }: SummaryCardProps) {
  return (
    <div className="rounded-2xl border border-attt-border-light bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <h3 className="text-sm font-semibold text-attt-text-primary">{title}</h3>
        <button
          type="button"
          onClick={onEdit}
          className="text-attt-secondary hover:text-attt-primary transition-colors"
          aria-label="Edit"
        >
          <Edit2 size={16} />
        </button>
      </div>
      <div className="mt-2 text-sm text-attt-text-secondary">{children}</div>
    </div>
  );
}

export function Summary() {
  const navigate = useNavigate();
  const { bookingData, updateBookingData } = useBooking();

  useEffect(() => {
    if (!bookingData.serviceId) {
      navigate('/service');
      return;
    }
    if (!bookingData.centerId || !bookingData.date || !bookingData.time) {
      navigate('/datetime');
      return;
    }
    if (!bookingData.fullName || !bookingData.cin || !bookingData.phone || !bookingData.vehicleInfo) {
      navigate('/info');
    }
  }, [bookingData, navigate]);

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

  const handleConfirm = () => {
    const bookingNumber = `ATTT${Math.floor(10000 + Math.random() * 90000)}`;
    updateBookingData({ bookingNumber });
    navigate('/confirmation');
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="min-h-full"
    >
      <div className="px-6 py-8 space-y-6">
        <StepHeader
          step={5}
          title={bookingSteps[4].title}
          subtitle={bilingual('Vérifiez les informations avant validation', 'Review details before confirming')}
          onBack={() => navigate('/info')}
          backLabel={bilingual('Retour aux informations', 'Back to details')}
        />

        <SectionHint text="Vous pourrez modifier les choix en revenant à une étape." />

        <div className="space-y-4">
          <SummaryCard
            title={<BilingualText text={bilingual('Service', 'Service')} variant="inline" />}
            onEdit={() => navigate('/service')}
          >
            {service ? inlineBilingual(service.title) : '-'}
          </SummaryCard>

          <SummaryCard
            title={<BilingualText text={bilingual('Centre', 'Center')} variant="inline" />}
            onEdit={() => navigate('/center')}
          >
            <div className="space-y-1">
              <p>{center ? inlineBilingual(center.name) : '-'}</p>
              {center && <p className="text-xs">{center.address}</p>}
            </div>
          </SummaryCard>

          <SummaryCard
            title={<BilingualText text={bilingual('Date et heure', 'Date & time')} variant="inline" />}
            onEdit={() => navigate('/datetime')}
          >
            <div className="space-y-1">
              {formattedDate && (
                <p>
                  <BilingualText text={formattedDate} variant="inline" />
                </p>
              )}
              <p>{bookingData.time}</p>
            </div>
          </SummaryCard>

          <SummaryCard
            title={<BilingualText text={bilingual('Vos informations', 'Your details')} variant="inline" />}
            onEdit={() => navigate('/info')}
          >
            <div className="space-y-1">
              <p className="flex flex-wrap gap-1">
                <span className="font-semibold text-attt-text-primary">
                  <BilingualText text={bilingual('Nom', 'Name')} variant="inline" />:
                </span>
                <span>{bookingData.fullName}</span>
              </p>
              <p className="flex flex-wrap gap-1">
                <span className="font-semibold text-attt-text-primary">
                  <BilingualText text={bilingual('CIN', 'National ID')} variant="inline" />:
                </span>
                <span>{bookingData.cin}</span>
              </p>
              <p className="flex flex-wrap gap-1">
                <span className="font-semibold text-attt-text-primary">
                  <BilingualText text={bilingual('T\u00e9l\u00e9phone', 'Phone')} variant="inline" />:
                </span>
                <span>{bookingData.phone}</span>
              </p>
              <p className="flex flex-wrap gap-1">
                <span className="font-semibold text-attt-text-primary">
                  <BilingualText text={bilingual('V\u00e9hicule', 'Vehicle')} variant="inline" />:
                </span>
                <span>{bookingData.vehicleInfo}</span>
              </p>
            </div>
          </SummaryCard>
        </div>

        <div className="flex gap-3">
          <Button onClick={handleConfirm}>
            <Check size={16} />
            <BilingualText text={bilingual('Confirmer', 'Confirm')} variant="inline" />
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate('/info')}
            fullWidth={false}
            className="px-4"
          >
            <BilingualText text={bilingual('Retour', 'Back')} variant="inline" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
