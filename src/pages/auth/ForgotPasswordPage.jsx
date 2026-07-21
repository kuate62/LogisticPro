import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthCard, AuthHeader, AuthFooter } from '../../components/auth';
import { FormField, EmailInput, LoadingButton, FormError } from '../../components/form';
import { useForm } from '../../hooks/useForm';
import { useAuth } from '../../hooks/useAuth';
import { forgotPasswordSchema } from '../../helpers/validation';
import { CheckCircle } from 'lucide-react';
import './ForgotPasswordPage.css';

export function ForgotPasswordPage() {
  const { forgotPassword, clearError } = useAuth();
  const emailRef = useRef(null);
  const [sent, setSent] = useState(false);
  const [sentEmail, setSentEmail] = useState('');

  const {
    errors,
    submitError,
    isSubmitting,
    handleSubmit,
    getFieldProps,
  } = useForm({
    schema: forgotPasswordSchema,
    onSubmit: async (values) => {
      await forgotPassword(values.email);
      setSentEmail(values.email);
      setSent(true);
    },
  });

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  useEffect(() => {
    clearError();
  }, [clearError]);

  const onSubmit = async (e) => {
    try {
      await handleSubmit(e);
      toast.success('Email de réinitialisation envoyé.');
    } catch {
      toast.error('Impossible d\'envoyer l\'email. Vérifiez votre adresse.');
    }
  };

  if (sent) {
    return (
      <AuthCard>
        <div className="lp-forgot-success">
          <div className="lp-forgot-success__icon">
            <CheckCircle size={48} />
          </div>
          <AuthHeader
            title="Email envoyé"
            subtitle={`Un lien de réinitialisation a été envoyé à ${sentEmail}. Vérifiez votre boîte de réception.`}
          />
          <Link to="/login" className="lp-forgot-success__link">
            <LoadingButton variant="secondary" size="lg" fullWidth>
              Retour à la connexion
            </LoadingButton>
          </Link>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard>
      <AuthHeader
        title="Mot de passe oublié"
        subtitle="Entrez votre email et nous vous enverrons un lien pour réinitialiser votre mot de passe"
      />

      <FormError message={submitError} />

      <form onSubmit={onSubmit} noValidate className="lp-forgot-form">
        <FormField label="Email" error={errors.email} required>
          <EmailInput
            ref={emailRef}
            placeholder="exemple@email.com"
            autoComplete="email"
            {...getFieldProps('email')}
          />
        </FormField>

        <LoadingButton
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          isLoading={isSubmitting}
          loadingText="Envoi en cours..."
        >
          Envoyer le lien
        </LoadingButton>
      </form>

      <AuthFooter>
        <Link to="/login">← Retour à la connexion</Link>
      </AuthFooter>
    </AuthCard>
  );
}

export default ForgotPasswordPage;
