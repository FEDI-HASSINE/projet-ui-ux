import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowRight, MapPin, Search } from 'lucide-react';
import { StepHeader } from '../components/StepHeader';
import { Button } from '../components/Button';
import { SelectableCard } from '../components/SelectableCard';
import { BilingualText } from '../components/BilingualText';
import { SectionHint } from '../components/SectionHint';
import { useBooking } from '../context/BookingContext';
import { centers, bookingSteps, services } from '../data/booking';
import { bilingual, inlineBilingual } from '../utils/bilingual';
import { motion } from 'motion/react';

export function CenterChoice() {
  const navigate = useNavigate();
  const { bookingData, updateBookingData } = useBooking();
  const [selectedCenter, setSelectedCenter] = useState(bookingData.centerId);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!bookingData.serviceId) {
      navigate('/service');
    }
  }, [bookingData.serviceId, navigate]);

  const selectedService = useMemo(
    () => services.find((service) => service.id === bookingData.serviceId),
    [bookingData.serviceId]
  );

  const filteredCenters = useMemo(() => {
    const lower = query.trim().toLowerCase();
    if (!lower) {
      return centers;
    }
    return centers.filter((center) => {
      const haystack = `${center.name.fr} ${center.name.en} ${center.address}`.toLowerCase();
      return haystack.includes(lower);
    });
  }, [query]);

  const handleNext = () => {
    if (selectedCenter) {
      const shouldReset = selectedCenter !== bookingData.centerId;
      updateBookingData({
        centerId: selectedCenter,
        date: shouldReset ? '' : bookingData.date,
        time: shouldReset ? '' : bookingData.time,
      });
      navigate('/datetime');
    }
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
          step={2}
          title={bookingSteps[1].title}
          subtitle={bilingual('Sélectionnez le centre idéal', 'Pick your preferred center')}
          onBack={() => navigate('/service')}
          backLabel={bilingual('Retour au service', 'Back to service')}
          rightSlot={
            selectedService ? (
              <span className="rounded-full bg-attt-selected-bg px-3 py-1 text-[10px] font-semibold text-attt-primary">
                {inlineBilingual(selectedService.title)}
              </span>
            ) : null
          }
        />

        <SectionHint text="Les disponibilités sont mises à jour chaque matin." />

        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-attt-text-secondary" />
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Rechercher un centre / Search a center"
            className="w-full rounded-2xl border border-attt-border-light bg-white px-9 py-3 text-sm text-attt-text-primary focus:border-attt-primary focus:outline-none"
          />
        </div>

        <div className="space-y-4">
          {filteredCenters.map((center) => (
            <SelectableCard
              key={center.id}
              title={<BilingualText text={center.name} />}
              description={
                <div className="flex items-start gap-2">
                  <MapPin size={14} className="mt-0.5 text-attt-text-secondary" />
                  <span>{center.address}</span>
                </div>
              }
              selected={selectedCenter === center.id}
              onClick={() => setSelectedCenter(center.id)}
              badge={{
                text: inlineBilingual(center.availabilityLabel),
                color: center.availability,
              }}
            />
          ))}
        </div>

        <div className="flex gap-3">
          <Button onClick={handleNext} disabled={!selectedCenter}>
            <BilingualText text={bilingual('Suivant', 'Next')} variant="inline" />
            <ArrowRight size={16} />
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate('/service')}
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
