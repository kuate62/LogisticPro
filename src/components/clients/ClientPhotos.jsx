import { Camera, Trash2 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import useClientStore from '../../store/useClientStore';
import toast from 'react-hot-toast';

export default function ClientPhotos({ photos, loading, clientId }) {
  const { companyId } = useAuth();
  const { addPhoto, removePhoto } = useClientStore();

  const handleUpload = async () => {
    const name = prompt('Nom de la photo:') || 'Photo de profil';
    try {
      await addPhoto(companyId, clientId, { name, url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}` });
      toast.success('Photo ajoutée');
    } catch { toast.error('Erreur'); }
  };

  const handleRemove = async (photoId) => {
    if (window.confirm('Supprimer cette photo ?')) {
      try { await removePhoto(companyId, photoId); toast.success('Photo supprimée'); } catch { toast.error('Erreur'); }
    }
  };

  return (
    <div className="bg-white rounded-3 shadow-sm p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="fw-semibold mb-0">Photos ({photos.length})</h6>
        <button type="button" className="btn btn-sm btn-primary d-flex align-items-center gap-1" onClick={handleUpload}><Camera size={14} /> Ajouter</button>
      </div>
      {loading ? (
        <div className="text-muted small">Chargement...</div>
      ) : photos.length === 0 ? (
        <div className="text-muted small text-center py-4">Aucune photo</div>
      ) : (
        <div className="row g-3">
          {photos.map((photo) => (
            <div key={photo.id} className="col-md-4 col-6">
              <div className="position-relative rounded overflow-hidden" style={{ aspectRatio: '1/1' }}>
                <img src={photo.url} alt={photo.name} className="w-100 h-100 object-fit-cover" />
                <div className="position-absolute top-0 end-0 p-1">
                  <button type="button" className="btn btn-sm btn-danger rounded-circle p-1" style={{ width: 28, height: 28 }} onClick={() => handleRemove(photo.id)}>
                    <Trash2 size={12} />
                  </button>
                </div>
                <div className="position-absolute bottom-0 start-0 end-0 bg-dark bg-opacity-50 text-white small px-2 py-1 text-truncate">{photo.name}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
