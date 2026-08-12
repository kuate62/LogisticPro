const now = new Date();
const subDays = (d, n) => { const r = new Date(d); r.setDate(r.getDate() - n); return r; };
const subHours = (d, n) => { const r = new Date(d); r.setHours(r.getHours() - n); return r; };
const addDays = (d, n) => { const r = new Date(d); r.setDate(r.getDate() + n); return r; };

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

/* ───────────────────────────────────────────────
   Companies
   ─────────────────────────────────────────────── */
export const clientCompanies = [
  { id: 'cc_001', name: 'TransExpress Cameroun', slug: 'trans-express', city: 'Douala', phone: '+237 233 456 789', email: 'contact@trans-express.cm', logo: null, status: 'active' },
  { id: 'cc_002', name: 'CargoLogistics SARL', slug: 'cargo-logistics', city: 'Yaoundé', phone: '+237 222 789 012', email: 'info@cargologistics.cm', logo: null, status: 'active' },
];

/* ───────────────────────────────────────────────
   Agencies
   ─────────────────────────────────────────────── */
export const clientAgencies = [
  { id: 'ca_001', companyId: 'cc_001', name: 'Agence Centrale Douala', city: 'Douala', address: '123 Bd de la Liberté', phone: '+237 233 456 001', region: 'Littoral', hours: ['07:30', '18:00'] },
  { id: 'ca_002', companyId: 'cc_001', name: 'Agence Yaoundé', city: 'Yaoundé', address: '45 Av Kennedy', phone: '+237 222 456 002', region: 'Centre', hours: ['07:30', '18:00'] },
  { id: 'ca_003', companyId: 'cc_001', name: 'Agence Bamenda', city: 'Bamenda', address: '12 Rue Commerciale', phone: '+237 233 456 003', region: 'Nord-Ouest', hours: ['08:00', '17:30'] },
  { id: 'ca_004', companyId: 'cc_001', name: 'Agence Maroua', city: 'Maroua', address: '88 Bd du 20 Mai', phone: '+237 222 456 004', region: 'Extrême-Nord', hours: ['08:00', '17:00'] },
  { id: 'ca_005', companyId: 'cc_001', name: 'Agence Garoua', city: 'Garoua', address: '200 Rue du Marché', phone: '+237 233 456 005', region: 'Nord', hours: ['08:00', '17:00'] },
  { id: 'ca_006', companyId: 'cc_002', name: 'Agence Principale Yaoundé', city: 'Yaoundé', address: '34 Rue de l\u2019H\u00f4pital', phone: '+237 222 789 004', region: 'Centre', hours: ['07:30', '18:00'] },
];

/* ───────────────────────────────────────────────
   Client profiles
   ─────────────────────────────────────────────── */
export const clientProfiles = [
  { id: 'clp_001', companyId: 'cc_001', firstName: 'Pierre', lastName: 'Mutombo', email: 'pierre.mutombo@gmail.com', phone: '+237 691 111 111', city: 'Douala', address: '45 Rue Mermoz', avatar: null, preferredAgencyId: 'ca_001', status: 'active', memberSince: subDays(now, 365), company: 'Entreprise Mutombo SARL' },
  { id: 'clp_002', companyId: 'cc_001', firstName: 'Anne', lastName: 'Bakenga', email: 'anne.bakenga@yahoo.fr', phone: '+237 692 222 222', city: 'Yaoundé', address: '78 Av de la Gare', avatar: null, preferredAgencyId: 'ca_002', status: 'active', memberSince: subDays(now, 280), company: 'Société Bakenga' },
  { id: 'clp_003', companyId: 'cc_001', firstName: 'Jean', lastName: 'Kalonji', email: 'j.kalonji@outlook.com', phone: '+237 693 333 333', city: 'Douala', address: '120 Rue des Palmiers', avatar: null, preferredAgencyId: 'ca_001', status: 'active', memberSince: subDays(now, 200), company: 'Kalonji Trading' },
  { id: 'clp_004', companyId: 'cc_001', firstName: 'Paul', lastName: 'Kabongo', email: 'paul.kabongo@gmail.com', phone: '+237 694 444 444', city: 'Bamenda', address: '34 Rue Principale', avatar: null, preferredAgencyId: 'ca_003', status: 'active', memberSince: subDays(now, 150), company: 'Kabongo Express' },
  { id: 'clp_005', companyId: 'cc_001', firstName: 'Ruth', lastName: 'Mudumbi', email: 'ruth.mudumbi@entreprise.cm', phone: '+237 695 555 555', city: 'Douala', address: '200 Bd de la Liberté', avatar: null, preferredAgencyId: 'ca_001', status: 'active', memberSince: subDays(now, 90), company: 'Mudumbi & Fils' },
  { id: 'clp_006', companyId: 'cc_001', firstName: 'Félix', lastName: 'Ngoie', email: 'felix.ngoie@gmail.com', phone: '+237 696 666 666', city: 'Maroua', address: '89 Rue du Commerce', avatar: null, preferredAgencyId: 'ca_004', status: 'active', memberSince: subDays(now, 60), company: null },
  { id: 'clp_007', companyId: 'cc_001', firstName: 'Brigitte', lastName: 'Mpiana', email: 'brigitte.mpiana@yahoo.fr', phone: '+237 697 777 777', city: 'Garoua', address: '56 Rue du Marché', avatar: null, preferredAgencyId: 'ca_005', status: 'active', memberSince: subDays(now, 30), company: 'Mpiana Commerce' },
  { id: 'clp_008', companyId: 'cc_002', firstName: 'Alain', lastName: 'Tshibangu', email: 'alain.tshibangu@cargologistics.cm', phone: '+237 698 888 888', city: 'Yaoundé', address: '567 Rue des Arts', avatar: null, preferredAgencyId: 'ca_006', status: 'active', memberSince: subDays(now, 120), company: 'Tshibangu Distribution' },
];

/* ───────────────────────────────────────────────
   Destinataires (recipients)
   ─────────────────────────────────────────────── */
const FIRST_NAMES = ['Emmanuel', 'Chantal', 'Rodrigue', 'Laetitia', 'Serge', 'Clarisse', 'Dany', 'Estelle', 'Hervé', 'Nadine', 'Blaise', 'Josiane', 'Gaël', 'Mireille', 'Constant', 'Sylvie', 'Junior', 'Florine', 'Armand', 'Véronique'];
const LAST_NAMES = ['Tchoumi', 'Kamga', 'Fotso', 'Nkono', 'Mbarga', 'Atangana', 'Nguea', 'Essomba', 'Talla', 'Wandji', 'Ngo Bassa', 'Mvondo', 'Eyinga', 'Ondoa', 'Bella', 'Minko', 'Akoa', 'Bindzi', 'Ombede', 'Meyong'];

export const clientDestinataires = FIRST_NAMES.map((firstName, i) => ({
  id: `cde_${String(i + 1).padStart(3, '0')}`,
  firstName,
  lastName: LAST_NAMES[i],
  phone: `+237 690 ${String(100 + i).slice(-3)} ${String(500 + i).slice(-3)}`,
  city: ['Douala', 'Yaoundé', 'Bamenda', 'Maroua', 'Garoua', 'Kribi', 'Bafoussam', 'Ngaoundéré'][i % 8],
  address: `${rand(1, 200)} ${pick(['Rue', 'Av', 'Bd'])} ${pick(['du Marché', 'de la Gare', 'Principale', 'des Artisans', 'de l\'Indépendance'])}`,
}));

/* ───────────────────────────────────────────────
   Status helpers
   ─────────────────────────────────────────────── */
const SHIPMENT_STATUSES = ['validated', 'preparing', 'in_transit', 'arrived', 'available_pickup', 'delivered', 'cancelled'];
const DESTINATIONS = ['Douala', 'Yaoundé', 'Bamenda', 'Maroua', 'Garoua', 'Kribi', 'Bafoussam', 'Ngaoundéré'];
const PARCEL_CATEGORIES = ['standard', 'électronique', 'documents', 'alimentation', 'vêtements', 'bagages', 'médicaments'];
const PAYMENT_METHODS = ['cash', 'mobile_money', 'bank_transfer', 'card'];

function makeTrackingHistory(shipment, parcelIndex) {
  const steps = [];
  const created = new Date(shipment.createdAt);
  const originAgency = clientAgencies.find(a => a.id === shipment.agencyId);
  const destAgency = clientAgencies.find(a => a.id === shipment.destinationAgencyId);

  const push = (status, date, location, description) => {
    steps.push({
      id: `th_${shipment.id}_${parcelIndex}_${steps.length + 1}`,
      status,
      date: new Date(date),
      location,
      description,
      agentName: pick(['Marie Kabila', 'David Kasongo', 'Grace Mwamba', 'Sarah Mbuyi']),
    });
  };

  push('validated', subHours(created, -1), originAgency ? `${originAgency.name}, ${originAgency.city}` : shipment.origin, 'Colis enregistré et pris en charge');

  if (['preparing', 'in_transit', 'arrived', 'available_pickup', 'delivered'].includes(shipment.status)) {
    push('preparing', subHours(created, -8), originAgency ? `${originAgency.name}, ${originAgency.city}` : shipment.origin, 'Colis en cours de préparation');
  }
  if (['in_transit', 'arrived', 'available_pickup', 'delivered'].includes(shipment.status)) {
    push('in_transit', subHours(created, -20), `${shipment.origin} → ${shipment.destination}`, 'Colis chargé et en route');
  }
  if (['arrived', 'available_pickup', 'delivered'].includes(shipment.status)) {
    push('arrived', subDays(now, rand(1, 4)), destAgency ? `${destAgency.name}, ${destAgency.city}` : shipment.destination, 'Colis arrivé à destination');
  }
  if (['available_pickup', 'delivered'].includes(shipment.status)) {
    push('available_pickup', subDays(now, rand(0, 2)), destAgency ? `${destAgency.name}, ${destAgency.city}` : shipment.destination, 'Colis disponible pour retrait');
  }
  if (shipment.status === 'delivered') {
    push('delivered', subDays(now, rand(0, 1)), destAgency ? `${destAgency.name}, ${destAgency.city}` : shipment.destination, 'Colis récupéré par le destinataire');
  }
  if (shipment.status === 'cancelled') {
    push('cancelled', subDays(now, rand(1, 5)), originAgency ? `${originAgency.name}, ${originAgency.city}` : shipment.origin, 'Expédition annulée');
  }

  return steps.sort((a, b) => new Date(b.date) - new Date(a.date));
}

function parcelStatusFromShipment(status) {
  return status === 'delivered' ? 'collected'
    : status === 'available_pickup' ? 'available_pickup'
    : status === 'arrived' ? 'arrived'
    : status === 'in_transit' ? 'in_transit'
    : status === 'cancelled' ? 'cancelled'
    : status === 'preparing' ? 'preparing'
    : 'registered';
}

/* ───────────────────────────────────────────────
   Generate core datasets once (deterministic)
   ─────────────────────────────────────────────── */
const seedShipments = [];
let ref = 2001;
let trackingSeed = 6001;

for (let i = 0; i < 28; i++) {
  const dest = DESTINATIONS[i % DESTINATIONS.length];
  const status = SHIPMENT_STATUSES[i % 7];
  const pkgCount = (i % 4) + 1;
  const amount = pkgCount * (2000 + (i * 700));
  const daysAgo = i * 1.5;
  const originCity = i < 14 ? 'Douala' : 'Yaoundé';
  const originAgencyId = i < 14 ? 'ca_001' : 'ca_002';
  const destAgencyId = (i % 6) + 1 >= 6 ? 'ca_006' : `ca_${String((i % 6) + 1).padStart(3, '0')}`;
  const destProfile = clientDestinataires[i % clientDestinataires.length];

  seedShipments.push({
    id: `csh_${String(i + 1).padStart(4, '0')}`,
    reference: `EXP-2024-${ref++}`,
    clientId: 'clp_001',
    companyId: 'cc_001',
    agencyId: originAgencyId,
    destinationAgencyId: destAgencyId,
    origin: originCity,
    destination: dest,
    expediteur: { name: 'Pierre Mutombo', phone: '+237 691 111 111', company: 'Entreprise Mutombo SARL', city: originCity },
    destinataire: { name: `${destProfile.firstName} ${destProfile.lastName}`, phone: destProfile.phone, city: destProfile.city, address: destProfile.address },
    packageCount: pkgCount,
    totalWeight: null,
    totalAmount: amount,
    paidAmount: status !== 'cancelled' ? amount : 0,
    paymentMethod: PAYMENT_METHODS[i % 4],
    paymentStatus: status === 'cancelled' ? 'refunded' : i % 5 === 0 ? 'pending' : 'paid',
    status,
    createdAt: subDays(now, Math.floor(daysAgo)),
    updatedAt: subHours(subDays(now, Math.max(0, Math.floor(daysAgo) - 1)), (i * 3) % 12),
    estimatedDeliveryDate: addDays(subDays(now, Math.floor(daysAgo)), 4 + (i % 3)),
  });
}

seedShipments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

export const clientShipments = seedShipments.map((s, i) => {
  const parcels = [];
  for (let j = 0; j < s.packageCount; j++) {
    const weight = Math.round((2 + ((i * 3 + j * 2) % 17) + 0.5) * 10) / 10;
    const dims = { length: 30 + ((i + j) % 40), width: 20 + ((i * 2 + j) % 25), height: 10 + ((i + j * 3) % 30) };
    const pStatus = parcelStatusFromShipment(s.status);
    parcels.push({
      id: `cpk_${String(parcels.length + 1).padStart(4, '0')}`,
      trackingNumber: `LP-${trackingSeed++}`,
      shipmentId: s.id,
      clientId: s.clientId,
      companyId: s.companyId,
      weight,
      dimensions: dims,
      category: PARCEL_CATEGORIES[(i + j) % PARCEL_CATEGORIES.length],
      description: pick(['Colis standard', 'Carton scellé', 'Sac plastique', 'Boîte renforcée', 'Enveloppe matelassée']),
      declaredValue: (5000 + ((i * 11 + j * 7) % 90000)),
      status: pStatus,
      destination: s.destination,
      origin: s.origin,
      createdAt: s.createdAt,
      updatedAt: s.updatedAt,
      arrivalDate: ['available_pickup', 'arrived', 'collected'].includes(pStatus) ? subDays(now, (i + j) % 5) : null,
    });
  }
  const totalWeight = Math.round(parcels.reduce((sum, p) => sum + p.weight, 0) * 10) / 10;
  return { ...s, totalWeight, parcels };
});

export const clientParcels = clientShipments.flatMap((s) => s.parcels);

export const trackingHistory = clientParcels.reduce((acc, p, idx) => {
  const shipment = clientShipments.find((s) => s.id === p.shipmentId);
  acc[p.id] = makeTrackingHistory(shipment, idx);
  return acc;
}, {});

export const clientPayments = clientShipments
  .filter((s) => s.status !== 'cancelled')
  .slice(0, 18)
  .map((s, i) => ({
    id: `cpy_${String(i + 1).padStart(4, '0')}`,
    shipmentId: s.id,
    clientId: s.clientId,
    reference: `PAY-2024-${String(7100 + i)}`,
    expeditionReference: s.reference,
    amount: s.totalAmount,
    method: s.paymentMethod,
    status: s.paymentStatus,
    transactionId: `TXN${String(500001 + i)}${String(1000 + i).slice(-3)}`,
    createdAt: subHours(s.createdAt, Math.floor(Math.random() * 2)),
    agencyId: s.agencyId,
    companyId: s.companyId,
    history: [
      { id: `ph_${i}_1`, status: 'pending', date: subHours(s.createdAt, 2), description: 'Paiement initié' },
      { id: `ph_${i}_2`, status: 'paid', date: subHours(s.createdAt, 1), description: 'Paiement confirmé' },
    ],
  }));

export const clientNotifications = [
  { id: 'cnot_001', clientId: 'clp_001', type: 'success', title: 'Colis livré', message: 'Votre colis LP-6012 a été livré avec succès', time: subHours(now, 2), read: false },
  { id: 'cnot_002', clientId: 'clp_001', type: 'info', title: 'Expédition en transit', message: 'EXP-2024-2015 est en route vers Yaoundé', time: subHours(now, 5), read: false },
  { id: 'cnot_003', clientId: 'clp_001', type: 'warning', title: 'Paiement confirmé', message: '45 000 FC reçus pour EXP-2024-2010', time: subHours(now, 8), read: true },
  { id: 'cnot_004', clientId: 'clp_001', type: 'info', title: 'Colis disponible', message: 'LP-6020 est disponible au retrait à Bamenda', time: subDays(now, 1), read: false },
  { id: 'cnot_005', clientId: 'clp_001', type: 'success', title: 'Expédition créée', message: 'EXP-2024-2025 créée avec succès', time: subDays(now, 2), read: true },
  { id: 'cnot_006', clientId: 'clp_001', type: 'warning', title: 'Rappel retrait', message: 'Un colis vous attend depuis 5 jours à Douala', time: subDays(now, 3), read: false },
  { id: 'cnot_007', clientId: 'clp_001', type: 'danger', title: 'Retard de livraison', message: 'EXP-2024-2018 a du retard à Maroua', time: subDays(now, 4), read: true },
  { id: 'cnot_008', clientId: 'clp_001', type: 'info', title: 'Promotion spéciale', message: 'Bénéficiez de -20% sur votre prochaine expédition', time: subDays(now, 5), read: true },
];

export const clientActivities = clientShipments.slice(0, 15).map((s, i) => {
  const types = ['shipment', 'payment', 'parcel', 'profile'];
  const type = types[i % types.length];
  const base = { id: `cact_${String(i + 1).padStart(4, '0')}`, clientId: 'clp_001', type, time: s.createdAt, reference: s.reference };
  if (type === 'shipment') return { ...base, title: 'Nouvelle expédition', description: `${s.reference} créée vers ${s.destination}` };
  if (type === 'payment') return { ...base, title: 'Paiement effectué', description: `${s.totalAmount.toLocaleString()} FC pour ${s.reference}` };
  if (type === 'parcel') return { ...base, title: 'Colis en transit', description: `Colis de ${s.origin} vers ${s.destination}` };
  return { ...base, title: 'Profil mis à jour', description: 'Informations personnelles modifiées' };
});

/* ───────────────────────────────────────────────
   Stats + computed helpers
   ─────────────────────────────────────────────── */
function computeStats(clientId) {
  const shipments = clientShipments.filter((s) => s.clientId === clientId);
  const parcels = clientParcels.filter((p) => p.clientId === clientId);
  const payments = clientPayments.filter((p) => p.clientId === clientId);
  return {
    totalShipments: shipments.length,
    totalParcels: parcels.length,
    inTransitParcels: parcels.filter((p) => p.status === 'in_transit').length,
    availableParcels: parcels.filter((p) => p.status === 'available_pickup').length,
    deliveredParcels: parcels.filter((p) => p.status === 'collected').length,
    totalSpent: shipments.filter((s) => s.status !== 'cancelled').reduce((sum, s) => sum + s.totalAmount, 0),
    pendingPayments: payments.filter((p) => p.status === 'pending').length,
    unreadNotifications: clientNotifications.filter((n) => !n.read).length,
  };
}

function computeFrequentDestinations(clientId) {
  const counts = {};
  clientShipments.filter((s) => s.clientId === clientId).forEach((s) => {
    counts[s.destination] = (counts[s.destination] || 0) + 1;
  });
  return Object.entries(counts)
    .map(([city, count]) => ({ city, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}

function computeFrequentAgencies(clientId) {
  const counts = {};
  clientShipments.filter((s) => s.clientId === clientId).forEach((s) => {
    counts[s.agencyId] = (counts[s.agencyId] || 0) + 1;
  });
  return Object.entries(counts)
    .map(([id, count]) => ({ agency: clientAgencies.find((a) => a.id === id), count }))
    .filter((x) => x.agency)
    .sort((a, b) => b.count - a.count)
    .slice(0, 4);
}

const clientTimeline = [
  { id: 'tl_1', type: 'created', title: 'Première expédition', description: 'Vous avez créé votre première expédition', date: clientProfiles[0].memberSince, icon: 'package' },
  { id: 'tl_2', type: 'milestone', title: '5 expéditions', description: 'Vous avez atteint 5 expéditions', date: subDays(now, 120), icon: 'star' },
  { id: 'tl_3', type: 'milestone', title: 'Client fidèle', description: 'Plus de 6 mois d\'activité', date: subDays(now, 180), icon: 'award' },
];

/* ───────────────────────────────────────────────
   Public getters
   ─────────────────────────────────────────────── */
export function getClientData(clientId = 'clp_001') {
  const client = clientProfiles.find((c) => c.id === clientId) || clientProfiles[0];
  const company = clientCompanies.find((c) => c.id === client.companyId);
  const preferredAgency = clientAgencies.find((a) => a.id === client.preferredAgencyId);

  return {
    client,
    company,
    preferredAgency,
    stats: computeStats(clientId),
    shipments: clientShipments.filter((s) => s.clientId === clientId),
    parcels: clientParcels.filter((p) => p.clientId === clientId),
    payments: clientPayments.filter((p) => p.clientId === clientId),
    notifications: clientNotifications,
    activities: clientActivities,
    frequentDestinations: computeFrequentDestinations(clientId),
    frequentAgencies: computeFrequentAgencies(clientId),
    timeline: clientTimeline,
  };
}

export function getShipments(clientId = 'clp_001') {
  return clientShipments.filter((s) => s.clientId === clientId).map(enrichShipment);
}

export function getShipment(shipmentId) {
  const shipment = clientShipments.find((s) => s.id === shipmentId) || null;
  return shipment ? enrichShipment(shipment) : null;
}

function enrichShipment(shipment) {
  const payment = clientPayments.find((p) => p.shipmentId === shipment.id);
  return payment ? { ...shipment, paymentReference: payment.reference } : shipment;
}

export function getShipmentByReference(reference) {
  return clientShipments.find((s) => s.reference === reference) || null;
}

export function getParcels(clientId = 'clp_001') {
  return clientParcels.filter((p) => p.clientId === clientId);
}

export function getParcelsByShipment(shipmentId) {
  return clientParcels.filter((p) => p.shipmentId === shipmentId);
}

export function getParcel(parcelId) {
  return clientParcels.find((p) => p.id === parcelId) || null;
}

export function getParcelByTracking(trackingNumber) {
  return clientParcels.find(
    (p) => p.trackingNumber.toLowerCase() === String(trackingNumber).trim().toLowerCase()
  ) || null;
}

export function getTrackingHistory(parcelId) {
  return trackingHistory[parcelId] || [];
}

export function getPayments(clientId = 'clp_001') {
  return clientPayments.filter((p) => p.clientId === clientId).map(enrichPayment);
}

export function getPayment(paymentId) {
  const payment = clientPayments.find((p) => p.id === paymentId) || null;
  return payment ? enrichPayment(payment) : null;
}

function enrichPayment(payment) {
  const agency = clientAgencies.find((a) => a.id === payment.agencyId);
  return {
    ...payment,
    shipmentReference: payment.expeditionReference,
    agencyName: agency ? agency.name : '',
    date: payment.createdAt,
  };
}

export function getPaymentByReference(reference) {
  return clientPayments.find((p) => p.reference === reference) || null;
}

export function getClientProfile(clientId = 'clp_001') {
  const client = clientProfiles.find((c) => c.id === clientId) || clientProfiles[0];
  const company = clientCompanies.find((c) => c.id === client.companyId);
  const preferredAgency = clientAgencies.find((a) => a.id === client.preferredAgencyId);
  return { client, company, preferredAgency };
}

export function getAgencies() {
  return clientAgencies;
}

export function getAgency(agencyId) {
  return clientAgencies.find((a) => a.id === agencyId) || null;
}

export function getCompanies() {
  return clientCompanies;
}

export function getDestinataires() {
  return clientDestinataires;
}

export const CLIENT_STATUS_LABELS = {
  validated: 'Validée',
  preparing: 'En préparation',
  assigned: 'Assignée',
  in_transit: 'En transit',
  arrived: 'Arrivée',
  available_pickup: 'Disponible',
  delivered: 'Livrée',
  cancelled: 'Annulée',
  registered: 'Enregistré',
  collected: 'Récupéré',
  pending: 'En attente',
  paid: 'Payé',
  refunded: 'Remboursé',
};

export const CLIENT_STATUS_COLORS = {
  validated: 'info',
  preparing: 'warning',
  assigned: 'warning',
  in_transit: 'primary',
  arrived: 'success',
  available_pickup: 'success',
  delivered: 'success-dark',
  cancelled: 'danger',
  registered: 'secondary',
  collected: 'success-dark',
  pending: 'warning',
  paid: 'success',
  refunded: 'secondary',
};

export const CLIENT_METHOD_LABELS = {
  cash: 'Espèces',
  mobile_money: 'Mobile Money',
  bank_transfer: 'Virement bancaire',
  card: 'Carte bancaire',
};

export default getClientData;
