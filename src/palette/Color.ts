import { PaletteColorStatus } from './PaletteColorStatus';

export interface Color {
  id: string;
  name: string;
  color: string;
  updatedAt: number;
  status: PaletteColorStatus
}

