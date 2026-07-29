const delay = (ms) => new Promise((r) => setTimeout(r, ms));

export const routes = [
  { id: 'r1', origin: 'Douala', destination: 'Yaoundé', distance: '260 km' },
  { id: 'r2', origin: 'Yaoundé', destination: 'Douala', distance: '260 km' },
  { id: 'r3', origin: 'Douala', destination: 'Bafoussam', distance: '290 km' },
  { id: 'r4', origin: 'Bafoussam', destination: 'Douala', distance: '290 km' },
  { id: 'r5', origin: 'Yaoundé', destination: 'Bafoussam', distance: '310 km' },
  { id: 'r6', origin: 'Bafoussam', destination: 'Yaoundé', distance: '310 km' },
  { id: 'r7', origin: 'Douala', destination: 'Garoua', distance: '1 050 km' },
  { id: 'r8', origin: 'Garoua', destination: 'Douala', distance: '1 050 km' },
  { id: 'r9', origin: 'Yaoundé', destination: 'Garoua', distance: '1 000 km' },
  { id: 'r10', origin: 'Garoua', destination: 'Yaoundé', distance: '1 000 km' },
  { id: 'r11', origin: 'Douala', destination: 'Maroua', distance: '1 100 km' },
  { id: 'r12', origin: 'Maroua', destination: 'Douala', distance: '1 100 km' },
  { id: 'r13', origin: 'Douala', destination: 'Bamenda', distance: '270 km' },
  { id: 'r14', origin: 'Bamenda', destination: 'Douala', distance: '270 km' },
  { id: 'r15', origin: 'Douala', destination: 'Kribi', distance: '200 km' },
  { id: 'r16', origin: 'Kribi', destination: 'Douala', distance: '200 km' },
  { id: 'r17', origin: 'Yaoundé', destination: 'Bertoua', distance: '400 km' },
  { id: 'r18', origin: 'Bertoua', destination: 'Yaoundé', distance: '400 km' },
  { id: 'r19', origin: 'Douala', destination: 'Limbé', distance: '70 km' },
  { id: 'r20', origin: 'Limbé', destination: 'Douala', distance: '70 km' },
];

export const weightTiers = [
  { id: 'w1', label: '- 5 kg', max: 5 },
  { id: 'w2', label: '5-10 kg', max: 10 },
  { id: 'w3', label: '10-20 kg', max: 20 },
  { id: 'w4', label: '20-50 kg', max: 50 },
  { id: 'w5', label: '+ 50 kg', max: -1 },
];

// Tarifs en FCFA par route × poids
const tarifMatrix = {
  r1:  { w1: 2500, w2: 3500, w3: 5000, w4: 8000, w5: 'Sur devis' },
  r2:  { w1: 2500, w2: 3500, w3: 5000, w4: 8000, w5: 'Sur devis' },
  r3:  { w1: 3000, w2: 4500, w3: 6000, w4: 10000, w5: 'Sur devis' },
  r4:  { w1: 3000, w2: 4500, w3: 6000, w4: 10000, w5: 'Sur devis' },
  r5:  { w1: 3500, w2: 5000, w3: 7000, w4: 12000, w5: 'Sur devis' },
  r6:  { w1: 3500, w2: 5000, w3: 7000, w4: 12000, w5: 'Sur devis' },
  r7:  { w1: 7000, w2: 10000, w3: 15000, w4: 25000, w5: 'Sur devis' },
  r8:  { w1: 7000, w2: 10000, w3: 15000, w4: 25000, w5: 'Sur devis' },
  r9:  { w1: 6500, w2: 9500, w3: 14000, w4: 23000, w5: 'Sur devis' },
  r10: { w1: 6500, w2: 9500, w3: 14000, w4: 23000, w5: 'Sur devis' },
  r11: { w1: 7500, w2: 11000, w3: 16000, w4: 27000, w5: 'Sur devis' },
  r12: { w1: 7500, w2: 11000, w3: 16000, w4: 27000, w5: 'Sur devis' },
  r13: { w1: 2800, w2: 4000, w3: 5500, w4: 9000, w5: 'Sur devis' },
  r14: { w1: 2800, w2: 4000, w3: 5500, w4: 9000, w5: 'Sur devis' },
  r15: { w1: 2000, w2: 3000, w3: 4500, w4: 7000, w5: 'Sur devis' },
  r16: { w1: 2000, w2: 3000, w3: 4500, w4: 7000, w5: 'Sur devis' },
  r17: { w1: 5000, w2: 7000, w3: 10000, w4: 16000, w5: 'Sur devis' },
  r18: { w1: 5000, w2: 7000, w3: 10000, w4: 16000, w5: 'Sur devis' },
  r19: { w1: 1500, w2: 2000, w3: 3000, w4: 5000, w5: 'Sur devis' },
  r20: { w1: 1500, w2: 2000, w3: 3000, w4: 5000, w5: 'Sur devis' },
};

export const expressSurcharge = 0.5; // 50% supplément pour express

export const serviceOptions = [
  { id: 'standard', label: 'Standard', surcharge: 0, delay: '2-4 jours' },
  { id: 'express', label: 'Express', surcharge: 0.5, delay: '24h' },
  { id: 'urgent', label: 'Urgent', surcharge: 1.0, delay: '2-4h (même ville)' },
];

export const extraServices = [
  { id: 'assurance', label: 'Assurance renforcée', price: 2000, desc: 'Couverture jusqu\'à 500 000 FCFA' },
  { id: 'emballage', label: 'Emballage professionnel', price: 1500, desc: 'Carton, film bulle, scellé' },
  { id: 'sms', label: 'Notifications SMS', price: 500, desc: 'Alertes à chaque étape' },
  { id: 'livraison_domicile', label: 'Livraison à domicile', price: 3000, desc: 'Livraison à votre porte' },
];

export const mockTarifsService = {
  async getRoutes() {
    await delay(300);
    return [...routes];
  },

  async getWeightTiers() {
    await delay(200);
    return [...weightTiers];
  },

  async getTarif(routeId, weightTierId) {
    await delay(150);
    if (!tarifMatrix[routeId] || !tarifMatrix[routeId][weightTierId]) return null;
    return tarifMatrix[routeId][weightTierId];
  },

  async searchTarifs(origin, destination, weightTierId, serviceType = 'standard') {
    await delay(350);
    const route = routes.find(
      (r) => r.origin.toLowerCase() === origin.toLowerCase() && r.destination.toLowerCase() === destination.toLowerCase()
    );
    if (!route) return null;
    const baseTarif = tarifMatrix[route.id]?.[weightTierId];
    if (!baseTarif) return null;
    if (typeof baseTarif === 'string') return { route, baseTarif: baseTarif, total: baseTarif, serviceType };
    const service = serviceOptions.find((s) => s.id === serviceType) || serviceOptions[0];
    const total = baseTarif + baseTarif * service.surcharge;
    return {
      route,
      baseTarif: `${baseTarif.toLocaleString('fr-FR')} FCFA`,
      total: `${total.toLocaleString('fr-FR')} FCFA`,
      serviceType: service.label,
      delay: service.delay,
    };
  },
};
