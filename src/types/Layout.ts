import { LayoutGrid } from './Grid';

export interface Layout {
  title: string;
  icon: string;
  startsWith: number;
  exemplary: number;
  grid: LayoutGrid;
  id: string;
}
