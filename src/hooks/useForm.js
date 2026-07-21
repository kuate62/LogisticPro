import { useState, useCallback } from 'react';

export function useForm({ schema, onSubmit }) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(null);

  const setValue = useCallback((name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }, [errors]);

  const setFieldError = useCallback((name, message) => {
    setErrors((prev) => ({ ...prev, [name]: message }));
  }, []);

  const validate = useCallback(() => {
    if (!schema) return true;
    const result = schema.safeParse(values);
    if (result.success) {
      setErrors({});
      return true;
    }
    const fieldErrors = {};
    result.error.issues.forEach((issue) => {
      const field = issue.path[0];
      if (field && !fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    });
    setErrors(fieldErrors);
    return false;
  }, [schema, values]);

  const handleSubmit = useCallback(async (e) => {
    if (e) e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(null);

    if (!validate()) return false;

    setIsSubmitting(true);
    try {
      const result = await onSubmit(values);
      setSubmitSuccess(result?.message || null);
      return result;
    } catch (err) {
      setSubmitError(err.message || 'Une erreur est survenue');
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  }, [validate, onSubmit, values]);

  const reset = useCallback(() => {
    setValues({});
    setErrors({});
    setSubmitError(null);
    setSubmitSuccess(null);
    setIsSubmitting(false);
  }, []);

  const getFieldProps = useCallback((name) => ({
    name,
    value: values[name] || '',
    onChange: (e) => setValue(name, e.target.value),
    error: errors[name],
  }), [values, errors, setValue]);

  return {
    values,
    errors,
    submitError,
    submitSuccess,
    isSubmitting,
    setValue,
    setFieldError,
    handleSubmit,
    reset,
    getFieldProps,
    validate,
  };
}

export default useForm;
