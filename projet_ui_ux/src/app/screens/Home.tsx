import { useNavigate } from 'react-router';
import { Calendar, MapPin, ShieldCheck, Sparkles } from 'lucide-react';
import { Button } from '../components/Button';
import { BilingualText } from '../components/BilingualText';
import { useBooking } from '../context/BookingContext';
import atttLogo from '../../assets/attt-logo.png';
import { bilingual } from '../utils/bilingual';
import { motion } from 'motion/react';

const highlights = [
  {
    icon: Calendar,
    title: bilingual('Créneaux en temps réel', 'Real-time slots'),
    description: bilingual('Choisissez la date qui vous convient', 'Pick the time that fits your day'),
  },
  {
    icon: MapPin,
    title: bilingual('Centres certifiés', 'Certified centers'),
    description: bilingual('Localisez le centre le plus proche', 'Find the nearest inspection center'),
  },
  {
    icon: ShieldCheck,
    title: bilingual('Processus sécurisé', 'Secure process'),
    description: bilingual('Vos données restent confidentielles', 'Your data stays protected'),
  },
];

export function Home() {
  const navigate = useNavigate();
  const { bookingData } = useBooking();
  const hasProgress =
    !!bookingData.serviceId ||
    !!bookingData.centerId ||
    !!bookingData.date ||
    !!bookingData.fullName;
  const primaryCta = hasProgress
    ? bilingual('Reprendre la réservation', 'Resume booking')
    : bilingual('Commencer la réservation', 'Start booking');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-full"
    >
      <div className="px-6 py-8 space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-white border border-attt-border-light flex items-center justify-center shadow-sm">
              <img src={atttLogo} alt="ATTT" className="h-9 w-9 object-contain" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-attt-text-secondary">
                ATTT
              </p>
              <p className="text-sm font-semibold text-attt-text-primary">Booking Studio</p>
            </div>
          </div>
          <span className="rounded-full bg-attt-selected-bg px-3 py-1 text-[10px] font-semibold text-attt-primary">
            SaaS Demo
          </span>
        </div>

        <div className="rounded-3xl border border-attt-border-light bg-white p-6 shadow-sm space-y-4">
          <h1 className="text-2xl font-semibold text-attt-text-primary">
            <BilingualText text={bilingual('Réservez votre visite technique', 'Book your vehicle inspection')} />
          </h1>
          <p className="text-sm text-attt-text-secondary">
            <BilingualText
              text={bilingual(
                'Planifiez en quelques minutes, recevez une confirmation immédiate et préparez votre dossier.',
                'Schedule in minutes, get instant confirmation, and prepare your documents.'
              )}
            />
          </p>
          <Button onClick={() => navigate('/service')}>
            <Calendar size={18} />
            <BilingualText text={primaryCta} variant="inline" />
          </Button>
          <div className="flex items-center gap-2 text-xs text-attt-text-secondary">
            <Sparkles size={14} />
            <BilingualText text={bilingual('Processus complet en moins de 3 minutes', 'Full flow in under 3 minutes')} variant="inline" />
          </div>
        </div>

        <div className="grid gap-4">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title.en} className="rounded-2xl border border-attt-border-light bg-white/80 p-4">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-attt-surface text-attt-primary">
                    <Icon size={18} />
                  </span>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-attt-text-primary">
                      <BilingualText text={item.title} />
                    </p>
                    <p className="text-xs text-attt-text-secondary">
                      <BilingualText text={item.description} />
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="rounded-2xl border border-attt-border-light bg-attt-surface p-4 text-xs text-attt-text-secondary">
          <BilingualText
            text={bilingual(
              'Besoin de modifier un rendez-vous existant ? Vous pourrez le faire depuis le récapitulatif.',
              'Need to edit an existing booking? You can update it from the summary step.'
            )}
          />
        </div>
      </div>
    </motion.div>
  );
}
