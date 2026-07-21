import { z } from 'zod';

export const employeeCreateSchema = z.object({
  firstName: z.string().min(1, 'Le prénom est requis').max(50),
  lastName: z.string().min(1, 'Le nom est requis').max(50),
  phone: z.string().regex(/^\+?[0-9\s-]{8,20}$/, 'Téléphone invalide'),
  email: z.string().email('Email invalide'),
  address: z.string().max(255).optional().or(z.literal('')),
  city: z.string().min(1, 'La ville est requise'),
  nationality: z.string().min(1, 'La nationalité est requise').default('Camerounaise'),
  nationalId: z.string().min(1, 'Le numéro CNI est requis'),
  gender: z.enum(['male', 'female'], { errorMap: () => ({ message: ' Sexe requis' }) }),
  dateOfBirth: z.string().min(1, 'La date de naissance est requise'),
  hireDate: z.string().min(1, 'La date d\'embauche est requise'),
  employeeCode: z.string().min(1, 'Le matricule est requis').max(20),
  agencyId: z.string().min(1, 'L\'agence est requise'),
  position: z.string().min(1, 'Le poste est requis'),
  observation: z.string().max(500).optional().or(z.literal('')),
});

export const employeeUpdateSchema = employeeCreateSchema.partial();

export const userCreateSchema = z.object({
  employeeId: z.string().optional().or(z.literal('')),
  firstName: z.string().min(1, 'Le prénom est requis').max(50),
  lastName: z.string().min(1, 'Le nom est requis').max(50),
  email: z.string().email('Email invalide'),
  phone: z.string().regex(/^\+?[0-9\s-]{8,20}$/, 'Téléphone invalide'),
  roleId: z.string().min(1, 'Le rôle est requis'),
  agencyId: z.string().min(1, 'L\'agence est requise'),
  position: z.string().min(1, 'Le poste est requis'),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères').optional().or(z.literal('')),
});

export const userUpdateSchema = userCreateSchema.partial();

export const roleCreateSchema = z.object({
  name: z.string().min(1, 'Le nom du rôle est requis').max(50),
  code: z.string().min(1, 'Le code est requis').max(30).regex(/^[a-z0-9_]+$/i, 'Code invalide (lettres, chiffres, underscores)'),
  description: z.string().max(255).optional().or(z.literal('')),
  permissions: z.array(z.string()).min(1, 'Sélectionnez au moins une permission'),
});

export const roleUpdateSchema = roleCreateSchema.partial();

export function employeeToFormValues(emp) {
  if (!emp) return {};
  return {
    firstName: emp.firstName || '', lastName: emp.lastName || '',
    phone: emp.phone || '', email: emp.email || '',
    address: emp.address || '', city: emp.city || '',
    nationality: emp.nationality || 'Camerounaise', nationalId: emp.nationalId || '',
    gender: emp.gender || '', dateOfBirth: emp.dateOfBirth || '',
    hireDate: emp.hireDate || '', employeeCode: emp.employeeCode || '',
    agencyId: emp.agencyId || '', position: emp.position || '',
    observation: emp.observation || '',
  };
}

export function userToFormValues(user) {
  if (!user) return {};
  return {
    employeeId: user.employeeId || '',
    firstName: user.firstName || '', lastName: user.lastName || '',
    email: user.email || '', phone: user.phone || '',
    roleId: user.roleId || '', agencyId: user.agencyId || '',
    position: user.position || '', password: '',
  };
}

export function roleToFormValues(role) {
  if (!role) return {};
  return {
    name: role.name || '', code: role.code || '',
    description: role.description || '',
    permissions: role.permissions || [],
  };
}
