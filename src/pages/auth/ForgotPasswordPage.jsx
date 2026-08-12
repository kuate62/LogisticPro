import { useEffect, useRef, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { CheckCircle } from 'lucide-react';
import { AuthCard, AuthHeader, AuthFooter } from '../../components/auth';
import { FormField, EmailInput, TextInput, PasswordInput, PasswordStrength, LoadingButton, FormError } from '../../components/form';
import { useForm } from '../../hooks/useForm';
import { useAuth } from '../../hooks/useAuth';
import { forgotPasswordSchema, resetCodeSchema, newPasswordSchema } from '../../helpers/validation';
import './ForgotPasswordPage.css';

const STEPS = ['Email', 'Code', 'Mot de passe'];

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const { forgotPassword, verifyResetCode, resetPassword, clearError } = useAuth();
  const emailRef = useRef(null);
  const codeRef = useRef(null);
  const passwordRef = useRef(null);
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [resending, setResending] = useState(false);

  useEffect(() => {
    clearError();
  }, [clearError]);

  useEffect(() => {
    if (step === 1) emailRef.current?.focus();
    if (step === 2) codeRef.current?.focus();
    if (step === 3) passwordRef.current?.focus();
  }, [step]);

  const emailForm = useForm({
    schema: forgotPasswordSchema,
    onSubmit: async (values) => {
      await forgotPassword(values.email);
      setEmail(values.email);
      toast.success('Code de réinitialisation envoyé par email.');
      setStep(2);
    },
  });

  const codeForm = useForm({
    schema: resetCodeSchema,
    onSubmit: async (values) => {
      await verifyResetCode({ email, code: values.code });
      setCode(values.code);
      toast.success('Code vérifié.');
      setStep(3);
    },
  });

  const passwordForm = useForm({
    schema: newPasswordSchema,
    onSubmit: async (values) => {
      await resetPassword({ email, code, password: values.password, confirmPassword: values.confirmPassword });
      toast.success('Mot de passe réinitialisé avec succès !');
      setTimeout(() => navigate('/login'), 2000);
      return { message: 'reset-success' };
    },
  });

  const handleResend = useCallback(async () => {
    setResending(true);
    try {
      await forgotPassword(email);
      toast.success('Nouveau code envoyé par email.');
    } catch {
      toast.error('Impossible de renvoyer le code. Réessayez.');
    } finally {
      setResending(false);
    }
  }, [email, forgotPassword]);

  const onBack = useCallback(() => setStep((s) => Math.max(1, s - 1)), []);

  if (passwordForm.submitSuccess) {
    return (
      <AuthCard>
        <div className="lp-forgot-success">
          <div className="lp-forgot-success__icon">
            <CheckCircle size={48} />
          </div>
          <AuthHeader
            title="Mot de passe réinitialisé"
            subtitle="Votre mot de passe a été modifié avec succès. Vous allez être redirigé vers la connexion."
          />
          <Link to="/login" className="lp-forgot-success__link">
            <LoadingButton variant="primary" size="lg" fullWidth>
              Se connecter
            </LoadingButton>
          </Link>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard>
      <AuthHeader
        title={step === 1 ? 'Mot de passe oublié' : step === 2 ? 'Saisissez le code' : 'Nouveau mot de passe'}
        subtitle={
          step === 1
            ? 'Entrez votre email et nous vous enverrons un code pour réinitialiser votre mot de passe'
            : step === 2
              ? `Un code a été envoyé à ${email}. Saisissez-le pour continuer.`
              : 'Choisissez un nouveau mot de passe sécurisé'
        }
      />

      <div className="lp-forgot-steps" aria-label="Progression">
        {STEPS.map((label, i) => {
          const num = i + 1;
          const isDone = step > num;
          const isActive = step === num;
          return (
            <div key={label} className={`lp-forgot-steps__item ${isActive ? 'lp-forgot-steps__item--active' : ''} ${isDone ? 'lp-forgot-steps__item--done' : ''}`}>
              <div className="lp-forgot-steps__dot">{isDone ? <CheckCircle size={14} /> : num}</div>
              <span className="lp-forgot-steps__label">{label}</span>
            </div>
          );
        })}
      </div>

      <FormError message={step === 1 ? emailForm.submitError : step === 2 ? codeForm.submitError : passwordForm.submitError} />

      {step === 1 && (
        <form onSubmit={async (e) => { try { await emailForm.handleSubmit(e); } catch (err) { toast.error(err.response?.data?.message || 'Impossible d\'envoyer l\'email. Vérifiez votre adresse.'); } }} noValidate className="lp-forgot-form">
          <FormField label="Email" error={emailForm.errors.email} required>
            <EmailInput
              ref={emailRef}
              placeholder="exemple@email.com"
              autoComplete="email"
              {...emailForm.getFieldProps('email')}
            />
          </FormField>

          <LoadingButton
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            isLoading={emailForm.isSubmitting}
            loadingText="Envoi en cours..."
          >
            Envoyer le code
          </LoadingButton>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={async (e) => { try { await codeForm.handleSubmit(e); } catch (err) { const message = err.response?.data?.message || 'Code invalide'; codeForm.setFieldError('code', message); toast.error(message); } }} noValidate className="lp-forgot-form">
          <FormField label="Code de vérification" error={codeForm.errors.code} required>
            <TextInput
              ref={codeRef}
              placeholder="000000"
              inputMode="numeric"
              maxLength={6}
              autoComplete="one-time-code"
              {...codeForm.getFieldProps('code')}
            />
          </FormField>

          <div className="lp-forgot-form__actions">
            <button type="button" className="lp-forgot-form__secondary" onClick={onBack}>
              ← Retour
            </button>
            <button type="button" className="lp-forgot-form__link" onClick={handleResend} disabled={resending}>
              {resending ? 'Envoi...' : 'Renvoyer le code'}
            </button>
          </div>

          <LoadingButton
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            isLoading={codeForm.isSubmitting}
            loadingText="Vérification..."
          >
            Continuer
          </LoadingButton>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={async (e) => { try { await passwordForm.handleSubmit(e); } catch (err) { toast.error(err.response?.data?.message || 'Échec de la réinitialisation.'); } }} noValidate className="lp-forgot-form">
          <FormField label="Nouveau mot de passe" error={passwordForm.errors.password} required>
            <PasswordInput
              ref={passwordRef}
              placeholder="Minimum 8 caractères"
              autoComplete="new-password"
              {...passwordForm.getFieldProps('password')}
            />
            <PasswordStrength password={passwordForm.values.password || ''} />
          </FormField>

          <FormField label="Confirmer le mot de passe" error={passwordForm.errors.confirmPassword} required>
            <PasswordInput
              placeholder="Retapez votre mot de passe"
              autoComplete="new-password"
              {...passwordForm.getFieldProps('confirmPassword')}
            />
          </FormField>

          <div className="lp-forgot-form__actions">
            <button type="button" className="lp-forgot-form__secondary" onClick={onBack}>
              ← Retour
            </button>
          </div>

          <LoadingButton
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            isLoading={passwordForm.isSubmitting}
            loadingText="Réinitialisation..."
          >
            Réinitialiser le mot de passe
          </LoadingButton>
        </form>
      )}

      <AuthFooter>
        <Link to="/login">← Retour à la connexion</Link>
      </AuthFooter>
    </AuthCard>
  );
}

export default ForgotPasswordPage;
