const simulateDelay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

let shipmentsDB = [
  {
    id: 'shp_001', companyId: 'comp_001', shipmentNumber: 'EXP-20260701-0001',
    senderId: 'cli_001', senderName: 'Jean Kabongo', senderPhone: '+237812345678',
    receiverId: 'cli_003', receiverName: 'Pierre Mukendi', receiverPhone: '+237834567890',
    originAgencyId: 'ag_001', originAgencyName: 'Agence Centrale', originCity: 'Douala',
    destinationAgencyId: 'ag_003', destinationAgencyName: 'Agence Yaoundé', destinationCity: 'Yaoundé',
    routeId: 'rt_001', routeName: 'Douala → Yaoundé',
    status: 'delivered', agentId: 'usr_001', agentName: 'Admin',
    packages: [
      { id: 'pkg_001', code: 'PKG-001', label: 'Carton vêtements', category: 'vêtements', description: 'Vêtements divers', weight: 15, length: 50, width: 40, height: 30, declaredValue: 200000, fragile: false, insured: true, insuranceAmount: 10000, transportAmount: 25000, totalAmount: 35000 },
      { id: 'pkg_002', code: 'PKG-002', label: 'Sac riz', category: 'alimentation', description: 'Riz 25kg', weight: 25, length: 60, width: 40, height: 40, declaredValue: 150000, fragile: false, insured: false, insuranceAmount: 0, transportAmount: 40000, totalAmount: 40000 },
      { id: 'pkg_003', code: 'PKG-003', label: 'Télévision', category: 'électronique', description: 'TV LED 55"', weight: 18, length: 130, width: 80, height: 10, declaredValue: 800000, fragile: true, insured: true, insuranceAmount: 40000, transportAmount: 55000, totalAmount: 95000 },
    ],
    totalWeight: 58, maxWeight: 100, packageCount: 3,
    transportAmount: 120000, insuranceAmount: 50000, totalAmount: 170000,
    observation: 'Colis fragile — TV', createdAt: '2026-07-01T08:00:00Z', updatedAt: '2026-07-05T14:00:00Z', validatedAt: '2026-07-01T08:30:00Z', deliveredAt: '2026-07-05T14:00:00Z',
  },
  {
    id: 'shp_002', companyId: 'comp_001', shipmentNumber: 'EXP-20260710-0002',
    senderId: 'cli_008', senderName: 'Chantal Ilunga', senderPhone: '+237889012345',
    receiverId: 'cli_001', receiverName: 'Jean Kabongo', receiverPhone: '+237812345678',
    originAgencyId: 'ag_004', originAgencyName: 'Agence Bamenda', originCity: 'Bamenda',
    destinationAgencyId: 'ag_001', destinationAgencyName: 'Agence Centrale', destinationCity: 'Douala',
    routeId: 'rt_003', routeName: 'Bamenda → Douala',
    status: 'in_transit', agentId: 'usr_002', agentName: 'Agent Guichet',
    packages: [
      { id: 'pkg_004', code: 'PKG-004', label: 'Carton marchandises', category: 'commerce', description: 'Marchandises diverses', weight: 30, length: 60, width: 50, height: 40, declaredValue: 500000, fragile: false, insured: true, insuranceAmount: 25000, transportAmount: 50000, totalAmount: 75000 },
      { id: 'pkg_005', code: 'PKG-005', label: 'Valise bagages', category: 'bagages', description: 'Bagages personnels', weight: 12, length: 70, width: 50, height: 25, declaredValue: 300000, fragile: false, insured: false, insuranceAmount: 0, transportAmount: 20000, totalAmount: 20000 },
    ],
    totalWeight: 42, maxWeight: 100, packageCount: 2,
    transportAmount: 70000, insuranceAmount: 25000, totalAmount: 95000,
    observation: '', createdAt: '2026-07-10T10:00:00Z', updatedAt: '2026-07-12T06:00:00Z', validatedAt: '2026-07-10T10:30:00Z',
  },
  {
    id: 'shp_003', companyId: 'comp_001', shipmentNumber: 'EXP-20260715-0003',
    senderId: 'cli_003', senderName: 'Pierre Mukendi', senderPhone: '+237834567890',
    receiverId: 'cli_010', receiverName: 'Esther Mbuyi', receiverPhone: '+237801234567',
    originAgencyId: 'ag_002', originAgencyName: 'Agence Garoua', originCity: 'Douala',
    destinationAgencyId: 'ag_002', destinationAgencyName: 'Agence Garoua', destinationCity: 'Kribi',
    routeId: null, routeName: '',
    status: 'pending', agentId: 'usr_001', agentName: 'Admin',
    packages: [
      { id: 'pkg_006', code: 'PKG-006', label: 'Carton documents', category: 'documents', description: 'Documents commerciaux', weight: 3, length: 35, width: 25, height: 5, declaredValue: 50000, fragile: false, insured: false, insuranceAmount: 0, transportAmount: 8000, totalAmount: 8000 },
    ],
    totalWeight: 3, maxWeight: 100, packageCount: 1,
    transportAmount: 8000, insuranceAmount: 0, totalAmount: 8000,
    observation: 'Documents urgents', createdAt: '2026-07-15T09:00:00Z', updatedAt: '2026-07-15T09:00:00Z',
  },
  {
    id: 'shp_004', companyId: 'comp_001', shipmentNumber: 'EXP-20260716-0004',
    senderId: 'cli_002', senderName: 'Marie Mutombo', senderPhone: '+237823456789',
    receiverId: 'cli_007', receiverName: 'Emmanuel Kasongo', receiverPhone: '+237878901234',
    originAgencyId: 'ag_001', originAgencyName: 'Agence Centrale', originCity: 'Douala',
    destinationAgencyId: 'ag_003', destinationAgencyName: 'Agence Yaoundé', destinationCity: 'Yaoundé',
    routeId: 'rt_001', routeName: 'Douala → Yaoundé',
    status: 'draft', agentId: 'usr_001', agentName: 'Admin',
    packages: [],
    totalWeight: 0, maxWeight: 100, packageCount: 0,
    transportAmount: 0, insuranceAmount: 0, totalAmount: 0,
    observation: '', createdAt: '2026-07-16T11:00:00Z', updatedAt: '2026-07-16T11:00:00Z',
  },
  {
    id: 'shp_005', companyId: 'comp_001', shipmentNumber: 'EXP-20260717-0005',
    senderId: 'cli_006', senderName: 'Grace Tshilombo', senderPhone: '+237867890123',
    receiverId: 'cli_004', receiverName: 'Sarah Ngandu', receiverPhone: '+237845678901',
    originAgencyId: 'ag_003', originAgencyName: 'Agence Yaoundé', originCity: 'Douala',
    destinationAgencyId: 'ag_002', destinationAgencyName: 'Agence Garoua', destinationCity: 'Douala',
    routeId: null, routeName: '',
    status: 'cancelled', agentId: 'usr_002', agentName: 'Agent Guichet',
    packages: [
      { id: 'pkg_007', code: 'PKG-007', label: 'Carton mécanique', category: 'pièces', description: 'Pièces détachées', weight: 20, length: 40, width: 30, height: 30, declaredValue: 100000, fragile: true, insured: true, insuranceAmount: 5000, transportAmount: 30000, totalAmount: 35000 },
    ],
    totalWeight: 20, maxWeight: 100, packageCount: 1,
    transportAmount: 30000, insuranceAmount: 5000, totalAmount: 35000,
    observation: 'Annulé par le client', createdAt: '2026-07-17T14:00:00Z', updatedAt: '2026-07-17T15:00:00Z', cancelledAt: '2026-07-17T15:00:00Z',
  },
  {
    id: 'shp_006', companyId: 'comp_001', shipmentNumber: 'EXP-20260601-0006',
    senderId: 'cli_011', senderName: 'Patrick Kalala', senderPhone: '+237812001122',
    receiverId: 'cli_007', receiverName: 'Emmanuel Kasongo', receiverPhone: '+237878901234',
    originAgencyId: 'ag_001', originAgencyName: 'Agence Centrale', originCity: 'Douala',
    destinationAgencyId: 'ag_003', destinationAgencyName: 'Agence Yaoundé', destinationCity: 'Yaoundé',
    routeId: 'rt_001', routeName: 'Douala → Yaoundé',
    status: 'delivered', agentId: 'usr_001', agentName: 'Admin',
    packages: [
      { id: 'pkg_008', code: 'PKG-008', label: 'Carton électronique', category: 'électronique', description: 'Ordinateurs portables', weight: 8, length: 45, width: 35, height: 15, declaredValue: 1500000, fragile: true, insured: true, insuranceAmount: 75000, transportAmount: 45000, totalAmount: 120000 },
      { id: 'pkg_009', code: 'PKG-009', label: 'Carton accessoires', category: 'électronique', description: 'Câbles et chargeurs', weight: 5, length: 40, width: 30, height: 20, declaredValue: 200000, fragile: false, insured: true, insuranceAmount: 10000, transportAmount: 15000, totalAmount: 25000 },
      { id: 'pkg_010', code: 'PKG-010', label: 'Sac vêtements', category: 'vêtements', description: 'Vêtements de marque', weight: 12, length: 60, width: 40, height: 30, declaredValue: 400000, fragile: false, insured: true, insuranceAmount: 20000, transportAmount: 25000, totalAmount: 45000 },
    ],
    totalWeight: 25, maxWeight: 100, packageCount: 3,
    transportAmount: 85000, insuranceAmount: 105000, totalAmount: 190000,
    observation: 'Livraison confirmée', createdAt: '2026-06-01T08:00:00Z', updatedAt: '2026-06-06T16:00:00Z', validatedAt: '2026-06-01T08:30:00Z', deliveredAt: '2026-06-06T16:00:00Z',
  },
  {
    id: 'shp_007', companyId: 'comp_001', shipmentNumber: 'EXP-20260605-0007',
    senderId: 'cli_016', senderName: 'Véronique Kayembe', senderPhone: '+237867011122',
    receiverId: 'cli_021', receiverName: 'Hippolyte Mutambayi', receiverPhone: '+237812021122',
    originAgencyId: 'ag_001', originAgencyName: 'Agence Centrale', originCity: 'Douala',
    destinationAgencyId: 'ag_004', destinationAgencyName: 'Agence Bamenda', destinationCity: 'Bamenda',
    routeId: 'rt_002', routeName: 'Douala → Bamenda',
    status: 'delivered', agentId: 'usr_001', agentName: 'Admin',
    packages: [
      { id: 'pkg_011', code: 'PKG-011', label: 'Palette commerce', category: 'commerce', description: 'Marchandises diverses', weight: 80, length: 120, width: 100, height: 80, declaredValue: 5000000, fragile: false, insured: true, insuranceAmount: 250000, transportAmount: 200000, totalAmount: 450000 },
    ],
    totalWeight: 80, maxWeight: 100, packageCount: 1,
    transportAmount: 200000, insuranceAmount: 250000, totalAmount: 450000,
    observation: 'Gros volume — vérifier à la réception', createdAt: '2026-06-05T07:30:00Z', updatedAt: '2026-06-12T11:00:00Z', validatedAt: '2026-06-05T08:00:00Z', deliveredAt: '2026-06-12T11:00:00Z',
  },
  {
    id: 'shp_008', companyId: 'comp_001', shipmentNumber: 'EXP-20260612-0008',
    senderId: 'cli_003', senderName: 'Pierre Mukendi', senderPhone: '+237834567890',
    receiverId: 'cli_013', receiverName: 'Lucien Molua', receiverPhone: '+237834005566',
    originAgencyId: 'ag_002', originAgencyName: 'Agence Garoua', originCity: 'Douala',
    destinationAgencyId: 'ag_003', destinationAgencyName: 'Agence Yaoundé', destinationCity: 'Yaoundé',
    routeId: 'rt_001', routeName: 'Douala → Yaoundé',
    status: 'delivered', agentId: 'usr_002', agentName: 'Agent Guichet',
    packages: [
      { id: 'pkg_012', code: 'PKG-012', label: 'Carton informatique', category: 'électronique', description: 'Écran et clavier', weight: 10, length: 50, width: 40, height: 35, declaredValue: 600000, fragile: true, insured: true, insuranceAmount: 30000, transportAmount: 35000, totalAmount: 65000 },
    ],
    totalWeight: 10, maxWeight: 100, packageCount: 1,
    transportAmount: 35000, insuranceAmount: 30000, totalAmount: 65000,
    observation: 'Fragile — manipuler avec soin', createdAt: '2026-06-12T09:00:00Z', updatedAt: '2026-06-17T14:00:00Z', validatedAt: '2026-06-12T09:30:00Z', deliveredAt: '2026-06-17T14:00:00Z',
  },
  {
    id: 'shp_009', companyId: 'comp_001', shipmentNumber: 'EXP-20260620-0009',
    senderId: 'cli_025', senderName: 'Alain Kapela', senderPhone: '+237856029900',
    receiverId: 'cli_008', receiverName: 'Chantal Ilunga', receiverPhone: '+237889012345',
    originAgencyId: 'ag_002', originAgencyName: 'Agence Garoua', originCity: 'Maroua',
    destinationAgencyId: 'ag_004', destinationAgencyName: 'Agence Bamenda', destinationCity: 'Bamenda',
    routeId: 'rt_004', routeName: 'Maroua → Bamenda',
    status: 'delivered', agentId: 'usr_001', agentName: 'Admin',
    packages: [
      { id: 'pkg_013', code: 'PKG-013', label: 'Carton alimentation', category: 'alimentation', description: 'Huile et riz', weight: 35, length: 60, width: 50, height: 45, declaredValue: 250000, fragile: false, insured: false, insuranceAmount: 0, transportAmount: 60000, totalAmount: 60000 },
      { id: 'pkg_014', code: 'PKG-014', label: 'Sac sucre', category: 'alimentation', description: 'Sucre 50kg', weight: 50, length: 70, width: 50, height: 50, declaredValue: 180000, fragile: false, insured: false, insuranceAmount: 0, transportAmount: 80000, totalAmount: 80000 },
    ],
    totalWeight: 85, maxWeight: 100, packageCount: 2,
    transportAmount: 140000, insuranceAmount: 0, totalAmount: 140000,
    observation: '', createdAt: '2026-06-20T06:00:00Z', updatedAt: '2026-06-28T10:00:00Z', validatedAt: '2026-06-20T06:30:00Z', deliveredAt: '2026-06-28T10:00:00Z',
  },
  {
    id: 'shp_010', companyId: 'comp_001', shipmentNumber: 'EXP-20260625-0010',
    senderId: 'cli_018', senderName: 'Ruth Mwamba', senderPhone: '+237889015566',
    receiverId: 'cli_001', receiverName: 'Jean Kabongo', receiverPhone: '+237812345678',
    originAgencyId: 'ag_003', originAgencyName: 'Agence Yaoundé', originCity: 'Yaoundé',
    destinationAgencyId: 'ag_001', destinationAgencyName: 'Agence Centrale', destinationCity: 'Douala',
    routeId: 'rt_005', routeName: 'Yaoundé → Douala',
    status: 'delivered', agentId: 'usr_002', agentName: 'Agent Guichet',
    packages: [
      { id: 'pkg_015', code: 'PKG-015', label: 'Carton textile', category: 'vêtements', description: 'Tissus wax', weight: 22, length: 55, width: 45, height: 35, declaredValue: 800000, fragile: false, insured: true, insuranceAmount: 40000, transportAmount: 50000, totalAmount: 90000 },
    ],
    totalWeight: 22, maxWeight: 100, packageCount: 1,
    transportAmount: 50000, insuranceAmount: 40000, totalAmount: 90000,
    observation: 'Livré au client sans problème', createdAt: '2026-06-25T10:00:00Z', updatedAt: '2026-06-30T15:00:00Z', validatedAt: '2026-06-25T10:30:00Z', deliveredAt: '2026-06-30T15:00:00Z',
  },
  {
    id: 'shp_011', companyId: 'comp_001', shipmentNumber: 'EXP-20260702-0011',
    senderId: 'cli_012', senderName: 'Céline Wa Mukendi', senderPhone: '+237823003344',
    receiverId: 'cli_022', receiverName: 'Sandrine Kavira', receiverPhone: '+237823023344',
    originAgencyId: 'ag_002', originAgencyName: 'Agence Garoua', originCity: 'Douala',
    destinationAgencyId: 'ag_002', destinationAgencyName: 'Agence Garoua', destinationCity: 'Kribi',
    routeId: 'rt_006', routeName: 'Douala → Kribi',
    status: 'validated', agentId: 'usr_001', agentName: 'Admin',
    packages: [
      { id: 'pkg_016', code: 'PKG-016', label: 'Carton médicaments', category: 'médicaments', description: 'Antibiotiques et antipaludiques', weight: 8, length: 40, width: 30, height: 25, declaredValue: 500000, fragile: false, insured: true, insuranceAmount: 25000, transportAmount: 30000, totalAmount: 55000 },
      { id: 'pkg_017', code: 'PKG-017', label: 'Carton matériels', category: 'médicaments', description: 'Tensiomètres et thermomètres', weight: 5, length: 35, width: 25, height: 20, declaredValue: 300000, fragile: true, insured: true, insuranceAmount: 15000, transportAmount: 20000, totalAmount: 35000 },
    ],
    totalWeight: 13, maxWeight: 100, packageCount: 2,
    transportAmount: 50000, insuranceAmount: 40000, totalAmount: 90000,
    observation: 'Urgence médicale — priorité', createdAt: '2026-07-02T07:00:00Z', updatedAt: '2026-07-02T08:00:00Z', validatedAt: '2026-07-02T08:00:00Z',
  },
  {
    id: 'shp_012', companyId: 'comp_001', shipmentNumber: 'EXP-20260703-0012',
    senderId: 'cli_015', senderName: 'Rodrigue Ngoy', senderPhone: '+237856009900',
    receiverId: 'cli_013', receiverName: 'Lucien Molua', receiverPhone: '+237834005566',
    originAgencyId: 'ag_001', originAgencyName: 'Agence Centrale', originCity: 'Douala',
    destinationAgencyId: 'ag_003', destinationAgencyName: 'Agence Yaoundé', destinationCity: 'Yaoundé',
    routeId: 'rt_001', routeName: 'Douala → Yaoundé',
    status: 'delivered', agentId: 'usr_001', agentName: 'Admin',
    packages: [
      { id: 'pkg_018', code: 'PKG-018', label: 'Carton pièces', category: 'pièces', description: 'Filtres et courroies', weight: 15, length: 45, width: 35, height: 30, declaredValue: 350000, fragile: false, insured: true, insuranceAmount: 17500, transportAmount: 28000, totalAmount: 45500 },
    ],
    totalWeight: 15, maxWeight: 100, packageCount: 1,
    transportAmount: 28000, insuranceAmount: 17500, totalAmount: 45500,
    observation: '', createdAt: '2026-07-03T08:30:00Z', updatedAt: '2026-07-08T12:00:00Z', validatedAt: '2026-07-03T09:00:00Z', deliveredAt: '2026-07-08T12:00:00Z',
  },
  {
    id: 'shp_013', companyId: 'comp_001', shipmentNumber: 'EXP-20260705-0013',
    senderId: 'cli_023', senderName: 'Benoît Kasongo', senderPhone: '+237834025566',
    receiverId: 'cli_019', receiverName: 'Théodore Luboya', receiverPhone: '+237890017788',
    originAgencyId: 'ag_002', originAgencyName: 'Agence Garoua', originCity: 'Douala',
    destinationAgencyId: 'ag_002', destinationAgencyName: 'Agence Garoua', destinationCity: 'Douala',
    routeId: null, routeName: '',
    status: 'in_transit', agentId: 'usr_002', agentName: 'Agent Guichet',
    packages: [
      { id: 'pkg_019', code: 'PKG-019', label: 'Carton documents', category: 'documents', description: 'Documents juridiques', weight: 2, length: 35, width: 25, height: 5, declaredValue: 100000, fragile: false, insured: true, insuranceAmount: 5000, transportAmount: 10000, totalAmount: 15000 },
    ],
    totalWeight: 2, maxWeight: 100, packageCount: 1,
    transportAmount: 10000, insuranceAmount: 5000, totalAmount: 15000,
    observation: 'Documents confidentiels', createdAt: '2026-07-05T11:00:00Z', updatedAt: '2026-07-06T08:00:00Z', validatedAt: '2026-07-05T11:30:00Z',
  },
  {
    id: 'shp_014', companyId: 'comp_001', shipmentNumber: 'EXP-20260706-0014',
    senderId: 'cli_008', senderName: 'Chantal Ilunga', senderPhone: '+237889012345',
    receiverId: 'cli_016', receiverName: 'Véronique Kayembe', receiverPhone: '+237867011122',
    originAgencyId: 'ag_004', originAgencyName: 'Agence Bamenda', originCity: 'Bamenda',
    destinationAgencyId: 'ag_001', destinationAgencyName: 'Agence Centrale', destinationCity: 'Douala',
    routeId: 'rt_003', routeName: 'Bamenda → Douala',
    status: 'delivered', agentId: 'usr_001', agentName: 'Admin',
    packages: [
      { id: 'pkg_020', code: 'PKG-020', label: 'Sac diamants', category: 'commerce', description: 'Pierres précieuses', weight: 2, length: 25, width: 20, height: 15, declaredValue: 10000000, fragile: true, insured: true, insuranceAmount: 500000, transportAmount: 300000, totalAmount: 800000 },
      { id: 'pkg_021', code: 'PKG-021', label: 'Carton échantillons', category: 'commerce', description: 'Échantillons commerciaux', weight: 5, length: 40, width: 30, height: 25, declaredValue: 2000000, fragile: false, insured: true, insuranceAmount: 100000, transportAmount: 60000, totalAmount: 160000 },
    ],
    totalWeight: 7, maxWeight: 100, packageCount: 2,
    transportAmount: 360000, insuranceAmount: 600000, totalAmount: 960000,
    observation: 'Valeur élevée — assurez la sécurité', createdAt: '2026-07-06T06:00:00Z', updatedAt: '2026-07-12T09:00:00Z', validatedAt: '2026-07-06T06:30:00Z', deliveredAt: '2026-07-12T09:00:00Z',
  },
  {
    id: 'shp_015', companyId: 'comp_001', shipmentNumber: 'EXP-20260708-0015',
    senderId: 'cli_004', senderName: 'Sarah Ngandu', senderPhone: '+237845678901',
    receiverId: 'cli_012', receiverName: 'Céline Wa Mukendi', receiverPhone: '+237823003344',
    originAgencyId: 'ag_002', originAgencyName: 'Agence Garoua', originCity: 'Douala',
    destinationAgencyId: 'ag_002', destinationAgencyName: 'Agence Garoua', destinationCity: 'Kribi',
    routeId: 'rt_006', routeName: 'Douala → Kribi',
    status: 'validated', agentId: 'usr_002', agentName: 'Agent Guichet',
    packages: [
      { id: 'pkg_022', code: 'PKG-022', label: 'Carton livres', category: 'documents', description: 'Livres scolaires', weight: 18, length: 50, width: 40, height: 30, declaredValue: 150000, fragile: false, insured: false, insuranceAmount: 0, transportAmount: 30000, totalAmount: 30000 },
    ],
    totalWeight: 18, maxWeight: 100, packageCount: 1,
    transportAmount: 30000, insuranceAmount: 0, totalAmount: 30000,
    observation: 'Pour rentrée scolaire', createdAt: '2026-07-08T09:00:00Z', updatedAt: '2026-07-08T10:00:00Z', validatedAt: '2026-07-08T10:00:00Z',
  },
  {
    id: 'shp_016', companyId: 'comp_001', shipmentNumber: 'EXP-20260709-0016',
    senderId: 'cli_020', senderName: 'Madeleine Sassou', senderPhone: '+237801019900',
    receiverId: 'cli_009', receiverName: 'Josué Kabongo', receiverPhone: '+237890123456',
    originAgencyId: 'ag_002', originAgencyName: 'Agence Garoua', originCity: 'Douala',
    destinationAgencyId: 'ag_001', destinationAgencyName: 'Agence Centrale', destinationCity: 'Douala',
    routeId: null, routeName: '',
    status: 'pending', agentId: 'usr_001', agentName: 'Admin',
    packages: [
      { id: 'pkg_023', code: 'PKG-023', label: 'Carton plans', category: 'documents', description: 'Plans architecturaux', weight: 3, length: 50, width: 40, height: 5, declaredValue: 80000, fragile: false, insured: false, insuranceAmount: 0, transportAmount: 12000, totalAmount: 12000 },
    ],
    totalWeight: 3, maxWeight: 100, packageCount: 1,
    transportAmount: 12000, insuranceAmount: 0, totalAmount: 12000,
    observation: '', createdAt: '2026-07-09T14:00:00Z', updatedAt: '2026-07-09T14:00:00Z',
  },
  {
    id: 'shp_017', companyId: 'comp_001', shipmentNumber: 'EXP-20260710-0017',
    senderId: 'cli_014', senderName: 'Annie Tshala', senderPhone: '+237845007788',
    receiverId: 'cli_024', receiverName: 'Ornella Mputu', receiverPhone: '+237845027788',
    originAgencyId: 'ag_001', originAgencyName: 'Agence Centrale', originCity: 'Douala',
    destinationAgencyId: 'ag_001', destinationAgencyName: 'Agence Centrale', destinationCity: 'Douala',
    routeId: null, routeName: '',
    status: 'cancelled', agentId: 'usr_001', agentName: 'Admin',
    packages: [
      { id: 'pkg_024', code: 'PKG-024', label: 'Valise bagages', category: 'bagages', description: 'Affaires personnelles', weight: 15, length: 65, width: 45, height: 25, declaredValue: 200000, fragile: false, insured: false, insuranceAmount: 0, transportAmount: 25000, totalAmount: 25000 },
    ],
    totalWeight: 15, maxWeight: 100, packageCount: 1,
    transportAmount: 25000, insuranceAmount: 0, totalAmount: 25000,
    observation: 'Annulé — destinataire introuvable', createdAt: '2026-07-10T16:00:00Z', updatedAt: '2026-07-11T10:00:00Z', cancelledAt: '2026-07-11T10:00:00Z',
  },
  {
    id: 'shp_018', companyId: 'comp_001', shipmentNumber: 'EXP-20260711-0018',
    senderId: 'cli_025', senderName: 'Alain Kapela', senderPhone: '+237856029900',
    receiverId: 'cli_003', receiverName: 'Pierre Mukendi', receiverPhone: '+237834567890',
    originAgencyId: 'ag_002', originAgencyName: 'Agence Garoua', originCity: 'Maroua',
    destinationAgencyId: 'ag_002', destinationAgencyName: 'Agence Garoua', destinationCity: 'Douala',
    routeId: 'rt_007', routeName: 'Maroua → Douala',
    status: 'in_transit', agentId: 'usr_002', agentName: 'Agent Guichet',
    packages: [
      { id: 'pkg_025', code: 'PKG-025', label: 'Carton bois', category: 'mobilier', description: 'Table et chaises', weight: 45, length: 120, width: 80, height: 60, declaredValue: 800000, fragile: true, insured: true, insuranceAmount: 40000, transportAmount: 100000, totalAmount: 140000 },
      { id: 'pkg_026', code: 'PKG-026', label: 'Carton matelas', category: 'mobilier', description: 'Matelas 1 place', weight: 25, length: 100, width: 70, height: 20, declaredValue: 300000, fragile: false, insured: true, insuranceAmount: 15000, transportAmount: 45000, totalAmount: 60000 },
    ],
    totalWeight: 70, maxWeight: 100, packageCount: 2,
    transportAmount: 145000, insuranceAmount: 55000, totalAmount: 200000,
    observation: 'Déménagement complet', createdAt: '2026-07-11T07:00:00Z', updatedAt: '2026-07-13T06:00:00Z', validatedAt: '2026-07-11T07:30:00Z',
  },
  {
    id: 'shp_019', companyId: 'comp_001', shipmentNumber: 'EXP-20260712-0019',
    senderId: 'cli_009', senderName: 'Josué Kabongo', senderPhone: '+237890123456',
    receiverId: 'cli_020', receiverName: 'Madeleine Sassou', receiverPhone: '+237801019900',
    originAgencyId: 'ag_001', originAgencyName: 'Agence Centrale', originCity: 'Douala',
    destinationAgencyId: 'ag_002', destinationAgencyName: 'Agence Garoua', destinationCity: 'Douala',
    routeId: null, routeName: '',
    status: 'draft', agentId: 'usr_001', agentName: 'Admin',
    packages: [],
    totalWeight: 0, maxWeight: 100, packageCount: 0,
    transportAmount: 0, insuranceAmount: 0, totalAmount: 0,
    observation: 'En attente de colis', createdAt: '2026-07-12T15:00:00Z', updatedAt: '2026-07-12T15:00:00Z',
  },
  {
    id: 'shp_020', companyId: 'comp_001', shipmentNumber: 'EXP-20260713-0020',
    senderId: 'cli_021', senderName: 'Hippolyte Mutambayi', senderPhone: '+237812021122',
    receiverId: 'cli_025', receiverName: 'Alain Kapela', receiverPhone: '+237856029900',
    originAgencyId: 'ag_004', originAgencyName: 'Agence Bamenda', originCity: 'Limbé',
    destinationAgencyId: 'ag_002', destinationAgencyName: 'Agence Garoua', destinationCity: 'Maroua',
    routeId: 'rt_008', routeName: 'Limbé → Maroua',
    status: 'validated', agentId: 'usr_002', agentName: 'Agent Guichet',
    packages: [
      { id: 'pkg_027', code: 'PKG-027', label: 'Palette machines', category: 'pièces', description: 'Machines industrielles', weight: 95, length: 150, width: 100, height: 100, declaredValue: 8000000, fragile: true, insured: true, insuranceAmount: 400000, transportAmount: 250000, totalAmount: 650000 },
    ],
    totalWeight: 95, maxWeight: 100, packageCount: 1,
    transportAmount: 250000, insuranceAmount: 400000, totalAmount: 650000,
    observation: 'Presque au max poids — surveiller', createdAt: '2026-07-13T08:00:00Z', updatedAt: '2026-07-13T09:00:00Z', validatedAt: '2026-07-13T09:00:00Z',
  },
];

let historyDB = [
  { id: 'sh_001', shipmentId: 'shp_001', companyId: 'comp_001', type: 'creation', description: 'Expédition créée', timestamp: '2026-07-01T08:00:00Z', userId: 'usr_001' },
  { id: 'sh_002', shipmentId: 'shp_001', companyId: 'comp_001', type: 'validation', description: 'Expédition validée', timestamp: '2026-07-01T08:30:00Z', userId: 'usr_001' },
  { id: 'sh_003', shipmentId: 'shp_001', companyId: 'comp_001', type: 'affectation', description: 'Affectée au trajet Douala → Yaoundé', timestamp: '2026-07-01T09:00:00Z', userId: 'usr_001' },
  { id: 'sh_004', shipmentId: 'shp_001', companyId: 'comp_001', type: 'paiement', description: 'Paiement reçu — 170 000 FCFA', timestamp: '2026-07-01T09:15:00Z', userId: 'usr_002' },
  { id: 'sh_005', shipmentId: 'shp_001', companyId: 'comp_001', type: 'livraison', description: 'Colis livré à destination', timestamp: '2026-07-05T14:00:00Z', userId: 'usr_001' },
  { id: 'sh_006', shipmentId: 'shp_002', companyId: 'comp_001', type: 'creation', description: 'Expédition créée', timestamp: '2026-07-10T10:00:00Z', userId: 'usr_002' },
  { id: 'sh_007', shipmentId: 'shp_002', companyId: 'comp_001', type: 'validation', description: 'Expédition validée', timestamp: '2026-07-10T10:30:00Z', userId: 'usr_001' },
  { id: 'sh_008', shipmentId: 'shp_002', companyId: 'comp_001', type: 'affectation', description: 'Affectée au trajet Bamenda → Douala', timestamp: '2026-07-11T06:00:00Z', userId: 'usr_001' },
  { id: 'sh_009', shipmentId: 'shp_002', companyId: 'comp_001', type: 'transport', description: 'En cours de transport', timestamp: '2026-07-12T06:00:00Z', userId: 'usr_001' },
  { id: 'sh_010', shipmentId: 'shp_006', companyId: 'comp_001', type: 'creation', description: 'Expédition créée', timestamp: '2026-06-01T08:00:00Z', userId: 'usr_001' },
  { id: 'sh_011', shipmentId: 'shp_006', companyId: 'comp_001', type: 'validation', description: 'Expédition validée', timestamp: '2026-06-01T08:30:00Z', userId: 'usr_001' },
  { id: 'sh_012', shipmentId: 'shp_006', companyId: 'comp_001', type: 'affectation', description: 'Affectée au trajet Douala → Yaoundé', timestamp: '2026-06-01T09:00:00Z', userId: 'usr_001' },
  { id: 'sh_013', shipmentId: 'shp_006', companyId: 'comp_001', type: 'paiement', description: 'Paiement reçu — 190 000 FCFA', timestamp: '2026-06-01T09:15:00Z', userId: 'usr_002' },
  { id: 'sh_014', shipmentId: 'shp_006', companyId: 'comp_001', type: 'livraison', description: 'Colis livré à destination', timestamp: '2026-06-06T16:00:00Z', userId: 'usr_001' },
  { id: 'sh_015', shipmentId: 'shp_007', companyId: 'comp_001', type: 'creation', description: 'Expédition créée', timestamp: '2026-06-05T07:30:00Z', userId: 'usr_001' },
  { id: 'sh_016', shipmentId: 'shp_007', companyId: 'comp_001', type: 'validation', description: 'Expédition validée', timestamp: '2026-06-05T08:00:00Z', userId: 'usr_001' },
  { id: 'sh_017', shipmentId: 'shp_007', companyId: 'comp_001', type: 'livraison', description: 'Colis livré à destination', timestamp: '2026-06-12T11:00:00Z', userId: 'usr_001' },
  { id: 'sh_018', shipmentId: 'shp_014', companyId: 'comp_001', type: 'creation', description: 'Expédition créée', timestamp: '2026-07-06T06:00:00Z', userId: 'usr_001' },
  { id: 'sh_019', shipmentId: 'shp_014', companyId: 'comp_001', type: 'validation', description: 'Expédition validée', timestamp: '2026-07-06T06:30:00Z', userId: 'usr_001' },
  { id: 'sh_020', shipmentId: 'shp_014', companyId: 'comp_001', type: 'paiement', description: 'Paiement reçu — 960 000 FCFA', timestamp: '2026-07-06T07:00:00Z', userId: 'usr_002' },
  { id: 'sh_021', shipmentId: 'shp_014', companyId: 'comp_001', type: 'livraison', description: 'Colis livré à destination', timestamp: '2026-07-12T09:00:00Z', userId: 'usr_001' },
  { id: 'sh_022', shipmentId: 'shp_011', companyId: 'comp_001', type: 'creation', description: 'Expédition créée', timestamp: '2026-07-02T07:00:00Z', userId: 'usr_001' },
  { id: 'sh_023', shipmentId: 'shp_011', companyId: 'comp_001', type: 'validation', description: 'Expédition validée', timestamp: '2026-07-02T08:00:00Z', userId: 'usr_001' },
  { id: 'sh_024', shipmentId: 'shp_018', companyId: 'comp_001', type: 'creation', description: 'Expédition créée', timestamp: '2026-07-11T07:00:00Z', userId: 'usr_002' },
  { id: 'sh_025', shipmentId: 'shp_018', companyId: 'comp_001', type: 'validation', description: 'Expédition validée', timestamp: '2026-07-11T07:30:00Z', userId: 'usr_001' },
  { id: 'sh_026', shipmentId: 'shp_018', companyId: 'comp_001', type: 'transport', description: 'En cours de transport', timestamp: '2026-07-13T06:00:00Z', userId: 'usr_001' },
  { id: 'sh_027', shipmentId: 'shp_020', companyId: 'comp_001', type: 'creation', description: 'Expédition créée', timestamp: '2026-07-13T08:00:00Z', userId: 'usr_002' },
  { id: 'sh_028', shipmentId: 'shp_020', companyId: 'comp_001', type: 'validation', description: 'Expédition validée', timestamp: '2026-07-13T09:00:00Z', userId: 'usr_001' },
];

let nextShipmentId = 21;
let nextHistoryId = 30;

function getByCompany(companyId) { return shipmentsDB.filter((s) => s.companyId === companyId); }

function searchFilter(items, search) {
  if (!search) return items;
  const q = search.toLowerCase();
  return items.filter((s) =>
    s.shipmentNumber.toLowerCase().includes(q) || s.senderName.toLowerCase().includes(q) ||
    s.receiverName.toLowerCase().includes(q) || s.senderPhone.includes(q) ||
    s.receiverPhone.includes(q) || (s.originAgencyName || '').toLowerCase().includes(q) ||
    (s.destinationAgencyName || '').toLowerCase().includes(q) || s.status.toLowerCase().includes(q)
  );
}

function applyFilters(items, filters) {
  return items.filter((s) => {
    if (filters.status && s.status !== filters.status) return false;
    if (filters.originAgencyId && s.originAgencyId !== filters.originAgencyId) return false;
    if (filters.destinationAgencyId && s.destinationAgencyId !== filters.destinationAgencyId) return false;
    if (filters.routeId && s.routeId !== filters.routeId) return false;
    if (filters.agentId && s.agentId !== filters.agentId) return false;
    if (filters.dateFrom && s.createdAt < filters.dateFrom) return false;
    if (filters.dateTo && s.createdAt > filters.dateTo + 'T23:59:59Z') return false;
    return true;
  });
}

function applySort(items, sort) {
  const { field, direction } = sort || { field: 'createdAt', direction: 'desc' };
  return [...items].sort((a, b) => {
    let va = a[field] ?? '';
    let vb = b[field] ?? '';
    if (typeof va === 'number' && typeof vb === 'number') return direction === 'asc' ? va - vb : vb - va;
    if (typeof va === 'string') va = va.toLowerCase();
    if (typeof vb === 'string') vb = vb.toLowerCase();
    if (va < vb) return direction === 'asc' ? -1 : 1;
    if (va > vb) return direction === 'asc' ? 1 : -1;
    return 0;
  });
}

function buildShipmentNumber(date) {
  const d = date || new Date();
  const ds = d.toISOString().slice(0, 10).replace(/-/g, '');
  const count = shipmentsDB.filter((s) => s.shipmentNumber.includes(ds)).length + 1;
  return `EXP-${ds}-${String(count).padStart(4, '0')}`;
}

export const PACKAGE_CATEGORIES = [
  { value: 'vêtements', label: 'Vêtements' },
  { value: 'alimentation', label: 'Alimentation' },
  { value: 'électronique', label: 'Électronique' },
  { value: 'commerce', label: 'Commerce' },
  { value: 'bagages', label: 'Bagages' },
  { value: 'documents', label: 'Documents' },
  { value: 'pièces', label: 'Pièces détachées' },
  { value: 'mobilier', label: 'Mobilier' },
  { value: 'médicaments', label: 'Médicaments' },
  { value: 'autre', label: 'Autre' },
];

export const DEFAULT_MAX_WEIGHT = 100;

export const mockShipmentsService = {
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

  async getById(companyId, shipmentId) {
    await simulateDelay(250);
    const shipment = getByCompany(companyId).find((s) => s.id === shipmentId);
    if (!shipment) throw new Error('Expédition non trouvée');
    return shipment;
  },

  async create(companyId, data) {
    await simulateDelay(500);
    const now = new Date();
    const shipment = {
      id: `shp_${String(nextShipmentId++).padStart(3, '0')}`,
      companyId,
      shipmentNumber: buildShipmentNumber(now),
      ...data,
      status: 'draft',
      agentId: data.agentId || 'usr_001',
      agentName: data.agentName || 'Admin',
      packages: data.packages || [],
      totalWeight: (data.packages || []).reduce((sum, p) => sum + (p.weight || 0), 0),
      maxWeight: data.maxWeight || DEFAULT_MAX_WEIGHT,
      packageCount: (data.packages || []).length,
      transportAmount: (data.packages || []).reduce((sum, p) => sum + (p.transportAmount || 0), 0),
      insuranceAmount: (data.packages || []).reduce((sum, p) => sum + (p.insuranceAmount || 0), 0),
      totalAmount: (data.packages || []).reduce((sum, p) => sum + (p.totalAmount || 0), 0),
      createdAt: now.toISOString(), updatedAt: now.toISOString(),
    };
    shipmentsDB = [...shipmentsDB, shipment];
    historyDB = [...historyDB, { id: `sh_${String(nextHistoryId++).padStart(3, '0')}`, shipmentId: shipment.id, companyId, type: 'creation', description: 'Expédition créée', timestamp: now.toISOString(), userId: shipment.agentId }];
    return shipment;
  },

  async update(companyId, shipmentId, data) {
    await simulateDelay(400);
    const idx = shipmentsDB.findIndex((s) => s.id === shipmentId && s.companyId === companyId);
    if (idx === -1) throw new Error('Expédition non trouvée');
    const pkgs = data.packages || shipmentsDB[idx].packages;
    const updated = {
      ...shipmentsDB[idx], ...data, packages: pkgs,
      totalWeight: pkgs.reduce((sum, p) => sum + (p.weight || 0), 0),
      packageCount: pkgs.length,
      transportAmount: pkgs.reduce((sum, p) => sum + (p.transportAmount || 0), 0),
      insuranceAmount: pkgs.reduce((sum, p) => sum + (p.insuranceAmount || 0), 0),
      totalAmount: pkgs.reduce((sum, p) => sum + (p.totalAmount || 0), 0),
      updatedAt: new Date().toISOString(),
    };
    shipmentsDB[idx] = updated;
    historyDB = [...historyDB, { id: `sh_${String(nextHistoryId++).padStart(3, '0')}`, shipmentId, companyId, type: 'modification', description: 'Expédition modifiée', timestamp: new Date().toISOString(), userId: data.agentId || 'usr_001' }];
    return updated;
  },

  async cancel(companyId, shipmentId) {
    await simulateDelay(300);
    const idx = shipmentsDB.findIndex((s) => s.id === shipmentId && s.companyId === companyId);
    if (idx === -1) throw new Error('Expédition non trouvée');
    shipmentsDB[idx] = { ...shipmentsDB[idx], status: 'cancelled', cancelledAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    historyDB = [...historyDB, { id: `sh_${String(nextHistoryId++).padStart(3, '0')}`, shipmentId, companyId, type: 'annulation', description: 'Expédition annulée', timestamp: new Date().toISOString(), userId: 'usr_001' }];
    return shipmentsDB[idx];
  },

  async archive(companyId, shipmentId) {
    await simulateDelay(300);
    const idx = shipmentsDB.findIndex((s) => s.id === shipmentId && s.companyId === companyId);
    if (idx === -1) throw new Error('Expédition non trouvée');
    shipmentsDB[idx] = { ...shipmentsDB[idx], status: 'archived', updatedAt: new Date().toISOString() };
    return shipmentsDB[idx];
  },

  async getHistory(companyId, shipmentId) {
    await simulateDelay(200);
    return historyDB.filter((h) => h.shipmentId === shipmentId && h.companyId === companyId).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  },

  async getStatistics(companyId) {
    await simulateDelay(300);
    const items = getByCompany(companyId);
    return {
      total: items.length,
      draft: items.filter((s) => s.status === 'draft').length,
      pending: items.filter((s) => s.status === 'pending').length,
      validated: items.filter((s) => s.status === 'validated').length,
      inTransit: items.filter((s) => s.status === 'in_transit').length,
      delivered: items.filter((s) => s.status === 'delivered').length,
      cancelled: items.filter((s) => s.status === 'cancelled').length,
      totalRevenue: items.filter((s) => s.status !== 'cancelled').reduce((sum, s) => sum + s.totalAmount, 0),
      totalPackages: items.reduce((sum, s) => sum + s.packageCount, 0),
      totalWeight: items.reduce((sum, s) => sum + s.totalWeight, 0),
    };
  },

  buildShipmentNumber,
  calculatePackage(pkg) {
    const baseRate = 1500;
    const transportAmount = Math.ceil(pkg.weight * baseRate * (pkg.declaredValue > 500000 ? 1.5 : 1));
    const insuranceAmount = pkg.insured ? Math.ceil(pkg.declaredValue * 0.05) : 0;
    return { ...pkg, transportAmount, insuranceAmount, totalAmount: transportAmount + insuranceAmount };
  },
};
