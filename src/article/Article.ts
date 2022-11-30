import { Section } from './Section';

export interface Article {
  id: string;
  sections: Section[];
}

type LayoutIdentifier = string;
