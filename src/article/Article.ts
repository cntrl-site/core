import { ItemAny } from './ArticleItems';

export interface Article {
  id: string;
  sections: Section[];
  height: Record<LayoutIdentifier, number>;
  color: Record<LayoutIdentifier, string | null>;
}

export interface Section {
  id: string;
  name?: string;
  height: Record<LayoutIdentifier, number>;
  hidden: Record<LayoutIdentifier, boolean>;
  items: ItemAny[];
  position: Record<LayoutIdentifier, number>;
  color: Record<LayoutIdentifier, string | null>;
}

type LayoutIdentifier = string;
