import { PaletteColorStatus } from './PaletteColorStatus';

export interface Color {
  id: string;
  name: string;
  value: string;
  updatedAt: number;
  status: PaletteColorStatus;
}

