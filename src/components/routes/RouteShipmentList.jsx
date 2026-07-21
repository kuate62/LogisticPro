import { XCircle } from 'lucide-react';

export default function RouteShipmentList({ shipments, onRemove, disabled }) {
  if (!shipments || shipments.length === 0) {
    return <div className="text-muted small text-center py-4">Aucune expédition assignée</div>;
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead className="bg-light">
          <tr>
            <th>N° Expédition</th>
            <th>Expéditeur</th>
            <th>Destinataire</th>
            <th className="text-center">Colis</th>
            <th>Poids</th>
            <th>Montant</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {shipments.map((s) => (
            <tr key={s.id}>
              <td><code className="small fw-semibold">{s.shipmentNumber}</code></td>
              <td className="small">{s.senderName}</td>
              <td className="small">{s.receiverName}</td>
              <td className="small text-center">{s.packageCount}</td>
              <td className="small">{s.totalWeight} kg</td>
              <td className="small fw-medium">{(s.totalAmount || 0).toLocaleString('fr-FR')} FC</td>
              <td className="text-end">
                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger rounded-pill px-2 py-1"
                  title="Retirer"
                  disabled={disabled}
                  onClick={() => onRemove?.(s.id)}
                >
                  <XCircle size={14} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
