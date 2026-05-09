import { bilingual } from '../utils/bilingual';

export const bookingSteps = [
  { id: 'service', title: bilingual('Choix du service', 'Service selection') },
  { id: 'center', title: bilingual('Choix du centre', 'Center selection') },
  { id: 'datetime', title: bilingual('Date et heure', 'Date and time') },
  { id: 'info', title: bilingual('Vos informations', 'Your details') },
  { id: 'summary', title: bilingual('Récapitulatif', 'Summary') },
  { id: 'confirmation', title: bilingual('Confirmation', 'Confirmation') },
];

export const services = [
  {
    id: 'periodic',
    title: bilingual('Visite périodique', 'Periodic inspection'),
    description: bilingual(
      'Contrôle technique obligatoire annuel',
      'Mandatory annual technical check'
    ),
    duration: '30 min',
  },
  {
    id: 'recheck',
    title: bilingual('Contre-visite', 'Re-inspection'),
    description: bilingual(
      'Suite à un contrôle avec défaillances',
      'Follow-up after defects'
    ),
    duration: '20 min',
  },
  {
    id: 'transfer',
    title: bilingual('Mutation vehicule', 'Vehicle transfer'),
    description: bilingual(
      'Lors d\'un changement de propriétaire',
      'Ownership transfer check'
    ),
    duration: '40 min',
  },
];

export const centers = [
  {
    id: 'tunis-lac',
    name: bilingual('Centre Tunis Lac', 'Tunis Lake Center'),
    address: 'Route de la Marsa, Les Berges du Lac, Tunis 1053',
    availability: 'high' as const,
    availabilityLabel: bilingual('Disponibilités élevées', 'High availability'),
  },
  {
    id: 'ariana',
    name: bilingual('Centre Ariana', 'Ariana Center'),
    address: 'Avenue Habib Bourguiba, Ariana Ville, Ariana 2080',
    availability: 'medium' as const,
    availabilityLabel: bilingual('Disponibilités moyennes', 'Medium availability'),
  },
  {
    id: 'ben-arous',
    name: bilingual('Centre Ben Arous', 'Ben Arous Center'),
    address: 'Route de Tunis, Ben Arous 2013',
    availability: 'low' as const,
    availabilityLabel: bilingual('Disponibilités limitées', 'Limited availability'),
  },
  {
    id: 'sousse',
    name: bilingual('Centre Sousse', 'Sousse Center'),
    address: 'Boulevard du 14 Janvier, Sousse 4000',
    availability: 'high' as const,
    availabilityLabel: bilingual('Disponibilités élevées', 'High availability'),
  },
];

export const timeSlots = [
  '08:00',
  '08:30',
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
];

export const unavailableSlots = ['08:30', '10:30', '14:00', '16:30'];
