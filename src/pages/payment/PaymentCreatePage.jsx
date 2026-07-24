import { Container, Card, Form, Row, Col, Button } from 'react-bootstrap';
import { ArrowLeft, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { paymentFormSchema } from '../../helpers/paymentValidation';
import { usePaymentDetail } from '../../hooks/usePayment';
import { PAYMENT_METHODS, PAYMENT_METHOD_LABELS } from '../../config/constants';

const defaultValues = {
  shipmentId: '', shipmentNumber: '', clientId: '', clientName: '', clientPhone: '',
  transportAmount: 0, insuranceAmount: 0, additionalFees: 0, discount: 0,
  totalAmount: 0, paidAmount: 0, paymentMethod: '', comment: '',
};

export default function PaymentCreatePage() {
  const navigate = useNavigate();
  const { addPayment, loading } = usePaymentDetail();

  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    resolver: zodResolver(paymentFormSchema),
    defaultValues,
  });

  const transportAmount = watch('transportAmount') || 0;
  const insuranceAmount = watch('insuranceAmount') || 0;
  const additionalFees = watch('additionalFees') || 0;
  const discount = watch('discount') || 0;

  const computedTotal = Number(transportAmount) + Number(insuranceAmount) + Number(additionalFees) - Number(discount);

  const onSubmit = async (data) => {
    const result = await addPayment({ ...data, totalAmount: computedTotal });
    if (result) {
      toast.success('Paiement enregistré');
      navigate('/payments');
    }
  };

  return (
    <Container fluid className="py-4">
      <div className="d-flex align-items-center gap-3 mb-4">
        <Button variant="outline-secondary" size="sm" onClick={() => navigate('/payments')}>
          <ArrowLeft size={16} />
        </Button>
        <h4 className="mb-0">Nouveau paiement</h4>
      </div>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className="g-4">
          <Col lg={8}>
            <Card className="border-0 shadow-sm mb-4">
              <Card.Header className="bg-white"><h6 className="mb-0">Informations expédition</h6></Card.Header>
              <Card.Body>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>N° Expédition *</Form.Label>
                      <Form.Control {...register('shipmentNumber')} isInvalid={!!errors.shipmentNumber} placeholder="EXP-2026XXXX-XXXX" />
                      <Form.Control.Feedback type="invalid">{errors.shipmentNumber?.message}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Nom du client *</Form.Label>
                      <Form.Control {...register('clientName')} isInvalid={!!errors.clientName} placeholder="Nom complet" />
                      <Form.Control.Feedback type="invalid">{errors.clientName?.message}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Téléphone client *</Form.Label>
                      <Form.Control {...register('clientPhone')} isInvalid={!!errors.clientPhone} placeholder="+237..." />
                      <Form.Control.Feedback type="invalid">{errors.clientPhone?.message}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <Card className="border-0 shadow-sm mb-4">
              <Card.Header className="bg-white"><h6 className="mb-0">Montants</h6></Card.Header>
              <Card.Body>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Transport (FC) *</Form.Label>
                      <Form.Control type="number" {...register('transportAmount', { valueAsNumber: true })} isInvalid={!!errors.transportAmount} />
                      <Form.Control.Feedback type="invalid">{errors.transportAmount?.message}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Assurance (FC)</Form.Label>
                      <Form.Control type="number" {...register('insuranceAmount', { valueAsNumber: true })} />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Frais supplémentaires (FC)</Form.Label>
                      <Form.Control type="number" {...register('additionalFees', { valueAsNumber: true })} />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Réduction (FC)</Form.Label>
                      <Form.Control type="number" {...register('discount', { valueAsNumber: true })} />
                    </Form.Group>
                  </Col>
                </Row>
                <div className="mt-3 p-3 bg-light rounded">
                  <strong>Montant total: {computedTotal.toLocaleString('fr-FR')} FC</strong>
                </div>
              </Card.Body>
            </Card>

            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-white"><h6 className="mb-0">Paiement</h6></Card.Header>
              <Card.Body>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Montant payé (FC) *</Form.Label>
                      <Form.Control type="number" {...register('paidAmount', { valueAsNumber: true })} isInvalid={!!errors.paidAmount} />
                      <Form.Control.Feedback type="invalid">{errors.paidAmount?.message}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Mode de paiement *</Form.Label>
                      <Form.Select {...register('paymentMethod')} isInvalid={!!errors.paymentMethod}>
                        <option value="">Sélectionner</option>
                        {Object.values(PAYMENT_METHODS).map((m) => (
                          <option key={m} value={m}>{PAYMENT_METHOD_LABELS[m]}</option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">{errors.paymentMethod?.message}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group>
                      <Form.Label>Commentaire</Form.Label>
                      <Form.Control as="textarea" rows={2} {...register('comment')} />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className="border-0 shadow-sm">
              <Card.Body className="text-center">
                <Button type="submit" variant="primary" className="w-100 d-flex align-items-center justify-content-center gap-2" disabled={loading}>
                  <Save size={16} /> Enregistrer le paiement
                </Button>
                <Button variant="outline-secondary" className="w-100 mt-2" onClick={() => navigate('/payments')}>
                  Annuler
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
