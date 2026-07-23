import { Printer, Share2, Search, Download } from 'lucide-react';

export default function TrackingActions({ onNewSearch }) {
  const handlePrint = () => window.print();
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Suivi LogisticPro', url: window.location.href });
      } catch {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="tks-actions">
      <button className="tks-actions__btn tks-actions__btn--primary" onClick={onNewSearch} type="button">
        <Search size={16} />
        Nouvelle recherche
      </button>
      <button className="tks-actions__btn tks-actions__btn--outline" onClick={handlePrint} type="button">
        <Printer size={16} />
        Imprimer
      </button>
      <button className="tks-actions__btn tks-actions__btn--outline" onClick={handleShare} type="button">
        <Share2 size={16} />
        Partager
      </button>
      <button className="tks-actions__btn tks-actions__btn--outline" onClick={handlePrint} type="button">
        <Download size={16} />
        Télécharger PDF
      </button>
    </div>
  );
}
