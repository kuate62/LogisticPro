const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockPlans = [
  {
    id: "plan_1",
    name: "Starter",
    price: 25000,
    currency: "FCFA",
    billingCycle: "monthly",
    maxAgencies: 2,
    maxUsers: 5,
    maxStorage: 1,
    features: [
      "Gestion d'agence",
      "Suivi des colis",
      "Rapports de base",
      "Support par email",
    ],
    description:
      "Idéal pour les petites entreprises de livraison qui démarrent.",
    isActive: true,
    createdAt: "2025-01-15T08:00:00Z",
  },
  {
    id: "plan_2",
    name: "Business",
    price: 75000,
    currency: "FCFA",
    billingCycle: "monthly",
    maxAgencies: 10,
    maxUsers: 25,
    maxStorage: 5,
    features: [
      "Gestion multi-agences",
      "Suivi des colis avancé",
      "Rapports détaillés",
      "Support prioritaire",
      "API d'intégration",
      "Gestion des employés",
    ],
    description:
      "Pour les entreprises en croissance avec plusieurs agences.",
    isActive: true,
    createdAt: "2025-01-15T08:00:00Z",
  },
  {
    id: "plan_3",
    name: "Enterprise",
    price: 200000,
    currency: "FCFA",
    billingCycle: "monthly",
    maxAgencies: -1,
    maxUsers: -1,
    maxStorage: 50,
    features: [
      "Agences illimitées",
      "Utilisateurs illimités",
      "Suivi en temps réel",
      "Rapports personnalisés",
      "Support dédié 24/7",
      "API complète",
      "Gestion avancée des employés",
      "Multi-entreprise",
    ],
    description:
      "La solution complète pour les grandes entreprises de logistique.",
    isActive: true,
    createdAt: "2025-01-15T08:00:00Z",
  },
];

export const mockEnterprises = [
  {
    id: "ent_1",
    name: "Société Camerounaise de Livraison Express",
    tradeName: "CamLivEx",
    email: "contact@camlivex.cm",
    phone: "+237699123456",
    city: "Douala",
    address: "Boulevard de la République, Akwa, Douala",
    siret: "12345678901234",
    status: "active",
    planId: "plan_3",
    employeesCount: 45,
    agenciesCount: 8,
    shipmentsThisMonth: 3250,
    revenue: 12500000,
    createdAt: "2025-03-10T10:00:00Z",
    website: "https://camlivex.cm",
    description:
      "Leader de la livraison express dans la région du Littoral.",
    country: "Cameroun",
    region: "Littoral",
    postalCode: "23700",
    responsible: {
      firstName: "Jean-Pierre",
      lastName: "Mbarga",
      email: "jp.mbarga@camlivex.cm",
      phone: "+237699123457",
      position: "Directeur Général",
    },
    subscription: {
      planId: "plan_3",
      startDate: "2025-03-10T00:00:00Z",
      endDate: "2026-03-10T00:00:00Z",
      status: "active",
    },
    quotas: {
      agencies: { used: 8, max: -1 },
      users: { used: 45, max: -1 },
      storage: { used: 32, max: 50 },
    },
    stats: {
      employees: 45,
      agencies: 8,
      clients: 1840,
      shipments: 15200,
      packages: 28900,
      volume: "125000",
    },
    isTrial: false,
    trialEndsAt: null,
  },
  {
    id: "ent_2",
    name: "Nord Transport & Logistique",
    tradeName: "NordTrans",
    email: "info@nordtrans.cm",
    phone: "+237677987654",
    city: "Garoua",
    address: "Avenue du Marché, Garoua Centre",
    siret: "23456789012345",
    status: "active",
    planId: "plan_2",
    employeesCount: 18,
    agenciesCount: 3,
    shipmentsThisMonth: 890,
    revenue: 4200000,
    createdAt: "2025-05-20T14:30:00Z",
    website: "https://nordtrans.cm",
    description:
      "Spécialiste du transport dans les régions du Nord et de l'Extrême-Nord.",
    country: "Cameroun",
    region: "Nord",
    postalCode: "43000",
    responsible: {
      firstName: "Amadou",
      lastName: "Bouba",
      email: "a.bouba@nordtrans.cm",
      phone: "+237677987655",
      position: "Gérant",
    },
    subscription: {
      planId: "plan_2",
      startDate: "2025-05-20T00:00:00Z",
      endDate: "2026-05-20T00:00:00Z",
      status: "active",
    },
    quotas: {
      agencies: { used: 3, max: 10 },
      users: { used: 18, max: 25 },
      storage: { used: 3.2, max: 5 },
    },
    stats: {
      employees: 18,
      agencies: 3,
      clients: 520,
      shipments: 4800,
      packages: 8700,
      volume: "35000",
    },
    isTrial: false,
    trialEndsAt: null,
  },
  {
    id: "ent_3",
    name: "Société des Hauts Plateaux de Livraison",
    tradeName: "HautsPlateaux",
    email: "contact@hautsplateaux.cm",
    phone: "+237690554433",
    city: "Bamenda",
    address: "Commercial Avenue, Bamenda III",
    siret: "34567890123456",
    status: "active",
    planId: "plan_2",
    employeesCount: 12,
    agenciesCount: 2,
    shipmentsThisMonth: 456,
    revenue: 2100000,
    createdAt: "2025-07-01T09:15:00Z",
    website: null,
    description:
      "Service de livraison pour les régions des Montagnes et des Hauts Plateaux.",
    country: "Cameroun",
    region: "Nord-Ouest",
    postalCode: "37000",
    responsible: {
      firstName: "Ngwa",
      lastName: "Fon",
      email: "n.fon@hautsplateaux.cm",
      phone: "+237690554434",
      position: "Directeur",
    },
    subscription: {
      planId: "plan_2",
      startDate: "2025-07-01T00:00:00Z",
      endDate: "2026-07-01T00:00:00Z",
      status: "active",
    },
    quotas: {
      agencies: { used: 2, max: 10 },
      users: { used: 12, max: 25 },
      storage: { used: 1.8, max: 5 },
    },
    stats: {
      employees: 12,
      agencies: 2,
      clients: 310,
      shipments: 2400,
      packages: 4100,
      volume: "15000",
    },
    isTrial: false,
    trialEndsAt: null,
  },
  {
    id: "ent_4",
    name: "Prestige Cargaison Cameroun",
    tradeName: "PrestiCargo",
    email: "ops@prestcargo.cm",
    phone: "+237678112233",
    city: "Douala",
    address: "Zone Industrielle de Douala, Bonabéri",
    siret: "45678901234567",
    status: "suspended",
    planId: "plan_3",
    employeesCount: 32,
    agenciesCount: 5,
    shipmentsThisMonth: 0,
    revenue: 8900000,
    createdAt: "2025-02-14T11:00:00Z",
    website: "https://prestcargo.cm",
    description:
      "Cargaison et fret maritime dans le port de Douala.",
    country: "Cameroun",
    region: "Littoral",
    postalCode: "23701",
    responsible: {
      firstName: "Martin",
      lastName: "Ekotto",
      email: "m.ekotto@prestcargo.cm",
      phone: "+237678112234",
      position: "CEO",
    },
    subscription: {
      planId: "plan_3",
      startDate: "2025-02-14T00:00:00Z",
      endDate: "2026-02-14T00:00:00Z",
      status: "suspended",
    },
    quotas: {
      agencies: { used: 5, max: -1 },
      users: { used: 32, max: -1 },
      storage: { used: 28, max: 50 },
    },
    stats: {
      employees: 32,
      agencies: 5,
      clients: 890,
      shipments: 9800,
      packages: 18500,
      volume: "85000",
    },
    isTrial: false,
    trialEndsAt: null,
  },
  {
    id: "ent_5",
    name: "Société Bamiléké de Distribution",
    tradeName: "SBDistribution",
    email: "sbdistribution@gmail.com",
    phone: "+237699887766",
    city: "Bafoussam",
    address: "Marché Central, Bafoussam Centre",
    siret: "56789012345678",
    status: "active",
    planId: "plan_1",
    employeesCount: 6,
    agenciesCount: 1,
    shipmentsThisMonth: 234,
    revenue: 980000,
    createdAt: "2025-09-05T16:45:00Z",
    website: null,
    description:
      "Distribution locale dans la région de l'Ouest.",
    country: "Cameroun",
    region: "Ouest",
    postalCode: "31000",
    responsible: {
      firstName: "Cécile",
      lastName: "Kamga",
      email: "c.kamga@sbdistribution.cm",
      phone: "+237699887767",
      position: "Administratrice",
    },
    subscription: {
      planId: "plan_1",
      startDate: "2025-09-05T00:00:00Z",
      endDate: "2026-09-05T00:00:00Z",
      status: "active",
    },
    quotas: {
      agencies: { used: 1, max: 2 },
      users: { used: 6, max: 5 },
      storage: { used: 0.6, max: 1 },
    },
    stats: {
      employees: 6,
      agencies: 1,
      clients: 145,
      shipments: 1100,
      packages: 1800,
      volume: "4500",
    },
    isTrial: false,
    trialEndsAt: null,
  },
  {
    id: "ent_6",
    name: "Sahel Freight International",
    tradeName: "SahelFreight",
    email: "contact@sahelfreight.cm",
    phone: "+237665432109",
    city: "Maroua",
    address: "Quartier Djarabaya, Maroua",
    siret: "67890123456789",
    status: "active",
    planId: "plan_1",
    employeesCount: 4,
    agenciesCount: 1,
    shipmentsThisMonth: 120,
    revenue: 650000,
    createdAt: "2025-11-20T08:30:00Z",
    website: null,
    description:
      "Fret international et livraison dans la région de l'Extrême-Nord.",
    country: "Cameroun",
    region: "Extrême-Nord",
    postalCode: "64000",
    responsible: {
      firstName: "Idriss",
      lastName: "Oumarou",
      email: "i.oumarou@sahelfreight.cm",
      phone: "+237665432110",
      position: "Gérant",
    },
    subscription: {
      planId: "plan_1",
      startDate: "2025-11-20T00:00:00Z",
      endDate: "2026-11-20T00:00:00Z",
      status: "active",
    },
    quotas: {
      agencies: { used: 1, max: 2 },
      users: { used: 4, max: 5 },
      storage: { used: 0.3, max: 1 },
    },
    stats: {
      employees: 4,
      agencies: 1,
      clients: 78,
      shipments: 600,
      packages: 950,
      volume: "2200",
    },
    isTrial: false,
    trialEndsAt: null,
  },
  {
    id: "ent_7",
    name: "Littoral Logistique Express",
    tradeName: "LittLog",
    email: "hello@littlog.cm",
    phone: "+237671234567",
    city: "Limbé",
    address: "Bonanganda, Limbé Centre",
    siret: "78901234567890",
    status: "archived",
    planId: "plan_2",
    employeesCount: 0,
    agenciesCount: 0,
    shipmentsThisMonth: 0,
    revenue: 1500000,
    createdAt: "2024-06-10T12:00:00Z",
    website: "https://littlog.cm",
    description:
      "Livraison rapide dans la région du Sud-Ouest.",
    country: "Cameroun",
    region: "Sud-Ouest",
    postalCode: "52000",
    responsible: {
      firstName: "Paul",
      lastName: "Atangana",
      email: "p.atangana@littlog.cm",
      phone: "+237671234568",
      position: "Directeur",
    },
    subscription: {
      planId: "plan_2",
      startDate: "2024-06-10T00:00:00Z",
      endDate: "2025-06-10T00:00:00Z",
      status: "expired",
    },
    quotas: {
      agencies: { used: 0, max: 10 },
      users: { used: 0, max: 25 },
      storage: { used: 0, max: 5 },
    },
    stats: {
      employees: 0,
      agencies: 0,
      clients: 0,
      shipments: 0,
      packages: 0,
      volume: "0",
    },
    isTrial: false,
    trialEndsAt: null,
  },
];

export const mockSubscriptions = [
  {
    id: "sub_1",
    companyId: "ent_1",
    planId: "plan_3",
    status: "active",
    startDate: "2025-03-10T00:00:00Z",
    endDate: "2026-03-10T00:00:00Z",
    renewalDate: "2026-03-10T00:00:00Z",
    paymentMethod: "mobile_money",
    amount: 200000,
    currency: "FCFA",
    autoRenew: true,
  },
  {
    id: "sub_2",
    companyId: "ent_2",
    planId: "plan_2",
    status: "active",
    startDate: "2025-05-20T00:00:00Z",
    endDate: "2026-05-20T00:00:00Z",
    renewalDate: "2026-05-20T00:00:00Z",
    paymentMethod: "bank_transfer",
    amount: 75000,
    currency: "FCFA",
    autoRenew: true,
  },
  {
    id: "sub_3",
    companyId: "ent_3",
    planId: "plan_2",
    status: "active",
    startDate: "2025-07-01T00:00:00Z",
    endDate: "2026-07-01T00:00:00Z",
    renewalDate: "2026-07-01T00:00:00Z",
    paymentMethod: "orange_money",
    amount: 75000,
    currency: "FCFA",
    autoRenew: false,
  },
  {
    id: "sub_4",
    companyId: "ent_4",
    planId: "plan_3",
    status: "suspended",
    startDate: "2025-02-14T00:00:00Z",
    endDate: "2026-02-14T00:00:00Z",
    renewalDate: "2026-02-14T00:00:00Z",
    paymentMethod: "mobile_money",
    amount: 200000,
    currency: "FCFA",
    autoRenew: false,
  },
  {
    id: "sub_5",
    companyId: "ent_5",
    planId: "plan_1",
    status: "active",
    startDate: "2025-09-05T00:00:00Z",
    endDate: "2026-09-05T00:00:00Z",
    renewalDate: "2026-09-05T00:00:00Z",
    paymentMethod: "momo",
    amount: 25000,
    currency: "FCFA",
    autoRenew: true,
  },
  {
    id: "sub_6",
    companyId: "ent_7",
    planId: "plan_2",
    status: "expired",
    startDate: "2024-06-10T00:00:00Z",
    endDate: "2025-06-10T00:00:00Z",
    renewalDate: null,
    paymentMethod: "bank_transfer",
    amount: 75000,
    currency: "FCFA",
    autoRenew: false,
  },
];

export const mockRegistrationRequests = [
  {
    id: "req_1",
    companyName: "Congo Logistics & Shipping",
    contactName: "Emmanuel Messi",
    email: "em.messi@congologistics.cm",
    phone: "+237695112233",
    city: "Kribi",
    siret: "89012345678901",
    status: "pending",
    message:
      "Nous souhaitons rejoindre la plateforme pour gérer nos 3 agences de livraison dans la région du Sud.",
    createdAt: "2026-01-10T14:00:00Z",
    reviewedAt: null,
    reviewedBy: null,
    rejectionReason: null,
  },
  {
    id: "req_2",
    companyName: "Est Cameroun Express",
    contactName: "Sandrine Ngo Biyick",
    email: "s.ngobiyick@estexpress.cm",
    phone: "+237677334455",
    city: "Bertoua",
    siret: "90123456789012",
    status: "pending",
    message:
      "Petite structure de livraison à Bertoua cherchant à professionaliser nos opérations.",
    createdAt: "2026-01-12T09:30:00Z",
    reviewedAt: null,
    reviewedBy: null,
    rejectionReason: null,
  },
  {
    id: "req_3",
    companyName: "Quick Delivery Yaoundé",
    contactName: "Patrice Ndjock",
    email: "p.ndjock@quickdelivery.cm",
    phone: "+237699667788",
    city: "Yaoundé",
    siret: "11223344556677",
    status: "approved",
    message:
      "Service de livraison rapide dans la capitale. Nous avons 2 agences à Yaoundé.",
    createdAt: "2025-12-20T11:00:00Z",
    reviewedAt: "2025-12-22T08:00:00Z",
    reviewedBy: "super_admin_1",
    rejectionReason: null,
  },
  {
    id: "req_4",
    companyName: "Bamiléké Cargo",
    contactName: "Henri Tchinda",
    email: "h.tchinda@bamilkecargos.cm",
    phone: "+237670112233",
    city: "Bafoussam",
    siret: "22334455667788",
    status: "rejected",
    message:
      "Transport de marchandises entre Bafoussam et Douala.",
    createdAt: "2025-12-10T15:45:00Z",
    reviewedAt: "2025-12-12T10:00:00Z",
    reviewedBy: "super_admin_1",
    rejectionReason:
      "Dossier incomplet. Merci de fournir les statuts de l'entreprise et un extrait de casier judiciaire.",
  },
  {
    id: "req_5",
    companyName: "Fret Atlantique Cameroun",
    contactName: "Aimé Kotto",
    email: "a.kotto@fretatlantique.cm",
    phone: "+237668998877",
    city: "Douala",
    siret: "33445566778899",
    status: "pending",
    message:
      "Société de fret maritime basée au port de Douala. Nous opérons depuis 2023.",
    createdAt: "2026-01-18T10:20:00Z",
    reviewedAt: null,
    reviewedBy: null,
    rejectionReason: null,
  },
];

export const mockPlatformUsers = [
  {
    id: "super_admin_1",
    firstName: "Hervé",
    lastName: "Nkoulou",
    email: "herve.nkoulou@platform.cm",
    role: "super_admin",
    isActive: true,
    lastLogin: "2026-01-20T08:15:00Z",
    createdAt: "2025-01-01T00:00:00Z",
  },
  {
    id: "super_admin_2",
    firstName: "Marie-Claire",
    lastName: "Fotso",
    email: "mc.fotso@platform.cm",
    role: "super_admin",
    isActive: true,
    lastLogin: "2026-01-19T17:30:00Z",
    createdAt: "2025-01-01T00:00:00Z",
  },
  {
    id: "super_admin_3",
    firstName: "Blaise",
    lastName: "Chendjou",
    email: "blaise.chendjou@platform.cm",
    role: "super_admin",
    isActive: false,
    lastLogin: "2025-11-15T09:00:00Z",
    createdAt: "2025-03-15T00:00:00Z",
  },
  {
    id: "super_admin_4",
    firstName: "Sylvie",
    lastName: "Atangana",
    email: "sylvie.atangana@platform.cm",
    role: "super_admin",
    isActive: true,
    lastLogin: "2026-01-20T07:00:00Z",
    createdAt: "2025-06-01T00:00:00Z",
  },
];

export const mockManagers = [
  {
    id: "mgr_1",
    firstName: "Jean-Pierre",
    lastName: "Mbarga",
    email: "jp.mbarga@camlivex.cm",
    phone: "+237699123457",
    companyId: "ent_1",
    companyName: "Société Camerounaise de Livraison Express",
    role: "enterprise_admin",
    isActive: true,
    lastLogin: "2026-01-20T09:00:00Z",
    createdAt: "2025-03-10T10:00:00Z",
  },
  {
    id: "mgr_2",
    firstName: "Amadou",
    lastName: "Bouba",
    email: "a.bouba@nordtrans.cm",
    phone: "+237677987655",
    companyId: "ent_2",
    companyName: "Nord Transport & Logistique",
    role: "enterprise_admin",
    isActive: true,
    lastLogin: "2026-01-19T14:20:00Z",
    createdAt: "2025-05-20T14:30:00Z",
  },
  {
    id: "mgr_3",
    firstName: "Ngwa",
    lastName: "Fon",
    email: "n.fon@hautsplateaux.cm",
    phone: "+237690554434",
    companyId: "ent_3",
    companyName: "Société des Hauts Plateaux de Livraison",
    role: "enterprise_admin",
    isActive: true,
    lastLogin: "2026-01-18T11:45:00Z",
    createdAt: "2025-07-01T09:15:00Z",
  },
  {
    id: "mgr_4",
    firstName: "Cécile",
    lastName: "Kamga",
    email: "c.kamga@sbdistribution.cm",
    phone: "+237699887767",
    companyId: "ent_5",
    companyName: "Société Bamiléké de Distribution",
    role: "enterprise_admin",
    isActive: true,
    lastLogin: "2026-01-20T06:30:00Z",
    createdAt: "2025-09-05T16:45:00Z",
  },
  {
    id: "mgr_5",
    firstName: "Idriss",
    lastName: "Oumarou",
    email: "i.oumarou@sahelfreight.cm",
    phone: "+237665432110",
    companyId: "ent_6",
    companyName: "Sahel Freight International",
    role: "enterprise_admin",
    isActive: false,
    lastLogin: "2025-12-01T10:00:00Z",
    createdAt: "2025-11-20T08:30:00Z",
  },
];

export const mockNotifications = [
  {
    id: "notif_1",
    type: "info",
    title: "Nouvelle inscription",
    message:
      "Une nouvelle demande d'inscription a été reçue de Congo Logistics & Shipping (Kribi).",
    read: false,
    createdAt: "2026-01-20T08:00:00Z",
    targetRole: "super_admin",
    companyId: null,
  },
  {
    id: "notif_2",
    type: "warning",
    title: "Quota de stockage dépassé",
    message:
      "La Société Camerounaise de Livraison Express a utilisé 80% de son espace de stockage.",
    read: false,
    createdAt: "2026-01-19T16:30:00Z",
    targetRole: "super_admin",
    companyId: "ent_1",
  },
  {
    id: "notif_3",
    type: "success",
    title: "Demande approuvée",
    message:
      "La demande de Quick Delivery Yaoundé a été approuvée avec succès.",
    read: true,
    createdAt: "2025-12-22T08:00:00Z",
    targetRole: "super_admin",
    companyId: "ent_3",
  },
  {
    id: "notif_4",
    type: "error",
    title: "Paiement en échec",
    message:
      "Le paiement du renouvellement pour Prestige Cargaison Cameroun a échoué. Montant : 200 000 FCFA.",
    read: false,
    createdAt: "2026-01-18T14:00:00Z",
    targetRole: "super_admin",
    companyId: "ent_4",
  },
  {
    id: "notif_5",
    type: "info",
    title: "Nouvel administrateur créé",
    message:
      "Sylvie Atangana a été ajoutée comme super administrateur de la plateforme.",
    read: true,
    createdAt: "2025-06-01T00:00:00Z",
    targetRole: "super_admin",
    companyId: null,
  },
  {
    id: "notif_6",
    type: "warning",
    title: "Abonnement expiré bientôt",
    message:
      "L'abonnement de Nord Transport & Logistique expire dans 30 jours (20 mai 2026).",
    read: false,
    createdAt: "2026-01-20T06:00:00Z",
    targetRole: "super_admin",
    companyId: "ent_2",
  },
  {
    id: "notif_7",
    type: "success",
    title: "Nouvelle entreprise créée",
    message:
      "Sahel Freight International a été créée avec succès. Plan Starter activé.",
    read: true,
    createdAt: "2025-11-20T09:00:00Z",
    targetRole: "super_admin",
    companyId: "ent_6",
  },
  {
    id: "notif_8",
    type: "error",
    title: "Entreprise suspendue",
    message:
      "Prestige Cargaison Cameroun a été suspendue pour non-paiement.",
    read: true,
    createdAt: "2026-01-15T10:00:00Z",
    targetRole: "super_admin",
    companyId: "ent_4",
  },
];

export const mockAdminService = {
  async getDashboardStats() {
    await delay(500);
    const activeEnterprises = mockEnterprises.filter(
      (e) => e.status === "active"
    ).length;
    const totalRevenue = mockEnterprises.reduce(
      (sum, e) => sum + e.revenue,
      0
    );
    const totalShipments = mockEnterprises.reduce(
      (sum, e) => sum + e.shipmentsThisMonth,
      0
    );
    const pendingRequests = mockRegistrationRequests.filter(
      (r) => r.status === "pending"
    ).length;

    return {
      stats: {
        totalEnterprises: mockEnterprises.length,
        activeEnterprises,
        suspendedEnterprises: mockEnterprises.filter(
          (e) => e.status === "suspended"
        ).length,
        archivedEnterprises: mockEnterprises.filter(
          (e) => e.status === "archived"
        ).length,
        totalRevenue,
        totalShipments,
        pendingRequests,
        totalPlatformUsers: mockPlatformUsers.length,
        totalManagers: mockManagers.length,
      },
      revenueChart: [
        { month: "Juillet 2025", revenue: 32000000 },
        { month: "Août 2025", revenue: 35500000 },
        { month: "Septembre 2025", revenue: 31000000 },
        { month: "Octobre 2025", revenue: 38200000 },
        { month: "Novembre 2025", revenue: 36800000 },
        { month: "Décembre 2025", revenue: 41500000 },
        { month: "Janvier 2026", revenue: 39730000 },
      ],
      enterprisesByPlan: [
        { plan: "Starter", count: 2 },
        { plan: "Business", count: 3 },
        { plan: "Enterprise", count: 2 },
      ],
      subscriptionsByStatus: [
        { status: "active", count: mockSubscriptions.filter((s) => s.status === "active").length },
        { status: "suspended", count: mockSubscriptions.filter((s) => s.status === "suspended").length },
        { status: "expired", count: mockSubscriptions.filter((s) => s.status === "expired").length },
      ],
    };
  },

  async getEnterprises(filters = {}) {
    await delay(400);
    let results = [...mockEnterprises];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      results = results.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.tradeName.toLowerCase().includes(q) ||
          e.email.toLowerCase().includes(q) ||
          e.city.toLowerCase().includes(q) ||
          e.responsible.firstName.toLowerCase().includes(q) ||
          e.responsible.lastName.toLowerCase().includes(q)
      );
    }

    if (filters.status) {
      results = results.filter((e) => e.status === filters.status);
    }

    if (filters.planId) {
      results = results.filter((e) => e.planId === filters.planId);
    }

    if (filters.city) {
      results = results.filter((e) => e.city === filters.city);
    }

    return results;
  },

  async getEnterprise(id) {
    await delay(400);
    const enterprise = mockEnterprises.find((e) => e.id === id);
    if (!enterprise) {
      throw new Error("Entreprise introuvable");
    }
    return { ...enterprise };
  },

  async createEnterprise(data) {
    await delay(600);
    const newId = `ent_${Date.now()}`;
    const enterprise = {
      id: newId,
      name: data.name,
      tradeName: data.tradeName || data.name,
      email: data.email,
      phone: data.phone,
      city: data.city,
      address: data.address,
      siret: data.siret,
      status: "active",
      planId: data.planId || "plan_1",
      employeesCount: 0,
      agenciesCount: 0,
      shipmentsThisMonth: 0,
      revenue: 0,
      createdAt: new Date().toISOString(),
      website: data.website || null,
      description: data.description || "",
      country: "Cameroun",
      region: data.region || "",
      postalCode: data.postalCode || "",
      responsible: data.responsible || {
        firstName: "",
        lastName: "",
        email: data.email,
        phone: data.phone,
        position: "Administrateur",
      },
      subscription: {
        planId: data.planId || "plan_1",
        startDate: new Date().toISOString(),
        endDate: new Date(
          Date.now() + 365 * 24 * 60 * 60 * 1000
        ).toISOString(),
        status: "active",
      },
      quotas: {
        agencies: { used: 0, max: mockPlans.find((p) => p.id === (data.planId || "plan_1"))?.maxAgencies || 2 },
        users: { used: 0, max: mockPlans.find((p) => p.id === (data.planId || "plan_1"))?.maxUsers || 5 },
        storage: { used: 0, max: mockPlans.find((p) => p.id === (data.planId || "plan_1"))?.maxStorage || 1 },
      },
      stats: {
        employees: 0,
        agencies: 0,
        clients: 0,
        shipments: 0,
        packages: 0,
        volume: "0",
      },
      isTrial: data.isTrial || false,
      trialEndsAt: data.isTrial
        ? new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString()
        : null,
    };

    mockEnterprises.push(enterprise);
    return { ...enterprise };
  },

  async updateEnterprise(id, data) {
    await delay(500);
    const index = mockEnterprises.findIndex((e) => e.id === id);
    if (index === -1) {
      throw new Error("Entreprise introuvable");
    }

    const updated = {
      ...mockEnterprises[index],
      ...data,
      responsible: data.responsible
        ? { ...mockEnterprises[index].responsible, ...data.responsible }
        : mockEnterprises[index].responsible,
      subscription: data.subscription
        ? { ...mockEnterprises[index].subscription, ...data.subscription }
        : mockEnterprises[index].subscription,
    };

    mockEnterprises[index] = updated;
    return { ...updated };
  },

  async updateEnterpriseStatus(id, status, reason = "") {
    await delay(500);
    const index = mockEnterprises.findIndex((e) => e.id === id);
    if (index === -1) {
      throw new Error("Entreprise introuvable");
    }

    mockEnterprises[index].status = status;
    if (status === "suspended") {
      mockEnterprises[index].subscription.status = "suspended";
    } else if (status === "active") {
      mockEnterprises[index].subscription.status = "active";
    }

    return { ...mockEnterprises[index], suspensionReason: reason };
  },

  async getEnterpriseStatistics(id) {
    await delay(450);
    const enterprise = mockEnterprises.find((e) => e.id === id);
    if (!enterprise) {
      throw new Error("Entreprise introuvable");
    }

    return {
      employees: enterprise.stats.employees,
      agencies: enterprise.stats.agencies,
      clients: enterprise.stats.clients,
      shipments: enterprise.stats.shipments,
      packages: enterprise.stats.packages,
      volume: enterprise.stats.volume,
      revenue: enterprise.revenue,
      shipmentsThisMonth: enterprise.shipmentsThisMonth,
      shipmentsHistory: [
        { month: "Juillet 2025", shipments: Math.floor(enterprise.shipmentsThisMonth * 0.85) },
        { month: "Août 2025", shipments: Math.floor(enterprise.shipmentsThisMonth * 0.92) },
        { month: "Septembre 2025", shipments: Math.floor(enterprise.shipmentsThisMonth * 0.88) },
        { month: "Octobre 2025", shipments: Math.floor(enterprise.shipmentsThisMonth * 1.05) },
        { month: "Novembre 2025", shipments: Math.floor(enterprise.shipmentsThisMonth * 0.97) },
        { month: "Décembre 2025", shipments: Math.floor(enterprise.shipmentsThisMonth * 1.12) },
        { month: "Janvier 2026", shipments: enterprise.shipmentsThisMonth },
      ],
      topAgencies: [
        { name: "Agence Centrale", city: enterprise.city, shipments: Math.floor(enterprise.shipmentsThisMonth * 0.4) },
        { name: "Agence Nord", city: "Yaoundé", shipments: Math.floor(enterprise.shipmentsThisMonth * 0.35) },
        { name: "Agence Sud", city: "Douala", shipments: Math.floor(enterprise.shipmentsThisMonth * 0.25) },
      ],
    };
  },

  async getSubscriptions(filters = {}) {
    await delay(400);
    let results = mockSubscriptions.map((sub) => {
      const company = mockEnterprises.find((e) => e.id === sub.companyId);
      return {
        ...sub,
        companyName: company ? company.name : "Inconnu",
      };
    });

    if (filters.status) {
      results = results.filter((s) => s.status === filters.status);
    }

    if (filters.companyId) {
      results = results.filter((s) => s.companyId === filters.companyId);
    }

    return results;
  },

  async updateSubscription(id, data) {
    await delay(500);
    const index = mockSubscriptions.findIndex((s) => s.id === id);
    if (index === -1) {
      throw new Error("Abonnement introuvable");
    }

    mockSubscriptions[index] = {
      ...mockSubscriptions[index],
      ...data,
    };

    return { ...mockSubscriptions[index] };
  },

  async getPlans() {
    await delay(400);
    return [...mockPlans];
  },

  async createPlan(data) {
    await delay(600);
    const newId = `plan_${Date.now()}`;
    const plan = {
      id: newId,
      name: data.name,
      price: data.price,
      currency: "FCFA",
      billingCycle: data.billingCycle || "monthly",
      maxAgencies: data.maxAgencies,
      maxUsers: data.maxUsers,
      maxStorage: data.maxStorage,
      features: data.features || [],
      description: data.description || "",
      isActive: true,
      createdAt: new Date().toISOString(),
    };

    mockPlans.push(plan);
    return { ...plan };
  },

  async updatePlan(id, data) {
    await delay(500);
    const index = mockPlans.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error("Plan introuvable");
    }

    mockPlans[index] = { ...mockPlans[index], ...data };
    return { ...mockPlans[index] };
  },

  async deletePlan(id) {
    await delay(500);
    const index = mockPlans.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error("Plan introuvable");
    }

    mockPlans.splice(index, 1);
    return { success: true };
  },

  async getRegistrationRequests(filters = {}) {
    await delay(400);
    let results = [...mockRegistrationRequests];

    if (filters.status) {
      results = results.filter((r) => r.status === filters.status);
    }

    if (filters.search) {
      const q = filters.search.toLowerCase();
      results = results.filter(
        (r) =>
          r.companyName.toLowerCase().includes(q) ||
          r.contactName.toLowerCase().includes(q) ||
          r.email.toLowerCase().includes(q) ||
          r.city.toLowerCase().includes(q)
      );
    }

    return results;
  },

  async reviewRequest(id, action, reason = "") {
    await delay(500);
    const index = mockRegistrationRequests.findIndex((r) => r.id === id);
    if (index === -1) {
      throw new Error("Demande introuvable");
    }

    mockRegistrationRequests[index].status =
      action === "approve" ? "approved" : "rejected";
    mockRegistrationRequests[index].reviewedAt = new Date().toISOString();
    mockRegistrationRequests[index].reviewedBy = "super_admin_1";

    if (action === "reject" && reason) {
      mockRegistrationRequests[index].rejectionReason = reason;
    }

    return { ...mockRegistrationRequests[index] };
  },

  async getPlatformUsers() {
    await delay(400);
    return [...mockPlatformUsers];
  },

  async getManagers(filters = {}) {
    await delay(400);
    let results = mockManagers.map((mgr) => {
      const company = mockEnterprises.find((e) => e.id === mgr.companyId);
      return {
        ...mgr,
        companyName: company ? company.name : mgr.companyName,
      };
    });

    if (filters.search) {
      const q = filters.search.toLowerCase();
      results = results.filter(
        (m) =>
          m.firstName.toLowerCase().includes(q) ||
          m.lastName.toLowerCase().includes(q) ||
          m.email.toLowerCase().includes(q) ||
          m.companyName.toLowerCase().includes(q)
      );
    }

    if (filters.isActive !== undefined) {
      results = results.filter((m) => m.isActive === filters.isActive);
    }

    return results;
  },

  async getNotifications(filters = {}) {
    await delay(400);
    let results = [...mockNotifications];

    if (filters.read !== undefined) {
      results = results.filter((n) => n.read === filters.read);
    }

    if (filters.type) {
      results = results.filter((n) => n.type === filters.type);
    }

    if (filters.targetRole) {
      results = results.filter((n) => n.targetRole === filters.targetRole);
    }

    return results.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  },

  async markNotificationRead(id) {
    await delay(300);
    const index = mockNotifications.findIndex((n) => n.id === id);
    if (index === -1) {
      throw new Error("Notification introuvable");
    }

    mockNotifications[index].read = true;
    return { ...mockNotifications[index] };
  },

  async markAllNotificationsRead() {
    await delay(400);
    mockNotifications.forEach((n) => {
      n.read = true;
    });
    return { success: true, updatedCount: mockNotifications.length };
  },
};
