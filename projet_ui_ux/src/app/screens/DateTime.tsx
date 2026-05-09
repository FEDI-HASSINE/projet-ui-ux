import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowRight, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { StepHeader } from '../components/StepHeader';
import { Button } from '../components/Button';
import { SectionHint } from '../components/SectionHint';
import { BilingualText } from '../components/BilingualText';
import { useBooking } from '../context/BookingContext';
import { bookingSteps, centers, timeSlots, unavailableSlots } from '../data/booking';
import { bilingual, inlineBilingual } from '../utils/bilingual';
import { formatDateBilingual, formatMonthYear } from '../utils/date';
import { motion } from 'motion/react';

const weekDays = ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'];

const normalizeDate = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

export function DateTime() {
  const navigate = useNavigate();
  const { bookingData, updateBookingData } = useBooking();
  const selectedCenter = useMemo(
    () => centers.find((center) => center.id === bookingData.centerId),
    [bookingData.centerId]
  );

  const initialDate = bookingData.date ? new Date(`${bookingData.date}T00:00:00`) : null;
  const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate);
  const [selectedTime, setSelectedTime] = useState(bookingData.time);

  const today = normalizeDate(new Date());
  const [currentMonth, setCurrentMonth] = useState(
    () => new Date((initialDate ?? today).getFullYear(), (initialDate ?? today).getMonth(), 1)
  );

  useEffect(() => {
    if (!bookingData.serviceId) {
      navigate('/service');
      return;
    }
    if (!bookingData.centerId) {
      navigate('/center');
    }
  }, [bookingData.centerId, bookingData.serviceId, navigate]);

  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startOffset = (firstDay.getDay() + 6) % 7;
    const daysInMonth = lastDay.getDate();

    return {
      startOffset,
      daysInMonth,
    };
  }, [currentMonth]);

  const handleNext = () => {
    if (selectedDate && selectedTime) {
      const isoDate = selectedDate.toISOString().split('T')[0];
      updateBookingData({ date: isoDate, time: selectedTime });
      navigate('/info');
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
          step={3}
          title={bookingSteps[2].title}
          subtitle={bilingual('Choisissez un créneau disponible', 'Pick an available time slot')}
          onBack={() => navigate('/center')}
          backLabel={bilingual('Retour au centre', 'Back to center')}
          rightSlot={
            selectedCenter ? (
              <span className="rounded-full bg-attt-selected-bg px-3 py-1 text-[10px] font-semibold text-attt-primary">
                {inlineBilingual(selectedCenter.name)}
              </span>
            ) : null
          }
        />

        <SectionHint text="Les disponibilités sont limitées pour les heures de pointe." />

        <div className="space-y-6">
          <div className="rounded-3xl border border-attt-border-light bg-white p-4">
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
                className="rounded-full p-2 hover:bg-attt-surface"
              >
                <ChevronLeft size={18} />
              </button>
              <div className="text-sm font-semibold text-attt-text-primary capitalize">
                {formatMonthYear(currentMonth, 'fr-FR')} / {formatMonthYear(currentMonth, 'en-GB')}
              </div>
              <button
                type="button"
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
                className="rounded-full p-2 hover:bg-attt-surface"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-[11px] text-attt-text-secondary">
              {weekDays.map((day) => (
                <div key={day} className="py-1 font-semibold">
                  {day}
                </div>
              ))}
              {Array.from({ length: calendarDays.startOffset }).map((_, index) => (
                <div key={`empty-${index}`} />
              ))}
              {Array.from({ length: calendarDays.daysInMonth }, (_, index) => {
                const day = index + 1;
                const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                const normalized = normalizeDate(date);
                const isPast = normalized < today;
                const isSelected =
                  selectedDate && normalizeDate(selectedDate).getTime() === normalized.getTime();

                return (
                  <button
                    type="button"
                    key={day}
                    onClick={() => !isPast && setSelectedDate(date)}
                    disabled={isPast}
                    className={`rounded-full py-2 text-sm font-semibold transition-all ${
                      isSelected
                        ? 'bg-attt-primary text-white'
                        : isPast
                        ? 'text-attt-text-secondary/40 cursor-not-allowed'
                        : 'text-attt-text-primary hover:bg-attt-surface'
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            {selectedDate && (
              <div className="mt-4 text-center text-xs text-attt-secondary">
                <BilingualText text={formatDateBilingual(selectedDate)} variant="inline" />
              </div>
            )}
          </div>

          <div className="rounded-3xl border border-attt-border-light bg-white p-4 space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-attt-text-primary">
              <Clock size={16} />
              <BilingualText text={bilingual('Heures disponibles', 'Available hours')} variant="inline" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((time) => {
                const isUnavailable = unavailableSlots.includes(time);
                const isSelected = selectedTime === time;
                return (
                  <button
                    type="button"
                    key={time}
                    onClick={() => !isUnavailable && setSelectedTime(time)}
                    disabled={isUnavailable}
                    className={`rounded-xl border px-3 py-2 text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-attt-primary text-white border-attt-primary'
                        : isUnavailable
                        ? 'bg-attt-surface text-attt-text-secondary/60 border-attt-border-light line-through'
                        : 'bg-white text-attt-text-primary border-attt-border-light hover:border-attt-secondary'
                    }`}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button onClick={handleNext} disabled={!selectedDate || !selectedTime}>
            <BilingualText text={bilingual('Suivant', 'Next')} variant="inline" />
            <ArrowRight size={16} />
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate('/center')}
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
