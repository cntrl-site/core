import { ItemAny } from './ArticleItems';
import { SectionHeightMode } from './enums/SectionHeightMode';

export interface SectionHeight {
  mode: SectionHeightMode;
  units: number;
  viewportHeight?: number;
}

export interface Section {
  id: string;
  name?: string;
  height: Record<LayoutIdentifier, SectionHeight>;
  hidden: Record<LayoutIdentifier, boolean>;
  items: ItemAny[];
  position: Record<LayoutIdentifier, number>;
  color: Record<LayoutIdentifier, string | null>;
}

type LayoutIdentifier = string;
