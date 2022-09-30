import { ItemAny } from './ArticleItems';

export interface Article {
  id: string;
  sections: Section[];
  height: Record<LayoutIdentifier, number>;
}

export interface Section {
  id: string;
  height: Record<LayoutIdentifier, number>;
  visible: Record<LayoutIdentifier, boolean>;
  items: ItemAny[];
  position: Record<LayoutIdentifier, number>;
}

type LayoutIdentifier = string;
