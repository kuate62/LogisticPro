import { z } from 'zod';

export const pricingFormSchema = z.object({
  name: z.string().min(3, 'Le nom doit contenir au moins 3 caractères').max(100),
  originAgencyId: z.string().optional().or(z.literal('')),
  originCity: z.string().min(1, 'Ville de départ requise'),
  destinationAgencyId: z.string().optional().or(z.literal('')),
  destinationCity: z.string().min(1, 'Ville d\'arrivée requise'),
  category: z.string().min(1, 'Catégorie requise'),
  minWeight: z.coerce.number().min(0, 'Poids minimum invalide'),
  maxWeight: z.coerce.number().min(0.1, 'Poids maximum invalide'),
  unitPrice: z.coerce.number().min(0, 'Prix unitaire invalide'),
  fixedPrice: z.coerce.number().min(0, 'Prix fixe invalide').optional(),
  insuranceRate: z.coerce.number().min(0, 'Taux d\'assurance invalide').max(1, 'Le taux ne peut dépasser 100%'),
  additionalFees: z.coerce.number().min(0, 'Frais supplémentaires invalides').optional(),
  currency: z.string().min(1, 'Devise requise'),
  effectiveFrom: z.string().min(1, 'Date d\'entrée en vigueur requise'),
  effectiveTo: z.string().optional().or(z.literal('')),
  observation: z.string().max(1000).optional().or(z.literal('')),
}).refine((data) => data.maxWeight >= data.minWeight, {
  message: 'Le poids maximum doit être supérieur ou égal au poids minimum',
  path: ['maxWeight'],
}).refine((data) => {
  if (data.effectiveTo && data.effectiveFrom && data.effectiveTo < data.effectiveFrom) return false;
  return true;
}, { message: 'La date de fin doit être après la date de début', path: ['effectiveTo'] });

export function pricingToFormValues(pricing) {
  return {
    name: pricing.name || '',
    originAgencyId: pricing.originAgencyId || '',
    originCity: pricing.originCity || '',
    destinationAgencyId: pricing.destinationAgencyId || '',
    destinationCity: pricing.destinationCity || '',
    category: pricing.category || '',
    minWeight: pricing.minWeight || 0,
    maxWeight: pricing.maxWeight || 100,
    unitPrice: pricing.unitPrice || 0,
    fixedPrice: pricing.fixedPrice || 0,
    insuranceRate: pricing.insuranceRate || 0.05,
    additionalFees: pricing.additionalFees || 0,
    currency: pricing.currency || 'FC',
    effectiveFrom: pricing.effectiveFrom || '',
    effectiveTo: pricing.effectiveTo || '',
    observation: pricing.observation || '',
  };
}

export function pricingFormValuesToPayload(values) {
  return {
    name: values.name,
    originAgencyId: values.originAgencyId,
    originCity: values.originCity,
    destinationAgencyId: values.destinationAgencyId,
    destinationCity: values.destinationCity,
    category: values.category,
    minWeight: values.minWeight,
    maxWeight: values.maxWeight,
    unitPrice: values.unitPrice,
    fixedPrice: values.fixedPrice,
    insuranceRate: values.insuranceRate,
    additionalFees: values.additionalFees,
    currency: values.currency,
    effectiveFrom: values.effectiveFrom,
    effectiveTo: values.effectiveTo || null,
    observation: values.observation,
  };
}
