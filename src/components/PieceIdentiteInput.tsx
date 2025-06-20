
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PieceIdentiteInputProps {
  typePiece: string;
  onTypePieceChange: (type: string) => void;
  numeroPiece: string;
  onNumeroPieceChange: (numero: string) => void;
  error?: string;
}

const PieceIdentiteInput: React.FC<PieceIdentiteInputProps> = ({
  typePiece,
  onTypePieceChange,
  numeroPiece,
  onNumeroPieceChange,
  error
}) => {
  const typesPieces = [
    { value: 'cni', label: 'Carte Nationale d\'Identité (CNI)' },
    { value: 'passeport', label: 'Passeport' },
    { value: 'carte_sejour', label: 'Carte de Séjour' },
    { value: 'permis_conduire', label: 'Permis de Conduire' }
  ];

  const getPlaceholder = (type: string) => {
    switch (type) {
      case 'cni': return '173456789';
      case 'passeport': return 'GA123456789';
      case 'carte_sejour': return 'CS-2024-001234';
      case 'permis_conduire': return 'GA-2021-001234';
      default: return 'Numéro de la pièce';
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="type-piece">Type de pièce d'identité *</Label>
        <Select value={typePiece} onValueChange={onTypePieceChange}>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner le type de pièce" />
          </SelectTrigger>
          <SelectContent>
            {typesPieces.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="numero-piece">Numéro de pièce d'identité *</Label>
        <Input
          id="numero-piece"
          value={numeroPiece}
          onChange={(e) => onNumeroPieceChange(e.target.value)}
          placeholder={getPlaceholder(typePiece)}
        />
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
      </div>
    </div>
  );
};

export default PieceIdentiteInput;
