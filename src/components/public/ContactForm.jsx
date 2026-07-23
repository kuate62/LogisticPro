import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { Send } from 'lucide-react';

const schema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Adresse email invalide'),
  subject: z.string().min(3, 'Le sujet doit contenir au moins 3 caractères'),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
});

export default function ContactForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    toast.success('Message envoyé avec succès ! Nous vous répondrons sous 24h.');
    reset();
    void data;
  };

  return (
    <form className="lp-contact__form" onSubmit={handleSubmit(onSubmit)}>
      <div className="lp-contact__form-row">
        <div className="lp-contact__form-group">
          <label htmlFor="contact-name">Nom complet</label>
          <input
            id="contact-name"
            type="text"
            placeholder="Votre nom"
            {...register('name')}
          />
          {errors.name && <span className="lp-contact__form-error">{errors.name.message}</span>}
        </div>
        <div className="lp-contact__form-group">
          <label htmlFor="contact-email">Email</label>
          <input
            id="contact-email"
            type="email"
            placeholder="votre@email.com"
            {...register('email')}
          />
          {errors.email && <span className="lp-contact__form-error">{errors.email.message}</span>}
        </div>
      </div>
      <div className="lp-contact__form-group">
        <label htmlFor="contact-subject">Sujet</label>
        <input
          id="contact-subject"
          type="text"
          placeholder="Objet de votre message"
          {...register('subject')}
        />
        {errors.subject && <span className="lp-contact__form-error">{errors.subject.message}</span>}
      </div>
      <div className="lp-contact__form-group">
        <label htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
          placeholder="Décrivez votre demande..."
          rows={5}
          {...register('message')}
        />
        {errors.message && <span className="lp-contact__form-error">{errors.message.message}</span>}
      </div>
      <button type="submit" className="lp-contact__form-submit" disabled={isSubmitting}>
        <Send size={16} />
        {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
      </button>
    </form>
  );
}
