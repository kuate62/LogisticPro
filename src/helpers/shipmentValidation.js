import { z } from 'zod';

const packageSchema = z.object({
  label: z.string().min(1, 'Le libellé est requis').max(100),
  category: z.string().min(1, 'La catégorie est requise'),
  description: z.string().max(255).optional().or(z.literal('')),
  weight: z.number().min(0.1, 'Le poids doit être supérieur à 0'),
  length: z.number().min(1, 'Longueur requise'),
  width: z.number().min(1, 'Largeur requise'),
  height: z.number().min(1, 'Hauteur requise'),
  declaredValue: z.number().min(0, 'Valeur invalide'),
  fragile: z.boolean().default(false),
  insured: z.boolean().default(false),
});

export const shipmentStep1Schema = z.object({
  senderId: z.string().min(1, 'L\'expéditeur est requis'),
  senderName: z.string().min(1),
  senderPhone: z.string().min(1),
});

export const shipmentStep2Schema = z.object({
  receiverId: z.string().min(1, 'Le destinataire est requis'),
  receiverName: z.string().min(1),
  receiverPhone: z.string().min(1),
});

export const shipmentStep3Schema = z.object({
  originAgencyId: z.string().min(1, 'L\'agence de départ est requise'),
  originAgencyName: z.string().optional(),
  originCity: z.string().min(1, 'La ville de départ est requise'),
  destinationAgencyId: z.string().min(1, 'L\'agence de destination est requise'),
  destinationAgencyName: z.string().optional(),
  destinationCity: z.string().min(1, 'La ville de destination est requise'),
  routeId: z.string().optional().or(z.literal('')),
  routeName: z.string().optional(),
  maxWeight: z.number().min(1).default(100),
});

export const shipmentFullSchema = z.object({
  senderId: z.string().min(1, 'L\'expéditeur est requis'),
  senderName: z.string().min(1),
  senderPhone: z.string().min(1),
  receiverId: z.string().min(1, 'Le destinataire est requis'),
  receiverName: z.string().min(1),
  receiverPhone: z.string().min(1),
  originAgencyId: z.string().min(1, 'L\'agence de départ est requise'),
  originAgencyName: z.string().optional(),
  originCity: z.string().min(1, 'La ville de départ est requise'),
  destinationAgencyId: z.string().min(1, 'L\'agence de destination est requise'),
  destinationAgencyName: z.string().optional(),
  destinationCity: z.string().min(1, 'La ville de destination est requise'),
  routeId: z.string().optional().or(z.literal('')),
  routeName: z.string().optional(),
  maxWeight: z.number().min(1).default(100),
  packages: z.array(packageSchema).min(1, 'Ajoutez au moins un colis'),
  observation: z.string().max(500).optional().or(z.literal('')),
});

export { packageSchema };

export function shipmentToFormValues(shipment) {
  if (!shipment) return {};
  return {
    senderId: shipment.senderId || '', senderName: shipment.senderName || '', senderPhone: shipment.senderPhone || '',
    receiverId: shipment.receiverId || '', receiverName: shipment.receiverName || '', receiverPhone: shipment.receiverPhone || '',
    originAgencyId: shipment.originAgencyId || '', originAgencyName: shipment.originAgencyName || '', originCity: shipment.originCity || '',
    destinationAgencyId: shipment.destinationAgencyId || '', destinationAgencyName: shipment.destinationAgencyName || '', destinationCity: shipment.destinationCity || '',
    routeId: shipment.routeId || '', routeName: shipment.routeName || '', maxWeight: shipment.maxWeight || 100,
    packages: shipment.packages || [], observation: shipment.observation || '',
  };
}
