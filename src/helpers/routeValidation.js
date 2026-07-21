import { z } from 'zod';

export const routeFormSchema = z.object({
  name: z.string().min(3, 'Le nom doit contenir au moins 3 caractères').max(100),
  description: z.string().max(500).optional().or(z.literal('')),
  originAgencyId: z.string().min(1, 'Agence de départ requise'),
  originCity: z.string().min(1, 'Ville de départ requise'),
  destinationAgencyId: z.string().min(1, 'Agence d\'arrivée requise'),
  destinationCity: z.string().min(1, 'Ville d\'arrivée requise'),
  distance: z.coerce.number().min(0, 'Distance invalide').optional(),
  departureDate: z.string().min(1, 'Date de départ requise'),
  departureTime: z.string().min(1, 'Heure de départ requise'),
  arrivalDate: z.string().min(1, 'Date d\'arrivée requise'),
  arrivalTime: z.string().min(1, 'Heure d\'arrivée requise'),
  maxWeight: z.coerce.number().min(1, 'Poids maximal requis'),
  maxPackages: z.coerce.number().min(1, 'Nombre maximal de colis requis'),
  observation: z.string().max(1000).optional().or(z.literal('')),
}).refine((data) => {
  if (data.originAgencyId && data.destinationAgencyId && data.originAgencyId === data.destinationAgencyId) {
    return false;
  }
  return true;
}, { message: 'L\'agence de départ et d\'arrivée doivent être différentes', path: ['destinationAgencyId'] })
.refine((data) => {
  if (data.departureDate && data.arrivalDate && data.arrivalDate < data.departureDate) {
    return false;
  }
  return true;
}, { message: 'La date d\'arrivée doit être après la date de départ', path: ['arrivalDate'] });

export const routeStatusSchema = z.object({
  status: z.string().min(1, 'Statut requis'),
});

export function routeToFormValues(route) {
  return {
    name: route.name || '',
    description: route.description || '',
    originAgencyId: route.originAgencyId || '',
    originCity: route.originCity || '',
    destinationAgencyId: route.destinationAgencyId || '',
    destinationCity: route.destinationCity || '',
    distance: route.distance || 0,
    departureDate: route.departureDate || '',
    departureTime: route.departureTime || '',
    arrivalDate: route.arrivalDate || '',
    arrivalTime: route.arrivalTime || '',
    maxWeight: route.maxWeight || 100,
    maxPackages: route.maxPackages || 50,
    observation: route.observation || '',
  };
}

export function routeFormValuesToPayload(values) {
  return {
    name: values.name,
    description: values.description,
    originAgencyId: values.originAgencyId,
    originCity: values.originCity,
    destinationAgencyId: values.destinationAgencyId,
    destinationCity: values.destinationCity,
    distance: values.distance,
    departureDate: values.departureDate,
    departureTime: values.departureTime,
    arrivalDate: values.arrivalDate,
    arrivalTime: values.arrivalTime,
    maxWeight: values.maxWeight,
    maxPackages: values.maxPackages,
    observation: values.observation,
  };
}
