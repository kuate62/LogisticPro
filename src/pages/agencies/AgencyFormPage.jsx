const DAYS_FR = [
  { key: 'monday', label: 'Lundi' },
  { key: 'tuesday', label: 'Mardi' },
  { key: 'wednesday', label: 'Mercredi' },
  { key: 'thursday', label: 'Jeudi' },
  { key: 'friday', label: 'Vendredi' },
  { key: 'saturday', label: 'Samedi' },
  { key: 'sunday', label: 'Dimanche' },
];

export { DAYS_FR };

export function AgencyFormSections({ form }) {
  const { values, errors, getFieldProps, setValue } = form;

  return (
    <div className="lp-agency-form__sections">
      <section className="lp-agency-form__section">
        <h3 className="lp-agency-form__section-title">Informations générales</h3>
        <div className="lp-agency-form__grid">
          <div className="lp-agency-form__field">
            <label className="lp-form-label">Nom de l&apos;agence <span className="lp-form-required">*</span></label>
            <input className={`lp-form-input ${errors.name ? 'lp-form-input--error' : ''}`} {...getFieldProps('name')} placeholder="Ex: Agence Centrale" />
            {errors.name && <span className="lp-form-error">{errors.name}</span>}
          </div>
          <div className="lp-agency-form__field">
            <label className="lp-form-label">Code agence <span className="lp-form-required">*</span></label>
            <input className={`lp-form-input ${errors.code ? 'lp-form-input--error' : ''}`} {...getFieldProps('code')} placeholder="Ex: AGC-KIN-001" style={{ fontFamily: 'monospace' }} />
            {errors.code && <span className="lp-form-error">{errors.code}</span>}
          </div>
          <div className="lp-agency-form__field">
            <label className="lp-form-label">Téléphone <span className="lp-form-required">*</span></label>
            <input className={`lp-form-input ${errors.phone ? 'lp-form-input--error' : ''}`} {...getFieldProps('phone')} placeholder="+243 81 234 5678" />
            {errors.phone && <span className="lp-form-error">{errors.phone}</span>}
          </div>
          <div className="lp-agency-form__field">
            <label className="lp-form-label">Email <span className="lp-form-required">*</span></label>
            <input className={`lp-form-input ${errors.email ? 'lp-form-input--error' : ''}`} {...getFieldProps('email')} type="email" placeholder="agence@transport.cd" />
            {errors.email && <span className="lp-form-error">{errors.email}</span>}
          </div>
          <div className="lp-agency-form__field lp-agency-form__field--full">
            <label className="lp-form-label">Description</label>
            <textarea
              className="lp-form-textarea"
              rows={3}
              placeholder="Description de l'agence..."
              value={values.description || ''}
              onChange={(e) => setValue('description', e.target.value)}
            />
          </div>
        </div>
      </section>

      <section className="lp-agency-form__section">
        <h3 className="lp-agency-form__section-title">Adresse</h3>
        <div className="lp-agency-form__grid">
          <div className="lp-agency-form__field lp-agency-form__field--full">
            <label className="lp-form-label">Adresse <span className="lp-form-required">*</span></label>
            <input className={`lp-form-input ${errors.address ? 'lp-form-input--error' : ''}`} {...getFieldProps('address')} placeholder="12, Avenue de la Paix" />
            {errors.address && <span className="lp-form-error">{errors.address}</span>}
          </div>
          <div className="lp-agency-form__field">
            <label className="lp-form-label">Ville <span className="lp-form-required">*</span></label>
            <input className={`lp-form-input ${errors.city ? 'lp-form-input--error' : ''}`} {...getFieldProps('city')} placeholder="Kinshasa" />
            {errors.city && <span className="lp-form-error">{errors.city}</span>}
          </div>
          <div className="lp-agency-form__field">
            <label className="lp-form-label">Région <span className="lp-form-required">*</span></label>
            <input className={`lp-form-input ${errors.region ? 'lp-form-input--error' : ''}`} {...getFieldProps('region')} placeholder="Kinshasa" />
            {errors.region && <span className="lp-form-error">{errors.region}</span>}
          </div>
          <div className="lp-agency-form__field">
            <label className="lp-form-label">Pays</label>
            <input className="lp-form-input" {...getFieldProps('country')} placeholder="Cameroun" />
          </div>
        </div>
      </section>

      <section className="lp-agency-form__section">
        <h3 className="lp-agency-form__section-title">Responsable</h3>
        <div className="lp-agency-form__grid">
          <div className="lp-agency-form__field">
            <label className="lp-form-label">Nom du responsable <span className="lp-form-required">*</span></label>
            <input className={`lp-form-input ${errors.managerName ? 'lp-form-input--error' : ''}`} {...getFieldProps('managerName')} placeholder="Patrick Lukusa" />
            {errors.managerName && <span className="lp-form-error">{errors.managerName}</span>}
          </div>
          <div className="lp-agency-form__field">
            <label className="lp-form-label">Email du responsable <span className="lp-form-required">*</span></label>
            <input className={`lp-form-input ${errors.managerEmail ? 'lp-form-input--error' : ''}`} {...getFieldProps('managerEmail')} type="email" placeholder="responsable@transport.cd" />
            {errors.managerEmail && <span className="lp-form-error">{errors.managerEmail}</span>}
          </div>
          <div className="lp-agency-form__field">
            <label className="lp-form-label">Téléphone du responsable <span className="lp-form-required">*</span></label>
            <input className={`lp-form-input ${errors.managerPhone ? 'lp-form-input--error' : ''}`} {...getFieldProps('managerPhone')} placeholder="+243 83 456 7890" />
            {errors.managerPhone && <span className="lp-form-error">{errors.managerPhone}</span>}
          </div>
        </div>
      </section>

      <section className="lp-agency-form__section">
        <h3 className="lp-agency-form__section-title">Coordonnées GPS</h3>
        <div className="lp-agency-form__grid">
          <div className="lp-agency-form__field">
            <label className="lp-form-label">Latitude</label>
            <input className="lp-form-input" {...getFieldProps('latitude')} type="number" step="any" placeholder="-4.3217" />
          </div>
          <div className="lp-agency-form__field">
            <label className="lp-form-label">Longitude</label>
            <input className="lp-form-input" {...getFieldProps('longitude')} type="number" step="any" placeholder="15.3114" />
          </div>
        </div>
      </section>

      <section className="lp-agency-form__section">
        <h3 className="lp-agency-form__section-title">Horaires</h3>
        <div className="lp-agency-form__schedule">
          {DAYS_FR.map(({ key, label }) => {
            const closed = values[`schedule${key.charAt(0).toUpperCase() + key.slice(1)}Closed`];
            return (
              <div key={key} className="lp-agency-form__day">
                <label className="lp-agency-form__day-label">
                  <input
                    type="checkbox"
                    checked={!!closed}
                    onChange={(e) => setValue(`schedule${key.charAt(0).toUpperCase() + key.slice(1)}Closed`, e.target.checked)}
                  />
                  {label}
                </label>
                {!closed && (
                  <div className="lp-agency-form__day-hours">
                    <input
                      type="time"
                      className="lp-form-input lp-form-input--time"
                      value={values[`schedule${key.charAt(0).toUpperCase() + key.slice(1)}Open`] || ''}
                      onChange={(e) => setValue(`schedule${key.charAt(0).toUpperCase() + key.slice(1)}Open`, e.target.value)}
                    />
                    <span className="lp-agency-form__day-sep">à</span>
                    <input
                      type="time"
                      className="lp-form-input lp-form-input--time"
                      value={values[`schedule${key.charAt(0).toUpperCase() + key.slice(1)}Close`] || ''}
                      onChange={(e) => setValue(`schedule${key.charAt(0).toUpperCase() + key.slice(1)}Close`, e.target.value)}
                    />
                  </div>
                )}
                {closed && <span className="lp-agency-form__day-closed">Fermé</span>}
              </div>
            );
          })}
        </div>
      </section>

      <section className="lp-agency-form__section">
        <label className="lp-form-checkbox">
          <input
            type="checkbox"
            checked={!!values.isPrimary}
            onChange={(e) => setValue('isPrimary', e.target.checked)}
          />
          Définir comme agence principale
        </label>
      </section>
    </div>
  );
}

export default AgencyFormSections;
