export const PARTNER_APPLICATION_STATUS = 'EN_ATTENTE_VALIDATION';

export const PARTNER_STATUSES = {
  EN_ATTENTE_VALIDATION: { label: 'En attente de validation', color: 'warning' },
  VALIDEE: { label: 'Validée', color: 'success' },
  REFUSEE: { label: 'Refusée', color: 'danger' },
  INFORMATIONS_COMPLEMENTAIRES_DEMANDEES: { label: 'Informations complémentaires demandées', color: 'info' },
};

export const PARTNER_STEPS = [
  { number: '01', title: 'Remplir le formulaire', desc: 'Décrivez votre entreprise et renseignez les informations de votre responsable en moins de 5 minutes.' },
  { number: '02', title: 'Analyse de votre demande', desc: 'Notre équipe examine votre dossier et vérifie les informations fournies.' },
  { number: '03', title: 'Validation du dossier', desc: 'Vous recevez un e-mail dès que votre demande est validée par nos équipes.' },
  { number: '04', title: 'Configuration de votre espace', desc: 'Nous configurons votre espace LogisticPro avec le plan choisi et vos agences.' },
  { number: '05', title: 'Lancement de votre activité', desc: 'Proposez vos services, suivez vos colis et gagnez de nouveaux clients.' },
];

export const PARTNER_BENEFITS = [
  { title: 'Visibilité en ligne', desc: 'Votre entreprise apparaît dans le catalogue public et est visible par tous les utilisateurs de la plateforme.' },
  { title: 'Suivi des colis en temps réel', desc: 'Offrez à vos clients un suivi précis et sans inscription, directement depuis votre portail public.' },
  { title: 'Gestion centralisée', desc: 'Gérez vos agences, vos colis, vos paiements et vos employés depuis un espace unique.' },
  { title: 'Paiements mobiles intégrés', desc: 'Encaissez via Orange Money, MTN Mobile Money, en espèces ou à la livraison.' },
  { title: 'Rapports et statistiques', desc: 'Suivez vos performances grâce à des rapports détaillés et des indicateurs clés.' },
  { title: 'Assistance dédiée', desc: 'Une équipe vous accompagne à chaque étape, de la configuration au lancement.' },
];

export const PARTNER_REGIONS = [
  'Adamaoua', 'Centre', 'Est', 'Extrême-Nord', 'Littoral', 'Nord', 'Nord-Ouest', 'Ouest', 'Sud', 'Sud-Ouest',
];

export const PARTNER_COUNTRIES = [
  'Cameroun', 'Côte d\'Ivoire', 'Sénégal', 'Gabon', 'Congo', 'République démocratique du Congo', 'Autre',
];

export const PARTNER_AGENCY_COUNT_OPTIONS = [
  { value: '1', label: '1 agence' },
  { value: '2', label: '2 agences' },
  { value: '3', label: '3 agences' },
  { value: '4', label: '4 agences' },
  { value: '5-10', label: '5 à 10 agences' },
  { value: '10+', label: 'Plus de 10 agences' },
];

export const PARTNER_EMPLOYEE_COUNT_OPTIONS = [
  { value: '1-10', label: '1 à 10 employés' },
  { value: '11-50', label: '11 à 50 employés' },
  { value: '51-200', label: '51 à 200 employés' },
  { value: '200+', label: 'Plus de 200 employés' },
];

export const PARTNER_MANAGER_ROLES = [
  'Directeur général', 'Gérant', 'Directeur d\'agence', 'Responsable exploitation', 'Responsable commercial', 'Autre',
];

export const PARTNER_SOURCES = [
  'Recherche en ligne', 'Bouche à oreille', 'Réseaux sociaux', 'Publicité', 'Recommandation d\'un partenaire', 'Autre',
];

export const partnerApplicationsDB = [
  {
    id: 'app_001',
    reference: 'PART-20260612-001',
    companyName: 'Cameroon Trans',
    contactEmail: 'contact@cameroontrans.cm',
    plan: 'Business',
    status: 'VALIDEE',
    createdAt: '2026-06-12T09:30:00Z',
    requestedBy: 'Emmanuel Fotso',
  },
  {
    id: 'app_002',
    reference: 'PART-20260720-002',
    companyName: 'Express Cargo 237',
    contactEmail: 'bonjour@expresscargo.cm',
    plan: 'Starter',
    status: 'EN_ATTENTE_VALIDATION',
    createdAt: '2026-07-20T14:10:00Z',
    requestedBy: 'Aline Mballa',
  },
  {
    id: 'app_003',
    reference: 'PART-20260725-003',
    companyName: 'Douala Logistics',
    contactEmail: 'info@doualalogistics.cm',
    plan: 'Enterprise',
    status: 'INFORMATIONS_COMPLEMENTAIRES_DEMANDEES',
    createdAt: '2026-07-25T11:00:00Z',
    requestedBy: 'Serge Tchoupo',
  },
  {
    id: 'app_004',
    reference: 'PART-20260729-004',
    companyName: 'Mini Bus Express',
    contactEmail: 'contact@minibusexpress.cm',
    plan: 'Starter',
    status: 'REFUSEE',
    createdAt: '2026-07-29T16:45:00Z',
    requestedBy: 'Paul Njoya',
  },
];
