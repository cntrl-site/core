import { ItemAny } from './ArticleItems';

export interface Article {
  id: string;
  sections: Section[];
}

export interface Section {
  id: string;
  height: Record<LayoutIdentifier, number>;
  visible: Record<LayoutIdentifier, boolean>;
  items: ItemAny[];
}

type LayoutIdentifier = string;
