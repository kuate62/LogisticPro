import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthCard, AuthHeader } from '../../components/auth';
import { FormField, TextInput, LoadingButton, FormError } from '../../components/form';
import { useAuth } from '../../hooks/useAuth';
import useAuthStore from '../../store/useAuthStore';
import { getHomePath } from '../../utils/homePath';
import { MailCheck, RotateCcw, ArrowLeft } from 'lucide-react';
import './VerifyEmailPage.css';

const RESEND_DELAY = 60;

export function VerifyEmailPage() {
  const navigate = useNavigate();
  const { user, verifyEmail, regenerateCode } = useAuth();
  const [code, setCode] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [resendLoading, setResendLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (code.length !== 6) {
      setError('Le code doit contenir 6 chiffres.');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await verifyEmail(code);
      toast.success('Compte vérifié ! Bienvenue.');
      navigate(getHomePath(useAuthStore.getState().user));
    } catch (err) {
      setError(err.message || 'Code invalide ou expiré.');
      toast.error('Code invalide ou expiré.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = useCallback(async () => {
    if (countdown > 0) return;
    setResendLoading(true);
    setError(null);
    try {
      await regenerateCode();
      setCountdown(RESEND_DELAY);
      toast.success('Code de vérification renvoyé.');
    } catch (err) {
      setError(err.message || 'Échec de l\'envoi.');
      toast.error('Échec de l\'envoi.');
    } finally {
      setResendLoading(false);
    }
  }, [countdown, regenerateCode]);

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

  const formatCountdown = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <AuthCard>
      <div className="lp-verify-email">
        <div className="lp-verify-email__icon">
          <MailCheck size={48} />
        </div>

        <AuthHeader
          title="Vérifiez votre email"
          subtitle="Saisissez le code à 6 chiffres reçu par email pour activer votre compte."
        />

        <p className="lp-verify-email__address">{user?.email}</p>

        <FormError message={error} />

        <form onSubmit={handleVerify} noValidate className="lp-verify-email__form">
          <FormField label="Code de vérification" error={error} required>
            <TextInput
              placeholder="000000"
              inputMode="numeric"
              maxLength={6}
              autoFocus
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
            />
          </FormField>

          <LoadingButton
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            isLoading={loading}
            loadingText="Vérification..."
          >
            Vérifier mon compte
          </LoadingButton>
        </form>

        <div className="lp-verify-email__actions">
          <LoadingButton
            variant="secondary"
            size="md"
            fullWidth
            isLoading={resendLoading}
            loadingText="Envoi en cours..."
            onClick={handleResend}
            disabled={countdown > 0}
            icon={RotateCcw}
          >
            {countdown > 0
              ? `Renvoyer dans ${formatCountdown(countdown)}`
              : 'Renvoyer le code'}
          </LoadingButton>
        </div>

        <Link to="/login" className="lp-verify-email__back">
          <ArrowLeft size={16} />
          Retour à la connexion
        </Link>
      </div>
    </AuthCard>
  );
}

export default VerifyEmailPage;
