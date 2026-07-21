import { z } from 'zod';

export const agencyCreateSchema = z.object({
  name: z
    .string()
    .min(1, 'Le nom de l\'agence est requis')
    .max(100, 'Le nom ne peut dépasser 100 caractères'),
  code: z
    .string()
    .min(1, 'Le code agence est requis')
    .max(20, 'Le code ne peut dépasser 20 caractères')
    .regex(/^[A-Z0-9-]+$/i, 'Le code ne peut contenir que des lettres, chiffres et tirets'),
  phone: z
    .string()
    .min(1, 'Le téléphone est requis')
    .regex(/^\+?[0-9\s-]{8,20}$/, 'Numéro de téléphone invalide'),
  email: z
    .string()
    .min(1, 'L\'email est requis')
    .email('Adresse email invalide'),
  address: z
    .string()
    .min(1, 'L\'adresse est requise')
    .max(255, 'L\'adresse ne peut dépasser 255 caractères'),
  city: z
    .string()
    .min(1, 'La ville est requise'),
  region: z
    .string()
    .min(1, 'La région est requise'),
  country: z
    .string()
    .min(1, 'Le pays est requis')
    .default('Cameroun'),
  description: z
    .string()
    .max(500, 'La description ne peut dépasser 500 caractères')
    .optional()
    .or(z.literal('')),
  isPrimary: z.boolean().default(false),
  managerName: z
    .string()
    .min(1, 'Le nom du responsable est requis'),
  managerEmail: z
    .string()
    .min(1, 'L\'email du responsable est requis')
    .email('Adresse email invalide'),
  managerPhone: z
    .string()
    .min(1, 'Le téléphone du responsable est requis')
    .regex(/^\+?[0-9\s-]{8,20}$/, 'Numéro de téléphone invalide'),
  latitude: z
    .number()
    .min(-90, 'Latitude invalide')
    .max(90, 'Latitude invalide')
    .optional()
    .or(z.nan())
    .transform((v) => (Number.isNaN(v) ? undefined : v)),
  longitude: z
    .number()
    .min(-180, 'Longitude invalide')
    .max(180, 'Longitude invalide')
    .optional()
    .or(z.nan())
    .transform((v) => (Number.isNaN(v) ? undefined : v)),
  scheduleMondayOpen: z.string().optional().or(z.literal('')),
  scheduleMondayClose: z.string().optional().or(z.literal('')),
  scheduleMondayClosed: z.boolean().default(false),
  scheduleTuesdayOpen: z.string().optional().or(z.literal('')),
  scheduleTuesdayClose: z.string().optional().or(z.literal('')),
  scheduleTuesdayClosed: z.boolean().default(false),
  scheduleWednesdayOpen: z.string().optional().or(z.literal('')),
  scheduleWednesdayClose: z.string().optional().or(z.literal('')),
  scheduleWednesdayClosed: z.boolean().default(false),
  scheduleThursdayOpen: z.string().optional().or(z.literal('')),
  scheduleThursdayClose: z.string().optional().or(z.literal('')),
  scheduleThursdayClosed: z.boolean().default(false),
  scheduleFridayOpen: z.string().optional().or(z.literal('')),
  scheduleFridayClose: z.string().optional().or(z.literal('')),
  scheduleFridayClosed: z.boolean().default(false),
  scheduleSaturdayOpen: z.string().optional().or(z.literal('')),
  scheduleSaturdayClose: z.string().optional().or(z.literal('')),
  scheduleSaturdayClosed: z.boolean().default(false),
  scheduleSundayOpen: z.string().optional().or(z.literal('')),
  scheduleSundayClose: z.string().optional().or(z.literal('')),
  scheduleSundayClosed: z.boolean().default(true),
  logo: z.any().optional(),
});

export const agencyUpdateSchema = agencyCreateSchema.partial();

export const agencySearchSchema = z.object({
  search: z.string().max(100).optional().or(z.literal('')),
});

export const agencyFilterSchema = z.object({
  status: z.string().optional().or(z.literal('')),
  city: z.string().optional().or(z.literal('')),
  region: z.string().optional().or(z.literal('')),
  isPrimary: z.boolean().nullable().optional(),
  manager: z.string().optional().or(z.literal('')),
});

export function agencyToFormValues(agency) {
  if (!agency) return {};
  return {
    name: agency.name || '',
    code: agency.code || '',
    phone: agency.phone || '',
    email: agency.email || '',
    address: agency.address || '',
    city: agency.city || '',
    region: agency.region || '',
    country: agency.country || 'Cameroun',
    description: agency.description || '',
    isPrimary: agency.isPrimary || false,
    managerName: agency.manager?.name || '',
    managerEmail: agency.manager?.email || '',
    managerPhone: agency.manager?.phone || '',
    latitude: agency.latitude || '',
    longitude: agency.longitude || '',
    scheduleMondayOpen: agency.schedule?.monday?.open || '',
    scheduleMondayClose: agency.schedule?.monday?.close || '',
    scheduleMondayClosed: agency.schedule?.monday?.closed ?? false,
    scheduleTuesdayOpen: agency.schedule?.tuesday?.open || '',
    scheduleTuesdayClose: agency.schedule?.tuesday?.close || '',
    scheduleTuesdayClosed: agency.schedule?.tuesday?.closed ?? false,
    scheduleWednesdayOpen: agency.schedule?.wednesday?.open || '',
    scheduleWednesdayClose: agency.schedule?.wednesday?.close || '',
    scheduleWednesdayClosed: agency.schedule?.wednesday?.closed ?? false,
    scheduleThursdayOpen: agency.schedule?.thursday?.open || '',
    scheduleThursdayClose: agency.schedule?.thursday?.close || '',
    scheduleThursdayClosed: agency.schedule?.thursday?.closed ?? false,
    scheduleFridayOpen: agency.schedule?.friday?.open || '',
    scheduleFridayClose: agency.schedule?.friday?.close || '',
    scheduleFridayClosed: agency.schedule?.friday?.closed ?? false,
    scheduleSaturdayOpen: agency.schedule?.saturday?.open || '',
    scheduleSaturdayClose: agency.schedule?.saturday?.close || '',
    scheduleSaturdayClosed: agency.schedule?.saturday?.closed ?? false,
    scheduleSundayOpen: agency.schedule?.sunday?.open || '',
    scheduleSundayClose: agency.schedule?.sunday?.close || '',
    scheduleSundayClosed: agency.schedule?.sunday?.closed ?? true,
    logo: null,
  };
}

export function formValuesToAgencyPayload(values) {
  const buildDay = (open, close, closed) => ({
    open: closed ? null : open || null,
    close: closed ? null : close || null,
    closed: !!closed,
  });

  return {
    name: values.name,
    code: values.code?.toUpperCase(),
    phone: values.phone,
    email: values.email,
    address: values.address,
    city: values.city,
    region: values.region,
    country: values.country || 'Cameroun',
    description: values.description || '',
    isPrimary: !!values.isPrimary,
    manager: {
      name: values.managerName,
      email: values.managerEmail,
      phone: values.managerPhone,
    },
    latitude: values.latitude ? Number(values.latitude) : undefined,
    longitude: values.longitude ? Number(values.longitude) : undefined,
    schedule: {
      monday: buildDay(values.scheduleMondayOpen, values.scheduleMondayClose, values.scheduleMondayClosed),
      tuesday: buildDay(values.scheduleTuesdayOpen, values.scheduleTuesdayClose, values.scheduleTuesdayClosed),
      wednesday: buildDay(values.scheduleWednesdayOpen, values.scheduleWednesdayClose, values.scheduleWednesdayClosed),
      thursday: buildDay(values.scheduleThursdayOpen, values.scheduleThursdayClose, values.scheduleThursdayClosed),
      friday: buildDay(values.scheduleFridayOpen, values.scheduleFridayClose, values.scheduleFridayClosed),
      saturday: buildDay(values.scheduleSaturdayOpen, values.scheduleSaturdayClose, values.scheduleSaturdayClosed),
      sunday: buildDay(values.scheduleSundayOpen, values.scheduleSundayClose, values.scheduleSundayClosed),
    },
  };
}
