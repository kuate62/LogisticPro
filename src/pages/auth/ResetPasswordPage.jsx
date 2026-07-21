import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthCard, AuthHeader, AuthFooter } from '../../components/auth';
import {
  FormField,
  PasswordInput,
  PasswordStrength,
  LoadingButton,
  FormError,
} from '../../components/form';
import { useForm } from '../../hooks/useForm';
import { useAuth } from '../../hooks/useAuth';
import { resetPasswordSchema } from '../../helpers/validation';
import { CheckCircle } from 'lucide-react';
import './ResetPasswordPage.css';

export function ResetPasswordPage() {
  const { resetPassword, clearError } = useAuth();
  const passwordRef = useRef(null);

  const {
    values,
    errors,
    submitError,
    submitSuccess,
    isSubmitting,
    handleSubmit,
    getFieldProps,
  } = useForm({
    schema: resetPasswordSchema,
    onSubmit: async (data) => {
      await resetPassword({ token: 'mock-token', password: data.password });
    },
  });

  useEffect(() => {
    passwordRef.current?.focus();
  }, []);

  useEffect(() => {
    clearError();
  }, [clearError]);

  const onSubmit = async (e) => {
    try {
      await handleSubmit(e);
      toast.success('Mot de passe réinitialisé avec succès !');
    } catch {
      toast.error('Échec de la réinitialisation.');
    }
  };

  if (submitSuccess) {
    return (
      <AuthCard>
        <div className="lp-reset-success">
          <div className="lp-reset-success__icon">
            <CheckCircle size={48} />
          </div>
          <AuthHeader
            title="Mot de passe réinitialisé"
            subtitle="Votre mot de passe a été modifié avec succès. Vous pouvez maintenant vous connecter."
          />
          <Link to="/login" className="lp-reset-success__link">
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
        title="Nouveau mot de passe"
        subtitle="Choisissez un mot de passe sécurisé pour votre compte"
      />

      <FormError message={submitError} />

      <form onSubmit={onSubmit} noValidate className="lp-reset-form">
        <FormField label="Nouveau mot de passe" error={errors.password} required>
          <PasswordInput
            ref={passwordRef}
            placeholder="Minimum 8 caractères"
            autoComplete="new-password"
            {...getFieldProps('password')}
          />
          <PasswordStrength password={values.password || ''} />
        </FormField>

        <FormField label="Confirmer le mot de passe" error={errors.confirmPassword} required>
          <PasswordInput
            placeholder="Retapez votre mot de passe"
            autoComplete="new-password"
            {...getFieldProps('confirmPassword')}
          />
        </FormField>

        <LoadingButton
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          isLoading={isSubmitting}
          loadingText="Réinitialisation..."
        >
          Réinitialiser le mot de passe
        </LoadingButton>
      </form>

      <AuthFooter>
        <Link to="/login">← Retour à la connexion</Link>
      </AuthFooter>
    </AuthCard>
  );
}

export default ResetPasswordPage;
