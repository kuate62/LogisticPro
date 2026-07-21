import { z } from 'zod';

export const trackingSearchSchema = z.object({
  trackingNumber: z.string().min(1, 'Le numéro de suivi est requis'),
});

export const trackingUpdateStatusSchema = z.object({
  status: z.string().min(1, 'Le statut est requis'),
  location: z.string().optional(),
  description: z.string().min(1, 'La description est requise'),
  agentName: z.string().optional(),
  estimatedArrival: z.string().optional(),
});

export const trackingFilterSchema = z.object({
  status: z.string().optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  origin: z.string().optional(),
  destination: z.string().optional(),
});

export const trackingShipmentInfoSchema = z.object({
  shipmentNumber: z.string().min(1, 'Le numéro d\'expédition est requis'),
});
