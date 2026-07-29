const delay = (ms) => new Promise((r) => setTimeout(r, ms));

export const companyCategories = [
  'Transport urbain',
  'Fret maritime',
  'Logistique express',
  'Distribution locale',
  'Fret international',
  'Messagerie',
];

export const regions = [
  'Littoral',
  'Centre',
  'Adamaoua',
  'Nord',
  'Ouest',
  'Sud',
  'Extrême-Nord',
  'Sud-Ouest',
  'Est',
  'Nord-Ouest',
];

export const mockCompanies = [
  {
    id: 'ent_1',
    name: 'Société Camerounaise de Livraison Express',
    tradeName: 'CamLivEx',
    shortName: 'CamLivEx',
    description: 'Leader du transport express au Cameroun, CamLivEx assure la livraison rapide et sécurisée de vos colis dans tout le pays. Avec plus de 8 agences, nous couvrons les principales villes du Cameroun.',
    city: 'Douala',
    country: 'Cameroun',
    region: 'Littoral',
    address: 'Boulevard de la République, Douala',
    phone: '+237 699 123 456',
    email: 'contact@camlivex.cm',
    website: 'https://camlivex.cm',
    agenciesCount: 8,
    employeesCount: 45,
    verified: true,
    availableToday: true,
    responseTime: '< 2h',
    rating: 4.8,
    categories: ['Transport urbain', 'Logistique express'],
    color: '#2563EB',
    createdAt: '2024-06-15T08:00:00Z',
    popular: true,
  },
  {
    id: 'ent_2',
    name: 'Nord Transport & Logistique',
    tradeName: 'NordTrans',
    shortName: 'NordTrans',
    description: 'Spécialiste du transport dans les régions du nord du Cameroun, NordTrans connecte le nord au sud avec fiabilité et ponctualité.',
    city: 'Garoua',
    country: 'Cameroun',
    region: 'Adamaoua',
    address: 'Avenue de la Paix, Garoua',
    phone: '+237 677 234 567',
    email: 'info@nordtrans.cm',
    website: 'https://nordtrans.cm',
    agenciesCount: 3,
    employeesCount: 18,
    verified: true,
    availableToday: true,
    responseTime: '< 4h',
    rating: 4.5,
    categories: ['Fret international', 'Transport urbain'],
    color: '#7C3AED',
    createdAt: '2024-08-20T08:00:00Z',
    popular: false,
  },
  {
    id: 'ent_3',
    name: 'Société des Hauts Plateaux de Livraison',
    tradeName: 'HautsPlateaux',
    shortName: 'HautsPlateaux',
    description: 'Votre partenaire de confiance pour le transport dans les hauts plateaux de l\'Ouest. Service fiable et ponctual garanti.',
    city: 'Bamenda',
    country: 'Cameroun',
    region: 'Nord-Ouest',
    address: 'Rue Principale, Bamenda',
    phone: '+237 680 345 678',
    email: 'contact@hautsplateaux.cm',
    website: 'https://hautsplateaux.cm',
    agenciesCount: 2,
    employeesCount: 12,
    verified: true,
    availableToday: false,
    responseTime: '< 6h',
    rating: 4.3,
    categories: ['Transport urbain', 'Messagerie'],
    color: '#059669',
    createdAt: '2024-10-01T08:00:00Z',
    popular: false,
  },
  {
    id: 'ent_4',
    name: 'Prestige Cargaison Cameroun',
    tradeName: 'PrestiCargo',
    shortName: 'PrestiCargo',
    description: 'Expert en fret maritime et logistique portuaire, PrestiCargo gère vos expéditions internationales depuis le port de Douala.',
    city: 'Douala',
    country: 'Cameroun',
    region: 'Littoral',
    address: 'Zone portuaire, Douala',
    phone: '+237 691 456 789',
    email: 'operations@presticargo.cm',
    website: 'https://presticargo.cm',
    agenciesCount: 5,
    employeesCount: 32,
    verified: true,
    availableToday: true,
    responseTime: '< 1h',
    rating: 4.9,
    categories: ['Fret maritime', 'Fret international'],
    color: '#0891B2',
    createdAt: '2024-03-10T08:00:00Z',
    popular: true,
  },
  {
    id: 'ent_5',
    name: 'Société Bamiléké de Distribution',
    tradeName: 'SBDistribution',
    shortName: 'SBDistribution',
    description: 'Distribution locale et messagerie dans la région de l\'Ouest. Nous connaissons chaque village, chaque route.',
    city: 'Bafoussam',
    country: 'Cameroun',
    region: 'Ouest',
    address: 'Marché Central, Bafoussam',
    phone: '+237 675 567 890',
    email: 'info@sbdistribution.cm',
    website: 'https://sbdistribution.cm',
    agenciesCount: 1,
    employeesCount: 6,
    verified: true,
    availableToday: true,
    responseTime: '< 8h',
    rating: 4.1,
    categories: ['Distribution locale', 'Messagerie'],
    color: '#D97706',
    createdAt: '2025-01-05T08:00:00Z',
    popular: false,
  },
  {
    id: 'ent_6',
    name: 'Sahel Freight International',
    tradeName: 'SahelFreight',
    shortName: 'SahelFreight',
    description: 'Fret international et logistique transfrontalière pour les zones sahéliennes. Expertise locale, portée mondiale.',
    city: 'Maroua',
    country: 'Cameroun',
    region: 'Extrême-Nord',
    address: 'Route Nationale, Maroua',
    phone: '+237 660 678 901',
    email: 'contact@sahelfreight.cm',
    website: 'https://sahelfreight.cm',
    agenciesCount: 1,
    employeesCount: 4,
    verified: true,
    availableToday: false,
    responseTime: '< 12h',
    rating: 4.0,
    categories: ['Fret international', 'Logistique express'],
    color: '#DC2626',
    createdAt: '2025-02-18T08:00:00Z',
    popular: false,
  },
  {
    id: 'ent_7',
    name: 'Douala Express Services',
    tradeName: 'DoualaExpress',
    shortName: 'DoualaExpress',
    description: 'Livraison express dans toute la ville de Douala. Colis, documents, repas — tout est livré en moins de 2 heures.',
    city: 'Douala',
    country: 'Cameroun',
    region: 'Littoral',
    address: 'Akwa, Douala',
    phone: '+237 699 789 012',
    email: 'hello@doualaexpress.cm',
    website: 'https://doualaexpress.cm',
    agenciesCount: 4,
    employeesCount: 28,
    verified: true,
    availableToday: true,
    responseTime: '< 30min',
    rating: 4.7,
    categories: ['Transport urbain', 'Logistique express', 'Messagerie'],
    color: '#EA580C',
    createdAt: '2024-12-01T08:00:00Z',
    popular: true,
  },
];

export const mockCompaniesService = {
  async getPublicCompanies() {
    await delay(400);
    return mockCompanies.filter((c) => c.verified);
  },

  async getCompanyById(id) {
    await delay(300);
    return mockCompanies.find((c) => c.id === id) || null;
  },

  async searchCompanies({ query = '', filters = {}, sort = 'name_asc', page = 1, perPage = 9 }) {
    await delay(350);
    let results = [...mockCompanies];

    if (query.trim()) {
      const q = query.toLowerCase();
      results = results.filter((c) =>
        c.name.toLowerCase().includes(q) ||
        c.tradeName.toLowerCase().includes(q) ||
        c.shortName.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q) ||
        c.region.toLowerCase().includes(q) ||
        c.country.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.categories.some((cat) => cat.toLowerCase().includes(q))
      );
    }

    if (filters.city) results = results.filter((c) => c.city === filters.city);
    if (filters.region) results = results.filter((c) => c.region === filters.region);
    if (filters.country) results = results.filter((c) => c.country === filters.country);
    if (filters.verified) results = results.filter((c) => c.verified);
    if (filters.availableToday) results = results.filter((c) => c.availableToday);
    if (filters.category) results = results.filter((c) => c.categories.includes(filters.category));

    switch (sort) {
      case 'name_asc': results.sort((a, b) => a.tradeName.localeCompare(b.tradeName)); break;
      case 'name_desc': results.sort((a, b) => b.tradeName.localeCompare(a.tradeName)); break;
      case 'newest': results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); break;
      case 'popular': results.sort((a, b) => b.agenciesCount - a.agenciesCount); break;
      case 'rating': results.sort((a, b) => b.rating - a.rating); break;
      default: results.sort((a, b) => a.tradeName.localeCompare(b.tradeName));
    }

    const total = results.length;
    const totalPages = Math.ceil(total / perPage);
    const start = (page - 1) * perPage;
    const items = results.slice(start, start + perPage);

    return { items, total, totalPages, page, perPage };
  },
};
