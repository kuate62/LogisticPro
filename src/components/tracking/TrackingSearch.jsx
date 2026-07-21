import { Card, Form, InputGroup } from 'react-bootstrap';
import { Search } from 'lucide-react';

export default function TrackingSearch({ value, onChange, onSearch }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSearch?.(value);
    }
  };

  return (
    <Card className="border-0 shadow-sm mb-3">
      <Card.Body className="py-3">
        <InputGroup>
          <InputGroup.Text className="bg-white">
            <Search size={18} />
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Rechercher par numéro de suivi, expédition, client..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </InputGroup>
      </Card.Body>
    </Card>
  );
}
