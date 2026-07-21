import { FileText, Upload, Trash2, Download, Eye } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import useClientStore from '../../store/useClientStore';
import toast from 'react-hot-toast';

export default function ClientDocuments({ documents, loading, clientId }) {
  const { companyId } = useAuth();
  const { addDocument, removeDocument } = useClientStore();

  const handleUpload = async () => {
    const name = prompt('Nom du document:');
    if (!name) return;
    const type = prompt('Type (cni, passport, driving_license, other):') || 'other';
    try {
      await addDocument(companyId, clientId, { name, type, fileName: `${name.toLowerCase().replace(/\s/g, '_')}.pdf`, fileUrl: '#', mimeType: 'application/pdf', size: 0 });
      toast.success('Document ajouté');
    } catch { toast.error('Erreur'); }
  };

  const handleRemove = async (docId) => {
    if (window.confirm('Supprimer ce document ?')) {
      try { await removeDocument(companyId, docId); toast.success('Document supprimé'); } catch { toast.error('Erreur'); }
    }
  };

  const fmtSize = (bytes) => {
    if (!bytes) return '—';
    return bytes > 1024 * 1024 ? `${(bytes / (1024 * 1024)).toFixed(1)} MB` : `${(bytes / 1024).toFixed(0)} KB`;
  };

  return (
    <div className="bg-white rounded-3 shadow-sm p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="fw-semibold mb-0">Documents ({documents.length})</h6>
        <button type="button" className="btn btn-sm btn-primary d-flex align-items-center gap-1" onClick={handleUpload}><Upload size={14} /> Ajouter</button>
      </div>
      {loading ? (
        <div className="text-muted small">Chargement...</div>
      ) : documents.length === 0 ? (
        <div className="text-muted small text-center py-4">Aucun document</div>
      ) : (
        <div className="list-group list-group-flush">
          {documents.map((doc) => (
            <div key={doc.id} className="list-group-item d-flex align-items-center justify-content-between px-0">
              <div className="d-flex align-items-center gap-3">
                <FileText size={20} className="text-primary" />
                <div>
                  <div className="fw-medium small">{doc.name}</div>
                  <div className="text-muted" style={{ fontSize: 11 }}>{doc.fileName} — {fmtSize(doc.size)}</div>
                </div>
              </div>
              <div className="d-flex gap-1">
                <button type="button" className="btn btn-sm btn-outline-primary rounded-pill px-2 py-1"><Eye size={13} /></button>
                <button type="button" className="btn btn-sm btn-outline-secondary rounded-pill px-2 py-1"><Download size={13} /></button>
                <button type="button" className="btn btn-sm btn-outline-danger rounded-pill px-2 py-1" onClick={() => handleRemove(doc.id)}><Trash2 size={13} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
