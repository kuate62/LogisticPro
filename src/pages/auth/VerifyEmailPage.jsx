import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthCard, AuthHeader } from '../../components/auth';
import { FormField, EmailInput, LoadingButton, FormError } from '../../components/form';
import { useAuth } from '../../hooks/useAuth';
import { useForm } from '../../hooks/useForm';
import { forgotPasswordSchema } from '../../helpers/validation';
import { mockAuthService } from '../../api/mockAuth';
import { MailCheck, RotateCcw, Pencil, ArrowLeft } from 'lucide-react';
import './VerifyEmailPage.css';

const RESEND_DELAY = 60;

export function VerifyEmailPage() {
  const { user } = useAuth();
  const [email, setEmail] = useState(user?.email || '');
  const [mode, setMode] = useState('idle');
  const [countdown, setCountdown] = useState(0);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendError, setResendError] = useState(null);

  const {
    errors,
    isSubmitting,
    handleSubmit,
    getFieldProps,
  } = useForm({
    schema: forgotPasswordSchema,
    onSubmit: async (values) => {
      await mockAuthService.updateEmail(values.email);
      setEmail(values.email);
      setMode('idle');
      setCountdown(RESEND_DELAY);
      toast.success('Email mis à jour. Un nouveau lien a été envoyé.');
    },
  });

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleResend = useCallback(async () => {
    if (countdown > 0) return;
    setResendLoading(true);
    setResendError(null);
    try {
      await mockAuthService.resendVerification(email);
      setCountdown(RESEND_DELAY);
      toast.success('Email de vérification renvoyé.');
    } catch (err) {
      setResendError(err.message);
      toast.error('Échec de l\'envoi.');
    } finally {
      setResendLoading(false);
    }
  }, [email, countdown]);

  const formatCountdown = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <AuthCard>
      <div className="lp-verify-email">
        <div className={`lp-verify-email__icon ${mode === 'success' ? 'lp-verify-email__icon--pulse' : ''}`}>
          <MailCheck size={48} />
        </div>

        {mode !== 'edit' && (
          <>
            <AuthHeader
              title="Vérifiez votre email"
              subtitle="Nous avons envoyé un lien de vérification à l'adresse ci-dessous. Cliquez sur le lien pour activer votre compte."
            />

            <p className="lp-verify-email__address">{email}</p>

            <FormError message={resendError} />

            <div className="lp-verify-email__actions">
              <LoadingButton
                variant="primary"
                size="lg"
                fullWidth
                isLoading={resendLoading}
                loadingText="Envoi en cours..."
                onClick={handleResend}
                disabled={countdown > 0}
                icon={RotateCcw}
              >
                {countdown > 0
                  ? `Renvoyer dans ${formatCountdown(countdown)}`
                  : 'Renvoyer l\'email'}
              </LoadingButton>

              <button
                type="button"
                className="lp-verify-email__edit-btn"
                onClick={() => setMode('edit')}
              >
                <Pencil size={14} />
                Modifier l'adresse email
              </button>
            </div>
          </>
        )}

        {mode === 'edit' && (
          <>
            <AuthHeader
              title="Modifier votre email"
              subtitle="Entrez la nouvelle adresse email pour recevoir le lien de vérification."
            />

            <form
              onSubmit={(e) => { setMode('success'); handleSubmit(e); }}
              noValidate
              className="lp-verify-email__edit-form"
            >
              <FormField label="Nouvelle adresse email" error={errors.email} required>
                <EmailInput
                  placeholder="exemple@email.com"
                  autoComplete="email"
                  {...getFieldProps('email')}
                />
              </FormField>

              <div className="lp-verify-email__edit-actions">
                <LoadingButton
                  type="submit"
                  variant="primary"
                  size="md"
                  isLoading={isSubmitting}
                  loadingText="Mise à jour..."
                >
                  Confirmer
                </LoadingButton>
                <LoadingButton
                  type="button"
                  variant="secondary"
                  size="md"
                  onClick={() => setMode('idle')}
                >
                  Annuler
                </LoadingButton>
              </div>
            </form>
          </>
        )}

        <Link to="/login" className="lp-verify-email__back">
          <ArrowLeft size={16} />
          Retour à la connexion
        </Link>
      </div>
    </AuthCard>
  );
}

export default VerifyEmailPage;
