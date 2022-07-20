import { AdditionalHTML } from './AdditionalHTML';
import { Meta } from './MetaInfo';
import { Grid } from './Grid';
import { Layout } from './Layout';
import { Page } from './Page';
import { Fonts } from './Fonts';

export interface Project {
  id: string;
  html: AdditionalHTML;
  meta: Meta;
  grid: Grid;
  layouts: Layout[];
  pages: Page[];
  fonts: Fonts;
}
