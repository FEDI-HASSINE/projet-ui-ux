import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { StepHeader } from '../components/StepHeader';
import { Button } from '../components/Button';
import { FormField } from '../components/FormField';
import { BilingualText } from '../components/BilingualText';
import { SectionHint } from '../components/SectionHint';
import { useBooking } from '../context/BookingContext';
import { bookingSteps } from '../data/booking';
import { bilingual } from '../utils/bilingual';
import { isRequired, isValidCIN, isValidPhone } from '../utils/validation';
import { motion } from 'motion/react';

interface FormErrors {
  fullName?: { fr: string; en: string };
  cin?: { fr: string; en: string };
  phone?: { fr: string; en: string };
  vehicleInfo?: { fr: string; en: string };
}

export function PersonalInfo() {
  const navigate = useNavigate();
  const { bookingData, updateBookingData } = useBooking();
  const [formData, setFormData] = useState({
    fullName: bookingData.fullName,
    cin: bookingData.cin,
    phone: bookingData.phone,
    vehicleInfo: bookingData.vehicleInfo,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (!bookingData.date || !bookingData.time) {
      navigate('/datetime');
    }
  }, [bookingData.date, bookingData.time, navigate]);

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = () => {
    const nextErrors: FormErrors = {};

    if (!isRequired(formData.fullName)) {
      nextErrors.fullName = bilingual('Nom complet requis', 'Full name required');
    }

    if (!isRequired(formData.cin)) {
      nextErrors.cin = bilingual('CIN requise', 'CIN is required');
    } else if (!isValidCIN(formData.cin)) {
      nextErrors.cin = bilingual('Format CIN invalide (8 chiffres)', 'Invalid CIN (8 digits)');
    }

    if (!isRequired(formData.phone)) {
      nextErrors.phone = bilingual('Téléphone requis', 'Phone number required');
    } else if (!isValidPhone(formData.phone)) {
      nextErrors.phone = bilingual('Format téléphone invalide', 'Invalid phone format');
    }

    if (!isRequired(formData.vehicleInfo)) {
      nextErrors.vehicleInfo = bilingual('Informations véhicule requises', 'Vehicle info required');
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

    updateBookingData({
      fullName: formData.fullName.trim(),
      cin: formData.cin.trim(),
      phone: formData.phone.trim(),
      vehicleInfo: formData.vehicleInfo.trim(),
    });
    navigate('/summary');
  };

  const inputClassName = (field: keyof FormErrors) =>
    `w-full rounded-xl border px-4 py-3 text-sm text-attt-text-primary transition-all focus:outline-none ${
      errors[field]
        ? 'border-attt-error bg-[#FDEAEA]'
        : 'border-attt-border-light focus:border-attt-primary'
    }`;

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
          step={4}
          title={bookingSteps[3].title}
          subtitle={bilingual('Renseignez vos coordonnées', 'Share your contact details')}
          onBack={() => navigate('/datetime')}
          backLabel={bilingual('Retour au créneau', 'Back to slot')}
        />

        <SectionHint text="Les informations sont utilisées uniquement pour votre rendez-vous." />

        <form onSubmit={handleSubmit} className="space-y-5">
          <FormField
            label={<BilingualText text={bilingual('Nom complet', 'Full name')} />}
            error={errors.fullName && <BilingualText text={errors.fullName} variant="inline" />}
          >
            <input
              type="text"
              value={formData.fullName}
              onChange={(event) => handleChange('fullName', event.target.value)}
              placeholder="Ahmed Ben Ali"
              className={inputClassName('fullName')}
            />
          </FormField>

          <FormField
            label={<BilingualText text={bilingual('CIN', 'National ID')} />}
            hint={<BilingualText text={bilingual('8 chiffres', '8 digits')} variant="inline" />}
            error={errors.cin && <BilingualText text={errors.cin} variant="inline" />}
          >
            <input
              type="text"
              value={formData.cin}
              onChange={(event) => handleChange('cin', event.target.value)}
              placeholder="12345678"
              maxLength={8}
              className={inputClassName('cin')}
            />
          </FormField>

          <FormField
            label={<BilingualText text={bilingual('Téléphone', 'Phone number')} />}
            hint={<BilingualText text={bilingual('Ex: +216 20 123 456', 'Eg: +216 20 123 456')} variant="inline" />}
            error={errors.phone && <BilingualText text={errors.phone} variant="inline" />}
          >
            <input
              type="tel"
              value={formData.phone}
              onChange={(event) => handleChange('phone', event.target.value)}
              placeholder="+216 20 123 456"
              className={inputClassName('phone')}
            />
          </FormField>

          <FormField
            label={<BilingualText text={bilingual('Informations véhicule', 'Vehicle info')} />}
            hint={
              <BilingualText
                text={bilingual('Mod\u00e8le, ann\u00e9e, immatriculation', 'Model, year, plate number')}
                variant="inline"
              />
            }
            error={errors.vehicleInfo && <BilingualText text={errors.vehicleInfo} variant="inline" />}
          >
            <input
              type="text"
              value={formData.vehicleInfo}
              onChange={(event) => handleChange('vehicleInfo', event.target.value)}
              placeholder="Peugeot 208 · 2019 · 123 TU 4567"
              className={inputClassName('vehicleInfo')}
            />
          </FormField>

          <div className="flex gap-3">
            <Button type="submit">
              <BilingualText text={bilingual('Continuer', 'Continue')} variant="inline" />
              <ArrowRight size={16} />
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate('/datetime')}
              fullWidth={false}
              className="px-4"
            >
              <BilingualText text={bilingual('Retour', 'Back')} variant="inline" />
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
