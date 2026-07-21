import { Check } from 'lucide-react';

const STEPS = [
  { num: 1, label: 'Expéditeur' },
  { num: 2, label: 'Destinataire' },
  { num: 3, label: 'Transport' },
  { num: 4, label: 'Colis' },
  { num: 5, label: 'Récapitulatif' },
];

export default function ShipmentStepper({ currentStep }) {
  return (
    <div className="d-flex align-items-center justify-content-center mb-4">
      {STEPS.map((step, idx) => (
        <div key={step.num} className="d-flex align-items-center">
          <div className="d-flex flex-column align-items-center">
            <div className={`rounded-circle d-flex align-items-center justify-content-center fw-semibold ${currentStep > step.num ? 'bg-success text-white' : currentStep === step.num ? 'bg-primary text-white' : 'bg-light text-muted'}`} style={{ width: 36, height: 36, fontSize: 14 }}>
              {currentStep > step.num ? <Check size={16} /> : step.num}
            </div>
            <span className={`small mt-1 ${currentStep === step.num ? 'fw-semibold text-primary' : 'text-muted'}`}>{step.label}</span>
          </div>
          {idx < STEPS.length - 1 && (
            <div className={`mx-2 mb-3 ${currentStep > step.num ? 'bg-success' : 'bg-light'}`} style={{ width: 60, height: 2 }} />
          )}
        </div>
      ))}
    </div>
  );
}
