import { mockUsers, mockTokens } from '../data/mockUsers';
import { STORAGE_KEYS } from '../config/constants';

const simulateDelay = (ms = 800) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const sanitizeUser = (user) => {
  // eslint-disable-next-line no-unused-vars
  const { password: _pw, ...safe } = user;
  return safe;
};

export const mockAuthService = {
  async login({ email, password }) {
    await simulateDelay();
    const user = mockUsers.find( 
      (u) => u.email === email && u.password === password
    );
    if (!user) {
      throw new Error('Email ou mot de passe incorrect');
    }
    if (!user.isActive) {
      throw new Error('Votre compte a été désactivé. Contactez l\'administrateur.');
    }
    const tokens = { ...mockTokens };
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, tokens.access);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, tokens.refresh);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(sanitizeUser(user)));
    return { user: sanitizeUser(user), tokens };
  },

  async register(data) {
    await simulateDelay(1200);
    const exists = mockUsers.find((u) => u.email === data.email);
    if (exists) {
      throw new Error('Un compte existe déjà avec cet email');
    }
    const newUser = {
      id: `usr_${Date.now()}`,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone || '',
      role: 'company_admin',
      avatar: null,
      isActive: true,
      companyId: null,
      createdAt: new Date().toISOString(),
    };
    const tokens = { ...mockTokens };
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, tokens.access);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, tokens.refresh);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));
    return { user: newUser, tokens };
  },

  async forgotPassword(email) {
    await simulateDelay(1000);
    const user = mockUsers.find((u) => u.email === email);
    if (!user) {
      throw new Error('Aucun compte trouvé avec cet email');
    }
    return { message: 'Un lien de réinitialisation a été envoyé à votre adresse email' };
  },

  async resetPassword({ token }) {
    await simulateDelay(1000);
    if (!token) {
      throw new Error('Lien de réinitialisation invalide ou expiré');
    }
    return { message: 'Votre mot de passe a été réinitialisé avec succès' };
  },

  async logout() {
    await simulateDelay(300);
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    return { message: 'Déconnexion réussie' };
  },

  async getCurrentUser() {
    await simulateDelay(300);
    const stored = localStorage.getItem(STORAGE_KEYS.USER);
    const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    if (!stored || !token) {
      throw new Error('Non authentifié');
    }
    return { user: JSON.parse(stored) };
  },

  async updateProfile(data) {
    await simulateDelay(800);
    const stored = localStorage.getItem(STORAGE_KEYS.USER);
    if (!stored) {
      throw new Error('Non authentifié');
    }
    const user = { ...JSON.parse(stored), ...data };
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    return { user };
  },

  async changePassword() {
    await simulateDelay(800);
    const stored = localStorage.getItem(STORAGE_KEYS.USER);
    if (!stored) {
      throw new Error('Non authentifié');
    }
    return { message: 'Mot de passe modifié avec succès' };
  },

  async resendVerification(email) {
    await simulateDelay(1000);
    const user = mockUsers.find((u) => u.email === email);
    if (!user) {
      throw new Error('Aucun compte trouvé avec cet email');
    }
    return { message: 'Un nouvel email de vérification a été envoyé' };
  },

  async updateEmail(email) {
    await simulateDelay(800);
    const stored = localStorage.getItem(STORAGE_KEYS.USER);
    if (!stored) {
      throw new Error('Non authentifié');
    }
    const user = { ...JSON.parse(stored), email };
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    return { user };
  },
};
