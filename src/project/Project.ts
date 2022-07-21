import { AdditionalHTML } from './AdditionalHTML';
import { Meta } from '../metaInfo/MetaInfo';
import { Grid } from '../grid/Grid';
import { Layout } from '../layout/Layout';
import { Page } from '../page/Page';
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
