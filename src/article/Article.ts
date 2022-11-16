import { Section } from './Section';

export interface Article {
  id: string;
  sections: Section[];
  height: Record<LayoutIdentifier, number>;
  color: Record<LayoutIdentifier, string | null>;
}

type LayoutIdentifier = string;
