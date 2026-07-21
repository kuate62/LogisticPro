import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthCard, AuthHeader, AuthFooter } from '../../components/auth';
import { FormField, EmailInput, PasswordInput, LoadingButton, FormError } from '../../components/form';
import { useForm } from '../../hooks/useForm';
import { useAuth } from '../../hooks/useAuth';
import { loginSchema } from '../../helpers/validation';
import './LoginPage.css';

export function LoginPage() {
  const navigate = useNavigate();
  const { login, clearError } = useAuth();
  const emailRef = useRef(null);

  const {
    errors,
    submitError,
    isSubmitting,
    handleSubmit,
    getFieldProps,
    setValue,
  } = useForm({
    schema: loginSchema,
    onSubmit: async (values) => {
      await login({ email: values.email, password: values.password });
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
      toast.success('Connexion réussie ! Bienvenue.');
      navigate('/dashboard');
    } catch {
      toast.error('Échec de la connexion. Vérifiez vos identifiants.');
    }
  };

  return (
    <AuthCard>
      <AuthHeader
        title="Connexion"
        subtitle="Accédez à votre espace LogisticPro"
      />

      <FormError message={submitError} />

      <form onSubmit={onSubmit} noValidate className="lp-login-form">
        <FormField label="Email" error={errors.email} required>
          <EmailInput
            ref={emailRef}
            placeholder="exemple@email.com"
            autoComplete="email"
            aria-describedby={errors.email ? 'email-error' : undefined}
            {...getFieldProps('email')}
          />
        </FormField>

        <FormField label="Mot de passe" error={errors.password} required>
          <PasswordInput
            placeholder="Votre mot de passe"
            autoComplete="current-password"
            aria-describedby={errors.password ? 'password-error' : undefined}
            {...getFieldProps('password')}
          />
        </FormField>

        <div className="lp-login-form__options">
          <label className="lp-login-form__checkbox">
            <input
              type="checkbox"
              className="lp-login-form__checkbox-input"
              onChange={(e) => setValue('remember', e.target.checked)}
            />
            <span className="lp-login-form__checkbox-custom" />
            <span className="lp-login-form__checkbox-label">Se souvenir de moi</span>
          </label>
          <Link to="/forgot-password" className="lp-login-form__forgot">
            Mot de passe oublié ?
          </Link>
        </div>

        <LoadingButton
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          isLoading={isSubmitting}
          loadingText="Connexion en cours..."
        >
          Se connecter
        </LoadingButton>
      </form>

      <AuthFooter>
        Pas encore de compte ?{' '}
        <Link to="/register">Créer un compte</Link>
      </AuthFooter>
    </AuthCard>
  );
}

export default LoginPage;
