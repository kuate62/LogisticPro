import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthCard, AuthHeader, AuthFooter } from '../../components/auth';
import {
  FormField,
  TextInput,
  EmailInput,
  PasswordInput,
  PasswordStrength,
  LoadingButton,
  FormError,
} from '../../components/form';
import { useForm } from '../../hooks/useForm';
import { useAuth } from '../../hooks/useAuth';
import { registerSchema } from '../../helpers/validation';
import './RegisterPage.css';

export function RegisterPage() {
  const navigate = useNavigate();
  const { register, clearError } = useAuth();
  const firstNameRef = useRef(null);

  const {
    values,
    errors,
    submitError,
    isSubmitting,
    handleSubmit,
    getFieldProps,
    setValue,
  } = useForm({
    schema: registerSchema,
    onSubmit: async (data) => {
      await register({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        password: data.password,
      });
    },
  });

  useEffect(() => {
    firstNameRef.current?.focus();
  }, []);

  useEffect(() => {
    clearError();
  }, [clearError]);

  const onSubmit = async (e) => {
    try {
      await handleSubmit(e);
      toast.success('Compte créé avec succès ! Vérifiez votre email.');
      navigate('/verify-email');
    } catch {
      toast.error('Échec de la création du compte.');
    }
  };

  return (
    <AuthCard>
      <AuthHeader
        title="Créer un compte"
        subtitle="Rejoignez LogisticPro et gérez vos expéditions"
      />

      <FormError message={submitError} />

      <form onSubmit={onSubmit} noValidate className="lp-register-form">
        <div className="lp-register-form__row">
          <FormField label="Nom" error={errors.lastName} required>
            <TextInput
              ref={firstNameRef}
              placeholder="Dupont"
              autoComplete="family-name"
              {...getFieldProps('lastName')}
            />
          </FormField>

          <FormField label="Prénom" error={errors.firstName} required>
            <TextInput
              placeholder="Jean"
              autoComplete="given-name"
              {...getFieldProps('firstName')}
            />
          </FormField>
        </div>

        <FormField label="Téléphone" error={errors.phone} helperText="Optionnel">
          <TextInput
            placeholder="+237 691 234 567"
            type="tel"
            autoComplete="tel"
            {...getFieldProps('phone')}
          />
        </FormField>

        <FormField label="Email" error={errors.email} required>
          <EmailInput
            placeholder="exemple@email.com"
            autoComplete="email"
            {...getFieldProps('email')}
          />
        </FormField>

        <FormField label="Mot de passe" error={errors.password} required>
          <PasswordInput
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

        <div className="lp-register-form__consent">
          <label className="lp-register-form__checkbox">
            <input
              type="checkbox"
              className="lp-register-form__checkbox-input"
              onChange={(e) => setValue('acceptTerms', e.target.checked)}
            />
            <span className="lp-register-form__checkbox-custom" />
            <span className="lp-register-form__checkbox-label">
              J'accepte les{' '}
              <a href="#conditions" target="_blank" rel="noreferrer">
                conditions d'utilisation
              </a>
            </span>
          </label>
          {errors.acceptTerms && (
            <p className="lp-register-form__consent-error">{errors.acceptTerms}</p>
          )}

          <label className="lp-register-form__checkbox">
            <input
              type="checkbox"
              className="lp-register-form__checkbox-input"
              onChange={(e) => setValue('acceptPrivacy', e.target.checked)}
            />
            <span className="lp-register-form__checkbox-custom" />
            <span className="lp-register-form__checkbox-label">
              J'accepte la{' '}
              <a href="#privacy" target="_blank" rel="noreferrer">
                politique de confidentialité
              </a>
            </span>
          </label>
          {errors.acceptPrivacy && (
            <p className="lp-register-form__consent-error">{errors.acceptPrivacy}</p>
          )}
        </div>

        <LoadingButton
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          isLoading={isSubmitting}
          loadingText="Création en cours..."
        >
          Créer mon compte
        </LoadingButton>
      </form>

      <AuthFooter>
        Déjà un compte ?{' '}
        <Link to="/login">Se connecter</Link>
      </AuthFooter>
    </AuthCard>
  );
}

export default RegisterPage;
