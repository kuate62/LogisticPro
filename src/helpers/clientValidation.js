import { z } from 'zod';

const phoneRegex = /^\+?[0-9\s-]{8,20}$/;

export const clientCreateSchema = z.object({
  firstName: z.string().min(1, 'Le prénom est requis').max(50),
  lastName: z.string().min(1, 'Le nom est requis').max(50),
  gender: z.enum(['male', 'female'], { errorMap: () => ({ message: 'Le sexe est requis' }) }),
  dateOfBirth: z.string().min(1, 'La date de naissance est requise'),
  nationality: z.string().min(1, 'La nationalité est requise').default('Camerounaise'),
  profession: z.string().max(100).optional().or(z.literal('')),
  documentType: z.string().min(1, 'Le type de document est requis'),
  documentNumber: z.string().min(1, 'Le numéro de document est requis').max(30),
  documentIssueDate: z.string().min(1, 'La date de délivrance est requise'),
  documentExpiryDate: z.string().optional().or(z.literal('')),
  phone: z.string().regex(phoneRegex, 'Téléphone invalide'),
  phoneSecondary: z.string().regex(phoneRegex, 'Téléphone invalide').optional().or(z.literal('')),
  email: z.string().email('Email invalide').optional().or(z.literal('')),
  address: z.string().max(255).optional().or(z.literal('')),
  neighborhood: z.string().max(100).optional().or(z.literal('')),
  city: z.string().min(1, 'La ville est requise'),
  region: z.string().min(1, 'La région est requise'),
  country: z.string().default('Cameroun'),
  agencyId: z.string().min(1, 'L\'agence d\'inscription est requise'),
  observation: z.string().max(500).optional().or(z.literal('')),
  tags: z.array(z.string()).optional(),
});

export const clientUpdateSchema = clientCreateSchema.partial();

export function clientToFormValues(client) {
  if (!client) return {};
  return {
    firstName: client.firstName || '', lastName: client.lastName || '',
    gender: client.gender || '', dateOfBirth: client.dateOfBirth || '',
    nationality: client.nationality || 'Camerounaise', profession: client.profession || '',
    documentType: client.documentType || '', documentNumber: client.documentNumber || '',
    documentIssueDate: client.documentIssueDate || '', documentExpiryDate: client.documentExpiryDate || '',
    phone: client.phone || '', phoneSecondary: client.phoneSecondary || '',
    email: client.email || '', address: client.address || '',
    neighborhood: client.neighborhood || '', city: client.city || '',
    region: client.region || '', country: client.country || 'Cameroun',
    agencyId: client.agencyId || '', observation: client.observation || '',
    tags: client.tags || [],
  };
}
