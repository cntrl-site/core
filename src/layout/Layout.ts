import { LayoutGrid } from '../grid/Grid';

export interface Layout {
  title: string;
  icon: string;
  startsWith: number;
  exemplary: number;
  grid: LayoutGrid;
  id: string;
  disabled: boolean;
  locked: boolean;
}
