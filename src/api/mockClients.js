const simulateDelay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

export const clientsDB = [
  {
    id: 'cli_001', companyId: 'comp_001', clientCode: 'CLI-0001',
    firstName: 'Jean', lastName: 'Kabongo', gender: 'male', dateOfBirth: '1990-05-14',
    nationality: 'Camerounaise', profession: 'Entrepreneur', documentType: 'cni',
    documentNumber: 'RK123456', documentIssueDate: '2020-03-10', documentExpiryDate: '2030-03-10',
    phone: '+237812345678', phoneSecondary: '+237998765432', email: 'jean.kabongo@email.com',
    address: '12 Avenue Lumumba', neighborhood: 'Lingwala', city: 'Douala',
    region: 'Littoral', country: 'Cameroun', postalCode: '',
    agencyId: 'ag_001', agencyName: 'Agence Centrale',
    status: 'active', isActive: true, isBlocked: false,
    observation: 'Client fidèle depuis 2022', tags: ['fidèle', 'entreprise'],
    shipmentCount: 15, packageCount: 42, paymentCount: 38,
    totalSpent: 2450000, lastActivity: '2025-07-10T14:30:00Z',
    createdAt: '2022-01-15T08:00:00Z', updatedAt: '2025-07-10T14:30:00Z',
    photo: null, signature: null,
  },
  {
    id: 'cli_002', companyId: 'comp_001', clientCode: 'CLI-0002',
    firstName: 'Marie', lastName: 'Mutombo', gender: 'female', dateOfBirth: '1985-08-22',
    nationality: 'Camerounaise', profession: 'Enseignante', documentType: 'cni',
    documentNumber: 'RK789012', documentIssueDate: '2019-06-15', documentExpiryDate: '2029-06-15',
    phone: '+237823456789', phoneSecondary: '', email: 'marie.mutombo@email.com',
    address: '45 Avenue Kasavubu', neighborhood: 'Bandalungwa', city: 'Douala',
    region: 'Littoral', country: 'Cameroun', postalCode: '',
    agencyId: 'ag_001', agencyName: 'Agence Centrale',
    status: 'active', isActive: true, isBlocked: false,
    observation: '', tags: ['régulier'],
    shipmentCount: 8, packageCount: 20, paymentCount: 18,
    totalSpent: 1200000, lastActivity: '2025-07-08T10:15:00Z',
    createdAt: '2022-05-20T09:00:00Z', updatedAt: '2025-07-08T10:15:00Z',
    photo: null, signature: null,
  },
  {
    id: 'cli_003', companyId: 'comp_001', clientCode: 'CLI-0003',
    firstName: 'Pierre', lastName: 'Mukendi', gender: 'male', dateOfBirth: '1978-12-03',
    nationality: 'Camerounaise', profession: 'Commerçant', documentType: 'passport',
    documentNumber: 'P1234567', documentIssueDate: '2021-01-20', documentExpiryDate: '2031-01-20',
    phone: '+237834567890', phoneSecondary: '+237811223344', email: 'pierre.mukendi@email.com',
    address: '78 Avenue de la Paix', neighborhood: 'Gombe', city: 'Douala',
    region: 'Littoral', country: 'Cameroun', postalCode: '',
    agencyId: 'ag_002', agencyName: 'Agence Garoua',
    status: 'active', isActive: true, isBlocked: false,
    observation: 'Gros client export/import', tags: ['premium', 'export'],
    shipmentCount: 35, packageCount: 120, paymentCount: 100,
    totalSpent: 8900000, lastActivity: '2025-07-12T09:45:00Z',
    createdAt: '2021-03-10T07:30:00Z', updatedAt: '2025-07-12T09:45:00Z',
    photo: null, signature: null,
  },
  {
    id: 'cli_004', companyId: 'comp_001', clientCode: 'CLI-0004',
    firstName: 'Sarah', lastName: 'Ngandu', gender: 'female', dateOfBirth: '1995-03-28',
    nationality: 'Camerounaise', profession: 'Infirmière', documentType: 'cni',
    documentNumber: 'RK345678', documentIssueDate: '2022-09-01', documentExpiryDate: '2032-09-01',
    phone: '+237845678901', phoneSecondary: '', email: 'sarah.ngandu@email.com',
    address: '15 Avenue Sentaire', neighborhood: 'Ngaliema', city: 'Douala',
    region: 'Littoral', country: 'Cameroun', postalCode: '',
    agencyId: 'ag_002', agencyName: 'Agence Garoua',
    status: 'active', isActive: true, isBlocked: false,
    observation: '', tags: ['régulier'],
    shipmentCount: 5, packageCount: 12, paymentCount: 10,
    totalSpent: 650000, lastActivity: '2025-06-20T16:00:00Z',
    createdAt: '2023-01-05T10:00:00Z', updatedAt: '2025-06-20T16:00:00Z',
    photo: null, signature: null,
  },
  {
    id: 'cli_005', companyId: 'comp_001', clientCode: 'CLI-0005',
    firstName: 'David', lastName: 'Lukusa', gender: 'male', dateOfBirth: '1982-07-19',
    nationality: 'Camerounaise', profession: 'Médecin', documentType: 'cni',
    documentNumber: 'RK567890', documentIssueDate: '2018-11-12', documentExpiryDate: '2028-11-12',
    phone: '+237856789012', phoneSecondary: '', email: 'david.lukusa@email.com',
    address: '33 Avenue Tombalbaye', neighborhood: 'Limete', city: 'Douala',
    region: 'Littoral', country: 'Cameroun', postalCode: '',
    agencyId: 'ag_003', agencyName: 'Agence Yaoundé',
    status: 'inactive', isActive: false, isBlocked: false,
    observation: 'Inactif depuis 3 mois', tags: [],
    shipmentCount: 3, packageCount: 8, paymentCount: 6,
    totalSpent: 320000, lastActivity: '2025-04-10T11:20:00Z',
    createdAt: '2023-06-15T08:00:00Z', updatedAt: '2025-04-10T11:20:00Z',
    photo: null, signature: null,
  },
  {
    id: 'cli_006', companyId: 'comp_001', clientCode: 'CLI-0006',
    firstName: 'Grace', lastName: 'Tshilombo', gender: 'female', dateOfBirth: '1988-11-05',
    nationality: 'Camerounaise', profession: 'Avocate', documentType: 'cni',
    documentNumber: 'RK678901', documentIssueDate: '2020-04-18', documentExpiryDate: '2030-04-18',
    phone: '+237867890123', phoneSecondary: '+237977889900', email: 'grace.tshilombo@email.com',
    address: '5 Avenue du Commerce', neighborhood: 'Matonge', city: 'Douala',
    region: 'Littoral', country: 'Cameroun', postalCode: '',
    agencyId: 'ag_003', agencyName: 'Agence Yaoundé',
    status: 'blocked', isActive: false, isBlocked: true,
    observation: 'Bloqué pour impayé de 500 000 FC', tags: ['bloqué', 'impayé'],
    shipmentCount: 12, packageCount: 30, paymentCount: 22,
    totalSpent: 1800000, lastActivity: '2025-05-01T08:30:00Z',
    createdAt: '2022-08-22T12:00:00Z', updatedAt: '2025-05-01T08:30:00Z',
    photo: null, signature: null,
  },
  {
    id: 'cli_007', companyId: 'comp_001', clientCode: 'CLI-0007',
    firstName: 'Emmanuel', lastName: 'Kasongo', gender: 'male', dateOfBirth: '1992-01-30',
    nationality: 'Camerounaise', profession: 'Ingénieur', documentType: 'passport',
    documentNumber: 'P7654321', documentIssueDate: '2023-02-14', documentExpiryDate: '2033-02-14',
    phone: '+237878901234', phoneSecondary: '', email: 'emmanuel.kasongo@email.com',
    address: '90 Avenue Kasa-Vubu', neighborhood: 'Kalamu', city: 'Yaoundé',
    region: 'Adamaoua', country: 'Cameroun', postalCode: '',
    agencyId: 'ag_003', agencyName: 'Agence Yaoundé',
    status: 'active', isActive: true, isBlocked: false,
    observation: '', tags: ['nouveau'],
    shipmentCount: 2, packageCount: 5, paymentCount: 4,
    totalSpent: 280000, lastActivity: '2025-07-01T13:00:00Z',
    createdAt: '2025-01-10T09:00:00Z', updatedAt: '2025-07-01T13:00:00Z',
    photo: null, signature: null,
  },
  {
    id: 'cli_008', companyId: 'comp_001', clientCode: 'CLI-0008',
    firstName: 'Chantal', lastName: 'Ilunga', gender: 'female', dateOfBirth: '1975-06-12',
    nationality: 'Camerounaise', profession: 'Commerçante', documentType: 'cni',
    documentNumber: 'RK432109', documentIssueDate: '2017-08-25', documentExpiryDate: '2027-08-25',
    phone: '+237889012345', phoneSecondary: '+237900112233', email: 'chantal.ilunga@email.com',
    address: '22 Avenue Munzeri', neighborhood: 'Akwa', city: 'Bamenda',
    region: 'Centre', country: 'Cameroun', postalCode: '',
    agencyId: 'ag_004', agencyName: 'Agence Bamenda',
    status: 'active', isActive: true, isBlocked: false,
    observation: 'Grossiste, volumes importants', tags: ['grossiste', 'volume'],
    shipmentCount: 45, packageCount: 200, paymentCount: 180,
    totalSpent: 15000000, lastActivity: '2025-07-14T07:00:00Z',
    createdAt: '2021-06-01T06:00:00Z', updatedAt: '2025-07-14T07:00:00Z',
    photo: null, signature: null,
  },
  {
    id: 'cli_009', companyId: 'comp_001', clientCode: 'CLI-0009',
    firstName: 'Josué', lastName: 'Kabongo', gender: 'male', dateOfBirth: '1998-09-20',
    nationality: 'Camerounaise', profession: 'Étudiant', documentType: 'cni',
    documentNumber: 'RK112233', documentIssueDate: '2024-01-10', documentExpiryDate: '2034-01-10',
    phone: '+237890123456', phoneSecondary: '', email: 'josue.kabongo@email.com',
    address: '5 Avenue Kasavubu', neighborhood: 'Kimbanseke', city: 'Douala',
    region: 'Littoral', country: 'Cameroun', postalCode: '',
    agencyId: 'ag_001', agencyName: 'Agence Centrale',
    status: 'active', isActive: true, isBlocked: false,
    observation: 'Nouveau client', tags: ['nouveau'],
    shipmentCount: 1, packageCount: 2, paymentCount: 1,
    totalSpent: 45000, lastActivity: '2025-07-15T12:00:00Z',
    createdAt: '2025-07-15T10:00:00Z', updatedAt: '2025-07-15T12:00:00Z',
    photo: null, signature: null,
  },
  {
    id: 'cli_010', companyId: 'comp_001', clientCode: 'CLI-0010',
    firstName: 'Esther', lastName: 'Mbuyi', gender: 'female', dateOfBirth: '1980-04-17',
    nationality: 'Camerounaise', profession: 'Femme d\'affaires', documentType: 'passport',
    documentNumber: 'P9988776', documentIssueDate: '2022-05-30', documentExpiryDate: '2032-05-30',
    phone: '+237801234567', phoneSecondary: '+237811998877', email: 'esther.mbuyi@email.com',
    address: '100 Avenue Tabora', neighborhood: 'Akwa', city: 'Kribi',
    region: 'Sud', country: 'Cameroun', postalCode: '',
    agencyId: 'ag_002', agencyName: 'Agence Garoua',
    status: 'active', isActive: true, isBlocked: false,
    observation: 'Commerce international', tags: ['international', 'premium'],
    shipmentCount: 28, packageCount: 95, paymentCount: 85,
    totalSpent: 7200000, lastActivity: '2025-07-13T15:20:00Z',
    createdAt: '2022-02-14T11:00:00Z', updatedAt: '2025-07-13T15:20:00Z',
    photo: null, signature: null,
  },
  {
    id: 'cli_011', companyId: 'comp_001', clientCode: 'CLI-0011',
    firstName: 'Patrick', lastName: 'Kalala', gender: 'male', dateOfBirth: '1976-02-11',
    nationality: 'Camerounaise', profession: 'Transporteur', documentType: 'cni',
    documentNumber: 'RK881234', documentIssueDate: '2019-09-05', documentExpiryDate: '2029-09-05',
    phone: '+237812001122', phoneSecondary: '', email: 'patrick.kalala@email.com',
    address: '8 Avenue des Transports', neighborhood: 'Lingwala', city: 'Douala',
    region: 'Littoral', country: 'Cameroun', postalCode: '',
    agencyId: 'ag_001', agencyName: 'Agence Centrale',
    status: 'active', isActive: true, isBlocked: false,
    observation: 'Gros volumes mensuels', tags: ['volume', 'régulier'],
    shipmentCount: 52, packageCount: 180, paymentCount: 160,
    totalSpent: 12500000, lastActivity: '2026-07-16T08:30:00Z',
    createdAt: '2020-04-12T07:00:00Z', updatedAt: '2026-07-16T08:30:00Z',
    photo: null, signature: null,
  },
  {
    id: 'cli_012', companyId: 'comp_001', clientCode: 'CLI-0012',
    firstName: 'Céline', lastName: 'Wa Mukendi', gender: 'female', dateOfBirth: '1993-10-08',
    nationality: 'Camerounaise', profession: 'Pharmacienne', documentType: 'cni',
    documentNumber: 'RK994567', documentIssueDate: '2021-11-20', documentExpiryDate: '2031-11-20',
    phone: '+237823003344', phoneSecondary: '', email: 'celine.wamukendi@email.com',
    address: '27 Avenue du Peuple', neighborhood: 'Gombe', city: 'Douala',
    region: 'Littoral', country: 'Cameroun', postalCode: '',
    agencyId: 'ag_002', agencyName: 'Agence Garoua',
    status: 'active', isActive: true, isBlocked: false,
    observation: 'Envois réguliers de médicaments', tags: ['régulier', 'médical'],
    shipmentCount: 18, packageCount: 50, paymentCount: 45,
    totalSpent: 3800000, lastActivity: '2026-07-14T11:00:00Z',
    createdAt: '2023-03-08T09:00:00Z', updatedAt: '2026-07-14T11:00:00Z',
    photo: null, signature: null,
  },
  {
    id: 'cli_013', companyId: 'comp_001', clientCode: 'CLI-0013',
    firstName: 'Lucien', lastName: 'Molua', gender: 'male', dateOfBirth: '1987-06-25',
    nationality: 'Camerounaise', profession: 'Informaticien', documentType: 'passport',
    documentNumber: 'P5567890', documentIssueDate: '2022-07-14', documentExpiryDate: '2032-07-14',
    phone: '+237834005566', phoneSecondary: '+237990112233', email: 'lucien.molua@email.com',
    address: '5 Avenue Lumumba', neighborhood: 'Quartier 3', city: 'Yaoundé',
    region: 'Adamaoua', country: 'Cameroun', postalCode: '',
    agencyId: 'ag_003', agencyName: 'Agence Yaoundé',
    status: 'active', isActive: true, isBlocked: false,
    observation: 'Équipements informatiques', tags: ['tech', 'régulier'],
    shipmentCount: 10, packageCount: 28, paymentCount: 25,
    totalSpent: 1950000, lastActivity: '2026-07-12T16:45:00Z',
    createdAt: '2023-08-01T10:00:00Z', updatedAt: '2026-07-12T16:45:00Z',
    photo: null, signature: null,
  },
  {
    id: 'cli_014', companyId: 'comp_001', clientCode: 'CLI-0014',
    firstName: 'Annie', lastName: 'Tshala', gender: 'female', dateOfBirth: '1991-12-01',
    nationality: 'Camerounaise', profession: 'Enseignante', documentType: 'cni',
    documentNumber: 'RK223344', documentIssueDate: '2023-01-15', documentExpiryDate: '2033-01-15',
    phone: '+237845007788', phoneSecondary: '', email: 'annie.tshala@email.com',
    address: '12 Avenue Kasai', neighborhood: 'Kintambo', city: 'Douala',
    region: 'Littoral', country: 'Cameroun', postalCode: '',
    agencyId: 'ag_001', agencyName: 'Agence Centrale',
    status: 'inactive', isActive: false, isBlocked: false,
    observation: 'Déménagée à Yaoundé', tags: [],
    shipmentCount: 4, packageCount: 10, paymentCount: 8,
    totalSpent: 520000, lastActivity: '2025-11-20T14:00:00Z',
    createdAt: '2024-01-15T08:30:00Z', updatedAt: '2025-11-20T14:00:00Z',
    photo: null, signature: null,
  },
  {
    id: 'cli_015', companyId: 'comp_001', clientCode: 'CLI-0015',
    firstName: 'Rodrigue', lastName: 'Ngoy', gender: 'male', dateOfBirth: '1983-04-18',
    nationality: 'Camerounaise', profession: 'Mécanicien', documentType: 'cni',
    documentNumber: 'RK445566', documentIssueDate: '2020-06-10', documentExpiryDate: '2030-06-10',
    phone: '+237856009900', phoneSecondary: '', email: 'rodrigue.ngoy@email.com',
    address: '35 Avenue Industrielle', neighborhood: 'Kimbanseke', city: 'Douala',
    region: 'Littoral', country: 'Cameroun', postalCode: '',
    agencyId: 'ag_001', agencyName: 'Agence Centrale',
    status: 'active', isActive: true, isBlocked: false,
    observation: 'Pièces détachées automobiles', tags: ['technique'],
    shipmentCount: 7, packageCount: 18, paymentCount: 15,
    totalSpent: 980000, lastActivity: '2026-07-15T09:20:00Z',
    createdAt: '2024-03-10T11:00:00Z', updatedAt: '2026-07-15T09:20:00Z',
    photo: null, signature: null,
  },
  {
    id: 'cli_016', companyId: 'comp_001', clientCode: 'CLI-0016',
    firstName: 'Véronique', lastName: 'Kayembe', gender: 'female', dateOfBirth: '1979-08-30',
    nationality: 'Camerounaise', profession: 'Directrice commerciale', documentType: 'passport',
    documentNumber: 'P3344556', documentIssueDate: '2021-04-22', documentExpiryDate: '2031-04-22',
    phone: '+237867011122', phoneSecondary: '+237987001122', email: 'veronique.kayembe@email.com',
    address: '50 Avenue du Commerce', neighborhood: 'Bandalungwa', city: 'Douala',
    region: 'Littoral', country: 'Cameroun', postalCode: '',
    agencyId: 'ag_001', agencyName: 'Agence Centrale',
    status: 'active', isActive: true, isBlocked: false,
    observation: 'Import-export, gros volumes', tags: ['premium', 'export', 'volume'],
    shipmentCount: 60, packageCount: 250, paymentCount: 220,
    totalSpent: 22000000, lastActivity: '2026-07-17T07:15:00Z',
    createdAt: '2021-05-20T06:00:00Z', updatedAt: '2026-07-17T07:15:00Z',
    photo: null, signature: null,
  },
  {
    id: 'cli_017', companyId: 'comp_001', clientCode: 'CLI-0017',
    firstName: 'Josué', lastName: 'Ilunga', gender: 'male', dateOfBirth: '1996-01-05',
    nationality: 'Camerounaise', profession: 'Étudiant', documentType: 'cni',
    documentNumber: 'RK667788', documentIssueDate: '2024-06-01', documentExpiryDate: '2034-06-01',
    phone: '+237878013344', phoneSecondary: '', email: 'josue.ilunga@email.com',
    address: '3 Avenue Universitaire', neighborhood: 'Kasa-Vubu', city: 'Yaoundé',
    region: 'Adamaoua', country: 'Cameroun', postalCode: '',
    agencyId: 'ag_003', agencyName: 'Agence Yaoundé',
    status: 'active', isActive: true, isBlocked: false,
    observation: 'Envois ponctuels', tags: ['nouveau'],
    shipmentCount: 2, packageCount: 3, paymentCount: 2,
    totalSpent: 85000, lastActivity: '2026-07-10T13:00:00Z',
    createdAt: '2026-06-10T09:00:00Z', updatedAt: '2026-07-10T13:00:00Z',
    photo: null, signature: null,
  },
  {
    id: 'cli_018', companyId: 'comp_001', clientCode: 'CLI-0018',
    firstName: 'Ruth', lastName: 'Mwamba', gender: 'female', dateOfBirth: '1989-05-14',
    nationality: 'Camerounaise', profession: 'Commerçante', documentType: 'cni',
    documentNumber: 'RK778899', documentIssueDate: '2019-12-20', documentExpiryDate: '2029-12-20',
    phone: '+237889015566', phoneSecondary: '', email: 'ruth.mwamba@email.com',
    address: '18 Avenue Marchande', neighborhood: 'Centre-ville', city: 'Yaoundé',
    region: 'Adamaoua', country: 'Cameroun', postalCode: '',
    agencyId: 'ag_003', agencyName: 'Agence Yaoundé',
    status: 'active', isActive: true, isBlocked: false,
    observation: 'Textile et mercerie', tags: ['commerce', 'régulier'],
    shipmentCount: 22, packageCount: 70, paymentCount: 60,
    totalSpent: 4500000, lastActivity: '2026-07-16T10:30:00Z',
    createdAt: '2022-07-15T08:00:00Z', updatedAt: '2026-07-16T10:30:00Z',
    photo: null, signature: null,
  },
  {
    id: 'cli_019', companyId: 'comp_001', clientCode: 'CLI-0019',
    firstName: 'Théodore', lastName: 'Luboya', gender: 'male', dateOfBirth: '1974-11-22',
    nationality: 'Camerounaise', profession: 'Avocat', documentType: 'passport',
    documentNumber: 'P8899001', documentIssueDate: '2018-03-10', documentExpiryDate: '2028-03-10',
    phone: '+237890017788', phoneSecondary: '+237901122334', email: 'theodore.luboya@email.com',
    address: '40 Avenue Justice', neighborhood: 'Gombe', city: 'Douala',
    region: 'Littoral', country: 'Cameroun', postalCode: '',
    agencyId: 'ag_002', agencyName: 'Agence Garoua',
    status: 'blocked', isActive: false, isBlocked: true,
    observation: 'Bloqué — dette de 1 200 000 FC', tags: ['bloqué', 'impayé'],
    shipmentCount: 15, packageCount: 40, paymentCount: 30,
    totalSpent: 3200000, lastActivity: '2025-12-01T16:00:00Z',
    createdAt: '2021-09-01T10:00:00Z', updatedAt: '2025-12-01T16:00:00Z',
    photo: null, signature: null,
  },
  {
    id: 'cli_020', companyId: 'comp_001', clientCode: 'CLI-0020',
    firstName: 'Madeleine', lastName: 'Sassou', gender: 'female', dateOfBirth: '1994-07-09',
    nationality: 'Camerounaise', profession: 'Architecte', documentType: 'cni',
    documentNumber: 'RK112200', documentIssueDate: '2022-08-05', documentExpiryDate: '2032-08-05',
    phone: '+237801019900', phoneSecondary: '', email: 'madeleine.sassou@email.com',
    address: '22 Avenue Construction', neighborhood: 'Ngaliema', city: 'Douala',
    region: 'Littoral', country: 'Cameroun', postalCode: '',
    agencyId: 'ag_002', agencyName: 'Agence Garoua',
    status: 'active', isActive: true, isBlocked: false,
    observation: '', tags: ['nouveau'],
    shipmentCount: 1, packageCount: 2, paymentCount: 1,
    totalSpent: 65000, lastActivity: '2026-07-17T14:00:00Z',
    createdAt: '2026-07-01T10:00:00Z', updatedAt: '2026-07-17T14:00:00Z',
    photo: null, signature: null,
  },
  {
    id: 'cli_021', companyId: 'comp_001', clientCode: 'CLI-0021',
    firstName: 'Hippolyte', lastName: 'Mutambayi', gender: 'male', dateOfBirth: '1981-03-17',
    nationality: 'Camerounaise', profession: 'Chef d\'entreprise', documentType: 'passport',
    documentNumber: 'P4455001', documentIssueDate: '2020-10-12', documentExpiryDate: '2030-10-12',
    phone: '+237812021122', phoneSecondary: '+237998001122', email: 'hippolyte.mutambayi@email.com',
    address: '60 Avenue Principale', neighborhood: 'Limbé', city: 'Limbe',
    region: 'Littoral', country: 'Cameroun', postalCode: '',
    agencyId: 'ag_004', agencyName: 'Agence Bamenda',
    status: 'active', isActive: true, isBlocked: false,
    observation: 'Import-export via Limbé', tags: ['export', 'premium'],
    shipmentCount: 30, packageCount: 110, paymentCount: 95,
    totalSpent: 9500000, lastActivity: '2026-07-15T15:30:00Z',
    createdAt: '2021-11-08T07:30:00Z', updatedAt: '2026-07-15T15:30:00Z',
    photo: null, signature: null,
  },
  {
    id: 'cli_022', companyId: 'comp_001', clientCode: 'CLI-0022',
    firstName: 'Sandrine', lastName: 'Kavira', gender: 'female', dateOfBirth: '1997-09-03',
    nationality: 'Camerounaise', profession: 'Infirmière', documentType: 'cni',
    documentNumber: 'RK334411', documentIssueDate: '2023-05-20', documentExpiryDate: '2033-05-20',
    phone: '+237823023344', phoneSecondary: '', email: 'sandrine.kavira@email.com',
    address: '14 Avenue Santé', neighborhood: 'Katuba', city: 'Kribi',
    region: 'Sud', country: 'Cameroun', postalCode: '',
    agencyId: 'ag_002', agencyName: 'Agence Garoua',
    status: 'active', isActive: true, isBlocked: false,
    observation: 'Envois de médicaments', tags: ['médical'],
    shipmentCount: 6, packageCount: 15, paymentCount: 12,
    totalSpent: 780000, lastActivity: '2026-07-13T08:45:00Z',
    createdAt: '2024-05-20T09:00:00Z', updatedAt: '2026-07-13T08:45:00Z',
    photo: null, signature: null,
  },
  {
    id: 'cli_023', companyId: 'comp_001', clientCode: 'CLI-0023',
    firstName: 'Benoît', lastName: 'Kasongo', gender: 'male', dateOfBirth: '1970-12-28',
    nationality: 'Camerounaise', profession: 'Député', documentType: 'passport',
    documentNumber: 'P6677001', documentIssueDate: '2019-02-14', documentExpiryDate: '2029-02-14',
    phone: '+237834025566', phoneSecondary: '+237911002233', email: 'benoit.kasongo@email.com',
    address: '1 Avenue Politique', neighborhood: 'Gombe', city: 'Douala',
    region: 'Littoral', country: 'Cameroun', postalCode: '',
    agencyId: 'ag_002', agencyName: 'Agence Garoua',
    status: 'active', isActive: true, isBlocked: false,
    observation: 'Client VIP', tags: ['vip', 'premium'],
    shipmentCount: 8, packageCount: 25, paymentCount: 22,
    totalSpent: 5600000, lastActivity: '2026-07-11T12:00:00Z',
    createdAt: '2022-02-14T11:00:00Z', updatedAt: '2026-07-11T12:00:00Z',
    photo: null, signature: null,
  },
  {
    id: 'cli_024', companyId: 'comp_001', clientCode: 'CLI-0024',
    firstName: 'Ornella', lastName: 'Mputu', gender: 'female', dateOfBirth: '2000-02-14',
    nationality: 'Camerounaise', profession: 'Stagiaire', documentType: 'cni',
    documentNumber: 'RK556622', documentIssueDate: '2024-09-01', documentExpiryDate: '2034-09-01',
    phone: '+237845027788', phoneSecondary: '', email: 'ornella.mputu@email.com',
    address: '7 Avenue Jeunesse', neighborhood: 'Masina', city: 'Douala',
    region: 'Littoral', country: 'Cameroun', postalCode: '',
    agencyId: 'ag_001', agencyName: 'Agence Centrale',
    status: 'inactive', isActive: false, isBlocked: false,
    observation: 'Stage terminé, plus d\'activité', tags: [],
    shipmentCount: 1, packageCount: 1, paymentCount: 1,
    totalSpent: 25000, lastActivity: '2026-03-15T10:00:00Z',
    createdAt: '2026-01-10T08:00:00Z', updatedAt: '2026-03-15T10:00:00Z',
    photo: null, signature: null,
  },
  {
    id: 'cli_025', companyId: 'comp_001', clientCode: 'CLI-0025',
    firstName: 'Alain', lastName: 'Kapela', gender: 'male', dateOfBirth: '1985-06-20',
    nationality: 'Camerounaise', profession: 'Directeur logistique', documentType: 'cni',
    documentNumber: 'RK778811', documentIssueDate: '2021-07-18', documentExpiryDate: '2031-07-18',
    phone: '+237856029900', phoneSecondary: '+237933001122', email: 'alain.kapela@email.com',
    address: '55 Avenue Logistique', neighborhood: 'Senge', city: 'Maroua',
    region: 'Nord', country: 'Cameroun', postalCode: '',
    agencyId: 'ag_002', agencyName: 'Agence Garoua',
    status: 'active', isActive: true, isBlocked: false,
    observation: 'Partenaire logistique fiable', tags: ['partenaire', 'premium'],
    shipmentCount: 40, packageCount: 150, paymentCount: 130,
    totalSpent: 11000000, lastActivity: '2026-07-17T06:00:00Z',
    createdAt: '2021-07-18T06:00:00Z', updatedAt: '2026-07-17T06:00:00Z',
    photo: null, signature: null,
  },
];

let documentsDB = [
  { id: 'doc_001', clientId: 'cli_001', companyId: 'comp_001', name: 'CNI', type: 'cni', fileName: 'cni_jean.pdf', fileUrl: '#', mimeType: 'application/pdf', size: 245000, uploadedAt: '2022-01-15T08:00:00Z' },
  { id: 'doc_002', clientId: 'cli_003', companyId: 'comp_001', name: 'Passeport', type: 'passport', fileName: 'passport_pierre.pdf', fileUrl: '#', mimeType: 'application/pdf', size: 312000, uploadedAt: '2021-03-10T07:30:00Z' },
  { id: 'doc_003', clientId: 'cli_006', companyId: 'comp_001', name: 'CNI', type: 'cni', fileName: 'cni_grace.pdf', fileUrl: '#', mimeType: 'application/pdf', size: 198000, uploadedAt: '2022-08-22T12:00:00Z' },
  { id: 'doc_004', clientId: 'cli_008', companyId: 'comp_001', name: 'CNI', type: 'cni', fileName: 'cni_chantal.pdf', fileUrl: '#', mimeType: 'application/pdf', size: 267000, uploadedAt: '2021-06-01T06:00:00Z' },
];

let historyDB = [
  { id: 'hist_001', clientId: 'cli_001', companyId: 'comp_001', type: 'creation', description: 'Client créé', details: 'Inscription à l\'Agence Centrale', timestamp: '2022-01-15T08:00:00Z', userId: 'usr_001' },
  { id: 'hist_002', clientId: 'cli_001', companyId: 'comp_001', type: 'modification', description: 'Profil mis à jour', details: 'Numéro de téléphone modifié', timestamp: '2023-06-10T14:20:00Z', userId: 'usr_001' },
  { id: 'hist_003', clientId: 'cli_001', companyId: 'comp_001', type: 'expedition', description: 'Expéditition #EXP-2024-001', details: 'Colis envoyé vers Yaoundé', timestamp: '2024-03-01T09:00:00Z', userId: 'usr_002' },
  { id: 'hist_004', clientId: 'cli_001', companyId: 'comp_001', type: 'paiement', description: 'Paiement reçu', details: '150 000 FC via Mobile Money', timestamp: '2024-03-01T09:30:00Z', userId: 'usr_002' },
  { id: 'hist_005', clientId: 'cli_001', companyId: 'comp_001', type: 'document', description: 'Document ajouté', details: 'CNI téléversée', timestamp: '2022-01-15T08:05:00Z', userId: 'usr_001' },
  { id: 'hist_006', clientId: 'cli_006', companyId: 'comp_001', type: 'statut', description: 'Client bloqué', details: 'Impayé de 500 000 FC', timestamp: '2025-05-01T08:30:00Z', userId: 'usr_001' },
  { id: 'hist_007', clientId: 'cli_003', companyId: 'comp_001', type: 'expedition', description: 'Expéditition #EXP-2025-042', details: 'Colis envoyé vers Bamenda', timestamp: '2025-07-12T09:00:00Z', userId: 'usr_002' },
  { id: 'hist_008', clientId: 'cli_003', companyId: 'comp_001', type: 'paiement', description: 'Paiement reçu', details: '320 000 FC via Carte bancaire', timestamp: '2025-07-12T09:15:00Z', userId: 'usr_002' },
];

let photosDB = [];
let nextClientId = 26;
let nextDocId = 5;
let nextHistId = 9;
let nextPhotoId = 1;

function getByCompany(companyId) { return clientsDB.filter((c) => c.companyId === companyId); }

function searchFilter(items, search) {
  if (!search) return items;
  const q = search.toLowerCase();
  return items.filter((c) =>
    c.firstName.toLowerCase().includes(q) || c.lastName.toLowerCase().includes(q) ||
    c.phone.includes(q) || (c.email || '').toLowerCase().includes(q) ||
    c.documentNumber.toLowerCase().includes(q) || c.clientCode.toLowerCase().includes(q) ||
    c.city.toLowerCase().includes(q) || (c.agencyName || '').toLowerCase().includes(q)
  );
}

function applyFilters(items, filters) {
  return items.filter((c) => {
    if (filters.status && c.status !== filters.status) return false;
    if (filters.agencyId && c.agencyId !== filters.agencyId) return false;
    if (filters.city && c.city !== filters.city) return false;
    if (filters.isActive !== '' && c.isActive !== (filters.isActive === 'true')) return false;
    if (filters.isBlocked !== '' && c.isBlocked !== (filters.isBlocked === 'true')) return false;
    if (filters.hasShipments !== '' && (filters.hasShipments === 'true' ? c.shipmentCount === 0 : c.shipmentCount > 0)) return false;
    if (filters.hasPayments !== '' && (filters.hasPayments === 'true' ? c.paymentCount === 0 : c.paymentCount > 0)) return false;
    if (filters.dateFrom && c.createdAt < filters.dateFrom) return false;
    if (filters.dateTo && c.createdAt > filters.dateTo + 'T23:59:59Z') return false;
    return true;
  });
}

function applySort(items, sort) {
  const { field, direction } = sort || { field: 'createdAt', direction: 'desc' };
  return [...items].sort((a, b) => {
    let va = a[field] || '';
    let vb = b[field] || '';
    if (typeof va === 'string') va = va.toLowerCase();
    if (typeof vb === 'string') vb = vb.toLowerCase();
    if (va < vb) return direction === 'asc' ? -1 : 1;
    if (va > vb) return direction === 'asc' ? 1 : -1;
    return 0;
  });
}

export const mockClientsService = {
  async getAll(companyId, { search = '', filters = {}, sort = {}, page = 1, perPage = 10 } = {}) {
    await simulateDelay(350);
    let items = getByCompany(companyId);
    items = searchFilter(items, search);
    items = applyFilters(items, filters);
    items = applySort(items, sort);
    const total = items.length;
    const totalPages = Math.ceil(total / perPage);
    const start = (page - 1) * perPage;
    return { data: items.slice(start, start + perPage), page, perPage, total, totalPages };
  },

  async getById(companyId, clientId) {
    await simulateDelay(250);
    const client = getByCompany(companyId).find((c) => c.id === clientId);
    if (!client) throw new Error('Client non trouvé');
    return client;
  },

  async create(companyId, data) {
    await simulateDelay(500);
    const code = `CLI-${String(nextClientId).padStart(4, '0')}`;
    const client = {
      id: `cli_${String(nextClientId++).padStart(3, '0')}`,
      companyId, clientCode: code, ...data,
      shipmentCount: 0, packageCount: 0, paymentCount: 0, totalSpent: 0,
      status: 'active', isActive: true, isBlocked: false,
      lastActivity: new Date().toISOString(),
      createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
      photo: null, signature: null, tags: data.tags || [],
    };
    //clientsDB = [...clientsDB, client];
    historyDB = [...historyDB, { id: `hist_${String(nextHistId++).padStart(3, '0')}`, clientId: client.id, companyId, type: 'creation', description: 'Client créé', details: `Inscription (${data.agencyName || data.agencyId})`, timestamp: new Date().toISOString(), userId: 'usr_001' }];
    return client;
  },

  async update(companyId, clientId, data) {
    await simulateDelay(400);
    const idx = clientsDB.findIndex((c) => c.id === clientId && c.companyId === companyId);
    if (idx === -1) throw new Error('Client non trouvé');
    clientsDB[idx] = { ...clientsDB[idx], ...data, updatedAt: new Date().toISOString() };
    historyDB = [...historyDB, { id: `hist_${String(nextHistId++).padStart(3, '0')}`, clientId, companyId, type: 'modification', description: 'Profil mis à jour', details: 'Informations modifiées', timestamp: new Date().toISOString(), userId: 'usr_001' }];
    return clientsDB[idx];
  },

  async archive(companyId, clientId) {
    await simulateDelay(300);
    const idx = clientsDB.findIndex((c) => c.id === clientId && c.companyId === companyId);
    if (idx === -1) throw new Error('Client non trouvé');
    clientsDB[idx] = { ...clientsDB[idx], status: 'inactive', isActive: false, updatedAt: new Date().toISOString() };
    historyDB = [...historyDB, { id: `hist_${String(nextHistId++).padStart(3, '0')}`, clientId, companyId, type: 'statut', description: 'Client archivé', details: 'Statut changé en inactif', timestamp: new Date().toISOString(), userId: 'usr_001' }];
    return clientsDB[idx];
  },

  async activate(companyId, clientId) {
    await simulateDelay(300);
    const idx = clientsDB.findIndex((c) => c.id === clientId && c.companyId === companyId);
    if (idx === -1) throw new Error('Client non trouvé');
    clientsDB[idx] = { ...clientsDB[idx], status: 'active', isActive: true, isBlocked: false, updatedAt: new Date().toISOString() };
    return clientsDB[idx];
  },

  async deactivate(companyId, clientId) {
    await simulateDelay(300);
    const idx = clientsDB.findIndex((c) => c.id === clientId && c.companyId === companyId);
    if (idx === -1) throw new Error('Client non trouvé');
    clientsDB[idx] = { ...clientsDB[idx], status: 'inactive', isActive: false, updatedAt: new Date().toISOString() };
    return clientsDB[idx];
  },

  async block(companyId, clientId) {
    await simulateDelay(300);
    const idx = clientsDB.findIndex((c) => c.id === clientId && c.companyId === companyId);
    if (idx === -1) throw new Error('Client non trouvé');
    clientsDB[idx] = { ...clientsDB[idx], status: 'blocked', isBlocked: true, isActive: false, updatedAt: new Date().toISOString() };
    historyDB = [...historyDB, { id: `hist_${String(nextHistId++).padStart(3, '0')}`, clientId, companyId, type: 'statut', description: 'Client bloqué', details: 'Bloqué par un administrateur', timestamp: new Date().toISOString(), userId: 'usr_001' }];
    return clientsDB[idx];
  },

  async getCount(companyId) {
    await simulateDelay(200);
    const items = getByCompany(companyId);
    const now = new Date();
    const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30)).toISOString();
    return {
      total: items.length,
      active: items.filter((c) => c.status === 'active').length,
      inactive: items.filter((c) => c.status === 'inactive').length,
      blocked: items.filter((c) => c.status === 'blocked').length,
      newThisMonth: items.filter((c) => c.createdAt >= thirtyDaysAgo).length,
    };
  },

  async getHistory(companyId, clientId) {
    await simulateDelay(300);
    return historyDB.filter((h) => h.clientId === clientId && h.companyId === companyId).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  },

  async getDocuments(companyId, clientId) {
    await simulateDelay(250);
    return documentsDB.filter((d) => d.clientId === clientId && d.companyId === companyId);
  },

  async addDocument(companyId, clientId, doc) {
    await simulateDelay(400);
    const newDoc = { id: `doc_${String(nextDocId++).padStart(3, '0')}`, clientId, companyId, ...doc, uploadedAt: new Date().toISOString() };
    documentsDB = [...documentsDB, newDoc];
    historyDB = [...historyDB, { id: `hist_${String(nextHistId++).padStart(3, '0')}`, clientId, companyId, type: 'document', description: 'Document ajouté', details: doc.name, timestamp: new Date().toISOString(), userId: 'usr_001' }];
    return newDoc;
  },

  async removeDocument(companyId, docId) {
    await simulateDelay(300);
    const doc = documentsDB.find((d) => d.id === docId && d.companyId === companyId);
    if (!doc) throw new Error('Document non trouvé');
    historyDB = [...historyDB, { id: `hist_${String(nextHistId++).padStart(3, '0')}`, clientId: doc.clientId, companyId, type: 'document', description: 'Document supprimé', details: doc.name, timestamp: new Date().toISOString(), userId: 'usr_001' }];
    documentsDB = documentsDB.filter((d) => d.id !== docId);
    return { message: 'Document supprimé' };
  },

  async addPhoto(companyId, clientId, photo) {
    await simulateDelay(400);
    const newPhoto = { id: `photo_${String(nextPhotoId++).padStart(3, '0')}`, clientId, companyId, url: photo.url, name: photo.name, uploadedAt: new Date().toISOString() };
    photosDB = [...photosDB, newPhoto];
    historyDB = [...historyDB, { id: `hist_${String(nextHistId++).padStart(3, '0')}`, clientId, companyId, type: 'photo', description: 'Photo ajoutée', details: photo.name, timestamp: new Date().toISOString(), userId: 'usr_001' }];
    return newPhoto;
  },

  async removePhoto(companyId, photoId) {
    await simulateDelay(300);
    photosDB = photosDB.filter((p) => p.id !== photoId);
    return { message: 'Photo supprimée' };
  },

  async getPhotos(companyId, clientId) {
    await simulateDelay(250);
    return photosDB.filter((p) => p.clientId === clientId && p.companyId === companyId);
  },

  async getStatistics(companyId) {
    await simulateDelay(300);
    const items = getByCompany(companyId);
    const sorted = [...items].sort((a, b) => b.totalSpent - a.totalSpent);
    return {
      total: items.length,
      active: items.filter((c) => c.status === 'active').length,
      inactive: items.filter((c) => c.status === 'inactive').length,
      blocked: items.filter((c) => c.status === 'blocked').length,
      topClients: sorted.slice(0, 5).map((c) => ({ id: c.id, name: `${c.firstName} ${c.lastName}`, totalSpent: c.totalSpent, shipments: c.shipmentCount })),
      mostActive: [...items].sort((a, b) => new Date(b.lastActivity) - new Date(a.lastActivity)).slice(0, 5).map((c) => ({ id: c.id, name: `${c.firstName} ${c.lastName}`, lastActivity: c.lastActivity, shipments: c.shipmentCount })),
      totalRevenue: items.reduce((sum, c) => sum + c.totalSpent, 0),
    };
  },

  async checkDuplicate(companyId, data) {
    await simulateDelay(200);
    const items = getByCompany(companyId);
    return items.find((c) => c.phone === data.phone || (data.email && c.email === data.email) || c.documentNumber === data.documentNumber) || null;
  },
};
