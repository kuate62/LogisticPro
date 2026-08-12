const now = new Date();
const subHours = (d, n) => { const r = new Date(d); r.setHours(r.getHours() - n); return r; };
const subDays = (d, n) => { const r = new Date(d); r.setDate(r.getDate() - n); return r; };
const addDays = (d, n) => { const r = new Date(d); r.setDate(r.getDate() + n); return r; };

export const mockCompanies = [
  { id: 'comp_001', name: 'TransExpress Cameroun', slug: 'trans-express', city: 'Douala', logo: null, phone: '+237 233 456 789', email: 'contact@trans-express.cm', status: 'active', taxId: 'M123456789A' },
  { id: 'comp_002', name: 'CargoLogistics SARL', slug: 'cargo-logistics', city: 'Yaoundé', logo: null, phone: '+237 222 789 012', email: 'info@cargologistics.cm', status: 'active', taxId: 'M987654321B' },
];

export const mockAgencies = [
  { id: 'ag_001', companyId: 'comp_001', name: 'Agence Centrale Douala', city: 'Douala', address: '123 Bd de la Liberté', phone: '+237 233 456 001', email: 'douala.centre@trans-express.cm', manager: 'Patrick Lukusa', status: 'active', region: 'Littoral' },
  { id: 'ag_002', companyId: 'comp_001', name: 'Agence Yaoundé', city: 'Yaoundé', address: '45 Av Kennedy', phone: '+237 222 456 002', email: 'yaounde@trans-express.cm', manager: 'Hélène Ngo', status: 'active', region: 'Centre' },
  { id: 'ag_003', companyId: 'comp_001', name: 'Agence Bamenda', city: 'Bamenda', address: '12 Rue Commerciale', phone: '+237 233 456 003', email: 'bamenda@trans-express.cm', manager: 'Victor Tchinda', status: 'active', region: 'Nord-Ouest' },
  { id: 'ag_004', companyId: 'comp_002', name: 'Agence Principale Yaoundé', city: 'Yaoundé', address: '88 Bd du 20 Mai', phone: '+237 222 789 004', email: 'principal@cargologistics.cm', manager: 'Alain Mvondo', status: 'active', region: 'Centre' },
  { id: 'ag_005', companyId: 'comp_002', name: 'Agence Douala-Bonabéri', city: 'Douala', address: '200 Rue des Cocotiers', phone: '+237 233 789 005', email: 'douala@cargologistics.cm', manager: 'Rosine Mbarga', status: 'active', region: 'Littoral' },
];

export const mockAgents = [
  {
    id: 'agt_001', companyId: 'comp_001', agencyId: 'ag_001', firstName: 'David', lastName: 'Kasongo', email: 'david.kasongo@trans-express.cm', phone: '+237 691 234 001', role: 'depot_agent', avatar: null, status: 'active', counterId: 'cnt_001', permissions: ['create_shipment', 'register_package', 'receive_payment', 'create_client', 'search_shipment', 'scan_code'],
    createdAt: '2024-05-10T08:00:00Z',
  },
  {
    id: 'agt_002', companyId: 'comp_001', agencyId: 'ag_001', firstName: 'Grace', lastName: 'Mwamba', email: 'grace.mwamba@trans-express.cm', phone: '+237 691 234 002', role: 'retrait_agent', avatar: null, status: 'active', counterId: 'cnt_002', permissions: ['scan_code', 'search_parcel', 'validate_withdrawal', 'view_history', 'create_anomaly'],
    createdAt: '2024-05-15T09:00:00Z',
  },
  {
    id: 'agt_003', companyId: 'comp_001', agencyId: 'ag_002', firstName: 'Joseph', lastName: 'Lungila', email: 'joseph.lungila@trans-express.cm', phone: '+237 691 234 003', role: 'depot_agent', avatar: null, status: 'active', counterId: 'cnt_003', permissions: ['create_shipment', 'register_package', 'receive_payment', 'create_client', 'search_shipment'],
    createdAt: '2024-06-01T07:30:00Z',
  },
  {
    id: 'agt_004', companyId: 'comp_001', agencyId: 'ag_002', firstName: 'Esther', lastName: 'Tchinda', email: 'esther.tchinda@trans-express.cm', phone: '+237 691 234 004', role: 'retrait_agent', avatar: null, status: 'active', counterId: 'cnt_004', permissions: ['scan_code', 'search_parcel', 'validate_withdrawal', 'view_history'],
    createdAt: '2024-06-10T10:00:00Z',
  },
  {
    id: 'agt_005', companyId: 'comp_002', agencyId: 'ag_004', firstName: 'Michel', lastName: 'Biyiha', email: 'michel.biyiha@cargologistics.cm', phone: '+237 692 345 001', role: 'depot_agent', avatar: null, status: 'active', counterId: 'cnt_005', permissions: ['create_shipment', 'register_package', 'receive_payment', 'create_client', 'scan_code'],
    createdAt: '2024-07-01T08:00:00Z',
  },
  {
    id: 'agt_006', companyId: 'comp_002', agencyId: 'ag_004', firstName: 'Chantal', lastName: 'Eyanga', email: 'chantal.eyanga@cargologistics.cm', phone: '+237 692 345 002', role: 'retrait_agent', avatar: null, status: 'active', counterId: 'cnt_006', permissions: ['scan_code', 'search_parcel', 'validate_withdrawal', 'view_history', 'create_anomaly'],
    createdAt: '2024-07-15T09:30:00Z',
  },
];

export const mockClients = [
  { id: 'cli_001', companyId: 'comp_001', firstName: 'Jean', lastName: 'Kalonji', email: 'j.kalonji@gmail.com', phone: '+237 691 111 111', city: 'Douala', address: '45 Rue Mermoz', idType: 'cni', idNumber: 'CNI-123456', status: 'active', createdAt: subDays(now, 120) },
  { id: 'cli_002', companyId: 'comp_001', firstName: 'Marie', lastName: 'Tshisekedi', email: 'm.tshisekedi@yahoo.fr', phone: '+237 692 222 222', city: 'Yaoundé', address: '78 Av de la Gare', idType: 'cni', idNumber: 'CNI-234567', status: 'active', createdAt: subDays(now, 90) },
  { id: 'cli_003', companyId: 'comp_001', firstName: 'Pierre', lastName: 'Mutombo', email: 'p.mutombo@entreprise.cm', phone: '+237 693 333 333', city: 'Douala', address: '120 Rue des Palmiers', idType: 'passport', idNumber: 'PASS-789012', status: 'active', createdAt: subDays(now, 60) },
  { id: 'cli_004', companyId: 'comp_001', firstName: 'Anne', lastName: 'Bakenga', email: 'anne.bakenga@societe.cm', phone: '+237 694 444 444', city: 'Bamenda', address: '34 Rue Principale', idType: 'cni', idNumber: 'CNI-345678', status: 'active', createdAt: subDays(now, 45) },
  { id: 'cli_005', companyId: 'comp_001', firstName: 'Paul', lastName: 'Kabongo', email: 'paul.kabongo@outlook.com', phone: '+237 695 555 555', city: 'Maroua', address: '56 Rue du Marché', idType: 'cni', idNumber: 'CNI-456789', status: 'active', createdAt: subDays(now, 30) },
  { id: 'cli_006', companyId: 'comp_001', firstName: 'Ruth', lastName: 'Mudumbi', email: 'ruth.mudumbi@gmail.com', phone: '+237 696 666 666', city: 'Douala', address: '200 Bd de la Liberté', idType: 'passport', idNumber: 'PASS-345678', status: 'active', createdAt: subDays(now, 20) },
  { id: 'cli_007', companyId: 'comp_001', firstName: 'Félix', lastName: 'Ngoie', email: 'felix.ngoie@entreprise.cm', phone: '+237 697 777 777', city: 'Garoua', address: '89 Rue du Commerce', idType: 'cni', idNumber: 'CNI-567890', status: 'active', createdAt: subDays(now, 15) },
  { id: 'cli_008', companyId: 'comp_002', firstName: 'Brigitte', lastName: 'Mpiana', email: 'brigitte.mpiana@cargologistics.cm', phone: '+237 698 888 888', city: 'Yaoundé', address: "34 Rue de l'Hôpital", idType: 'cni', idNumber: 'CNI-678901', status: 'active', createdAt: subDays(now, 100) },
  { id: 'cli_009', companyId: 'comp_002', firstName: 'Alain', lastName: 'Tshibangu', email: 'alain.tshibangu@yahoo.fr', phone: '+237 699 999 999', city: 'Douala', address: '567 Rue des Arts', idType: 'cni', idNumber: 'CNI-789012', status: 'active', createdAt: subDays(now, 50) },
  { id: 'cli_010', companyId: 'comp_002', firstName: 'Sarah', lastName: 'Lubaki', email: 'sarah.lubaki@gmail.com', phone: '+237 690 000 000', city: 'Kribi', address: '12 Plage Road', idType: 'passport', idNumber: 'PASS-901234', status: 'active', createdAt: subDays(now, 25) },
];

function generateShipments() {
  const statuses = ['validated', 'preparing', 'assigned', 'in_transit', 'arrived', 'delivered', 'cancelled'];
  const shipments = [];
  let ref = 1001;

  for (let i = 0; i < 35; i++) {
    const client = mockClients[i % mockClients.length];
    const agency = i < 18 ? mockAgencies[0] : mockAgencies[1];
    const destAgency = mockAgencies[Math.floor(Math.random() * mockAgencies.length)];
    const agent = i < 20 ? mockAgents[0] : mockAgents[2];
    const pkgCount = Math.floor(Math.random() * 5) + 1;
    const amount = pkgCount * (Math.floor(Math.random() * 15000) + 5000);
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const daysAgo = Math.floor(Math.random() * 30);

    shipments.push({
      id: `exp_${String(i + 1).padStart(4, '0')}`,
      reference: `EXP-2024-${ref++}`,
      companyId: agency.companyId,
      agencyId: agency.id,
      agentId: agent.id,
      clientId: client.id,
      senderName: `${client.firstName} ${client.lastName}`,
      senderPhone: client.phone,
      receiverName: `Destinataire ${i + 1}`,
      receiverPhone: `+237 690 ${String(100 + i).slice(-3)} ${String(200 + i).slice(-3)}`,
      origin: agency.city,
      destination: destAgency.city,
      destinationAgencyId: destAgency.id,
      packageCount: pkgCount,
      totalAmount: amount,
      paidAmount: status !== 'cancelled' ? amount : 0,
      paymentMethod: ['cash', 'mobile_money', 'bank_transfer'][Math.floor(Math.random() * 3)],
      status,
      createdAt: subDays(now, daysAgo),
      updatedAt: subHours(subDays(now, Math.max(0, daysAgo - 1)), Math.floor(Math.random() * 12)),
    });
  }
  return shipments;
}

function generateParcels(shipments) {
  const categories = ['standard', 'électronique', 'documents', 'alimentation', 'vêtements', 'bagages', 'médicaments'];
  const statuses = ['registered', 'in_transit', 'arrived', 'available_pickup', 'collected', 'damaged'];
  const parcels = [];
  let tracking = 5001;

  for (const shipment of shipments) {
    const count = shipment.packageCount;
    for (let j = 0; j < count; j++) {
      const status = shipment.status === 'delivered' ? 'collected'
        : shipment.status === 'arrived' ? 'available_pickup'
        : shipment.status === 'cancelled' ? 'cancelled'
        : statuses[Math.floor(Math.random() * 4)];

      parcels.push({
        id: `pkg_${String(parcels.length + 1).padStart(4, '0')}`,
        trackingNumber: `LP-${tracking++}`,
        shipmentId: shipment.id,
        companyId: shipment.companyId,
        agencyId: shipment.agencyId,
        originAgencyId: shipment.agencyId,
        destinationAgencyId: shipment.destinationAgencyId,
        weight: Math.round((Math.random() * 20 + 0.5) * 10) / 10,
        category: categories[Math.floor(Math.random() * categories.length)],
        description: 'Colis standard',
        status,
        createdAt: shipment.createdAt,
        arrivalDate: status === 'available_pickup' || status === 'collected' ? addDays(shipment.createdAt, Math.floor(Math.random() * 5) + 2) : null,
        collectedAt: status === 'collected' ? addDays(shipment.createdAt, Math.floor(Math.random() * 7) + 4) : null,
      });
    }
  }
  return parcels;
}

function generatePayments(shipments) {
  const methods = ['cash', 'mobile_money', 'bank_transfer', 'card'];
  const statuses = ['completed', 'completed', 'completed', 'pending'];
  return shipments.filter(s => s.status !== 'cancelled').slice(0, 25).map((s, i) => ({
    id: `pay_${String(i + 1).padStart(4, '0')}`,
    shipmentId: s.id,
    companyId: s.companyId,
    agencyId: s.agencyId,
    agentId: s.agentId,
    clientId: s.clientId,
    clientName: s.senderName,
    reference: s.reference,
    amount: s.totalAmount,
    method: methods[Math.floor(Math.random() * methods.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    createdAt: subHours(s.createdAt, Math.floor(Math.random() * 3)),
  }));
}

function generateActivities(agents, shipments) {
  const types = ['shipment', 'payment', 'client', 'parcel'];
  const activities = [];
  let idx = 0;

  for (const agent of agents) {
    for (let i = 0; i < 5; i++) {
      const type = types[idx % types.length];
      const shipment = shipments[i % shipments.length];
      const hours = i * 2 + Math.floor(Math.random() * 4);
      const activity = {
        id: `act_${String(++idx).padStart(4, '0')}`,
        type,
        agentId: agent.id,
        agencyId: agent.agencyId,
        companyId: agent.companyId,
        time: subHours(now, hours),
      };
      if (type === 'shipment') {
        activity.title = `Expédition ${shipment.reference} créée`;
        activity.description = `${shipment.senderName} → ${shipment.destination}`;
        activity.clientName = shipment.senderName;
        activity.reference = shipment.reference;
        activity.status = 'completed';
      } else if (type === 'payment') {
        activity.title = `Paiement de ${shipment.totalAmount.toLocaleString()} FC reçu`;
        activity.description = `Pour ${shipment.reference}`;
        activity.clientName = shipment.senderName;
        activity.reference = `PAY-${shipment.id}`;
        activity.status = 'completed';
      } else if (type === 'client') {
        activity.title = `Client ${shipment.senderName} enregistré`;
        activity.description = 'Nouveau client créé';
        activity.clientName = shipment.senderName;
        activity.reference = '';
        activity.status = 'completed';
      } else {
        activity.title = `Colis LP-${5000 + i} enregistré`;
        activity.description = `${Math.round(Math.random() * 15 + 1)} kg - Standard`;
        activity.clientName = shipment.senderName;
        activity.reference = `LP-${5000 + i}`;
        activity.status = 'completed';
      }
      activities.push(activity);
    }
  }
  return activities.sort((a, b) => new Date(b.time) - new Date(a.time));
}

function generateNotifications() {
  return [
    { id: 'notif_001', type: 'success', title: 'Paiement reçu', message: '45 000 FC reçu de Jean Kalonji', time: subHours(now, 1), read: false },
    { id: 'notif_002', type: 'info', title: 'Nouvelle expédition', message: 'Expédition EXP-2024-1025 créée', time: subHours(now, 2), read: false },
    { id: 'notif_003', type: 'warning', title: 'Paiement en attente', message: 'Paiement de 25 000 FC en attente', time: subHours(now, 3), read: false },
    { id: 'notif_004', type: 'danger', title: 'Colis en retard', message: '2 colis dépassent le délai prévu', time: subHours(now, 4), read: true },
    { id: 'notif_005', type: 'info', title: 'Rappel départ trajet', message: 'Départ Douala → Yaoundé à 14h00', time: subHours(now, 5), read: true },
    { id: 'notif_006', type: 'success', title: 'Colis récupéré', message: 'Colis LP-5023 récupéré par le destinataire', time: subHours(now, 6), read: false },
    { id: 'notif_007', type: 'warning', title: 'Stock faible', message: 'Il reste 3 emballages standard', time: subHours(now, 8), read: true },
    { id: 'notif_008', type: 'danger', title: 'Anomalie colis', message: 'Colis LP-5017 signalé endommagé', time: subHours(now, 10), read: false },
  ];
}

function generateAlerts() {
  return [
    { id: 'alert_001', type: 'late', severity: 'warning', title: 'Colis en retard', message: '3 colis en attente depuis plus de 5 jours', parcelCount: 3, time: subHours(now, 2) },
    { id: 'alert_002', type: 'damaged', severity: 'danger', title: 'Colis endommagé', message: 'Colis LP-5017 signalé endommagé lors du transport', parcelId: 'pkg_0017', time: subHours(now, 4) },
    { id: 'alert_003', type: 'unclaimed', severity: 'info', title: 'Colis non retirés', message: '5 colis en attente de retrait depuis 7+ jours', parcelCount: 5, time: subHours(now, 6) },
    { id: 'alert_004', type: 'blocked', severity: 'danger', title: 'Colis bloqué', message: 'Colis LP-4999 bloqué à l\'agence de transit', parcelId: 'pkg_001', time: subHours(now, 12) },
  ];
}

const shipments = generateShipments();
const parcels = generateParcels(shipments);
const payments = generatePayments(shipments);
const activities = generateActivities(mockAgents, shipments);
const notifications = generateNotifications();
const alerts = generateAlerts();

export function getAgentData(agentId) {
  const agent = mockAgents.find(a => a.id === agentId) || mockAgents[0];
  const agency = mockAgencies.find(a => a.id === agent.agencyId);
  const company = mockCompanies.find(c => c.id === agent.companyId);
  return { agent, agency, company };
}

export function getDepotData(agentId) {
  const { agent, agency, company } = getAgentData(agentId);
  const agencyShipments = shipments.filter(s => s.agencyId === agent.agencyId);
  const agencyParcels = parcels.filter(p => p.agencyId === agent.agencyId);
  const todayStr = now.toDateString();
  const todayShipments = agencyShipments.filter(s => new Date(s.createdAt).toDateString() === todayStr);
  const todayParcels = agencyParcels.filter(p => new Date(p.createdAt).toDateString() === todayStr);
  const todayPayments = payments.filter(p => p.agencyId === agent.agencyId && new Date(p.createdAt).toDateString() === todayStr);
  const pendingShipments = agencyShipments.filter(s => s.status === 'validated' || s.status === 'preparing');

  const stats = {
    shipmentsToday: todayShipments.length,
    parcelsToday: todayParcels.length,
    amountCollected: todayPayments.reduce((sum, p) => sum + (p.status === 'completed' ? p.amount : 0), 0),
    clientsReceived: [...new Set(todayShipments.map(s => s.clientId))].length,
    pendingShipments: pendingShipments.length,
  };

  const recentShipments = agencyShipments.slice(0, 15);
  const recentParcels = agencyParcels.slice(0, 12);
  const agentActivities = activities.filter(a => a.agencyId === agent.agencyId).slice(0, 12);

  return {
    agent,
    agency,
    company,
    stats,
    shipments: recentShipments,
    parcels: recentParcels,
    payments: todayPayments,
    activities: agentActivities,
    notifications,
    alerts,
  };
}

export function getRetraitData(agentId) {
  const { agent, agency, company } = getAgentData(agentId);
  const agencyParcels = parcels.filter(p => p.destinationAgencyId === agent.agencyId);

  const availableParcels = agencyParcels.filter(p => p.status === 'available_pickup');
  const collectedToday = agencyParcels.filter(p => p.status === 'collected' && p.collectedAt && new Date(p.collectedAt).toDateString() === now.toDateString());
  const clientsServed = [...new Set(collectedToday.map(p => p.shipmentId))].length;
  const anomalyParcels = agencyParcels.filter(p => p.status === 'damaged' || p.status === 'cancelled');
  const pendingPickup = agencyParcels.filter(p => p.status === 'arrived' || p.status === 'available_pickup');

  const stats = {
    availableParcels: availableParcels.length,
    collectedToday: collectedToday.length,
    clientsServed,
    pendingPickup: pendingPickup.length,
    anomalyParcels: anomalyParcels.length,
  };

  const recentWithdrawals = agencyParcels
    .filter(p => p.status === 'collected' && p.collectedAt)
    .sort((a, b) => new Date(b.collectedAt) - new Date(a.collectedAt))
    .slice(0, 10)
    .map(p => {
      const shipment = shipments.find(s => s.id === p.shipmentId);
      return {
        ...p,
        recipientName: shipment ? shipment.receiverName : 'Inconnu',
        collectedBy: shipment ? shipment.receiverName : 'Inconnu',
      };
    });

  const readyParcels = agencyParcels.filter(p => p.status === 'available_pickup' || p.status === 'arrived').slice(0, 20);
  const agentActivities = activities.filter(a => a.agencyId === agent.agencyId).slice(0, 10);

  return {
    agent,
    agency,
    company,
    stats,
    availableParcels: readyParcels,
    recentWithdrawals,
    activities: agentActivities,
    notifications,
    alerts: alerts,
  };
}

export {
  shipments, parcels, payments, activities, notifications, alerts,
};
