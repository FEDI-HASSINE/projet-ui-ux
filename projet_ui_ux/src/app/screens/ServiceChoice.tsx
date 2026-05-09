import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { StepHeader } from '../components/StepHeader';
import { Button } from '../components/Button';
import { SelectableCard } from '../components/SelectableCard';
import { SectionHint } from '../components/SectionHint';
import { BilingualText } from '../components/BilingualText';
import { useBooking } from '../context/BookingContext';
import { services, bookingSteps } from '../data/booking';
import { bilingual } from '../utils/bilingual';
import { motion } from 'motion/react';

export function ServiceChoice() {
  const navigate = useNavigate();
  const { bookingData, updateBookingData } = useBooking();
  const [selectedService, setSelectedService] = useState(bookingData.serviceId);

  const handleNext = () => {
    if (selectedService) {
      const shouldReset = selectedService !== bookingData.serviceId;
      updateBookingData({
        serviceId: selectedService,
        centerId: shouldReset ? '' : bookingData.centerId,
        date: shouldReset ? '' : bookingData.date,
        time: shouldReset ? '' : bookingData.time,
      });
      navigate('/center');
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
          step={1}
          title={bookingSteps[0].title}
          subtitle={bilingual('S\u00e9lectionnez le type de visite', 'Choose the service type')}
          onBack={() => navigate('/')}
          backLabel={bilingual("Retour \u00e0 l'accueil", 'Back to home')}
        />

        <SectionHint text="Les prix sont fixes et les durées indiquées sont indicatives." />

        <div className="space-y-4">
          {services.map((service) => (
            <SelectableCard
              key={service.id}
              title={<BilingualText text={service.title} />}
              description={
                <div className="space-y-1">
                  <BilingualText text={service.description} />
                  <p className="text-[11px] text-attt-text-secondary">
                    <BilingualText text={bilingual('Durée', 'Duration')} variant="inline" />
                    : {service.duration}
                  </p>
                </div>
              }
              selected={selectedService === service.id}
              onClick={() => setSelectedService(service.id)}
            />
          ))}
        </div>

        <div className="flex gap-3">
          <Button onClick={handleNext} disabled={!selectedService}>
            <BilingualText text={bilingual('Suivant', 'Next')} variant="inline" />
            <ArrowRight size={16} />
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate('/')}
            fullWidth={false}
            className="px-4"
          >
            <BilingualText text={bilingual('Annuler', 'Cancel')} variant="inline" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
