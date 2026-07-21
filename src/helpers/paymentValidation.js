import { z } from 'zod';

export const paymentFormSchema = z.object({
  shipmentId: z.string().min(1, 'L\'expédition est requise'),
  shipmentNumber: z.string().min(1, 'Le numéro d\'expédition est requis'),
  clientId: z.string().min(1, 'Le client est requis'),
  clientName: z.string().min(1, 'Le nom du client est requis'),
  clientPhone: z.string().min(1, 'Le téléphone du client est requis'),
  transportAmount: z.number().min(0, 'Le montant du transport doit être positif'),
  insuranceAmount: z.number().min(0, 'L\'assurance doit être positive'),
  additionalFees: z.number().min(0, 'Les frais supplémentaires doivent être positifs'),
  discount: z.number().min(0, 'La réduction doit être positive'),
  totalAmount: z.number().min(1, 'Le montant total doit être supérieur à 0'),
  paidAmount: z.number().min(0, 'Le montant payé doit être positif'),
  paymentMethod: z.string().min(1, 'Le mode de paiement est requis'),
  comment: z.string().optional(),
});

export const paymentPartialPaymentSchema = z.object({
  paidAmount: z.number().min(1, 'Le montant payé doit être supérieur à 0'),
  paymentMethod: z.string().min(1, 'Le mode de paiement est requis'),
  comment: z.string().optional(),
});

export const paymentFilterSchema = z.object({
  status: z.string().optional(),
  paymentMethod: z.string().optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
});
