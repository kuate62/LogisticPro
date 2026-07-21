import { useCallback } from 'react';
import { useForm } from './useForm';
import { agencyCreateSchema, agencyUpdateSchema, agencyToFormValues } from '../helpers/agencyValidation';
import useAgencyStore from '../store/useAgencyStore';
import { useAuth } from './useAuth';
import toast from 'react-hot-toast';

export function useAgencyForm({ mode = 'create', initialData = null } = {}) {
  const { companyId } = useAuth();
  const { createAgency, updateAgency } = useAgencyStore();
  const schema = mode === 'create' ? agencyCreateSchema : agencyUpdateSchema;

  const handleSubmit = useCallback(async (values) => {
    const { formValuesToAgencyPayload } = await import('../helpers/agencyValidation');
    const payload = formValuesToAgencyPayload(values);

    if (mode === 'create') {
      const agency = await createAgency(companyId, payload);
      toast.success('Agence créée avec succès');
      return agency;
    }
    const agency = await updateAgency(companyId, initialData.id, payload);
    toast.success('Agence modifiée avec succès');
    return agency;
  }, [mode, companyId, initialData, createAgency, updateAgency]);

  const form = useForm({
    schema,
    onSubmit: handleSubmit,
  });

  const setInitialValues = useCallback((agency) => {
    const vals = agencyToFormValues(agency);
    Object.entries(vals).forEach(([key, val]) => {
      form.setValue(key, val);
    });
  }, [form]);

  return {
    ...form,
    setInitialValues,
    isCreate: mode === 'create',
    isEdit: mode === 'edit',
  };
}

export default useAgencyForm;
